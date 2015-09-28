/**
 * BillController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	getAmount:function(req,res){
        Bill.find({billUser:req.param('userId')}).exec(function(err, data){
            var amount = 0;
            console.log(data);
             data.forEach(function(e){
                 amount += parseFloat(e.money);
             });
            res.send({amount:amount});
        });
    }
};

