var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    make: String,
    model : {type: String, enum: ["Honda", "Ford"]},
    package : String,
    customer_id : { type: Number, index: { unique: true }, required: true}


});


module.exports = mongoose.model("Order", orderSchema);