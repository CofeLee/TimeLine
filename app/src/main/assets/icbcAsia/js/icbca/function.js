function getDateStr(date) {
	var date_str;
	date_str = date.getYear() < 1900 ? 1900 + date.getYear() : date.getYear();
	date_str += '/';
	date_str += date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'
			+ (date.getMonth() + 1);
	date_str += '/';
	date_str += date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
	return date_str;
}
function trim(str) {
	return str.replace('^\s+', '').replace('\s+$', '');
}
function leftTrim(str) {
	return str.replace('^\s+', '');
}
function rightTrim(str) {
	return str.replace('\s+$', '');
}
function paddingLeft(str, pad_str, total_length) {
	var pad_length = total_length - str.length;
	for ( var i = 0; i < pad_length; i++) {
		str = pad_str + str;
	}
	return str;
}
function paddingRight(str, pad_str, total_length) {
	var pad_length = total_length - str.length;
	for ( var i = 0; i < pad_length; i++) {
		str = str + pad_str;
	}
	return str;
}
function RoungToTwoFloat(str) {

}
function formatAccountNo(str) {

}

function formatDate(str) {// yyyy-mm-dd

}
function getVarcharLength() {

}
/*
 * 013<->HKD互转
 * 
 */
function convertCurrency(cny) {
	var result;
	switch (cny) {
	case '012', '12':
		result = 'GBP';
		break;

	case '013', '13':
		result = 'HKD';
		break;

	case '014', '14':
		result = 'USD';
		break;
	case '015', '15':
		result = 'CHF';
		break;
	case '018', '18':
		result = 'SGD';
		break;
	case '021', '21':
		result = 'SEK';
		break;

	case '022', '22':
		result = 'DKK';
		break;

	case '023', '23':
		result = 'NOK';
		break;

	case '027', '27':
		result = 'JPY';
		break;

	case '028', '28':
		result = 'CAD';
		break;

	case '029', '29':
		result = 'AUD';
		break;

	case '038', '38':
		result = 'EUR';
		break;

	case '081', '81':
		result = 'MOP';
		break;

	case '087', '87':
		result = 'NZD';
		break;

	case '103':
		result = 'KRW';
		break;

	case '107':
		result = 'TWD';
		break;

	case '032', '32':
		result = 'MYR';
		break;

	case '001', '01','1':
		result = 'CNY';
		break;

	case '064', '64':
		result = 'VND';
		break;

	case '089', '89':
		result = 'KZT';
		break;

	case '091', '91':
		result = 'SAR';
		break;

	case '092', '92':
		result = 'AED';
		break;

	case '093', '93':
		result = 'QAR';
		break;

	case '082', '82':
		result = 'PHP';
		break;

	case '084', '84':
		result = 'THB';
		break;

	case '101':
		result = 'IDR';
		break;

	case '085', '85':
		result = 'INR';
		break;

	case '801':
		result = 'XAU';
		break;

	case '803':
		result = 'XAG';
		break;

	case '805':
		result = 'XPT';
		break;

	case '019', '19':
		result = 'PKR';
		break;

	case '701':
		result = 'CNH';
		break;

	case '901':
		result = 'AUG';
		break;

	case '903':
		result = 'AGG';
		break;

	case '905':
		result = 'PTG';
		break;

	case '122':
		result = 'KHR';
		break;

	case '123':
		result = 'LAK';
		break;

	case '921':
		result = 'PGS';
		break;

	case '104':
		result = 'KWD';
		break;
	case 'GBP':
		result = '012';
		break;
	case 'HKD':
		result = '013';
		break;
	case 'USD':
		result = '014';
		break;
	case 'CHF':
		result = '015';
		break;
	case 'SGD':
		result = '018';
		break;
	case 'SEK':
		result = '021';
		break;
	case 'DKK':
		result = '022';
		break;
	case 'NOK':
		result = '023';
		break;
	case 'JPY':
		result = '027';
		break;
	case 'CAD':
		result = '028';
		break;
	case 'AUD':
		result = '029';
		break;
	case 'EUR':
		result = '038';
		break;
	case 'MOP':
		result = '081';
		break;
	case 'NZD':
		result = '087';
		break;
	case 'KRW':
		result = '103';
		break;
	case 'TWD':
		result = '107';
		break;
	case 'MYR':
		result = '032';
		break;
	case 'CNY':
		result = '001';
		break;
	case 'VND':
		result = '064';
		break;
	case 'KZT':
		result = '089';
		break;
	case 'SAR':
		result = '091';
		break;
	case 'AED':
		result = '092';
		break;
	case 'QAR':
		result = '093';
		break;
	case 'PHP':
		result = '082';
		break;
	case 'THB':
		result = '084';
		break;
	case 'IDR':
		result = '101';
		break;
	case 'INR':
		result = '085';
		break;
	case 'XAU':
		result = '801';
		break;
	case 'XAG':
		result = '803';
		break;
	case 'XPT':
		result = '805';
		break;
	case 'PKR':
		result = '019';
		break;
	case 'CNH':
		result = '701';
		break;
	case 'AUG':
		result = '901';
		break;
	case 'AGG':
		result = '903';
		break;
	case 'PTG':
		result = '905';
		break;
	case 'KHR':
		result = '122';
		break;
	case 'LAK':
		result = '123';
		break;
	case 'PGS':
		result = '921';
		break;
	case 'KWD':
		result = '104';
		break;
	}
	return result;

}


