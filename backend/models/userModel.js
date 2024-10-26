const bcrypt = require("bcryptjs"); // ใช้ bcryptjs แทน bcrypt
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    account_name: String,
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: String,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const userModel = mongoose.model("User", userSchema); // Create the model after middleware

module.exports = userModel; // Export the model
