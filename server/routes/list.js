const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.model");
//creat
router.post("/add", async (req, res) => {
  try {
    const { body, id } = req.body;
    const existingUser = await User.findById(id); // Pass id directly, not as { id }

    console.log(existingUser, "existingUser----");

    if (existingUser) {
      const list = new List({ body, user: existingUser });
      await list.save();

      existingUser.list.push(list);
      await existingUser.save();

      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update
// router.put("/update/:id", async (req, res) => {
//   try {
//     const { body, email } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       const list = await List.findByIdAndUpdate(req.params.id, { body });
//       list.save().then(() => res.status(200).json({ message: "List Updated" }));
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
//delete
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // Extract id from URL params

//     const existingUser = await User.findById(id); // Find user by id

//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the list item belongs to the user
//     if (!existingUser.list.includes(req.params.id)) {
//       return res
//         .status(403)
//         .json({ message: "List item does not belong to the user" });
//     }

//     // Proceed with deletion
//     existingUser.list.pull(req.params.id); // Remove list item from user's list
//     await existingUser.save(); // Save user changes

//     await List.findByIdAndDelete(req.params.id); // Delete the list item

//     res.status(200).json({ message: "Delete Task Successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Pull the list item ID from the user's list array
//     existingUser.list.pull(req.params.id);
//     await existingUser.save();

//     // Delete the list item
//     await List.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: "Delete Task Successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//getTask
router.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    if (list.length !== 0) {
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
