const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/transport-api",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("database connected!!!");
    }
  );
} catch (error) {
  handleError(error);
}
