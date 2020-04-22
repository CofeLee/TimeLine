function submitFormBack(arg,certType){
    try {
		var formName=arg.attachData[0];
		var submitParamValue=arg.attachData[1];
		var backAnim=arg.attachData[2];
        var formSelect = "form[name=" + formName + "]";
        
        if(submitParamValue == "" || submitParamValue == undefined){
        	submitParamValue = "1";
        }
         //iphone
	     jQuery("input[name='returnMenu']").val(submitParamValue);
         if(certType != "" && certType == "1"){
            jQuery(formSelect).submit();
         }else if(certType != "" && certType == "3"){
            //Android
           if(submitParamValue  == "1"){
        	     Native.returnMenu();
	        }
	        else if(submitParamValue == "2"){
	        	Native.returnLogin();
	        }
	        else if(submitParamValue == "3"){
	        	Native.returnBack();
	        }
	        else{
	        	Native.returnMenu();
	        }
         }
    } 
    catch (e) {
        alert(e);
        console.log("Error: " + e);
    }
}

function directivePaging() {
    return {
        restrict: 'E',
        template: '',
        replace: true,
        link: function(scope, element, attrs) {
            scope.$watch('numPages', function(value) {
                scope.pages = [];
                for (var i = 1; i <= value; i++) {
                    scope.pages.push(i);
                }
                if (scope.currentPage > value) {
                    scope.selectPage(value);
                }
            });
            scope.isActive = function(page) {
                return scope.currentPage === page;
            };
            scope.selectPage = function(page) {
                if (!scope.isActive(page)) {
                    scope.currentPage = page;
                    scope.onSelectPage(page);
                }
            };
            scope.selectPrevious = function() {
                if (!scope.noPrevious()) {
                    scope.selectPage(scope.currentPage - 1);
                }
            };
            scope.selectNext = function() {
                if (!scope.noNext()) {
                    scope.selectPage(scope.currentPage + 1);
                }
            };
            scope.noPrevious = function() {
                return scope.currentPage == 1;
            };
            scope.noNext = function() {
                return scope.currentPage == scope.numPages;
            };

        }
    };
}


function isEmpty(v){
	return null==v || ''==v;
}

function getCcyType(ccy){
	var ccyObj={
		"GBP":"012",
		"HKD":"013",
		"USD":"014",
		"CHF":"015",
		"SGD":"018",
		"SEK":"021",
		"DKK":"022",
		"NOK":"023",
		"JPY":"027",
		"CAD":"028",
		"AUD":"029",
		"EUR":"038",
		"MOP":"081",
		"NZD":"087",
		"KRW":"103",
		"TWD":"107",
		"MYR":"032",
		"CNY":"001",
		"VND":"064",
		"KZT":"089",
		"SAR":"091",
		"AED":"092",
		"QAR":"093",
		"PHP":"082",
		"THB":"084",
		"IDR":"101",
		"INR":"085",
		"XAU":"801",
		"XAG":"803",
		"XPT":"805",
		"PKR":"019",
		"CNH":"701",
		"AUG":"901",
		"AGG":"903",
		"PTG":"905",
		"KHR":"122",
		"LAK":"123",
		"PGS":"921",
		"KWD":"104"
	};
	for(var p in ccyObj){
		if(p==ccy){return ccyObj[p];}
	}
	return "";
}

function getTranJournalStr(transCode,outAccountNo,inAccountNo,transAmount,currType,refNo,errcode){
	var transAmounts=parseFloat(transAmount).toFixed(2)*100;
	if(outAccountNo.indexOf("0000")==0){
		outAccountNo=outAccountNo.substring(4);
	}
	
	var str="transCode="+transCode+
	"|outAccountNo="+outAccountNo+
	"|inAccountNo="+inAccountNo+
	"|transAmount="+transAmounts+
	"|currType="+getCcyType(currType)+
	"|refNo="+refNo+
	"|errcode="+errcode;
	
	return str;
}

function getWmsDocUrl(docType){
	var url ='';
	if(docType == '1') {
		url='http://www.icbcasia.com/ICBC/海外分行/工银亚洲/TC/IB/Risk_Disclosure_EN.htm';
	}else if(docType == '2') {
		url='http://www.icbcasia.com/ICBC/海外分行/工银亚洲/TC/IB/Risk_Disclosure_CN.htm';
	}else{
		url='http://www.icbcasia.com/ICBC/海外分行/工银亚洲/TC/IB/Risk_Disclosure.htm';
	}
	location.href=url+"?openSafari=1";
}

function isValidTransferAmount(strAmountValue,len) {
	var arrNos = strAmountValue.toString().split(".");
	if(arrNos.length==2) {
		if(arrNos[1].length > len) {
			return false;
		}
	}
	return true;
}

function isValidBillAmount(param) {
	var number = /^[0-9]*[.]?[0-9]+$/;
	if(!number.test(param)) {
		return false;
	}
	return true;
}

function isValidInteger(param) {
	var number = /^[0-9]*[1-9][0-9]*$/;
	if(!number.test(param)) {
		return false;
	}
	return true;
}

function getOverRate(ranking){
	var rates=['60%', '50%', '40%', '30%','20%'];
	var index = parseInt(ranking)-1;
	return rates[index];
}

function setCheckBoxState(id){
	var ele=$(id);
	if(ele.is(":checked")){
		ele.prop("checked",false);
	}else{
		ele.prop("checked",true);
	}
}

function isInteger(b){
	for(var a=0;a<b.length;a++){
		var c=b.charAt(a);
		if((a==0)&&(c=="+"||c=="-")){
			continue;
		}
		if(c<"0"||c>"9"){
			return false;
		}
	}
	return true;
}

function setDisabled(id){
	var ele=$(id);
	ele.attr("disabled",true);
	ele.css("background","#CCCCCC");
}

function recoverDisabled(id){
	var ele=$(id);
	ele.removeAttr("disabled");
	ele.css("background","#FF7B7B");
}

function isDisabled(id){
	var ele=$(id);
	if(ele.attr("disabled")=="disabled"){
		return true;
	}else{
		return false;
	}
}

function formatPhoneNumber(phoneNumber){
	if(!phoneNumber){return phoneNumber;}
	if(phoneNumber.length>4) {
		return phoneNumber.substring(0,phoneNumber.length-4)+"****";
	}else{
		return phoneNumber;
	}
}

function formatEmail(email){
	if(!!email && email.indexOf("@")!==-1) {
		var index=email.indexOf("@");
		var emailName=email.substring(0,index);
		var emailSuffix=email.substring(index,email.length);
		
		if(emailName.length>=4) {
			emailName=emailName.substring(0,emailName.length-4)+"****";
			return emailName+emailSuffix;
		} else {
			var newName="";
			for(var i=0;i<emailName.length;i++) {
				newName+="*";
			}
			return newName+emailSuffix;
		}
	} else {
		return email;
	}
}

function formatAmt(amt){
	if((!amt)||(!/^[1-9]|[0-9]*$/.test(amt.toString())))
	{
		return amt;
			}else{
				amt=amt.toString();
				amt=parseFloat(amt).toFixed(4);
				var num=amt.split(".");
				return num[0].replace(/[^\d]/g,"").replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g,"$1,")+"."+num[1].substring(0,2);
			}
}

function UnformatAmt(amt){
	if(!amt){return amt;}
	return amt.replace(/[\,]/g,"");
}