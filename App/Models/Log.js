const Dynamoose = require('../Db');
var Schema = Dynamoose.Schema;

var LogSchema = new Schema({       
    id: {             
      type: String,
    },       
    resource: {             
      type: String,      
    },       
    method: {             
      type: String,     
    },       
    version: {             
      type: String,     
    },             
    request_header: {             
      type: Object,
    },       
    request_body: {             
      type: Object,     
    },       
    response_header: {         
      type : Object     
    },       
    response_body: {         
      type : Object     
    },
    response_code: {         
      type : String     
    },  
    error_details: {         
      type : Object     
    }, 
    third_party_response: {         
      type : Object     
    },
    logged_on: {         
      type : String     
    } 
});

var Log = Dynamoose.model('logs', LogSchema);

module.exports = Log;