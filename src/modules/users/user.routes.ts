import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { authorize } from "../../middlewares/authorize";

import {
  clerkWebhook,
  getCurrentUser,
  getUserByClerkId,
  updateProfile,
  changeRole,
} from "./user.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

// router.post(
//   "/webhooks/clerk",
//   clerkWebhook
// );

router.post(
  "/clerk",
  clerkWebhook
);



/*
|--------------------------------------------------------------------------
| Authenticated
|--------------------------------------------------------------------------
*/
router.get(
  "/me",
  auth,
  getCurrentUser
);

router.patch(
  "/profile",
  auth,
  updateProfile
);

// router.get(
//   "/user-only",
//   auth,
//   authorize("user"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "User Route",
//     });
//   }
// );

// router.get(
//   "/manager-only",
//   auth,
//   authorize("manager"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Manager Route",
//     });
//   }
// );

// router.get(
//   "/admin-only",
//   auth,
//   authorize("admin"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Admin Route",
//     });
//   }
// );


// router.get(
//   "/test-auth",
//   auth,
//   (req, res) => {
//     res.json({
//       success: true,
//       user: req.currentUser,
//     });
//   }
// );

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.patch(
  "/:clerkId/role",
  auth,
  authorize("admin"),
  changeRole
);

/*
|--------------------------------------------------------------------------
| Development only
|--------------------------------------------------------------------------
*/

router.get(
  "/:clerkId",
  auth,
  authorize("admin"),
  getUserByClerkId
);

export default router;