var sessCtx={"certType":"0","Pub_PhoneCode":"91376437","pub_email":"BIANXING@BIAN.XING","ieu":"zh-CN",
	"BranchSessionData":{"custType":"0","MEDIUMID":"866036001889"},
	"static_pass_MinLength":"4",
	"static_pass_MaxLength":"30",
	"static_pass_Rule":"10111",
	"static_pass_randomId":"140152972169115",
	"static_pass_vLen":"4",
	"dse_sessionId":"fromSimulatorFRdUM-23735"	
};

var addCfmFormParam = {		
		"debitAccount":null,
		"merchantCode":null,
		"btCd":null,
		"txtBillAccount":null,
		"billTypeCode":null,
		"txtAmount":null,
		"txtAmt":null,
		"TINYPAYFLG":null,
		"typeFlag":null,
		"medtype":null,
		"mcNameText":null,
		"btNameText":null,
		"labelNameText":null,
		"billAccountText":null,
		"txtBillAccountText":null,
		"amountText":null,
		"operation":null,
		"txtRemarkText":null,
		"paymentDate":null,
		"outAccount":null,
		"hostcode":null,
		"accType":null,
		"labelName":null,
		"highRisk":null,
		"netCode":null,
		"outproductid":null,
		"outproductno":null,
		"outsubproductid":null,
		"outsubproductno":null,
		"prodtype":null,
		"prodseno":null,
		"protseno":null,
		"trantype":null,
		"isSubEnc":null		
};

var updateData = {
		"userRef":null,
		"drAc":null,
		"amt":null,
		"mcode":null,
		"billNo":null,
		"btCd":null,
		"hostCd":null,
		"accType":null,
		"labelName":null,
		"isUpdate":null,
		"operation":null		
};

var dse_sessionId = null;
var WBDate = '';
var operation = null;
//var ajaxHead = "/servlet/aforward?cArea=0110&certType=3&MenuID=1613&dse_sessionId=fromSimulatorFRdUM-23735&url=/mobilebank";
var isUpdate = null;
//var dse_locale = APP.getHtmlParameters("dse_locale");
//var dse_sessionId = APP.getHtmlParameters("dse_sessionId");
var dse_locale = "zh-CN";
var dse_sessionId = "fromSimulatorFRdUM-23735";
var postUrl = "/servlet/forward"; //可以检查密码器，表单提交
var ajaxHead = "/servlet/aforward?dse_sessionId=" + dse_sessionId + "&url=/mobilebank";
var urlHead = "/servlet/forward?dse_sessionId=" + dse_sessionId+ "&url=";
var contextPath = "/mobilebank";


