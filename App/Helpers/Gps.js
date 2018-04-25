/**
    ____               _  __                                __   __     _         __             __                   __     _  __ 
   / __ \ ____   ____ ( )/ /_   ___  _   __ ___   ____     / /_ / /_   (_)____   / /__   ____ _ / /_   ____   __  __ / /_   (_)/ /_
  / / / // __ \ / __ \|// __/  / _ \| | / // _ \ / __ \   / __// __ \ / // __ \ / //_/  / __ `// __ \ / __ \ / / / // __/  / // __/
 / /_/ // /_/ // / / / / /_   /  __/| |/ //  __// / / /  / /_ / / / // // / / // ,<    / /_/ // /_/ // /_/ // /_/ // /_   / // /_  
/_____/ \____//_/ /_/  \__/   \___/ |___/ \___//_/ /_/   \__//_/ /_//_//_/ /_//_/|_|   \__,_//_.___/ \____/ \__,_/ \__/  /_/ \__/  

 */
'use strict'
require('dotenv').config();
const moment= require('moment');
const ENV 	= process.env;
const soap 	= require('node-wsdl');
var gpsResp	= [];
var log		= {"msg":"","errors":"","source":"GPS-Adapter","result":""}
const GPS 	= {
	async customerEnquiry(accountType,input,next){
		var gResp = [];
		var conf  = await GPS.configureBy(accountType);
		return await new Promise(async function(resolve, reject) {
			input.IssCode = conf.GPS_ISS_CODE;
			input.LocDate = moment().format('YYYY-MM-DD');
			input.LocTime = moment().format('HHMMSS');
			input.WSID 	  = Math.floor((Math.random() * 9999) + 1)+Date.now();
			await soap.createClient(conf.GPS_URL, function(err, client) {
				if (err) {
					log.msg = "Error creating soap client";
					log.errors = err;
					reject(log);
					return log;
				} else {
					client.addSoapHeader({"hyp:AuthSoapHeader":{"hyp:strUserName":conf.GPS_USER,"hyp:strPassword":conf.GPS_PASS}});
					try{
						client.Ws_Customer_Enquiry_V2(input,
							function(errorDetails, result) {
								var gpsResponse = result.Ws_Customer_Enquiry_V2Result;
								gResp.push(gpsResponse);
								resolve(gResp);
						});
					}catch(errorDetails){
						log.msg = "Error connecting GPS for Ws_Customer_Enquiry_V2";
						log.errors = errorDetails;
						reject(log);
						return log;
					}
				}
				return gResp;
			});
		}).then(function(values) {
			log.msg = "Ws_Customer_Enquiry_V2 successfully processed";
			log.result = values;
			return values;
			next();
		});
	},
	async createCard(accountType,input,next){
		var conf = GPS.configureBy(accountType);
		return await new Promise(async function(resolve, reject) {
			input.LocDate 	= moment().format('YYYY-MM-DD');
			input.LocTime 	= moment().format('HHMMSS');
			input.WSID 	  	= Math.floor((Math.random() * 9999) + 1)+Date.now();
			input.IssCode 	= conf.GPS_ISS_CODE;
			await soap.createClient(conf.GPS_URL, function(err, client) {
				if (err) {
					log.msg = "Error creating soap client";
					log.errors = err;
					reject(log);
					return log;
				} else {
					client.addSoapHeader({"hyp:AuthSoapHeader":{"hyp:strUserName":conf.GPS_USER,"hyp:strPassword":conf.GPS_PASS}});
					try{
						client.Ws_CreateCard(input,
							function(errorDetails, result) {
								var gpsResponse = result.Ws_CreateCardResult;
								gpsResp = gpsResponse;
								resolve(gpsResp);
						});
					}catch(errorDetails){
						log.msg = "Error connecting GPS for Ws_CreateCard";
						log.errors = errorDetails;
						reject(log);
						return log;
					}
				}
				return gpsResp;
			});
		}).then(function(values) {
			log.msg = "Ws_CreateCard successfully processed";
			log.result = values;
			return values;
			next();
		});
	},
	async createWallet(accountType,input,next){
		var conf = GPS.configureBy(accountType);
		return await new Promise(async function(resolve, reject) {
			input.IssCode = conf.GPS_ISS_CODE;
			input.LocDate = moment().format('YYYY-MM-DD');
			input.LocTime = moment().format('HHMMSS');
			input.WSID 	  = Math.floor((Math.random() * 9999) + 1)+Date.now();
			await soap.createClient(conf.GPS_URL, function(err, client) {
				if (err) {
					log.msg = "Error creating soap client";
					log.errors = err;
					reject(log);
					return log;
				} else {
					client.addSoapHeader({"hyp:AuthSoapHeader":{"hyp:strUserName":conf.GPS_USER,"hyp:strPassword":conf.GPS_PASS}});
					try{
					client.Ws_CreateWallet(input,
					 function(errorDetails, result) {
						var gpsResponse = result.Ws_CreateWalletResult;
						gpsResp.push(gpsResponse);
						resolve(gpsResp);
					});
					}catch(errorDetails){
						log.msg = "Error connecting GPS for Ws_CreateWallet";
						log.errors = errorDetails;
						reject(log);
						return log;
					}
				}
				return gpsResp;
			});
		}).then(function(values) {
			log.msg = "Ws_CreateWallet successfully processed";
			log.result = values;
			return values;
			next();
		});
	},
	async changeStatus(accountType,input,next){
		var conf = GPS.configureBy(accountType);
		return await new Promise(async function(resolve, reject) {
			input.IssCode = conf.GPS_ISS_CODE;
			input.LocDate = moment().format('YYYY-MM-DD');
			input.LocTime = moment().format('HHMMSS');
			input.WSID 	  = Math.floor((Math.random() * 9999) + 1)+Date.now();
			await soap.createClient(conf.GPS_URL, function(err, client) {
				if (err) {
					log.msg = "Error creating soap client";
					log.errors = err;
					reject(log);
					return log;
				} else {
					client.addSoapHeader({"hyp:AuthSoapHeader":{"hyp:strUserName":conf.GPS_USER,"hyp:strPassword":conf.GPS_PASS}});
					try{
						client.Ws_StatusChange(input,
							function(errorDetails, result) {
								gpsResp = result.Ws_StatusChangeResult;
								resolve(gpsResp);
						});
					}catch(errorDetails){
						log.msg = "Error connecting GPS for Ws_ChangeStatus";
						log.errors = errorDetails;
						reject(log);
						return log;
					}
				}
				return gpsResp;
			});
		}).then(function(values) {
			log.msg = "Ws_ChangeStatus successfully processed";
			log.result = values;
			return values;
			next();
		});
	},
	async accountEnquiry(accountType,input,next){
		var conf = GPS.configureBy(accountType);
		return await new Promise(async function(resolve, reject) {
			input.IssCode 	= conf.GPS_ISS_CODE;
			input.LocDate 	= moment().format('YYYY-MM-DD');
			input.LocTime 	= moment().format('HHMMSS');
			input.WSID 	  	= Math.floor((Math.random() * 9999) + 1)+Date.now();
			input.TxnCode 	= 4;
			input.itemSrc 	= 2;
			input.AuthType 	= 1;
			input.GetLimits = 1;
			await soap.createClient(conf.GPS_URL, function(err, client) {
				if (err) {
					log.msg = "Error creating soap client";
					log.errors = err;
					reject(log);
					return log;
				} else {
					client.addSoapHeader({"hyp:AuthSoapHeader":{"hyp:strUserName":conf.GPS_USER,"hyp:strPassword":conf.GPS_PASS}});
					try{
						client.Ws_Balance_Enquiry(input,
							function(errorDetails, result) {
								gpsResp = result.Ws_Balance_EnquiryResult;
								resolve(gpsResp);
						});
					}catch(errorDetails){
						log.msg = "Error connecting GPS for Ws_Balance_Enquiry";
						log.errors = errorDetails;
						reject(log);
						return log;
					}
				}
				return gpsResp;
			});
		}).then(function(values) {
			log.msg = "Ws_Balance_Enquiry successfully processed";
			log.result = values;
			return values;
			next();
		});
	},
	configureBy(accountType){
		var conf = {};
		if(accountType == 2){
			conf.GPS_URL	 = ENV.NVAYO_URL;
			conf.GPS_USER	 = ENV.NVAYO_USER;
			conf.GPS_PASS	 = ENV.NVAYO_PASS;
			conf.GPS_ISS_CODE= ENV.NVAYO_ISS_CODE;
		}else{
			conf.GPS_URL	 = ENV.AURAE_URL;
			conf.GPS_USER	 = ENV.AURAE_USER;
			conf.GPS_PASS	 = ENV.AURAE_PASS;
			conf.GPS_ISS_CODE= ENV.AURAE_ISS_CODE;
		}
		return conf;
	}
}
module.exports = GPS;