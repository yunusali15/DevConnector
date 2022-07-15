const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const req = require("express/lib/request");
const config = require("config");
const { json } = require("express/lib/response");
const request = require("request");

//@route GET api/profiles/me
//@access Private (becasue token required to access personal profile)
//@desc Get personal profile
router.get("/me", auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
         "user",
         ["name", "avatar"]
      );

      if (!profile) {
         return res.status(400).json({ msg: "No Profile found for user" });
      }

      res.json(profile);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
});

//@route POST api/profiles
//@access Private (becasue token required to access personal profile)
//@desc Create/Update personal profile
router.post(
   "/",
   auth,
   [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(), //second argument is when the validation checks fail
   ],
   async (req, res) => {
      const errors = validationResult(req);

      try {
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }

         const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            linkedin,
            instagram,
            facebook,
         } = req.body;

         let profileFields = {};

         profileFields.user = req.user.id;
         profileFields.status = status;
         profileFields.skills = skills.split(",").map((skill) => skill.trim());
         if (company) profileFields.company = company;
         if (website) profileFields.website = website;
         if (location) profileFields.location = location;
         if (bio) profileFields.bio = bio;
         if (githubusername) profileFields.githubusername = githubusername;

         profileFields.social = {};

         if (youtube) profileFields.social.youtube = youtube;
         if (twitter) profileFields.social.twitter = twitter;
         if (facebook) profileFields.social.facebook = facebook;
         if (linkedin) profileFields.social.linkedin = linkedin;
         if (instagram) profileFields.social.instagram = instagram;

         let profile = await Profile.findOne({ user: req.user.id });
         if (profile) {
            profile = await Profile.findOneAndUpdate(
               { user: req.user.id },
               { $set: profileFields },
               { new: true }
            );
            return res.json(profile);
         }

         profile = new Profile(profileFields);

         await profile.save();

         return res.json(profile);
      } catch (err) {
         console.error(err.message);
         res.status(500).send("Server Error");
      }
   }
);

//@route GET api/profiles/
//@access Public
//@desc Get all profiles
router.get("/", async (req, res) => {
   try {
      const profiles = await Profile.find().populate("user", [
         "name",
         "avatar",
      ]);

      res.json(profiles);
   } catch (err) {
      console.error(err);
      req.status(500).send("Server Error");
   }
});

//@route GET api/profiles/
//@access Private (becasue token required to access personal profile)
//@desc Get the user profile
router.get("/user/:user_id", async (req, res) => {
   try {
      const profile = await Profile.findOne({
         user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
         return res.status(400).json({ msg: "No Profile found for user" });
      }

      res.json(profile);
   } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
   }
});

//@route DELETE api/profiles/
//@access Private (becasue token required to access personal profile)
//@desc Delete the user profile
router.delete("/", auth, async (req, res) => {
   try {
      //@to-do  delete posts of the user

      const profile = await Profile.findOneAndRemove({ user: req.user.id });
      const user = await User.findOneAndRemove({ _id: req.user.id });

      if (!user) {
         return res.status(400).send({ msg: "User does not exist!" });
      }

      res.json("User Deleted!");
   } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
   }
});

//@route PUT api/profiles/experience
//@access Private (becasue token required to access personal profile)
//@desc Add experience to the user profile
router.put(
   "/experience",
   auth,
   [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.json({ errors: errors.array });
      }

      const { title, company, location, from, to, current, description } =
         req.body;

      const newExp = {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      };

      try {
         let profile = await Profile.findOne({ user: req.user.id });

         if (!profile) {
            return res
               .status(400)
               .send({ msg: "Profile does not exist for user" });
         }

         profile.experience.unshift(newExp);

         await profile.save();
         return res.json(profile);
      } catch (err) {
         console.error(err);
         return res.status(500).send("Internal Server Error");
      }
   }
);

//@route DELETE api/profiles/experience
//@access Private (becasue token required to access personal profile)
//@desc Delete the user profile experience
router.delete("/experience/:exp_id", auth, async (req, res) => {
   try {
      //@to-do  delete posts of the user

      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
         return res.status(400).send({ msg: "Profile does not exist!" });
      }

      const indexToRemove = profile.experience
         .map((item) => item.id)
         .indexOf(req.params.exp_id);

      profile.experience.splice(indexToRemove, 1);

      await profile.save();
      res.json(profile);
   } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
   }
});

