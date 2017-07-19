/**
 * Created by Sulav on 7/15/2017.
 */
var mongoose = require("mongoose");

var customerOrderSchema = new mongoose.Schema({

    customer_id : Number,
    order : {
        supplier : String,
        order_id : Number
   }
    

});


module.exports = mongoose.model("CustomerOrder", customerOrderSchema);