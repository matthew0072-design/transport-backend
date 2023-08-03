const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const driverSchema = new Schema({
  surname: {
    type: String,
    required: [true, "Your Surname is required"],
  },
  otherNames: {
    type: String,
    required: [true, "Other names cannot be empty!!!"],
    maxLength: 15,
  },

  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phone: {
    type: String,
    required: [true, "Your Phone No is needed"],
    maxLength: [15, "maximum of 15 digit is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "confirmed password is required"],
    minLength: [6, "Password is too short"],
  },
  confirmedPassword: {
    type: String,
    required: [true, "confirmed password is required"],
    minLength: [6, "Password is too short!!!"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

driverSchema.methods.generateAuthToken = async function () {
  const driver = this;
  const token = jwt.sign({ _id: driver._id.toString() }, "neverfearchallenge");
  driver.tokens = driver.tokens.concat({ token });
  await driver.save();
  return token;
};

driverSchema.statics.findByCredentials = async function (email, password) {
  const driver = await this.findOne({ email });

  if (!driver) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, driver.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }

  return driver;
};

driverSchema.pre("save", async function (next) {
  const driver = this;

  if (driver.isModified("password && confirmedPassword ")) {
    driver.password = await bcrypt.hash(driver.password, 10);
    driver.confirmedPassword = driver.password;
  }

  next();
});

const driverModel = mongoose.model("driver", driverSchema);

module.exports = driverModel;
