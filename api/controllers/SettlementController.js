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
    doneSettlement : function(req,res){
        async.waterfall([
            function(cb){//将用户结算状态置为true
                User.update({id:req.param('userId')},{doneSettle:true}).exec(function(err,user) {
                    cb(err,user);
                });
            },
            function(user,cb){
                User.find({group:'1005'}).exec(function(err,doc){//统计所有用户的结算状态
                    var userList = doc;
                    var doneUsers = 0;
                    doc.forEach(function(user){
                        if(user.doneSettle == true){
                            doneUsers++
                        }
                    });
                    var allDone = false;
                    if(doneUsers == userList.length){
                        allDone = true;
                    }
                    cb(err,allDone,userList);
                });
            },
            function(allDone,userList,cb){
                if(allDone){//所有用户都是结算状态则结算完成，重置所有用户状态goingToSettle：false,doneSettle:false
                    async.each(userList,function(user,cb){
                        User.update({id:user.id},{goingToSettle:false,doneSettle:false}).exec(function(err,user) {
                            cb(err,user);
                        });
                    },function(err){
                        cb(err,{allDone:true});
                    });
                }else{
                    cb(null,{allDone:false});
                }
            },
            function(allDone){
                Settlement.update({},{});
            }
        ],function(err,result){
            if (err) {
                res.send({error: err});
            } else {
                res.send({error: null, result: result});
            }
        });
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

