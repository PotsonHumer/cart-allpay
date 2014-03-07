// JavaScript Document

/* 使用方法

$(".class or #id").form_box({
	NAME : "", // 表單名稱 (name)
	PHP : "form.php", // 傳送目標
	FUNC : "", // func 附值
	AFTER : function() {  }, // 動作後執行擴充
}, function(DATA){
	//callback
});
*/

(function($){
	$.fn.form_box = function(OPTION,CALLBACK){
		var FORM = jQuery.extend({
			NAME : "", // 表單名稱 (name)
			PHP : "form.php", // 傳送目標
			FUNC : "", // func 附值
			AFTER : function() {  }, // 動作後執行擴充
			//----
			THIS : "",
		}, OPTION);
		
		//-- AJAX
		function form_ajax(){
			$.post(FORM.PHP, {
				func : FORM.FUNC,
				val : FORM.THIS.serializeArray(),
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
			}, function(DATA,STATUS){
				FORM.AFTER();
				CALLBACK(DATA);
			});
		}
		
		//-- ACT
		return this.click(function(E){
			E.preventDefault();
			
			if(FORM.NAME != ""){
				FORM.THIS = $("form[name="+ FORM.NAME +"]");
								
				form_ajax();
			}
		});
	};
})(jQuery);