'use strict'
const VALIDATOR = require('validatorjs');
const ACCOUNT = require('../Models/Account');
const LIMIT_TEMPLATE = require('../Models/Template');
const CURRENCY = require('../Models/Currency');
VALIDATOR.register('is_after', function(value, requirement, attribute) { // requirement parameter defaults to null
  if (new Date(requirement).getTime() < new Date(value).getTime()) {
    return true;
  }
  return false;
}, 'The :attribute should be greater.');

VALIDATOR.register('length_true', function(value, requirement, attribute) { // requirement parameter defaults to null
  var val = value; 
  var size = val.toString().length;
  var reqs = requirement;
  var req = reqs.split(',');
  var min = req[0];
  var max = req[1];
  return size >= min && size <= max;
  return false;
}, 'The :attribute should be greater.');

VALIDATOR.register('positive_number', function(value, requirement, attribute) { // requirement parameter defaults to null
  if(value >= 0) return value;
  else return false;
}, 'The :attribute should be positive value.');

VALIDATOR.register('number_only', function(value, requirement, attribute) { // requirement parameter defaults to null
  return value.match(/^[0-9]*$/);
}, 'The :attribute should be positive value.');

VALIDATOR.registerAsync('should_exist', function(value, requirement, attribute, passes) { // requirement parameter defaults to null
  var val = value; 
  var reqs = requirement;
  var req = reqs.split(',');
  var table = req[0];
  var column = req[1];
  switch(table){
    case 'templates':
      LIMIT_TEMPLATE.scan().where(column).eq(val).exec().then(function(data){
        if(!data.count){
          passes(false, 'LimitsGroup does not exist.');
        } else{
          passes();
        }
      });
      break;
    default:
      return false;
  }
  return false;
});

VALIDATOR.registerAsync('should_not_exist', function(value, requirement, attribute, passes) { // requirement parameter defaults to null
  var val = value; 
  var reqs = requirement;
  var req = reqs.split(',');
  var table = req[0];
  var column1 = req[1];
  var column2 = req[2];
  var column2Value = req[3];
  switch(table){
    case 'accounts':
      ACCOUNT.scan().where(column2).not().eq(column2Value).and().where(column1).eq(val).exec().then(function(data){
        if(data.count){
          passes(false, 'CustAccount already exist for different account.');
        } else{
          passes();
        }
      });
      break;
    default:
      return false;
  }
  return false;
});

VALIDATOR.registerAsync('supported_currency', function(value, requirement, attribute, passes) { // requirement parameter defaults to null
  var val = value; 
  CURRENCY.scan().where('currency').eq(val).exec().then(function(data){
    if(!data.count){
      passes(false, 'Currency Not Supported.');
    } else{
      passes();
    }
  });
  return false;
});
