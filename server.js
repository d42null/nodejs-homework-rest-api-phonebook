const app = require("./app");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
