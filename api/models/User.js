/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name:{
          type: 'string'
      },
      age:{
          type: 'integer'
      },
      password:{
          type: 'string'
      },
      tel:{
          type: 'string'
      },
      sex:{
          type: 'string',
          enum: ['男','女'],
          defaultsTo: '男'
      },
      group:{
          type: 'string',
          defaultsTo: '1005'
      },
      goingToSettle:{
          type: 'boolean',
          defaultsTo:false
      }
  }
};

