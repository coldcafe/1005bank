/**
 * Created by lhk on 2015/9/28.
 */
module.exports = {
    getNeedToPay : function(userId,callback){
        var lastSettlementTime;
        Settlement.find({}).sort({createdAt:-1}).exec(function(err,doc){
            if(doc[0]){
                lastSettlementTime = doc[0].createdAt;
            }else{
                lastSettlementTime = new Date('1970-01-01 00:00:00');
            }
            BillService.getAmountAfterLastSettlementByUser(userId, lastSettlementTime,function(billAmount){
                OrderService.getAmountAfterLastSettlementByUser(userId, lastSettlementTime,function(orderAmount){
                    console.log(billAmount - orderAmount);
                    User.findOne({id:userId}).exec(function(err,user){
                        console.log(user.name+":"+(billAmount - orderAmount));
                        callback({userId:user.id,name:user.name,needPay:billAmount - orderAmount});
                    });
                });
            })
        });
    },
    createTransferCase : function(settlement,callback){
        async.each(settlement.needPayList,
            function(from,cb){
                if(from.money>0) {
                    var To = -1;
                    var min = 2147483647;
                    settlement.needPayList.forEach(function (to,j) {
                        if(to.money<0){
                            if(Math.abs(from.money+to.money)<min){
                                To = j;
                                min = Math.abs(from.money+to.money);
                            }
                        }
                    });
                }
            },
            function(err){

            }
        );
        settlement.needPayList.forEach(function(from,i){
            if(from.money>0) {
                var To = -1;
                var min = 2147483647;
                settlement.needPayList.forEach(function (to,j) {
                    if(to.money<0){
                        if(Math.abs(from.money+to.money)<min){
                            To = j;
                            min = Math.abs(from.money+to.money);
                        }
                    }
                });
                if(from.money>Math.abs(doc.needPayList[To].money)){
                    from.money = from.money+doc.needPayList[To].money;
                    settlement.needPayList[To].money = 0;
                    TransferCase.create({settlementId:settlement.id,userId:from.id,toUser:settlement.needPayList[To].id,money:Math.abs(settlement.needPayList[To].money),state:0}).exec();
                }else{
                    from.money = 0;
                    settlement.needPayList[To].money = from.money+doc.needPayList[To].money;
                    TransferCase.create({settlementId:settlement.id,userId:from.id,toUser:settlement.needPayList[To].id,money:Math.abs(settlement.needPayList[To].money),state:0}).exec();
                }

            }
        });
    }
}