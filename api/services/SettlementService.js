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
                    callback(billAmount - orderAmount);
                });
            })
        });
    },

}