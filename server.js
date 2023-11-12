const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
// const mongoose = require("mongoose");

// const app = require("./app");

// const { DB_URI } = process.env;

// mongoose
//   .connect(DB_URI)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
