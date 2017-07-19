/**
 * Created by Sulav on 7/19/2017.
 */

var Customer = require("../models/customer");
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');

exports.get_customer = function(req, res) {
    console.log(req.query.id)
    if(req.query.id){

    
    Customer.find({"customer_id" : req.query.id},function (err,result) {
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else {
            if(result.length == 0){
                res.sendStatus(400)
            }
            else
                res.json(result)
            };
        });
    }
    else
        res.sendStatus(400);

};


exports.isValidAddress = function(req, res) {
    console.log(req.query.id)
    if(req.query.id){

    Customer.find({"customer_id" : req.query.id},function (err,result) {
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else {
             if(result.length == 0){
                res.sendStatus(400)
            }
            else{
             
            
            var address = result[0].address;
            console.log(address)
            addressValidator.validate(address, function(err, exact, inexact){
                console.log(inexact.length)
                 if (inexact.length == 0){
                     //console.log(exact[0])
                     if (exact.length == 0){
                         res.send("Not Shippable Address")
                     }
                        else{
                            if (exact[0].country == "United States"){
                                res.send("Shippable,  Address Is Valid !!")
                            }
                            else
                                res.send("Not Shippable Address")
                        }
                 }
                    else{
                           console.log(inexact[0])
                        
                            if (inexact[0].country == "United States"){
                                res.send("Shippable,  Address Is Valid !!")
                            }
                            else
                                res.send("Not Shippable Address")
                        }
                 
                    
                });
        }
 
                
            };
        });
    }
    else
        res.sendStatus(400);

};


exports.post_customer = function(req, res) {
    console.log(req.query.id)
    if(req.query.id){

    var customer = new Customer({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        customer_id : req.query.id

    });

    customer.save().then(function(data) {
        console.log(data)
        res.sendStatus(200);
    }).catch(function(err){
        res.sendStatus(400)
    })
    }
    else
        res.sendStatus(400);

};