(function(){
	var app = angular.module('paymentRegBill', ['ngRoute','pascalprecht.translate']);

	app.config(function($routeProvider,$locationProvider,$translateProvider){		
		$locationProvider.html5Mode(false);
		$translateProvider.preferredLanguage(dse_locale);
		$translateProvider.useStaticFilesLoader({
			prefix:"/icbcAsia/i18n/payment/",
			suffix:".json"
		});
		$translateProvider.useSanitizeValueStrategy("escapeParameters");
		$routeProvider.when('/inputBill/',{
			templateUrl:'/icbcAsia/views/payment/payment_bill_input.html',
			controller:'inputBillController'
		});
		$routeProvider.when('/custTypeErr/',{
			templateUrl:'/icbcAsia/views/payment/cust_type_err.html',
			controller:'custTypeErrorController'
		});
		$routeProvider.when('/error/',{
			templateUrl:'/icbcAsia/views/payment/error.html',
			controller:'errorController'
		});
		//确认页路由配置
		$routeProvider.when('/inputBillCfm/',{
			templateUrl:'/icbcAsia/views/payment/payment_bill_input_cfm.html',
			controller:'cfmAppController'
		});
		//结果页路由配置		
		$routeProvider.when('/inputBillRes/',{
			templateUrl:'/icbcAsia/views/payment/payment_bill_res.html',
			controller:'resAppController'
		});
	});
	
	app.controller('paymentBillRegController', function($rootScope,$scope,$http,$location,$routeParams,$translate) {
		//获取页面		
		$rootScope.certType=sessCtx.certType;			
		console.log("updateData.isUpdate: " + updateData.isUpdate);
		if(updateData.isUpdate=="Y" || updateData.operation=="TP"){
			$rootScope.isUpdate='Y';
			$rootScope.updateData={
	                txtRemark : updateData.userRef,
	                outAccount : updateData.drAc,
	                txtAmount : updateData.amt,
	                merchantCode : updateData.mcode,
	                txtBillAccount : updateData.billNo,
	                btCd : updateData.btCd,
	                hostcode : updateData.hostCd,
	                accType : updateData.accType,
				    labelName : updateData.labelName,
				    ref : updateData.ref
			};
		}else{
			$rootScope.isUpdate='N';
		}		
		$location.path('/inputBill/').replace();
	});

	app.controller('customersCtrl', function($scope, $http) {

		//paymentBill页面方法
		$scope.paymentBill = function(){
			// var form = $("form[name=paymentBillForm]")[0];
			// form.submit();
			$location.path('/payment_bill_init/').replace();
		};
		$scope.paymentTemp = function(){
			// var form = $("form[name=paymentTempForm]")[0];
			// form.submit();
		};
		$scope.cardBillRegs = function(){
			// var form = $("form[name=cardBillRegsForm]")[0];
			// form.submit();
		};		

		$scope.goBack = function(){
			submitFormBack({'attachData':['returnMenu','1','']},"<ctp:out name='sessCtx.certType'/>");
		};
		
	}).filter('trustHtml', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		};
	});
	
	app.controller('inputBillController',function($scope,$http,$location,$rootScope,$translate){
		//获取页面				
		$rootScope.certType=sessCtx.certType;			
		console.log("updateData.isUpdate: " + updateData.isUpdate);
		if(updateData.isUpdate=="Y" || updateData.operation=="TP"){
			$rootScope.isUpdate='Y';
			$rootScope.updateData={
	                txtRemark : updateData.userRef,
	                outAccount : updateData.drAc,
	                txtAmount : updateData.amt,
	                merchantCode : updateData.mcode,
	                txtBillAccount : updateData.billNo,
	                btCd : updateData.btCd,
	                hostcode : updateData.hostCd,
	                accType : updateData.accType,
				    labelName : updateData.labelName,
				    ref : updateData.ref
			};
		}else{
			$rootScope.isUpdate='N';
		}		
		
		$rootScope.$on("$translateChangeSuccess",function(){});		
		var url = ajaxHead + '/paymentbill.flowc&flowActionName=getaccinfo';		
		$http.get(url).success(function (data) {				
			if('0'==data.retCode){	
				$scope.accArrList = setOptions(data.accArrList);
				$scope.accArrList1 = setOptions(data.accArrList);
				WBDate = data.WBDate;				
				$scope.paymentDate=WBDate.substr(0,4) + $translate.instant("syear") + WBDate.substr(5,2) + $translate.instant("smonth") + WBDate.substr(8,2) + $translate.instant("sday");
			}							
		}).error(function(data){
			alert("get acc info exception");
		});

		$scope.isDisabled=false;

		$rootScope.phone=sessCtx.Pub_PhoneCode;
		$rootScope.email=sessCtx.pub_email;
		
		if(sessCtx.BranchSessionData.custType=="0"){
			$rootScope.custType=sessCtx.BranchSessionData.custType;
			$scope.isDisabledAcc2=true;
			$scope.isShowCusttype=true;
			$("#billAccount2").attr("placeholder", $translate.instant("iss.is.stock.safety.tips1"));
			$("#billAccount2").css("background-color","#ccc");
		}
		$scope.operation=$translate.instant("operation");

		$scope.checkQuotaEnqT = function(){
			
			var url = ajaxHead + '/sysapdict.flowc&flowActionName=checkQuotaVvail';
			$http.get(url).success(function (data) {
				
				if('0'==data.resultCode){
					
					var quotaResAmt = 0;
					for(var i=0;i<data.resultList.length;i++){
						if("109"==data.resultList[i].LMTTYPE){
							var arr = (data.resultList[i].LMTTYPE1).split(',');
							quotaResAmt = arr[0]-arr[1];
						}
					}

					$scope.quotaRsTHtml=fmoney(quotaResAmt/100,2);
				}else{
					$scope.quotaEnqTHtml = $translate.instant("availableQuotaerror");
				}
				
			}).error(function(data){
				$scope.quotaEnqTHtml = $translate.instant("common.sys.exception.content");
			});

		};
		
		$scope.checkQuotaEnqP = function(){

			var url=ajaxHead + '/sysapdict.flowc&flowActionName=checkQuotaVvail';
			$http.get(url).success(function (data) {
				if('0'==data.resultCode){
					
					var quotaResAmt = 0;
					for(var i=0;i<data.resultList.length;i++){
						if("110"==data.resultList[i].LMTTYPE){
							var arr = (data.resultList[i].LMTTYPE2).split(',');
							quotaResAmt = arr[0]-arr[1];
						}
					}

					$scope.quotaRsPHtml=fmoney(quotaResAmt/100,2);
				}else{
					$scope.quotaEnqPHtml = $translate.instant("availableQuotaerror");
				}
				
			}).error(function(data){
				$scope.quotaEnqPHtml = $translate.instant("common.sys.exception.content");
			});
			
		};

		$scope.checkQuotaEnqT();
		$scope.checkQuotaEnqP();
		
		if($rootScope.isUpdate=='N'){

			var url = ajaxHead + '/sysapdict.flowc&flowActionName=getApMc';
			$http.get(url).success(function (data) {

				if('0'==data.retcode){
					$scope.cardregInfoList=data.cardregInfoList;
					$scope.paymentCaList=data.paymentCaList;
					$scope.selectedCat=data.paymentCaList[0];
					$scope.changeCat();
				}else{
					$rootScope.errorMessage = data.errorMessage;
					$rootScope.errorCode = data.errorCode;
					if( data.errorMessage == undefined){
						$rootScope.errorMessage = ''; 
					}
					if( data.errorCode == undefined){
						$rootScope.errorCode = '999984';
					}
					$location.path('/error/').replace();
				}
			});
			
		}else{

			$scope.updateData=$rootScope.updateData;
			var url = ajaxHead + '/sysapdict.flowc&flowActionName=getAlldict&mcCd=' + $scope.updateData.merchantCode;
			$http.get(url).success(function (data) {

				if('0'==data.retcode){

					$scope.ref=$scope.updateData.ref;

					$scope.paymentCaList=data.paymentCaList;
					for (var i=0;i<$scope.paymentCaList.length;i++){
						if($scope.paymentCaList[i].caCd==data.paymentAmcList[0].caCd){
								$scope.selectedCat=$scope.paymentCaList[i];
						}
					}

					$scope.paymentAmcList=$scope.getAmcList($scope.selectedCat.caCd);
					for (var j=0;j<$scope.paymentAmcList.length;j++){
						if($scope.paymentAmcList[j].mcCd==data.paymentAmcList[0].mcCd){
								$scope.selectedAmc=$scope.paymentAmcList[j];
						}
					}

				 	if(data.paymentBtList==''||data.paymentBtList==null){
						$scope.selectedBt=null;
						$scope.isShowmcBt=false;
					}else{
						$scope.paymentBtList=data.paymentBtList;
						for (var k=0;k<$scope.paymentBtList.length;k++){
							if($scope.paymentBtList[k].mcCd==data.paymentAmcList[0].mcCd
									&&$scope.paymentBtList[k].btCd==$scope.updateData.btCd){
									$scope.selectedBt=$scope.paymentBtList[k];
							}
						}
						$scope.isShowmcBt=true;
					}

					$scope.cardregInfoList=data.cardregInfoList;
					if($scope.updateData.merchantCode=="C999"){
						$scope.isShowmcCard=true;

						for (var c=0;c<$scope.cardregInfoList.length;c++){
							if(($scope.updateData.txtBillAccount).trim()==($scope.cardregInfoList[c].cardnumber).trim()){
								$scope.selectedCard=$scope.cardregInfoList[c];
								$scope.isDisabledAcc2=true;
								if("0"!=$rootScope.custType){
									$("#billAccount2").css("background-color","#ccc");
									$("#billAccount2").attr("placeholder","");
								}
							}
						}
						
						if((''==$scope.selectedCard||null==$scope.selectedCard)||(''==$scope.selectedCard.mediumno||null==$scope.selectedCard.mediumno)){
							$scope.selectedCard={cardnumber:$translate.instant("select_note")};
							$scope.isDisabledAcc1=true;
							if(sessCtx.BranchSessionData.custType!="0"){
								$scope.billAccount2=$scope.updateData.txtBillAccount;
							}
							$("#billAccount1div").css("background-color","#ccc");
						}
					}else{
						if($scope.selectedAmc.labelName==''||$scope.selectedAmc.labelName==null){
							$scope.isShowmcBity=false;
							$scope.labelName=null;
						}else{
							$scope.labelName=$scope.selectedAmc.labelName;
							$scope.isShowmcBity=true;
						}
						$scope.billAccount=$scope.updateData.txtBillAccount;
					}

					if($scope.selectedAmc.mcType=="N"){
						$scope.accList=$scope.accArrList;
					}else{
						$scope.accList=$scope.accArrList1;
					}

					for (var m=0;m<$scope.accList.length;m++){
						if(($scope.updateData.outAccount).trim()==($scope.accList[m].MEDIUMID).trim()){
							$scope.selectedAcc=$scope.accList[m];
							 if($scope.selectedAcc.MEDTYPE=="10108"){
								$scope.isHideBtnB=true;
							 }else{
								$scope.isHideBtnB=false;
							 }
						}
					}
					if($scope.selectedAmc.mcCd=="M303"){
						$scope.isShowBtnP=true;
						$scope.typeFlag=2;
						$scope.TRANTYPE=93;
					}else{
						$scope.isShowBtnT=true;
						$scope.typeFlag=1;
						$scope.TRANTYPE=92;
					}
					
					$scope.txtAmount=$scope.updateData.txtAmount;
					$scope.txtRemark=$scope.updateData.txtRemark;

				}else{
					$rootScope.errorMessage = data.errorMessage;
					$rootScope.errorCode = data.errorCode;
					if( data.errorMessage == undefined){
						$rootScope.errorMessage = ''; 
					}
					if( data.errorCode == undefined){
						$rootScope.errorCode = '999984';
					}
					$location.path('/error/').replace();
				}
			});
		}

		$scope.isShowContent=true;

		$scope.changeCat = function(){

			$scope.paymentAmcList=$scope.getAmcList($scope.selectedCat.caCd);
			$scope.selectedAmc=$scope.paymentAmcList[0];
			
			if($scope.selectedAmc.mcCd=="C999"){
				$scope.isShowmcCard=true;
				$scope.selectedBt=null;
				$scope.isShowmcBt=false;
				$scope.isShowmcBity=false;
				$scope.labelName=$scope.selectedAmc.labelName;
				$scope.selectedCard=$scope.cardregInfoList;
				$scope.selectedCard={cardnumber:$translate.instant("select_note")};

				if($scope.selectedAmc.mcCd=="M303"){
					$scope.isShowBtnT=false;
					$scope.isShowBtnP=true;
					$scope.typeFlag=2;
					$scope.TRANTYPE=93;
				}else{
					$scope.isShowBtnP=false;
					$scope.isShowBtnT=true;
					$scope.typeFlag=1;
					$scope.TRANTYPE=92;
				}
				
				if($scope.selectedAmc.mcType=="N"&&$scope.accFlag!="acc"){
					$scope.accList=$scope.accArrList;
					$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
					$scope.accFlag="acc";
					$scope.isShowEnq=false;
				}else if($scope.accFlag!="acc1"){
					$scope.accList=$scope.accArrList1;
					$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
					$scope.accFlag="acc1";
					$scope.isShowEnq=false;
				}

			}else{
				$scope.isShowmcCard=false;
				$scope.changeAmc();
			}

					
		};

		$scope.getAmcList = function(mcCd){
			
			var paymentAmcList=null;
			var url=ajaxHead + '/sysapdict.flowc&flowActionName=getApAmc';
			$.ajax({type:"POST",cache:false,async:false,url:url,dataType:"json",data:{caCd:mcCd},
				success:function(data){
					
					if('0'==data.retcode){
						paymentAmcList=data.paymentAmcList;
					}else{
						$rootScope.errorMessage = data.errorMessage;
						$rootScope.errorCode = data.errorCode;
						if( data.errorMessage == undefined){
							$rootScope.errorMessage = ''; 
						}
						if( data.errorCode == undefined){
							$rootScope.errorCode = '999984';
						}
						$location.path('/error/').replace();
					}
				}
			});
			
			return paymentAmcList;
		};
		
		$scope.changeAmc = function(){
			
			if($scope.selectedAmc.labelName==''||$scope.selectedAmc.labelName==null){
				$scope.isShowmcBity=false;
				$scope.labelName=null;
			}else{
				$scope.labelName=$scope.selectedAmc.labelName;
				$scope.isShowmcBity=true;
				$scope.billAccount=null;
			}

			if($scope.selectedAmc.mcCd=="M303"){
				$scope.isShowBtnT=false;
				$scope.isShowBtnP=true;
				$scope.typeFlag=2;
				$scope.TRANTYPE=93;
			}else{
				$scope.isShowBtnP=false;
				$scope.isShowBtnT=true;
				$scope.typeFlag=1;
				$scope.TRANTYPE=92;
			}

			if($scope.selectedAmc.mcType=="N"&&$scope.accFlag!="acc"){
				$scope.accList=$scope.accArrList;
				$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
				$scope.isShowEnq=false;
				$scope.accFlag="acc";
			}else if($scope.accFlag!="acc1"){
				$scope.accList=$scope.accArrList1;
				$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
				$scope.isShowEnq=false;
				$scope.accFlag="acc1";
			}
			
			var url= ajaxHead + '/sysapdict.flowc&flowActionName=getMcApbt&mcCd=' + $scope.selectedAmc.mcCd;
			$http.get(url).success(function (data) {

				if('0'==data.retcode){
					if(data.paymentBtList==''||data.paymentBtList==null){
						$scope.selectedBt=null;
						$scope.isShowmcBt=false;
					}else{
						$scope.paymentBtList=data.paymentBtList;
						$scope.selectedBt=data.paymentBtList[0];
						$scope.isShowmcBt=true;
					}
				}else{
					$rootScope.errorMessage = data.errorMessage;
					$rootScope.errorCode = data.errorCode;
					if( data.errorMessage == undefined){
						$rootScope.errorMessage = ''; 
					}
					if( data.errorCode == undefined){
						$rootScope.errorCode = '999984';
					}
					$location.path('/error/').replace();
				}
			});
			
		};

		$scope.changeCard = function(){
		
			if(''==$scope.selectedCard||null==$scope.selectedCard){
				$scope.selectedCard={cardnumber: $translate.instant("select_note")};
				$scope.isDisabledAcc2=false;
				if("0"!=$rootScope.custType){
					$("#billAccount2").css("background-color","#fff");
					$("#billAccount2").attr("placeholder", $translate.instant("please_input"));
				}
			}else{
				$scope.billAccount2=null;
				$scope.isDisabledAcc2=true;
				if("0"!=$rootScope.custType){
					$("#billAccount2").css("background-color","#ccc");
					$("#billAccount2").attr("placeholder","");
				}
			}
			
		};
		
		$scope.changeTxtCard = function(){
			
			if(''==$scope.billAccount2||null==$scope.billAccount2){
				$scope.selectedCard={cardnumber:$translate.instant("select_note")};
				$scope.isDisabledAcc1=false;
				$("#billAccount1div").css("background-color","#fff");
			}else{
				
				for (var c=0;c<$scope.cardregInfoList.length;c++){
					if(($scope.billAccount2)==($scope.cardregInfoList[c].cardnumber).trim()){
						$scope.selectedCard=$scope.cardregInfoList[c];
						$scope.isDisabledAcc1=false;
						$scope.billAccount2=null;
						$scope.isDisabledAcc2=true;
						if("0"!=$rootScope.custType){
							$("#billAccount2").css("background-color","#ccc");
							$("#billAccount2").attr("placeholder","");
						}
					}
				}
				
				if(''==$scope.selectedCard.mediumno||null==$scope.selectedCard.mediumno){
					$scope.selectedCard={cardnumber:$translate.instant("select_note")};
					$scope.isDisabledAcc1=true;
					$("#billAccount1div").css("background-color","#ccc");
				} 

			}
		};

		$scope.creditCardCheck = function(){

			$scope.isShowEnq=false;

		 	if(''==$scope.selectedAcc||null==$scope.selectedAcc){
				$scope.isHideBtnB=false;
				$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
			}else{
				 if($scope.selectedAcc.MEDTYPE=="10108"){
					$scope.isHideBtnB=true;
				 }else{
				 	if($scope.selectedAcc.UNMFLG == '2'){
				    	alert($translate.instant("unmflgTips"));
				    }
					$scope.isHideBtnB=false;
				 }
			}

		};

		$scope.balanceEnq = function(){
			
			if(''==$scope.selectedAcc.MEDIUMIDShow||null==$scope.selectedAcc.MEDIUMIDShow){
				alert($translate.instant("please_select_acc"));
			}else{

				$scope.isDisabled=true;
				$scope.isShowEnq=!$scope.isShowEnq;
				if($scope.isShowEnq==true){
	
					$scope.enqHtml=$translate.instant("balance.check.tips");
					$scope.isShowEnq=true;
					$scope.isShowEnqHtml=true;
					$scope.isShowRsHtml=false;
	
					var url=ajaxHead + '/fova_request.flowc&flowActionName=fovaGetAccInfo&MEDIUMID='+$scope.selectedAcc.MEDIUMID+"&ccy=HKD";
					
					$http.get(url).success(function (data) {
						
						if('0'==data.resultCode){
							$scope.isShowEnqHtml=false;
							$scope.isShowRsHtml=true;
							$scope.avabalHtml=data.balanceList[0].CURRTYPE + " " + fmoney(data.balanceList[0].AVABAL,2);
							$scope.balanceHtml=data.balanceList[0].CURRTYPE + " " + fmoney(data.balanceList[0].BALANCE,2);
						}else if('-999'==data.resultCode){
							$scope.isShowEnqHtml=false;
							$scope.isShowRsHtml=true;
							$scope.avabalHtml="HKD 0.00";
							$scope.balanceHtml="HKD 0.00";
						}else{
							$scope.enqHtml = data.resultMsg;
						}
						
					}).error(function(data){
						$scope.enqHtml = $translate.instant("common.sys.exception.content");
					});
					

				}
				$scope.isDisabled=false;
			}

		};
		
		$scope.submit = function(){
			if(''==$scope.selectedCat.caCd||null==$scope.selectedCat.caCd){
				alert($translate.instant("please_select_bill_type"));
				return;
			}else if(''==$scope.selectedAmc.mcCd||null==$scope.selectedAmc.mcCd){
				alert($translate.instant("please_select_merchant"));
				return;
			}

			$scope.billAccount1=null;
			
			$scope.highRisk=0;
			if($scope.selectedAmc.highRisk=='1'&&$scope.selectedAmc.mcCd!='C999'){
				$scope.highRisk=1;
			}
			
			if($scope.selectedAmc.mcCd=='C999'){
				$scope.acctype='C';
				
				if((''!=$scope.selectedCard&&null!=$scope.selectedCard)&&(''!=$scope.selectedCard.mediumno&&null!=$scope.selectedCard.mediumno)){
					$scope.billAccount1=$scope.selectedCard.cardnumber;
				}

				if(''!=$scope.billAccount2&&null!=$scope.billAccount2&&"0"!=$rootScope.custType){
					$scope.highRisk=1;
					$scope.billAccount1=$scope.billAccount2;
				}

				var re = RegExp(/^\d{16}$/);
				var re1 = RegExp(/^\d{15}$/);
				if(null!=$scope.billAccount1&&(!re.test(trim($scope.billAccount1))&&!re1.test(trim($scope.billAccount1)))){
					alert($translate.instant("please_input_correct_creditCardNo"));
					return;
				}

			}else{
				$scope.acctype='C';
				$scope.billAccount1=$scope.billAccount;
			}
				
			if($scope.highRisk=="1"&&$rootScope.phone==''&&$rootScope.email==''){
				$rootScope.errorMessage=$translate.instant("not.emailAndphone.msg");
				$rootScope.errorCode='999999';
				$location.path('/error/').replace();
			}else if($scope.highRisk=="1"&&$rootScope.phone==''){
				$rootScope.errorMessage=$translate.instant("not.phone.msg");
				$rootScope.errorCode='999999';
				$location.path('/error/').replace();
			}else if($scope.highRisk=="1"&&$rootScope.email==''){
				$rootScope.errorMessage = $translate.instant("not.email.msg");
				$rootScope.errorCode = '999999';
				$location.path('/error/').replace();
			}else{

				if(null!=$scope.labelName&&(''==$scope.billAccount1||null==$scope.billAccount1)){
					alert($translate.instant("please_input")+" "+$scope.labelName.toLowerCase()+$translate.instant("please_end"));
				}else if(''==$scope.selectedAcc.MEDIUMID||null==$scope.selectedAcc.MEDIUMID){
					alert($translate.instant("please_select_acc"));
				}else if(isEmpty($scope.txtAmount)){
					alert($translate.instant("please_input_amt"));
				}else if(isMoney($scope.txtAmount)){
					alert($translate.instant("please_input_corAmt"));
				}else if(undefined!=$scope.txtRemark &&$scope.txtRemark.indexOf("'")>-1){
			 	   alert($translate.instant("txtRemarkError"));
			    }else{
	
				    if(''==$scope.selectedBt||null==$scope.selectedBt){
				    	$scope.btCd='';
				    	$scope.btName='N/A';
				    }else{
				    	$scope.btCd=$scope.selectedBt.btCd;
				    	$scope.btName=$scope.selectedBt.btName;
				    }

		        	var url=ajaxHead + '/sysapdict.flowc&flowActionName=paymentcheck';
		        	var ptdata={
		    	        		merchCode:$scope.selectedAmc.mcCd,
			        			billType:$scope.btCd,
			        			billNum:$scope.billAccount1,
			        			billAmt:$scope.txtAmount,
			        			schDate:WBDate.replace(/-/g,'')
	        			};
						        
				    $.ajax({type:"POST",cache:false,async:false,url:url,dataType:"json",data:ptdata,
						success:function(data){

							if(data.out_flag=='-1'){
								alert($translate.instant("invalid_bill"));	
							}else if(data.out_flag=='1'){
								//huangbaoji
								if(sessCtx.ieu=='en_US'||sessCtx.ieu=='en-US'){
									alert($translate.instant("invalid_bill_number")+$scope.labelName.toLowerCase()+$translate.instant("please_end"));
								}else{
									alert($scope.labelName.toLowerCase()+$translate.instant("invalid_bill_number"));					   
								}
							
							}else if(data.out_flag=='2'){
								alert($translate.instant("invalid_amount"));
							}else if(data.out_flag=='3'){
								alert($translate.instant("invalid_merchant"));
							}else if(data.out_flag=='4'){
								alert($translate.instant("invalid_bill_type"));
							}else if(data.out_flag=='5'){
								alert($translate.instant("invalid_date"));
							}else if(data.out_flag=='0'){

								$scope.checkAmount=true;

								if($scope.selectedAcc.MEDTYPE!="10108"){
									var checkurl=ajaxHead + "/fova_request.flowc&flowActionName=fovaGetAccInfo";
									   $.ajax({type:"POST",cache:false,async:false,url:checkurl,dataType:"json",
										   data:{MEDIUMID:$scope.selectedAcc.MEDIUMID,ccy:"HKD"},
											success:function(data){

											if('0'==data.resultCode){
												
												if((parseFloat($scope.txtAmount)-parseFloat(data.balanceList[0].AVABAL))>0){
													alert($translate.instant("avabal_less"));
													$scope.checkAmount=false;
												} 
				
											}else{
												alert($translate.instant("avabal_error"));
												$scope.checkAmount=false;
											}
											
												
									   },error: function(data){
											alert($translate.instant("avabal_error"));
											$scope.checkAmount=false;
										}
									});
									
								}

								if($scope.checkAmount){

									var url=ajaxHead + "/paymentbill.flowc&flowActionName=cfmPaymentQuota";
									var checkdata ={		
											txtAmount:(fmoney($scope.txtAmount,2).replace(/,/g,'')).replace(/\./g,''),
											MAINPRODTYPE:$scope.selectedAcc.MAINPRODTYPE.trim(),
											MAINPRODNUM:$scope.selectedAcc.MAINPRODNUM.trim(),
											PRODTYPE:$scope.selectedAcc.MAINPRODTYPE.trim(),
											PRODSENO:$scope.selectedAcc.MAINPRODNUM.trim(),
											PROTSENO:$scope.selectedAcc.PROTSENO.trim(),
											debitAccount:$scope.selectedAcc.MEDIUMID.trim(),
											MEDTYPE:$scope.selectedAcc.MEDTYPE,
											TRANTYPE:$scope.TRANTYPE
										};
								    $.ajax({type:"POST",cache:false,async:false,url:url,dataType:"json",data:checkdata,
										success:function(data){
		
											
											if("0"!=data.TX_STATUS || "0"!=data.TRANSOK 
													|| ("0"!=data.ERRCODE &&"100"!=data.ERRCODE)
													&&(data.ERRCODE=='98000549' || data.ERRCODE=='98000550'
														|| data.ERRCODE=='8000549' || data.ERRCODE=='8000550')){
		
													alert($translate.instant("pib.mb.ptx.quotaless")); 
												
											}else{
		
												if( "9065"==$scope.selectedAmc.mcCd||"9069"==$scope.selectedAmc.mcCd||
													"C999"==$scope.selectedAmc.mcCd||"6001"==$scope.selectedAmc.mcCd||
													"6012"==$scope.selectedAmc.mcCd||"6050"==$scope.selectedAmc.mcCd||
													"6059"==$scope.selectedAmc.mcCd||"9057"==$scope.selectedAmc.mcCd||
													"9326"==$scope.selectedAmc.mcCd||"9067"==$scope.selectedAmc.mcCd||
													"6072"==$scope.selectedAmc.mcCd||"6026"==$scope.selectedAmc.mcCd){
													$scope.FLAG1=1;
												}else{
													$scope.FLAG1=0;
												}
		
												$scope.isDisabled=true;
		
												if($scope.highRisk=="1"&&sessCtx.BranchSessionData.custType=="0"){
													$location.path('/custTypeErr/').replace();
												}else{
													addCfmFormParam.debitAccount = $scope.selectedAcc.MEDIUMID.trim();
													addCfmFormParam.merchantCode = $scope.selectedAmc.mcCd;
													addCfmFormParam.btCd = $scope.btCd;
													addCfmFormParam.txtBillAccount = $scope.billAccount1;
													addCfmFormParam.billTypeCode = $scope.btCd;
													addCfmFormParam.txtAmount = (fmoney($scope.txtAmount,2).replace(/,/g,'')).replace(/\./g,'');
													addCfmFormParam.txtAmt = ((fmoney($scope.txtAmount,2)).replace(/,/g,''));
													addCfmFormParam.TINYPAYFLG = 1;
													addCfmFormParam.typeFlag = $scope.typeFlag;
													addCfmFormParam.medtype = $scope.selectedAcc.MEDTYPE;
													addCfmFormParam.mcNameText = $scope.selectedAmc.mcName;
													addCfmFormParam.btNameText = $scope.btName;
													addCfmFormParam.labelNameText = $scope.selectedAmc.labelName;
													addCfmFormParam.billAccountText = $scope.billAccount1;
													addCfmFormParam.txtBillAccountText = $scope.selectedAcc.MEDIUMIDShow+ " " + $scope.selectedAcc.MAINPRODNAME;
													addCfmFormParam.amountText = fmoney($scope.txtAmount,2);
																										
													//huangbaoji2
													if(operation=="TP"){
														addCfmFormParam.operation = "TP";
														addCfmFormParam.txtRemarkText = $scope.txtRemark;
													}
													
													addCfmFormParam.paymentDate = $scope.paymentDate;
													addCfmFormParam.outAccount = $scope.selectedAcc.MEDIUMID;
													addCfmFormParam.hostcode = $scope.selectedAmc.hostMcCd;
													addCfmFormParam.accType = $scope.selectedAmc.mcType;
													addCfmFormParam.labelName = $scope.labelName;
													addCfmFormParam.highRisk = $scope.highRisk;
													
													addCfmFormParam.netCode = $scope.selectedAcc.NETCODE;
													addCfmFormParam.outproductid = $scope.selectedAcc.MAINPRODTYPE;
													addCfmFormParam.outproductno = $scope.selectedAcc.MAINPRODNUM;
													addCfmFormParam.outsubproductid = $scope.selectedAcc.MAINPRODTYPEF;
													addCfmFormParam.outsubproductno = $scope.selectedAcc.MAINPRODNUMF;
													addCfmFormParam.prodtype = $scope.selectedAcc.MAINPRODTYPE.trim();;
													addCfmFormParam.prodseno = $scope.selectedAcc.MAINPRODNUM.trim();;
													addCfmFormParam.protseno = $scope.selectedAcc.PROTSENO.trim();;
													addCfmFormParam.trantype = $scope.TRANTYPE;																										

													
													if("1"==$scope.highRisk){

														var urlxiao=ajaxHead + "/paymentbill.flowc&flowActionName=cfmPaymentQuota";
														$.ajax({type:"POST",cache:false,async:false,url:urlxiao,dataType:"json",
															data:{
															  txtAmount:addCfmFormParam.txtAmount,
															  ddrDebitAccount:addCfmFormParam.debitAccount,
															  typeFlag:addCfmFormParam.typeFlag,
															  IACCTYPE:3,
															  TRANTYPE:$scope.TRANTYPE
															},success:function(data){
																
																if(!data.resultCode && data.SOPENFLAG=='1' && data.SOUTFLAG=='0'){
																	addCfmFormParam.isSubEnc=0;
																}else{
																	addCfmFormParam.isSubEnc=1;
																}
															},error:function(data){
																addCfmFormParam.isSubEnc=1;
															}
														});
														
													}

													addCfmFormParam.isSubEnc=0;
//													document.addCfmForm.submit();
													$location.path('/inputBillCfm/').replace();
													
												}
		
											}
											
										},error: function(data){
											$rootScope.errorMessage = data.errorMessage;
											$rootScope.errorCode = data.errorCode;
											$location.path('/error/').replace();
										}
									});
									

								}

								
							}
						}
						
					});
					
			    }

			}

		};

		$scope.reset = function(){
			$scope.selectedCat=$scope.paymentCaList[0];
			$scope.selectedCat=null;
			$scope.changeCat();
			$scope.selectedCard={cardnumber:$translate.instant("select_note")};
			$scope.billAccount=null;
			$scope.isDisabledAcc1=false;
			$scope.billAccount2=null;
			$scope.isDisabledAcc2=false;
			
			$scope.selectedAcc={MAINPRODNAMESHOW:$translate.instant("select_note")};
			$scope.isShowEnq=false;
			
			$scope.txtAmount=null;
			$scope.txtRemark=null;
		};

//		$scope.goBack = function(){
//			$scope.isDisabled=true;
//			if(operation=="TP"){
//				$("#paymentTempForm").submit();
//			}else{
//				submitFormBack({'attachData':['returnMenu','1','']},sessCtx.certType);
//			}
//		};
		
		$scope.goBack = function(flag){
			if(flag=='5') {
				window.history.go(-1);
			}
			if(ICBCUtil.mVersion4isOpen() == 1){
		        //如果是4.0客户端则返回首页
		        client.returnClientPage({"firstPageFlag":"1"},"saveVersion4S","saveVersion4F");
	        }else{
	            //如果不是4.0客户端则执行原流程
		        if(flag == '1'){ //登出并返回主页
		            client.loadData("firstURL", "mainBackToByFirstURL", "mainBackTofirstURLF");    
		        }else if(flag=='2'){ //返回主页
		            client.loadData("preURL", "mainBackToByURL", "mainBackTopreURLF");  
		        }else{ //返回preURL,若失败则返回firstURL
		            client.loadData("preURL", "mainBackToByURL", "mainBackTopreURLF1");  
		        }
	        }
		};
	
	});
	
	app.controller('custTypeErrorController', function($rootScope,$scope,$http,$location,$routeParams,$translate) {
		$rootScope.$on("$translateChangeSuccess",function() {});
		$scope.errorMessage=$translate.instant("cust_type_prompt");			
		$scope.goBack = function(){
			submitFormBack({'attachData':['returnMenu','1','']},sessCtx.certType);	
		};
	});
	
	app.controller('errorController', function($rootScope,$scope,$http,$location,$routeParams,$translate) {
		$rootScope.$on("$translateChangeSuccess",function() {});
		$scope.errorCode=$rootScope.errorCode;
		var errorMessage =$rootScope.errorMessage;
		if(errorMessage==''){
			$scope.errorMessage=$scope.errorCode+ $translate.instant("common.txnReject");			
		}else{	
			var endBtn = '</span>';
			var clickHereBtn = '<span style\="text-decoration: underline;color:blue;" onclick\="clickHere();">';
			$("#errorMessage").html(errorMessage.replace('-clickHereStart-',clickHereBtn).replace('-clickHereEnd-',endBtn));
		}
		$scope.goBack = function(){
			submitFormBack({'attachData':['returnMenu','1','']},sessCtx.certType);
		};
	});
	
	app.controller('cfmAppController', function($rootScope, $scope, $http, $location, $translate) {
//		$rootScope.$on("$translateChangeSuccess",function() {});
		$scope.isDisabled=false;

		$scope.mcNameText=addCfmFormParam.mcNameText;
		$scope.btNameText=addCfmFormParam.btNameText;
		$scope.labelNameText=addCfmFormParam.labelNameText;
		$scope.billAccountText=addCfmFormParam.billAccountText;
		$scope.debitAccount=addCfmFormParam.debitAccount;
		$scope.txtBillAccountText=addCfmFormParam.txtBillAccountText;
		$scope.amountText=addCfmFormParam.amountText;
		$scope.txtRemarkText=addCfmFormParam.txtRemarkText;
		$scope.paymentDate=addCfmFormParam.paymentDate;
		$scope.operation=addCfmFormParam.operation;		

		$scope.isShowContent=true;

		$scope.cfmSubmit = function(){
			//huangbaoji3
//			$location.path('/inputBillRes/').replace();
			var mediumid=sessCtx.BranchSessionData.MEDIUMID;
			document.mainForm.ACC_NO.value=mediumid;
			var mdcardno1=mediumid.replace(/\d/g,'*').substring(0,mediumid.length-4);
			document.mainForm.MDCARDNOMSG.value=mdcardno1+mediumid.substring(mediumid.length-4,mediumid.length);
			
			if(document.mainForm.version.value=="0"){
	
				if(addCfmFormParam.highRisk=="1"&&document.getElementById("enc_token_pass")){
							
					if(checkTransPwd()){
						
						$scope.isDisabled=true;
	
						var url=ajaxHead + '/overseas_atm_set.flowc&flowActionName=getdecryptop';
						$.ajax({type:"POST",cache:false,async:false,url:url,dataType:"json",data:{
							passwdRule:document.mainForm.passwdRule.value,
							passwdChangeRule:document.mainForm.passwdChangeRule.value,
							EncPassword:document.mainForm.EncPassword.value
								},
							success:function(data){
	
								document.mainForm.enc_token_pass.value=data.passwd;
								document.mainForm.submit();
								document.mainForm.version.value=1;
								
							}
						});
						
					}
					
				}else{

					if($('#enc_static_pass').val() == '' ){
						alert('<ctp:label key="payment.validate.login.password"/>');
						return;
					}
					
					$scope.isDisabled=true;
					document.mainForm.submit();
					document.mainForm.version.value=1;
					
				}

			}
			
		};

		$scope.goBack = function(){
			$scope.isDisabled=true;
//			document.backForm.submit();
			updateData.userRef = document.backForm.userRef.value;
			updateData.drAc = document.backForm.drAc.value;
			updateData.amt = document.backForm.amt.value;
			updateData.mcode = document.backForm.mcode.value;
			updateData.billNo = document.backForm.billNo.value;
			updateData.btCd = document.backForm.btCd.value;
			updateData.hostCd = document.backForm.hostCd.value;
			updateData.accType = document.backForm.accType.value;
			updateData.labelName = document.backForm.labelName.value;
			updateData.isUpdate = document.backForm.isUpdate.value;
			updateData.operation = document.backForm.operation.value;						
			$location.path('/inputBill/').replace();
		};

	});
	
	app.controller('resAppController', function($rootScope, $scope, $http, $location, $translate) {
		$rootScope.$on("$translateChangeSuccess",function() {});
		$scope.isDisabled=true;

		$scope.refNo='<ctp:out name="REFNO" />';
		$scope.mcNameText='<ctp:out name="mcNameText" />';
		$scope.btNameText='<ctp:out name="btNameText" />';
		$scope.labelNameText='<ctp:out name="labelNameText" />';
		$scope.billAccountText='<ctp:out name="billAccountText" />';
		$scope.txtBillAccountText='<ctp:out name="txtBillAccountText" />';
		$scope.amountText='<ctp:out name="amountText" />';
		$scope.txtRemarkText='<ctp:out name="txtRemarkText" />';
		$scope.paymentDate='<ctp:out name="paymentDate" />';
		$scope.operation='<ctp:out name="operation" />';

		$scope.isShowContent=true;

		if("0"!='<ctp:out name="TX_STATUS" />' || "0"!='<ctp:out name="TRANSOK" />' 
			|| ("0"!='<ctp:out name="ERRCODE" />'&&"100"!='<ctp:out name="ERRCODE" />')){
			$scope.rescode="1";
		}else{
			$scope.rescode="0";
		}

		 var debitAccount = null;    
		 var netCode = 'null';
		 var debitAccount = isNull(debitAccount) ? '' : '<ctp:out name="debitAccount" />';                
		 var netCode = isNull(netCode) ? '' : "<ctp:out name='netCode' />";
         var REFNO = isNull("<ctp:out name='REFNO' />") ? '' : "<ctp:out name='REFNO' />";
         var txtAmount = isNull("<ctp:out name='txtAmount' />") ? '' : "<ctp:out name='txtAmount' />";
         var outproductid = isNull("<ctp:out name='outproductid' />") ? '' : "<ctp:out name='outproductid' />";
         var outproductno = isNull("<ctp:out name='outproductno' />") ? '' : "<ctp:out name='outproductno' />";
         var outsubproductid = isNull("<ctp:out name='outsubproductid' />") ? '' : "<ctp:out name='outsubproductid' />";
         var outsubproductno = isNull("<ctp:out name='outsubproductno' />") ? '' : "<ctp:out name='outsubproductno' />";

         $scope.f2z_TranJournal  = "transCode=150137|outAccountNo="+debitAccount
         	+ "|netCode="+netCode
            + "|refNo="+REFNO
            + "|transAmount="+(fmoney(txtAmount,2)).replace(/,/g,'')
            + "|currType=013|MenuID=0704|inCurrType=013"
            + "|outproductid="+outproductid
            + "|outproductno="+outproductno
            + "|outsubproductid="+outsubproductid
            + "|outsubproductno="+outsubproductno
            + "|errcode="+($scope.rescode=='0'?0:1);

			if('0'==$scope.rescode){
				$http.get('${urlHead}${contextPath}/log.flowc?flowActionName=log',{params:{'f2z_TranJournal':$scope.f2z_TranJournal}});
			}else{

				$http.get('${urlHead}${contextPath}/log.flowc?flowActionName=log',{params:{'f2z_TranJournal':$scope.f2z_TranJournal}});

				$scope.txnRejectCode='<ctp:out name="FOVARESMAP.HEAD.ERRCODE" />';
				if( $scope.txnRejectCode == undefined || $scope.txnRejectCode==''){
					$scope.txnRejectCode = '999984';
				}
				$scope.isDisabled=false;
				
			}
		

		$scope.goBack = function(){
			$scope.isDisabled=true;
//			submitFormBack({'attachData':['returnMenu','1','']},"<ctp:out name='sessCtx.certType'/>");
			$location.path('/inputBill/').replace();			
		};

	});

	function setOptions(accList){
		var s =[];
		if(accList!=''&&accList!=null){
			accList = accList.substring(1,accList.length-1);
			var arr = accList.split(',');
			 for(sa in arr){
				var str = arr[sa].split('|');
				var st={};
				if(fomatAccStr(str[0])!=''&&fomatAccStr(str[0])!=null){
					st.MEDIUMID = fomatAccStr(str[0]);
					st.MEDTYPE = fomatAccStr(str[1]);
					st.MEDIUMIDShow = fomatAccStr(str[2]);
					st.MAINPRODNAMESHOW = "10108"!=st.MEDTYPE?fomatAccStr(str[3]):'{{"creditcard"|translate}}';
					st.MAINPRODNAMESHOW = str[14] == '2'?st.MAINPRODNAMESHOW+" "+'{{"unmflgName"|translate}}':st.MAINPRODNAMESHOW;
					st.MAINPRODTYPE = fomatAccStr(str[4]);
					st.MAINPRODNUM = fomatAccStr(str[5]);
					st.MAINPRODTYPEF = fomatAccStr(str[6]);
					st.MAINPRODNUMF = fomatAccStr(str[7]);
					st.MAINPRODNAME = "10108"!=st.MEDTYPE?fomatAccStr(str[11]):'{{"creditcard"|translate}}';
					st.MAINPRODNAME = str[14] == '2'?st.MAINPRODNAME+" "+'{{"unmflgName"|translate}}':st.MAINPRODNAME;
					st.PROTSENO = fomatAccStr(str[12]);
					st.NETCODE = fomatAccStr(str[13]);
					st.UNMFLG = str[14];
					s.push(st);
				}
			}
		}
		return s;
	}
	
	function fomatAccStr(accStr){
		var accStrf='';
		for(var i=0;i<accStr.length;i++){
			var c = accStr.charAt(i);
			if(c!='0'){
				accStrf = accStr.substring(i);
				return accStrf;
			}
		}
		return accStrf; 
	}

	function fmoney(s, n){   
		n = n > 0 && n <= 20 ? n : 2;   
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		var l = s.split(".")[0].split("").reverse(),   
		r = s.split(".")[1];   
		t = "";   
		for(i = 0; i < l.length; i ++ )   
		{   
		   t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
		}   
		return t.split("").reverse().join("") + "." + r;   
	}

	function isMoney( param ) {
		if ((isNaN(param)) || (parseFloat(param) < 0) || (param.indexOf('.') == 0) || (param.lastIndexOf('.') == param.length - 1)) {
			return 1;
		}
		var number=/^[0-9]*[.]?[0-9]+$/;
		if(!number.test(param)){
			return 1;
		}
		if(param.indexOf('e') > 0) {
			return 1;
		}
		
		var docIndex = param.trim().lastIndexOf('.');
		console.log('cparam: ' + param);
		if ((docIndex < parseInt(param.trim().length) - 3) && (docIndex >= 0)) {
			return 1;
		}
		return 0;
	}
	
	function isNull(data) {               
		return (data==null || data=='null') ? true : false;
     }

})();

function clickHere(){
	document.modifyContactInfoForm.submit();
};