const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  route: { type: String, required: true },
  roles: [{ type: String, enum: ['ADMIN', 'STORE_OWNER', 'MANAGER', 'EMPLOYEE', 'CUSTOMER', 'SUPPLIER', 'GUEST',], required: true }],
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;