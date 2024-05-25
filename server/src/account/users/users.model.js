import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using the new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Method to compare given password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { results: false, message: "User not found" };
    }

    const isMatch = await user.comparePassword(password);
    return isMatch
      ? user
      : { results: false, message: "Password is incorrect" };
  } catch (err) {
    throw err;
  }
};

export const UserModel = model("users", userSchema);
