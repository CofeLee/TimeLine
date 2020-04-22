var APP=(function(){
	_langPath="/icbcAsia/lang/";
	return {
		CONTEXT_ROOT:"/mobilebank",
		getHtmlParameters:function (name) {
			var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
			var r=window.location.search.substr(1).match(reg);
			if(r!=null) return decodeURI(r[2]);
			return null;
		}
	}
}());