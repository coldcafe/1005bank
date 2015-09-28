/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAmount:function(req,res){
        Order.find({payUser:req.param('userId')}).exec(function(err, data){
            var amount = 0;
            console.log(data);
            data.forEach(function(e){
                amount += parseFloat(e.money);
            });
            res.send({amount:amount});
        });
    }
};

