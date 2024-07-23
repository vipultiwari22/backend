import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "./images/defualt.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    designation: {
      type: String,
      default: "Nothing",
    },
    bio: {
      type: String,
      default: "BIO",
    },
    phoneNo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Assuming a 10-digit phone number format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?((w{3}\.)?)facebook.com(\/.*)?$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid Facebook URL!`,
        },
        default: "https://facebook.com",
      },
      instagram: {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?((w{3}\.)?)instagram.com(\/.*)?$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid Instagram URL!`,
        },
        default: "https://instagram.com",
      },
      linkedin: {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?((w{3}\.)?)linkedin.com(\/.*)?$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid LinkedIn URL!`,
        },
        default: "https://linkedin.com",
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema); // Ensure the model name is "User" with a capital 'U'
export default User;
