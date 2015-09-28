/**
* Settlement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
      needPayList:{
          type:'array'
      },
      state:{
          type:'integer'//0:待结算  1：已结算
      }
  }
};

