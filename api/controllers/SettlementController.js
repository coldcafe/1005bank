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
        User.update({id:req.param('userId')},{goingToSettle:true}).exec(function(err,doc){
            if(err){
                res.send({error:err});
            }else{
                res.send({goingToSettle:doc[0].goingToSettle});
            }
        })
    },
    addSettlement : function(req,res){
        User.find({group:'1005'}).exec(function(err,doc){
            var userList = doc;
            var needPayList = [];
            async.eachSeries(userList, function (user, cb) {
                if(!user.goingToSettle){
                    cb(null);
                }else{
                    SettlementService.getNeedToPay(user.id,function(needPay){
                        needPayList.push(needPay);
                        cb(null);
                    });
                }
            },function(error){
                if(error){
                    res.send({error: error});
                }else {
                    if(userList.length == needPayList.length) {
                        Settlement.create({needPayList: needPayList, state: 0}).exec(function (err, doc) {
                            if (err) {
                                res.send({error: err});
                            } else {
                                    doc.needPayList.forEach(function(from,i){
                                        if(from.money>0) {
                                            var To = -1;
                                            var min = 2147483647;
                                            var x = 0;
                                            doc.needPayList.forEach(function (to,j) {
                                                if(to.money<0){
                                                   min = (from.money+to.money)<min?(from.money+to.money):x
                                                }
                                            });
                                        }
                                    });
                                    TransferCase.create({settlementId:doc.id,userId:user.id,toUser:toUser,money:money,state:0}).exec();

                                    if (err) {
                                        res.send({error: err});
                                    } else {
                                        res.send({error: null, result: doc});
                                    }

                            }
                        });
                    }else{
                        res.send({error:null,notAll:true,needPayList:needPayList});
                    }
                }
            });
        })
    }
};

