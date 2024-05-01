const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://balsangram1:YC8Akeb3hPhWTBvD@cluster0.t40rtbn.mongodb.net/"
        // or
        // "mongodb+srv://balsangram1:YC8Akeb3hPhWTBvD@cluster0.t40rtbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        //  or
        // "mongodb://localhost:27017/test"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    resizeBy.status(400).json({ message: error.message });
    console.error("Error connecting to MongoDB:", error.message);
  }
};

conn();
// balsangram1;
// YC8Akeb3hPhWTBvD;
// mongodb+srv://balsangram1:YC8Akeb3hPhWTBvD@cluster0.t40rtbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://balsangram1:<password>@cluster0.t40rtbn.mongodb.net/
