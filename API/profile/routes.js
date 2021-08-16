const express = require("express");
const passport = require("passport");

const {
  profileFetch,
  fetchProfile,
  fetchUserProfile,
  updateProfile,
} = require("./controllers");
const router = express.Router();

// param middleware (parameter)
router.param("profileId", async (req, res, next, profileId) => {
  // get the profile with id profileId
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    // store it in req
    req.profile = profile;
    next();
  } else {
    // give back response 404 Profile Not Found
    const error = new Error("Profile Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", profileFetch);

//fetch profile
router.get("/:profileId", fetchUserProfile);

// Update Route
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = router;
