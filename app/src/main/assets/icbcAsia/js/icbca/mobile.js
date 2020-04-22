/*
	创建人：		刘磊
	创建时间：	201502
	整体描述：	基础JS，手机客户端协议调用
*/

var divisions = 
{
	"HongKong" : [ {
		"desc:" : "HK",
		"mainURL" : "https://mobilehk.icbc.com.cn/",
		"include" : [ "HK" ]
	} ],
	"Asia" : [ {
		"desc:" : "Asia",
		"mainURL" : "https://icbc-asia.icbc.com.cn/",
		"include" : [ "MO", "JP", "VN" ]
	} ],
	"Europe" : [ {
		"desc:" : "EU",
		"mainURL" : "https://icbc-eu.icbc.com.cn/",
		"include" : [ "ES" ]
	} ],
	"America" : [ {
		"desc:" : "CA",
		"mainURL" : "https://icbc-am.icbc.com.cn/",
		"include" : [ "CA" ]
	} ],
	"Argentina" : [ {
		"desc:" : "AR",
		"mainURL" : "https://icbc-ar.icbc.com.cn/",
		"include" : [ "AR" ]
	} ]
};

var products = 
{
	"Globle" : [ {
		"name" : "Globle",
		"include" : [ "HK", "MO", "JP", "ES" ]
	} ],
	"Canada" : [ {
		"name" : "Canada",
		"include" : [ "CA" ]
	} ],
	"Argentina" : [ {
		"name" : "Argentina",
		"include" : [ "AR" ]
	} ]
};

var multiLanguage = 
{
	"en_US" : {
		"name" : "English",
		"textKey" : "english",
		"packName":"client_en_US",
		"iOSCode": "en_US" ,
	    "AndroidCode": "en_EN"
	},
	"zh_CN" : {
		"name" : "SimplifiedChinese",
		"textKey" : "simplifiedChinese",
		"packName":"client_zh_CN",
		"iOSCode": "en_EN" ,
	    "AndroidCode": "en_EN"
	},
	"zh_TW" : {
		"name" : "TraditionalChinese",
		"textKey" : "traditionalChinese",
		"packName":"client_zh_TW",
		"iOSCode": "en_EN" ,
	    "AndroidCode": "en_EN"
	},
	"es_ES" : {
		"name" : "Spanish",
		"textKey" : "spanish",
		"packName":"client_es_ES",
		"iOSCode": "en_EN" ,
	    "AndroidCode": "en_EN"
	},
	"fr_FR" : {
		"name" : "French",
		"textKey" : "french",
		"packName":"client_fr_FR",
		"iOSCode": "en_EN" ,
	    "AndroidCode": "en_EN"
	}
};

var zones = 
{
	"HK" : [ {
		"zoneCode" : "110",
		"nameKey" : "asia",
		"cnName" : "HongKong",
		"langSupport" : [ "en_US", "zh_CN", "zh_TW" ]
	} ],
	"CA" : [ {
		"zoneCode" : "167",
		"nameKey" : "canada",
		"cnName" : "Canada",
		"langSupport" : [ "en_US", "zh_CN"]
	} ],
	"JP" : [ {
		"zoneCode" : "162",
		"nameKey" : "tokyo",
		"cnName" : "Tokyo",
		"langSupport" : [ "en_US", "zh_CN", "zh_TW" ]
	} ],
	"MO" : [ {
		"zoneCode" : "119",
		"nameKey" : "macao",
		"cnName" : "Macao",
		"langSupport" : [ "en_US", "zh_CN", "zh_TW" ]
	} ],
	"AR" : [ {
		"zoneCode" : "114",
		"nameKey" : "argentina",
		"cnName" : "Argentina",
		"langSupport" :[ "es_ES", "en_US", "zh_CN" ]
	} ]
};

var coder = 
{
	encode : function(varName) {
		return encodeURIComponent(varName);
	},
	decode : function decode(varString) {
		return decodeURIComponent(varString);
	}
};

