const storeModel = require("../../models/storeModel");

async function updateStore(req, res) {
  try {
    const {
      _id,
      storeName,
      description,
      categoryStore,
      branchType,
      openingTime,
      closingTime,
      holidays,
      address,
      lat,
      long,
      phone,
      email,
      paymentMethods,
      line,
      facebook,
      instagram,
    } = req.body;

    const payload = {
      ...(storeName && { storeName }),
      ...(description && { description }),
      ...(categoryStore && { categoryStore }),
      ...(branchType && { branchType }),
      ...(openingTime && { openingTime }),
      ...(closingTime && { closingTime }),
      ...(holidays && { holidays }),
      ...(address && { address }),
      ...(lat && { lat }),
      ...(long && { long }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(paymentMethods && { paymentMethods }),
      ...(line && { line }),
      ...(facebook && { facebook }),
      ...(instagram && { instagram }),
    };

    const updatedStore = await storeModel.findByIdAndUpdate(_id, payload, { new: true });

    if (!updatedStore) {
      return res.status(404).json({
        message: "Store not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updatedStore,
      message: "Store Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateStore;