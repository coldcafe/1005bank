/**
* Bill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      orderId:{
          type:'string'
      },
      title:{
          type:'string'
      },
      money:{
          type:'float'
      },
      joinPayList:{
          type:'array'
      },
      billUser:{
          type:'string'
      }
  }
};

