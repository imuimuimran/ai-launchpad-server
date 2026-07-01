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
      (env.CLERK_WEBHOOK_SECRET || process.env.CLERK_WEBHOOK_SECRET) as string
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
      case "user.created": {
        // Improved Name Fallback Logic 🎯
        const fullName = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();

        await UserService.createUser({
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address ?? "",
          name:
            fullName ||
            data.username ||
            data.email_addresses?.[0]?.email_address ||
            "Unknown User",
          image: data.image_url,
          role: "user",
        });
        break;
      }

      case "user.updated": {
        // Improved Name Fallback Logic 🎯
        const fullName = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();

        await UserService.updateUser(data.id, {
          email: data.email_addresses?.[0]?.email_address ?? "",
          name:
            fullName ||
            data.username ||
            data.email_addresses?.[0]?.email_address ||
            "Unknown User",
          image: data.image_url,
        });
        break;
      }

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
    // Improved Error Messaging Block 🛠️
    console.error("========== WEBHOOK ERROR ==========");

    if (error instanceof Error) {
      console.error(error.message);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unknown webhook error",
    });
  }
};


export const getUserByClerkId = async (
  req: Request,
  res: Response
) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId || typeof clerkId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing Clerk ID",
      });
    }

    const user =
      await UserService.getUserByClerkId(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error,
    });
  }
};



export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = req.userId!;

    const user =
      await UserService.getUserByClerkId(
        clerkId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch current user",
    });
  }
};


export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await UserService.updateUser(
        req.userId!,
        req.body
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


export const changeRole = async (
  req: Request,
  res: Response
) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId || typeof clerkId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing Clerk ID",
      });
    }

    const user =
      await UserService.changeRole(
        clerkId,
        req.body.role
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Role update failed",
    });
  }
};
