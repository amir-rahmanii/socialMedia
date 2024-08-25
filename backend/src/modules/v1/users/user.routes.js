const express = require("express");
const controller = require("./user.controller");
const auth = require("../../../middlewares/v1/auth");
const router = express.Router();
const { multerStorage } = require("../../../middlewares/uploaderConfigs");
const upload = multerStorage(
  "public/images/profiles",
  /png|jpeg|jpg|webp|mp4|mkv/
);



// * POST
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/update-password").post(controller.updatePassword);
router.route("/forget-password").post(controller.forgetPassword);
router.route("/user-ban-toggle").post(auth, controller.userBanToggle);
router.route("/reset-password").post(controller.resetPassword);
router.route("/refresh-token").post(controller.refreshToken);
// * GET
router.route("/user-information/:userid").get(auth, controller.userInformation);

// * PUT
router
  .route("/update-profile-picture")
  .put(auth, upload.single("profilePicture"), controller.updateUserProfile);


module.exports = router;
