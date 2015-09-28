/**
 * Created by lhk on 2015/9/28.
 */
module.exports = {
    getAmountAfterLastSettlementByUser : function (userId, lastSettlementTime,callback) {
        Bill.find({billUser: userId, createdAt: {$gte: lastSettlementTime}}).exec(function (err, data) {
            var amount = 0;
            console.log(data);
            data.forEach(function (e) {
                amount += parseFloat(e.money);
            });
            callback(amount);
        });
    }
}