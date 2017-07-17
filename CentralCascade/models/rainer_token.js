/**
 * Created by Sulav on 7/17/2017.
 */
var mongoose = require("mongoose");

var tokenSchema = new mongoose.Schema({

    token: String
    

});


module.exports = mongoose.model("Token", tokenSchema);