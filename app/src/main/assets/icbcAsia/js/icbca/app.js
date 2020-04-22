$(".datetimepicker").datetimepicker({
		language: "zh-CN",
        format: "yyyy-MM-dd",
        autoclose: true,
        todayBtn: true,
		todayHighlight: true
});
$(".datepicker").datepicker({
		language: "zh-CN",
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
		todayHighlight: true,
		startDate: "2017-04-01",
		endDate: "2099-12-31"
});

$('.input-daterange input').each(function() {
    $(this).datepicker({
		language: "zh-CN",
		format: "yyyy-MM-dd",
        autoclose: true,
        todayBtn: true,
		todayHighlight: true,
        minuteStep: 10
	});
});


function loading(){
	
	
}
