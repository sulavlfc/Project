var bodyParser = require('body-parser');
var request = require('superagent');
var Order = require("../models/order");


exports.post_order = function(req, res) {

    //console.log(req);

    var order = new Order({
        make: req.body.make,
        model: req.body.model,
        package: req.body.package,
        customer_id: req.body.customer_id
    });
    order.save(function (err, data) {
        if (err) {
            var err = new Error();
            //console.log(err.status)
            res.send(400)
        }
        else {
            request
                .post('https://hbwut3q1ld.execute-api.us-east-2.amazonaws.com/test/orderFunction')
                .send(data)
                .end(function(err, response){
                    //console.log(res)
                    if(err){
                        console.log(err)
                        res.sendStatus(400)
                    }
                    else{
                        
                        request
                        .post('http://localhost:3050/acme/api/v45.1/order?api_key=cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
                        .send(data)
                        .end(function(err, resp){
                        //console.log(res)
                        if(err){
                            console.log(err)
                            //res.sendStatus(400)
                             res.json({message : "supplier failure", url : response.body.Location, order: null, supplier : null});
                        }
                        else{
                                console.log(resp.body)
                                res.json({message : "success", url : response.body.Location, order: resp.body.order, supplier : resp.body.supplier});
                            }
                        
                
                         
                        })
                    }
                });

        }
    });
};

