var mongoose = require("mongoose");


var customerSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, required: true},
    phone : { type: Number,  required: true},
    address : { type: String, required: true},
    customer_id : { type: Number, unique: true, required: true}
});


module.exports = mongoose.model("Customer", customerSchema);