//@route PUT api/profiles/education
//@access Private (becasue token required to access personal profile)
//@desc Add education to the user profile
router.put(
   "/education",
   auth,
   [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.json({ errors: errors.array });
      }

      const { school, degree, fieldOfStudy, from, to, current, description } =
         req.body;

      const newEdu = {
         school,
         degree,
         fieldOfStudy,
         from,
         to,
         current,
         description,
      };

      try {
         let profile = await Profile.findOne({ user: req.user.id });

         if (!profile) {
            return res
               .status(400)
               .send({ msg: "Profile does not exist for user" });
         }

         profile.education.unshift(newEdu);

         await profile.save();
         return res.json(profile);
      } catch (err) {
         console.error(err);
         return res.status(500).send("Internal Server Error");
      }
   }
);

//@route DELETE api/profiles/education
//@access Private (becasue token required to access personal profile)
//@desc Delete the user profile education
router.delete("/education/:edu_id", auth, async (req, res) => {
   try {
      //@to-do  delete posts of the user

      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
         return res.status(400).send({ msg: "Profile does not exist!" });
      }

      const indexToRemove = profile.education
         .map((item) => item.id)
         .indexOf(req.params.edu_id);

      profile.education.splice(indexToRemove, 1);

      await profile.save();
      res.json(profile);
   } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
   }
});

//@route DELETE api/profiles/github/:username
//@access Public
//@desc Get the github by username
router.get("/github/:username", async (req, res) => {
   try {
      const options = {
         uri: `http://api.github.com/users/${
            req.params.username
         }/repos?per_page=5&sort=created:asc&client_id=${config.get(
            "githubClientId"
         )}&client_secret=${config.get("githubSecret")}`,
         method: "GET",
         headers: { "user-agent": "node.js" },
      };

      request(options, (error, response, body) => {
         if (error) console.error(error);

         if (response.statusCode !== 200) {
            res.status(404).json({ msg: "No user found!" });
         }

         res.json(JSON.parse(body));
      });
   } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
   }
});

//@route POST api/profile/connections
//@access Private
//@desc Add to connections
router.post("/connections/:id", auth, async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
         return res.status("400").json({ msg: "Bad Request" });
      }

      const profile = await Profile.findOne({ user: req.user.id });
      const connectedProfile = await Profile.findOne({ user: req.params.id });

      if (!profile || !connectedProfile) {
         return res.status(400).send({ msg: "Profile does not exist!" });
      }

      const index = profile.connections
         .map((item) => item.id)
         .indexOf(req.params.id);

      const connectedIndex = connectedProfile.connections
         .map((item) => item.id)
         .indexOf(req.user.id);

      if (index > 0 && connectedIndex > 0) {
         return res.status(400).send({ msg: "Already Connected!" });
      }

      profile.connections.unshift({ user: req.params.id });

      connectedProfile.connections.unshift({ user: req.user.id });

      await profile.save();
      await connectedProfile.save();
      res.json({ profile: profile, connectedProfile: connectedProfile });
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
});

//@route DELETE api/profile/connections
//@access Private
//@desc Delete from connections
router.delete("/connections/:id", auth, async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
         return res.status("400").json({ msg: "Bad Request" });
      }

      const profile = await Profile.findOne({ user: req.user.id });
      const connectedProfile = await Profile.findOne({ user: req.params.id });

      if (!profile || !connectedProfile) {
         return res.status(400).send({ msg: "Profile does not exist!" });
      }

      const indexToRemove = profile.connections
         .map((item) => item.id)
         .indexOf(req.params.id);

      const connectedIndexToRemove = connectedProfile.connections
         .map((item) => item.id)
         .indexOf(req.user.id);

      if (!indexToRemove || !connectedIndexToRemove) {
         return res.status(400).send({ msg: "Connection does not exist!" });
      }

      profile.connections.splice(indexToRemove, 1);

      connectedProfile.connections.splice(connectedIndexToRemove, 1);

      await profile.save();
      await connectedProfile.save();
      res.json({ profile: profile, connectedProfile: connectedProfile });
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
});

//@route GET api/connect
//@access Private
//@desc Get all connections by user id
router.get("/connections/:id", auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.params.id });

      const profiles = await Promise.all(
         profile.connections.map((connection) =>
            Profile.findOne({ user: connection.user }).populate("user", [
               "name",
               "avatar",
            ])
         )
      );

      res.json(profiles);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
});

module.exports = router;
