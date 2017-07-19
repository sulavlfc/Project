/**
 * Created by Sulav on 7/15/2017.
 */

var Order = require("../models/order");
var Key = require("../models/apikeys");

exports.get_orders = function(req, res) {
    console.log(req.query.key)
    if(req.query.key){

    
    Key.find({"key" : req.query.key},function (err,result) {
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else {
            console.log(result.length)
            if (result.length == 1){
                Order.find({}, function (err, users) {

                    //console.log(users);
                    res.json(users);
                });
            }
            else {
                //res.send({"message" : "Invalid Key"});
                res.sendStatus(403);
            }
        }
        });
    }
    else
        res.sendStatus(400);

};

