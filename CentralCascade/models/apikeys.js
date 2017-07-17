/**
 * Created by Sulav on 7/15/2017.
 */
var mongoose = require("mongoose");

var keySchema = new mongoose.Schema({

    company: String,
    key : { type: String, index: { unique: true }}

});


module.exports = mongoose.model("Key", keySchema);