// ---------------json object for pretty print JSON object or JSON string---------------
var json = {
	prettyPrint_JsonString : function(jsonString) {
		var obj = JSON.parse(jsonString); 
		return JSON.stringify(obj, null, 2);
	},
	prettyPrint_JsonObject : function(jsonObject) {
		var str = JSON.stringify(jsonObject);
		var obj = JSON.parse(str);
		return JSON.stringify(obj, null, 2);
	}
};
// ---------------log object for log every step of web page javaScript processing.---------------
var log = {
	obj : [],
	view : null,
	wrapLenth : null,
	enable : true,
	startTime : null,
	init : function(viewObj) {
		this.setView(viewObj);
		this.setWrapLength(35);
		this.clear();
	},
	initTime : function() {
		this.startTime = (new Date()).getTime();
	},
	logTime : function() {
		if (this.startTime == null) {
			return;
		}
		var d = new Date();
		var timestamp = d.getTime();
		var diff = timestamp - this.startTime;
		this.logString("-------" + this.usedTime(diff) + "  used.-------");
	},
	usedTime : function(resTime) {
		function span(msg, len) {
			var str = msg.toString();
			var diff = len - str.length;
			var s = "";
			var i = 0;
			while (i < diff) {
				s = s + "0";
				i = i + 1;
			}
			return s + str;
		}

		var days = Math.floor(resTime / (24 * 3600 * 1000));
		var temp1 = resTime % (24 * 3600 * 1000); 
		var hours = Math.floor(temp1 / (3600 * 1000));
		var temp2 = temp1 % (3600 * 1000); 
		var minutes = Math.floor(temp2 / (60 * 1000));
		var temp3 = temp2 % (60 * 1000); 
		var seconds = Math.floor(temp3 / 1000);
		var ms = (temp3 % 1000).toString();
		return span(hours, 2) + ":" + span(minutes, 2) + ":" + span(seconds, 2)
				+ ":" + span(ms, 3);
	},

	setView : function(viewObj) {
		this.view = viewObj;
		this.view.innerHTML = "";
	},
	clear : function() {
		this.obj = [];
		if (this.view != null) {
			this.view.innerHTML = "";
		}
	},
	enableLog : function(b) {
		if (b == true) {
			this.enable = true;
		} else {
			this.enable = false;
		}
	},
	checkViewOK : function() {
		if (!this.enable) {
			return false;
		}
		if (this.view == null) {
			var viewObject = document.getElementById("result");
			if (viewObject != null) {
				this.view = viewObject;
				return true;
			}
			return false;
		}
		return true;
	},
	logJsonEncodeData:function(msg){
		  var s=coder.decode(msg);
		  var str = json.prettyPrint_JsonString(s);
		  this.logString(str);
		  this.logTime();
	},
	logString : function(msg) {
		if (!this.checkViewOK()) {
			return;
		}
		var list = this.obj;
		list.push(msg);
		var str = "<pre>" + list.join("\n") + "</pre></td></tr></table>";
		this.view.innerHTML = str;
	},
	logJsonString : function(msg) {
		this.logString(msg);
	},
	log : function(str) {
		if (!this.checkViewOK()) {
			return;
		}
		if (this.wrapLenth == null) {
			this.setWrapLength(35);
		}
		var msg = str;
		if (msg == null || msg == undefined) {
			msg = "null";
			this.logString(msg);
			return;
		}

		if (typeof (msg) == "boolean") {
			if (msg) {
				msg = "true";
			} else {
				(msg = "false");
			}
			this.logString(msg);
			return;
		}
		if (typeof (msg) == "object") {
			this.logString(msg);
			return;
		}
		if (typeof (msg) == "function") {
			this.logString(msg);
			return;
		}
		if (typeof (msg) == "number") {
			this.logString(msg);
			return;
		}
		if (typeof (msg) == "string") {
			if (msg === "") {
				msg = "[emptyString]";
				this.logString(msg);
				return;
			}
		}
		var list = this.obj;
		var width = this.wrapLenth;
		var p = width;
		var b = 0;
		var s = "";
		while (p < msg.length) {
			s = msg.substring(b, p);
			list.push(s);
			b = p;
			p = p + width;
		}
		if (msg.length - p <= 0) {
			b = p - width;
			p = msg.length;
			s = msg.substring(b, p);
			list.push(s);
		}
		var str = "<pre>" + list.join("\n") + "</pre></td></tr></table>";
		this.view.innerHTML = str;
	},
	logLine : function(msg) {
		this.log(msg);
		this.logTime();
	},
	setWrapLength : function(len) {
		this.wrapLenth = len;
	}
};
// ---------------client object for call mobile client code.---------------
var client = {
	needInitTime:true,
	callClient : function(protocolName, paras, onSuccess, onError) {
		if (this.needInitTime){
			log.initTime();
		}
		onSuccess = onSuccess || "defaultSuccess";
		onError = onError || "defaultError";
		var paraList = [];
		paraList.push(
			{
			"paras" : paras,// JSON.stringify(paras),
			"onSuccess" : onSuccess,
			"onError" : onError
		});
		var url = "icbc://" + protocolName + "?"
				+ coder.encode(JSON.stringify(paraList));
		window.location.assign(url);

	},
	// ----------client cache URL utility:----------
	cleanCache : function(onSuccess, onError) {
		this.callClient("cleanCache", null, onSuccess, onError);
	},
	cleanCacheBy : function(regexp, onSuccess, onError) {
		var paras = [];
		paras.push({
			"regexp" : regexp
		});
		this.callClient("cleanCacheBy", paras, onSuccess, onError);
	},
	disableCache : function(onSuccess, onError) {
		this.callClient("disableCache", null, onSuccess, onError);
	},
	enableCache : function(onSuccess, onError) {
		this.callClient("enableCache", null, onSuccess, onError);
	},
	getClientCacheInfo : function(onSuccess, onError) {
		this.callClient("getClientCacheInfo", null, onSuccess, onError);
	},
	updateURL : function(urlList, onSuccess, onError) {
		var paras = [];
		paras.push({
			"urlList" : urlList
		});
		this.callClient("updateURL", paras, onSuccess, onError);
	},
	updateUrlAtBackground : function(onSuccess, onError) {
		var paras = [];
		paras.push({
			"regexp" : regexp
		});
		this.callClient("updateUrlOnBackground", paras, onSuccess, onError);
	},
	updateURLFromServer : function(serverURL, onSuccess, onError) {
		var paras = [];
		paras.push({
			"serverURL" : serverURL
		});
		this.callClient("updateURLFromServer", paras, onSuccess, onError);
	},
	uploadCacheResPackage : function(targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl
		});
		this.callClient("uploadCacheResPackage", paras, onSuccess, onError);
	},
	// ----------client info:----------
	getClientEventHandler : function( onSuccess, onError) {
		this.callClient("getClientEventHandler", null, onSuccess, onError);
	},
	getClientInfo : function(onSuccess, onError) {
		this.callClient("getUserInfo", null, onSuccess, onError);
	},
	getClientParameter : function(paraName,onSuccess, onError) {
		var paras = [];
		paras.push({
			"paraName" : paraName
		});
		this.callClient("getClientParameter", paras, onSuccess, onError);
	},
	getClientSetting : function(onSuccess, onError) {
		this.callClient("getClientSetting", null, onSuccess, onError);
	},
	getDeviceInfo : function(onSuccess, onError) {
		this.callClient("getDeviceInfo", null, onSuccess, onError);
	},
	setClientEventHandler : function(event,doEvent,onSuccess, onError) {
		var paras = [];
		paras.push({
			"event" : event,
			"doEvent" : doEvent
		});
		this.callClient("setClientEventHandler", paras, onSuccess, onError);
	},
	setClientParameter : function(paraName, paraValue, onSuccess, onError) {
		var paras = [];
		paras.push({
			"paraName" : paraName,
			"paraValue" : paraValue
		});
		this.callClient("setClientParameter", paras, onSuccess, onError);
	},	
	// ----------Client UI-------------------
	alert : function(title, msg, onSuccess, onError) {
		var paras = [];
		paras.push({
			"title" : title,
			"msg" : msg
		});
		this.callClient("alert", paras, onSuccess, onError);
	},
	backPage : function(onSuccess, onError) {
		this.callClient("backPage", null, onSuccess, onError);
	},
	confirm : function(title, msg, onSuccess, onError) {
		var paras = [];
		paras.push({
			"title" : title,
			"msg" : msg
		});
		this.callClient("confirm", paras, onSuccess, onError);
	},
	delNavBar : function(barName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"barName" : barName
		});
		this.callClient("delNavBar", paras, onSuccess, onError);
	},
	HideNavBar : function(onSuccess, onErrorr) {
		this.callClient("HideNavBar", null, onSuccess, onError);
	},
	nextPage : function(onSuccess, onError) {
		this.callClient("nextPage", null, onSuccess, onError);
	},

	presendWindow : function(pageUrl, left, top, width, height, displayMode,
			onSuccess, onError) {
		var paras = [];
		paras.push({
			"pageUrl" : pageUrl,
			"left" : left,
			"top" : top,
			"width" : width,
			"height" : height,
			"displayMode" : displayMode
		});
		this.callClient("presendWindow", paras, onSuccess, onError);
	},
	prompt : function(title, msg, onSuccess, onError) {
		var paras = [];
		paras.push({
			"title" : title,
			"msg" : msg
		});
		this.callClient("prompt", paras, onSuccess, onError);
	},
	
	setNavBar : function(barName, title, backOp, backButtonCaption, nextOp,
			nextButtonOp, onSuccess, onError) {
		var paras = [];
		paras.push({
			"barName" : barName,
			"title" : title,
			"backImgs" : backImgs,
			"backOp" : backOp,
			"backButtonCaption" : backButtonCaption,
			"nextOp" : nextOp,
			"nextButtonOp" : nextButtonOp
		});
		this.callClient("setNavBar", paras, onSuccess, onError);
	},
	setNavBarStyle : function(barName, style, onSuccess, onError) {
		var paras = [];
		paras.push({
			"barName" : barName,
			"style" : style
		});
		this.callClient("setNavBarStyle", paras, onSuccess, onError);
	},
	showNavBar : function(barName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"barName" : barName
		});
		this.callClient("showNavBar", paras, onSuccess, onError);
	},
	// ----------Data processing---------------
	clearAllData : function(onSuccess, onError) {
		this.callClient("clearAllData", null, onSuccess, onError);
	},
	clearData : function(dataName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"dataName" : dataName
		});
		this.callClient("clearData", paras, onSuccess, onError);
	},
	getAllData:function(onSuccess, onError){
		this.callClient("getAllData",null,onSuccess, onError);
	},
	loadData : function(dataName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"dataName" : dataName,
		});
		this.callClient("loadData", paras, onSuccess, onError);
	},
	saveData : function(dataName, dataValue, onSuccess, onError) {
		var paras = [];
		paras.push({
			"dataName" : dataName,
			"dataValue" : dataValue
		});
		this.callClient("saveData", paras, onSuccess, onError);
	},
	// ----------------client launch :------------------
	init : function(onSuccess, onError) {
		var paras = [];
		paras.push({
			"divisions" : divisions,
			"products" : products,
			"zones" : zones,
			"multiLanguage" : multiLanguage
		});
		this.callClient("init", paras, onSuccess, onError);
		return desc;
	},
	loadRootPage : function(pageUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"pageUrl" : pageUrl
		});
		this.callClient("loadRootPage", paras, onSuccess, onError);
	},
	restoreCacheResFile : function(onSuccess, onError) {
		this.callClient("restoreCacheResFile", null, onSuccess, onError);
	},	

	// ----------Security utility:----------
	login : function(loginType, loginParas, onSuccess, onError) {
		var paras = [];
		paras.push({
			"loginType" : loginType,
			"loginParas" : loginParas,
		});
		this.callClient("login", paras, onSuccess, onError);
	},
	safeRequest : function(targetUrl, paraList, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
			"paraList" : paraList
		});
		this.callClient("safeRequest", paras, onSuccess, onError);
	},
	setKey : function(publickKey, privateKey, onSuccess, onError) {
		var paras = [];
		paras.push({
			"publicKey" : publickKey,
			"privateKey" : privateKey
		});
		this.callClient("setKey", paras, onSuccess, onError);
	},
	// ---------client supprot -----------
	getScreenList : function(onSuccess, onError) {
		this.callClient("getScreenList", null, onSuccess, onError);
	},
	saveScreen : function(fileName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"fileName" : fileName,
		});
		this.callClient("saveScreen", paras, onSuccess, onError);
	},
	startLog : function(onSuccess, onError) {
		this.callClient("startLog", null, onSuccess, onError);
	},
	stopLog : function(onSuccess, onError) {
		this.callClient("stopLog", null, onSuccess, onError);
	},
	uploadClientErrors : function(targetUrl, onSuccess,
			onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
		});
		this.callClient("uploadClientErrors", paras, onSuccess, onError);
	},
	uploadLog : function(targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl
		});
		this.callClient("uploadLog", paras, onSuccess, onError);
	},
	uploadScreen : function(fileName,targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"fileName" : fileName,
			"targetUrl" : targetUrl
		});
		this.callClient("uploadScreen", paras, onSuccess, onError);
	},
	saveFile : function(fileName,targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"fileName" : fileName,
			"targetUrl" : targetUrl
		});
		this.callClient("saveFile", paras, onSuccess, onError);
	},
	savePicture : function(fileName,targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
		"fileName" : fileName,
		"targetUrl" : targetUrl
		});
		this.callClient("savePicture", paras, onSuccess, onError);
	},
	removeFile : function(targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
		"targetUrl" : targetUrl
		});
		this.callClient("removeFile", paras, onSuccess, onError);
	},
	// ----------Client functional utility:----------
	dial : function(phoneNumber, onSuccess, onError) {
		var paras = [];
		paras.push({
			"phoneNumber" : phoneNumber,
		});
		this.callClient("dial", paras, onSuccess, onError);
	},
	getContactList : function(onSuccess, onError) {
		this.callClient("getContactList", null, onSuccess, onError);
	},
	pickPhoto : function(targetUrl, purpose, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
			"purpose" : purpose
		});
		this.callClient("pickPhoto", paras, onSuccess, onError);
	},
	scanCode : function(targetUrl, purpose, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
			"purpose" : purpose
		});
		this.callClient("scanCode", paras, onSuccess, onError);
	},
	scanCheckBase64: function(onSuccess, onError) {
		this.callClient("scanCheckBase64", null, onSuccess, onError);
	},
	
	screenLock: function(onSuccess, onError) 
	{
		this.callClient("screenLock", null, onSuccess, onError);
	},
	sendSMS : function(msg, phoneNumber, onSuccess, onError) {
		var paras = [];
		paras.push({
			"msg" : msg,
			"phoneNumber" : phoneNumber
		});
		this.callClient("sendSMS", paras, onSuccess, onError);
	},
	sendEmail : function(title, rec, copy, body, onSuccess, onError) {
		var paras = [];
		paras.push({
			"title" : title,
			"rec" : rec,
			"copy" : copy,
			"body" : body
		});
		this.callClient("sendEmail", paras, onSuccess, onError);
	},
	takePhoto : function(targetUrl, purpose, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
			"purpose" : purpose
		});
		this.callClient("takePhoto", paras, onSuccess, onError);
	},
	uploadImage : function(targetUrl, photoName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl,
			"photoName" : photoName,
		});
		this.callClient("uploadImage", paras, onSuccess, onError);
	},
	getContactJson : function(onSuccess, onError) {
		this.callClient("getContactJson", null, onSuccess, onError);
	},
	getStreamImage : function(photoName, onSuccess, onError) {
		var paras = [];
		paras.push({
			"photoName" : photoName
		});
		this.callClient("getStreamImage", paras, onSuccess, onError);
	},
	getLangForKey : function(key, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"key" : key,
		});
		this.callClient("getLangForKey", paras, onSuccess, onError);
	},
	
	getZoneAndLang : function(onSuccess, onError)
	{
		this.callClient("getZoneAndLang", null, onSuccess, onError);
	},
	saveZoneAndLang : function(zoneCode, langCode, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"zoneCode" : zoneCode,
			"langCode" : langCode,
		});
		this.callClient("saveZoneAndLang", paras, onSuccess, onError);
	},
	
	openApp : function(urlScheme, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"urlScheme" : urlScheme,
		});
		
		this.callClient("openApp", paras, onSuccess, onError);
	},
	callSafeInput : function(id, inputID,length, onSuccess, onError)
	{
		var input = document.getElementById(inputID);
		if(id == "login"){
			input = document.getElementById("loginBtn");
			id = "0";
		}
		var top = this.offset(input).top;
		var Height = input.offsetHeight;
		var safeInputParam = inputID+';'+id+';'+length+';'+(top+Height);
		var paras = [];
		paras.push({
		            "safeInputParam" : safeInputParam,
		});
		
		this.callClient("callSafeInput", paras, onSuccess, onError);
	},
	callSafeInputByFunc : function(id, inputID,length,funcName, onSuccess, onError)
	{
		var input = document.getElementById(inputID);
		if(id == "login"){
			input = document.getElementById("loginBtn");
			id = "0";
		}
		var top = this.offset(input).top;
		var Height = input.offsetHeight;
		var safeInputParam = inputID+';'+id+';'+length+';'+(top+Height);
		var paras = [];
		paras.push({
		            "safeInputParam" : safeInputParam,
		            "funcName":funcName
		});
		
		this.callClient("callSafeInputByFunc", paras, onSuccess, onError);
	},
	callNumberKeyboard : function(curInputIdNum, curInputId, maxLength, isShowDot, isShowFinish, onSuccess, onError)
	{
		var input = document.getElementById(curInputId);
		var top = this.offset(input).top;
		var Height = input.offsetHeight;
		var paras = [];
		paras.push({
		            "curInputId"	:curInputIdNum,
		            "maxLength"		:maxLength,
		            "pageOffset"	:(top+Height),
		            "isShowDot"		:isShowDot,
		            "isShowFinish"	:isShowFinish
		});
		
		this.callClient("callNumberKeyboard", paras, onSuccess, onError);
	},
	callNumberKeyboardByFunc : function(curInputIdNum, curInputId, maxLength, isShowDot, isShowFinish, funcName, onSuccess, onError)
	{
		var input = document.getElementById(curInputId);
		var top = this.offset(input).top;
		var Height = input.offsetHeight;
		var paras = [];
		paras.push({
		            "curInputId"	:curInputIdNum,
		            "maxLength"		:maxLength,
		            "pageOffset"	:(top+Height),
		            "isShowDot"		:isShowDot,
		            "isShowFinish"	:isShowFinish,
		            "funcName"		:funcName
		});
		
		this.callClient("callNumberKeyboardByFunc", paras, onSuccess, onError);
	},
	showTabBar : function(showFlag, tabBarUrl, onSuccess, onError)
	{
		var paras = [];
		paras.push({
					"showFlag" : showFlag,
		            "tabBarUrl" : tabBarUrl,
		});
	
		this.callClient("showTabBar", paras, onSuccess, onError);
	},
	
	checkUpdate : function(onSuccess, onError)
	{
		this.callClient("checkUpdate", null, onSuccess, onError);
	},
	
	activePage : function(pageUrlStr, onSuccess, onError)
	{
		var paras = [];
		paras.push({
		            "pageUrlStr" : pageUrlStr,
		});
				
		this.callClient("activePage", paras, onSuccess, onError);
	},
	
	checkClientMode : function(userId, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"userId" : userId
		});
		
		this.callClient("checkClientMode", paras, onSuccess, onError);
	},
	
		viewPDF : function(pdfUrl, pdfName, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"pdfUrl" : pdfUrl,
			"pdfName" : pdfName	
		});
		
		this.callClient("viewPDF", paras, onSuccess, onError);
	},
	
	exitAPP : function(onSuccess, onError)
	{
		this.callClient("exitAPP", null, onSuccess, onError);
	},
	
	outLink : function(outLinkUrl, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"outLinkUrl" : outLinkUrl	
		});
		
		this.callClient("outLink", paras, onSuccess, onError);
	},
	
	setK2 : function(K2, onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"K2" : K2	
		});
		
		this.callClient("setK2", paras, onSuccess, onError);
	},

	
	offset : function(ele) {
	    var top = ele.offsetTop;
	    var left = ele.offsetLeft;
	    while (ele.offsetParent) {
	        ele = ele.offsetParent;
	        if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
	            top += ele.offsetTop;
	            left += ele.offsetLeft;
	        } else {
	            top += ele.offsetTop + ele.clientTop;
	            left += ele.offsetLeft + ele.clientLeft;
	        }
	    }
	    return {
	        left: left,
	        top: top
	    }
	},
	
	openHCEApp : function(onSuccess, onError)
	{
		this.callClient("openHCEApp", null, onSuccess, onError);
	},
	
		changePhoto : function(targetUrl, photoName,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl ,
			"photoName" : photoName
		});
		
		this.callClient("changePhoto", paras, onSuccess, onError);
	},
	userGuide : function(onSuccess, onError)
	{
		this.callClient("userGuide", null, onSuccess, onError);
	},
	openAdv : function(advUrl,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"advUrl" : advUrl
		});
		this.callClient("openAdv", paras, onSuccess, onError);
	},
	getGZFollowedList:function(onSuccess, onError){
		this.callClient("getGZFollowedList", null, onSuccess, onError);
	},
	
	getGZMessageDetailList:function(onSuccess, onError){
		this.callClient("getGZMessageDetailList", null, onSuccess, onError);
	},
	
	followGZ : function(followID,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"followID" : followID
		});
		this.callClient("followGZ", paras, onSuccess, onError);
	},
	
	checkIMLiteState : function(onSuccess, onError)
	{
		this.callClient("checkIMLiteState", null, onSuccess, onError);
	},
	
	startIMLiteChat : function(contactID,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"contactID" : contactID
		});
		this.callClient("startIMLiteChat", paras, onSuccess, onError);
	},
	
	initIMLite : function(phoneNumber,defaultList,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"phoneNumber" : phoneNumber,
			"defaultList" : defaultList
		});
		this.callClient("initIMLite", paras, onSuccess, onError);
	},
	
	share : function(targetAPP,targetUrl,imageUrl,title,description,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"targetAPP" : targetAPP,
			"targetUrl" : targetUrl,
			"imageUrl":imageUrl,
			"title" : title,
			"description" : description
		});
		this.callClient("share", paras, onSuccess, onError);
	},
	
	acceptAgreement : function(onSuccess, onError)
	{
		this.callClient("acceptAgreement", null, onSuccess, onError);
	},
	
	getIMLitePhone:function(onSuccess, onError){
		this.callClient("getIMLitePhone", null, onSuccess, onError);
	},
	requestSecureModlue : function(param,onSuccess, onError)
	{
		var paras = [];
		paras.push({"secTransType":param});
		
		this.callClient("requestSecureModule", paras, onSuccess, onError);
	},
	
	scanQrCode : function(param,onSuccess, onError)
	{
		var paras = [];
		paras.push({"flag":param});
		this.callClient("scanQrCode", paras, onSuccess, onError);
	},
	
	returnQrCode : function(QRCODE,APP_SHORTNAME,appName,androidAppId,iOSAppId,androidUrl,iOSUrl,message,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"QRCODE":QRCODE,
			"APP_SHORTNAME" : APP_SHORTNAME,
			"appName" : appName,
			"androidAppId" : androidAppId,
			"iOSAppId" : iOSAppId,
			"androidUrl" : androidUrl,
			"iOSUrl" : iOSUrl,
			"message" : message
		});
		this.callClient("returnQrCode", paras, onSuccess, onError);
	},
	
	shareImg : function(targetAPP,title,imgURL,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"targetAPP" : targetAPP,
			"title" : title,
			"imgURL" : imgURL
		});
		this.callClient("shareImg", paras, onSuccess, onError);
	},
	saveToAlbum : function(imgURL,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"imgURL" : imgURL
		});
		this.callClient("saveToAlbum", paras, onSuccess, onError);
	},
	macaoMall : function(hotUrl,onSuccess, onError)
	{
		var paras = [];
		paras.push({
			"targetUrl" : hotUrl
		});
		this.callClient("macaoMall", paras, onSuccess, onError);
	},
	loadImportQRCode: function(onSuccess, onError)
	{
		this.callClient("loadImportQRCode", null, onSuccess, onError);
	},
	openAgreement:function(title,url, onSuccess, onError){
		var paras = [];
		paras.push({
			"title":title,
			"agreementUrl":url
		});
		this.callClient("openAgreement", paras, onSuccess, onError);
	},
	openEshopMall : function(targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl
		});
		this.callClient("openEshopMall", paras, onSuccess, onError);
	},
	closeEshopMall : function(onSuccess, onError) {
		this.callClient("closeEshopMall", null, onSuccess, onError);
	},
	
	loginEshopMall : function(targetUrl, onSuccess, onError) {
		var paras = [];
		paras.push({
			"targetUrl" : targetUrl
		});
		this.callClient("loginEshopMall", paras, onSuccess, onError);
	},
	sessionKeepEshopMall : function(sessionId, onSuccess, onError) {
		var paras = [];
		paras.push({
			"sessionId" : sessionId
		});
		this.callClient("sessionKeepEshopMall", paras, onSuccess, onError);
	},
	TUgetVersion : function(param, onSuccess, onError) {
		var paras = [];
		paras.push({"flag" : param});
		this.callClient("TUgetVersion", paras, onSuccess, onError);
	},
	TUscanDocument : function(param, onSuccess, onError) {
		var paras = [];
		paras.push({"flag" : param});
		this.callClient("TUscanDocument", paras, onSuccess, onError);
	},
	TUscanLivenessSelfie : function(param, onSuccess, onError) {
		var paras = [];
		paras.push({"flag" : param});
		this.callClient("TUscanLivenessSelfie", paras, onSuccess, onError);
	},
	returnClientPage: function(para, onSuccess, onError) {
		var paras = [];
		paras.push(para);
		this.callClient("returnClientPage", paras, onSuccess, onError);
	},
	defaultSuccess : function(){},
	
	defaultError : function(){}
};