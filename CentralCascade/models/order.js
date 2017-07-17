var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    make: String,
    model : String,
    package : String,
    customer_id : { type: Number, index: { unique: true }}


});


module.exports = mongoose.model("Order", orderSchema);