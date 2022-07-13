const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Designation: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    email_Id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },
    socialUrls: [String],
    companyLogo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
