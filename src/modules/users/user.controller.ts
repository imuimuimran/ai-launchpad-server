import { Request, Response } from "express";
import { Webhook } from "svix";

import { env } from "../../config/env";
import { UserService } from "./user.service";


export const clerkWebhook = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("========== WEBHOOK RECEIVED ==========");
    console.log(req.headers);
    const svixId = req.headers["svix-id"] as string;
    const svixTimestamp = req.headers["svix-timestamp"] as string;
    const svixSignature = req.headers["svix-signature"] as string;

    if (
      !svixId ||
      !svixTimestamp ||
      !svixSignature
    ) {
      return res
        .status(400)
        .json({
          message: "Missing Svix headers",
        });
    }

    const webhook = new Webhook(
      env.CLERK_WEBHOOK_SECRET
    );

    const payload = webhook.verify(
      req.body,
      {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }
    ) as any;

    const eventType = payload.type;
    const data = payload.data;

    switch (eventType) {
      case "user.created":
        await UserService.createUser({
          clerkId: data.id,
          email:
            data.email_addresses[0]
              .email_address,
          name: `${data.first_name ?? ""} ${
            data.last_name ?? ""
          }`.trim(),
          image: data.image_url,
          role: "user",
        });

        break;

      case "user.updated":
        await UserService.updateUser(
          data.id,
          {
            email:
              data.email_addresses[0]
                .email_address,
            name: `${data.first_name ?? ""} ${
              data.last_name ?? ""
            }`.trim(),
            image: data.image_url,
          }
        );

        break;

      case "user.deleted":
        await UserService.deleteUser(
          data.id
        );

        break;
    }

    return res
      .status(200)
      .json({
        success: true,
      });
  } catch (error) {
    console.error(error);

    return res
      .status(400)
      .json({
        success: false,
        message:
          "Webhook verification failed",
      });
  }
};