const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const vacController = require("../controllers/vacationsController");
const usersController = require("../controllers/usersController");

// Vacation actions routes

// get all vacations
router.get("/vacations", vacController.getAllVac);
// get single vacation
router.get("/vacations/:id", vacController.getSingleVac);
// create post - private
router.post("/vacations/", auth, vacController.AddVac);
// delete post - private
router.delete("/vacations/:id", auth, vacController.deleteVac);
// update post - private
router.put("/vacations/:id", auth, vacController.updateVac);
// follow vacation
router.post("/vacations/:id/follow", auth, vacController.follow);
// unfollow vacation
router.post("/vacations/:id/unfollow", auth, vacController.unfollow);

// User actions routes
router.get("/", (req, res) => {
  res.send("please login");
});
router.post("/login", usersController.checkUser);

router.post("/register", usersController.regUser);

router.get("/logout", usersController.logOut);

module.exports = router;
