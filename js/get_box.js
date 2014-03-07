// JavaScript Document

/* 使用方法

$(document or ".class or #id").get_box({
	CLICK : false, // 按鍵後才啟動功能 , true => 按鍵啟動  , false => 直接啟動
	CALL : "", // key 值
	PHP : "get.php", // 取值目標
	FUNC : "", // func 附值
	AFTER : function() {  }, // 動作後執行擴充
}, function(DATA){
	//callback
});
*/

(function($){
	$.fn.get_box = function(OPTION,CALLBACK){
		var GET = jQuery.extend({
			CLICK : false, // 按鍵後才啟動功能 , true => 按鍵啟動  , false => 直接啟動
			CALL : "", // key 值
			PHP : "get.php", // 取值目標
			FUNC : "", // func 附值
			AFTER : function() {  }, // 動作後執行擴充
			
			//----
			REL : "",
		}, OPTION);
		
		//-- AJAX
		function get_ajax(){
			$.post(GET.PHP, {
				call : GET.CALL,
				func : GET.FUNC,
				key : GET.REL,
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
			}, function(DATA,STATUS){
				CALLBACK(DATA);
				get_input(DATA);
			});
		}
		
		//-- INPUT
		function get_input(JSON_STR){
			try{		
				var OBJ = JSON.parse(JSON_STR);
			}
			catch(e){
				GET.AFTER();
				return false;
			}
			
			$.each(OBJ,function(KEY,VAL){
				var THIS = $("*[name="+ KEY +"]");
				var TAG_NAME = THIS.prop("tagName");
				var TAG_TYPE = THIS.attr("type");
				
				switch(TAG_NAME){
					case "INPUT":
						switch(TAG_TYPE){
							default:
							case "text":
								THIS.val(VAL);
							break;
							case "checkbox":
								checkbox_input(THIS,VAL);
							break;
							case "radio":
								radio_input(THIS,VAL);
							break;
						}
					break;
					case "SELECT":
						select_input(THIS,VAL);
					break;
					case "TEXTAREA":
						THIS.val(VAL);
					break;
					default:
						THIS.html(VAL);
					break;
				}
			});
			
			GET.AFTER();
		}
		
		//-- SELECT
		function select_input(THIS,VAL){
			THIS.find("option").each(function(){
				if(VAL == $(this).val()){
					$(this).attr("selected","selected");
				}
			});
		}
		
		//-- RADIO
		function radio_input(THIS,VAL){
			THIS.each(function(){
				if(VAL == $(this).val()){
					$(this).attr("checked","checked");
				}
			});
		}
		
		//-- CHECKBOX
		function checkbox_input(THIS,VAL){
			var VAL_ARRAY = VAL.split(",");

			$.each(VAL_ARRAY,function(KEY,SINGLE_VAL){
				radio_input(THIS,SINGLE_VAL);
			});
		}
		
		//-- ACT
		if(GET.CLICK){
			var GET_ID = this.attr("id");
			var GET_CLASS = this.attr("class");
			var GET_CALL = GET.CALL;
			
			if(typeof(GET_ID) != "undefined"){
				var GET_CLICK = "#"+ GET_ID;
			}else{
				if(typeof(GET_CLASS) != "undefined"){
					var GET_CLICK = "."+ GET_CLASS;
				}else{
					var GET_CLICK = GET_CALL;
				}
			}
			
			if(typeof(GET_CLICK) != "undefined" && GET_CLICK != ""){
				$(document).on("click",GET_CLICK,function(E){
					E.preventDefault();
					
					GET.REL = $(this).attr("rel");
					
					get_ajax();
				});
			}
		}else{
			get_ajax();
		}
	};
})(jQuery);