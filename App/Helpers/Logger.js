'use strict'
const UUID  = require('uuid/v4');
const DATETIME = require('node-datetime');
const LOG = require('../Models/Log');
var dateTimeCreate = DATETIME.create();
require('dotenv').config();
let requestBody;
let errorDetails;
const LOGGER = async(ctx, next) => {
	
    await next();
    let contextRequest = ctx.request;
    let contextResponse = ctx.response;
    let contextReq = ctx.req;
    if(contextRequest.method == 'GET') requestBody = {};
    else requestBody = contextRequest.body
    errorDetails = {};
    if(contextResponse.status >= 400) {
        if(ctx.customError != undefined) {
            errorDetails  = ctx.customError
        } else if(contextResponse.status == 405 || contextResponse.status == 500 || contextResponse.status == 404) {
            errorDetails  = { "Message": contextResponse.message }
        }
    } else {
        if(ctx.customError != undefined) {
            errorDetails  = ctx.customError
        } else {
            errorDetails  = { "Message": contextResponse.message }
        }
    }
    let createdAt = dateTimeCreate.format('Y-m-d H:M:S');
    let logData = {
        id: UUID(),
        resource: contextReq.url,
        method: contextRequest.method,
        version: process.env.Version,
        request_header: contextRequest.header,
        request_body: requestBody,
        response_header: contextResponse.header,
        response_body : contextResponse.body,
        response_code: contextResponse.status,
        error_details : errorDetails,
        third_party_response : (ctx.grd!=undefined)?ctx.grd:'No external call',
        logged_on: createdAt
    }
	try{
		await new LOG(logData).save();
	}catch(e){
		console.log(e)
	}
}
module.exports = LOGGER;