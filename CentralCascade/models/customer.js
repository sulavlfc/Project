/**
 * Created by Sulav on 7/15/2017.
 */
var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({

    make: String,
    model : String,
    package : String,
    customer_id : { type: Number, index: { unique: true }}


});


module.exports = mongoose.model("Order", orderSchema);