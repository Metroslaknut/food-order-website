const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
    },
    countBranch: {
      type: Number,
      required: true,
    },
    countEmployee: {
      type: Number,
      required: true,
    },
    ePayment: {
      type: Boolean,
      default: false,
    },
    reportSale: {
      type: Boolean,
      default: false,
    },
    manageEmployee: {
      type: Boolean,
      default: false,
    },
    eMenu: {
      type: Boolean,
      default: false,
    },
    manageStore: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Boolean,
      default: false,
    },
    teamsSupport: {
      type: Boolean,
      default: false,
    },
    timesupport: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promotion: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const packageModel = mongoose.model("Package", packageSchema);

module.exports = packageModel;