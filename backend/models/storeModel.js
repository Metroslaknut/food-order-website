const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // เชื่อมโยงกับผู้ใช้
    account_name: {
      type: String,
      required: true 
    },
    storeName: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    categoryStore: {
      type: String,
      required: true,
    },
    branchType: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String, // หรือเก็บในรูปแบบเวลา HH:mm
      required: true,
    },
    closingTime: {
      type: String, // หรือเก็บในรูปแบบเวลา HH:mm
      required: true,
    },
    holidays: {
      type: [String], // Array ของวันหยุด
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // กำหนด unique เฉพาะ email
      required: true,
    },
    paymentMethods: {
      type: [String], // รองรับหลายวิธีการชำระเงิน
      required: true,
    },
    line: String,
    facebook: String,
    instagram: String,
  },
  {
    timestamps: true,
  }
);

const storeModel = mongoose.model("store", storeSchema);

module.exports = storeModel;
