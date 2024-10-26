const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true 
    },
    countBranch: {
      type: Number,
      required: true,
    },
    countEmployee: {
      type: Number,
      required: true,
    },
    // ePayment: {
    //   type: Boolean,
    //   default: false, // หากใช้ ePayment จะเป็น true
    // },
    // reportSale: {
    //   type: Boolean,
    //   default: false, // หากมีรายงานการขาย จะเป็น true
    // },
    // manageEmployee: {
    //   type: Boolean,
    //   default: false, // หากจัดการพนักงาน จะเป็น true
    // },
    // eMenu: {
    //   type: Boolean,
    //   default: false, // หากมี eMenu จะเป็น true
    // },
    // manageStore: {
    //   type: Boolean,
    //   default: false, // หากจัดการร้านค้า จะเป็น true
    // },
    // delivery: {
    //   type: [String], // Array ของวันหยุด
    //   required: true,
    // },
    // platformOnline: {
    //   type: Boolean,
    //   default: false, // หากมีแพลตฟอร์มออนไลน์ จะเป็น true
    // },
    
    // teamsSupport: {
    //   type: Boolean,
    //   default: false, // หากมีทีมสนับสนุน จะเป็น true
    // },
    price: {
      type: Number,
      required: true, // ราคาของแพคเกจต้องมีการกำหนด
    },
  },
  {
    timestamps: true,
  }
);

const packageModel = mongoose.model("package", packageSchema); // แก้ชื่อโมเดลเป็น "Package"

module.exports = packageModel;
