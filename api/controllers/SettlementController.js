/**
 * SettlementController
 *
 * @description :: Server-side logic for managing settlements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getNeedToPay:function(req,res){
        SettlementService.getNeedToPay(req.param('userId'),function(needPay){
            res.send({needPay:needPay});
        });
    },
    goingToSettle : function(req,res){
        User.update({id:req.param('userId')},{$set:{goingToSettle:true}},function(err,doc){
            if(err){
                res.send({error:err});
            }else{
                res.send({goingToSettle:doc.goingToSettle});
            }
        })
    },
    addSettlement : function(req,res){
        User.find({group:req.param('group')},function(err,doc){
            var userList = doc;
            userList.forEach(function(user){
                if(!user.goingToSettle){
                    res.send({result:'等待其他人操作'});
                    return false;
                }
            });

        })
    }
};

