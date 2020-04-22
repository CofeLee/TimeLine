//所有validate函数必须返回true或false，不得返回数字、字符串等值
function isNull(data) {
	return (data==null || data=='') ? true : false;
}

function checkChinese(str) {
	if (isNull(str)) {
		return false;
	}
	if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
		return true;
	} else {
		return false;
	}
}

function isChinaTaxNumber(taxNumber) {
	if (taxNumber == null) {
		return false;
	}
	if (taxNumber.match(/^\d{17}[0-9xX]{1}$/) != null
			|| taxNumber.match(/^[CWHMT]{1}\d{16}[A-Za-z0-9]{1}$/) != null
			|| taxNumber.match(/^[J]{1}\d{14}$/) != null) {
		return true;
	} else {
		return false;
	}
}

function isChinaMacaoTaxNumber(taxNumber) {
	if (taxNumber == null) {
		return false;
	}
	if (taxNumber.match(/^\d+$/) != null) {
		return true;
	} else {
		return false;
	}
}

function checkLen(str, maxlength){
	if (str == null) {
		return true;
	}
	var strlength = str.replace(/[^\x00-\xFF]/g,'***').length;
	if(strlength > maxlength){
		return false;
	}
	return true;
}

function isUserName(userName) {
	if (userName == null) {
		return false;
	}
	if (userName.match(/^(?=.*[a-z])[0-9a-z_]{6,15}$/) != null) {
		return true;
	} else {
		return false;
	}
}

function isNoSpecialChar(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[A-Za-z0-9_]+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isNumberPwd(numberPwd) {
	if (numberPwd == null) {
		return false;
	}
	if (numberPwd.match(/^\d{6}$/) != null) {
		return true;
	} else {
		return false;
	}
}

function isMobileNo(mobileArea, mobileNo) {
	if (mobileArea == null || mobileNo == null) {
		return false;
	}
	if (mobileArea == '852') {
		return (mobileNo.match(/^(5|6|8|9)\d{7}$/) != null);
	} else if (mobileArea == '86') {
		return (mobileNo.match(/^1[3456789]{1}\d{9}$/) != null);
	} else if (mobileArea == '853') {
		return (mobileNo.match(/^6\d{7}$/) != null);
	} else if (mobileArea == '886') {
		return (mobileNo.match(/^[0]{1}[9]{1}\d{8}$/) != null);
	} else if (isNumeric(mobileNo)) {
		return true;
	} else {
		return false;
	}
}

function isAlphabet(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[A-Z]+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isEnglishName(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[A-Za-z ,]+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isChineseName(str){
	if (str == null) {
		return false;
	}
	if (str.match(/^[\u4e00-\u9fa5 \s]+$/) != null) {
		return true;
	} else {
		return false;
	}
}

function isDigit(str){
	if(str == null){
		return false;
	}
	if(str.match(/^\d+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isAlphabetAndDigit(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[A-Za-z0-9]+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isNumeric(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[0-9]*$/) != null){
		return true;
	}else{
		return false;
	}
}
function isNumerical(str, start, end){
	if(str == null){
		return false;
	}
	var reg = eval("/^[0-9]{"+start+","+end+"}$/");
	if(str.match(reg) != null){
		return true;
	}else{
		return false;
	}
}

function isInteger(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[1-9]\d*$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isAmount(str){
	if(str == null){
		return false;
	}
	if(str.match(/^([0-9]\d*\.[0-9]{1,2})|([1-9]\d*)$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isAmt(str) {
	if(str == null){
		return false;
	}
	if(str.match(/^(([1-9]\d*)|\d)(\.\d{1,2})?$/) != null ){
		return true;
	} else{
		return false;
	}
}

function isFloat(str,float_length){

}

function isEmail(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[a-zA-Z0-9][a-zA-Z0-9_\-.]*\@[a-zA-Z0-9][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]+)+$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isHKMobile(str){
	if(str == null){
		return false;
	}
	if(str.match(/^((0{,2})852)?\d{8}$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isMainlandMobile(str){

}
function isTel(str){

}
function isDate(str){

}
function isTime(str){

}
function isDateWithTime(str){  // yyyy-mm-dd hh:mi:ss

}
//FOVA
function isCINo(str){

}
function isHKID(str){
	if(str == null){
		return false;
	}
	if(str.match(/^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0-9aA]\)|[0-9aA])$/) != null){
		return true;
	}else{
		return false;
	}
}
function isMainlandID(str){
	if(str == null){
		return false;
	}
	if(str.match(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/) != null){
		return true;
	}else{
		return false;
	}
}
function isMacaoID(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[1|5|7][0-9]{6}\([0-9Aa]\)/) != null){
		return true;
	}else{
		return false;
	}
}
function isTaiwanID(str){
	if(str == null){
		return false;
	}
	if(str.match(/^[a-zA-Z][0-9]{9}$/) != null){
		return true;
	}else{
		return false;
	}
}
function isHKBankAcc(str){
	if(str == null){
		return false;
	}
	if(str.match(/^\d{6,16}$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isFovaAccountNo(str){
	if(str.match(/^\d{12}$/) != null ){
		return true;
	}else{
		return false;
	}
}
function isFovaCreditCardNo(str){

}
function isFovaDebitCardNo(str){

}
//product
function isHKStockCode(code){//hk market
	if(code.length == 5 && code.match(/^[0-9]{5}$/) != null ){
		return true;
	}else{
		return false;
	}
}

function isMainlandStockCode(code){//hk market
	if(code.length == 6 && code.match(/^[0-9]{6}$/) != null ){
		return true;
	}else{
		return false;
	}
}

function pwdValid(pwd){
	var regdh = /^[a-zA-Z0-9]{8,30}$/;
	var regdh1 = /^[a-zA-Z]{8,30}$/;
	var regdh2 = /^[0-9]{8,30}$/;
	
	if (regdh1.test(pwd)){
		return false;
	}
	if (regdh2.test(pwd)){
		return false;
	}
	if (regdh.test(pwd)){
		return true;
	}
}