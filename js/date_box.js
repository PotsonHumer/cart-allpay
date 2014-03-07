// JavaScript Document

/* 使用方法

$(".class or #id").date_box({
	SWITCH : 0, // 功能選擇 , 0 => 綜合功能 , 1 => 年 , 2 => 月 , 3 => 日
	SET : "", // 預設日期, 格式範例 : 1900-01-01,
	RANGE : "", // 限制範圍,指定時間往後計算天數
});

*/

(function($){
	// only for progrem
	function log(INPUT){
		console.log(INPUT);
	}
	
	$.fn.date_box = function(OPTION){
		var DATE = jQuery.extend({
			SWITCH : 0, // 功能選擇 , 0 => 綜合功能 , 1 => 年 , 2 => 月 , 3 => 日
			SET : "", // 預設日期, 格式範例 : 1900-01-01,
			RANGE : "", // 限制範圍,指定時間往後計算天數
			
			//----
			NOW : new Date(),
			DAY : "",
			Y : "",
			M : "",
			D : "",
			OBJ_Y : "",
			OBJ_M : "",
			OBJ_D : "",
			
			//---- for range
			Y_RS : "",
			Y_RE : "",
			M_RS : "",
			M_RE : "",
			D_RS : "",
			D_RE : "",
			
			Y_OS : "",
			Y_OE : "",
			M_OS : "",
			M_OE : "",
			D_OS : "",
			D_OE : "",
		}, OPTION);
		
		var THIS = this;
		
		DATE.Y = DATE.NOW.getFullYear();
		DATE.M = DATE.NOW.getMonth() - -1;
		DATE.D = DATE.NOW.getDate();
		
		// SET
		if(DATE.SET != ""){
			var SET_ARRAY = DATE.SET.split("-");
			
			DATE.Y = SET_ARRAY[0] - 0;
			DATE.M = SET_ARRAY[1] - 0;
			DATE.D = SET_ARRAY[2] - 0;
		}
		
		// RANGE
		if(DATE.RANGE != ""){
			var DAYS = DAY_YEAR(); // 指定年全天數
			var ALL_DAYS = DATE.RANGE - -DAYS;
			var RANGE_ARRAY = YEAR_DAY(ALL_DAYS).split(",");
			var Y_RANGE = RANGE_ARRAY[0];
			
			//---- YEAR
			DATE.Y_RS = DATE.Y;
			DATE.Y_RE = DATE.Y - -Y_RANGE;
			
			DATE.Y_OS = DATE.Y_RS;
			DATE.Y_OE = DATE.Y_RE;
			
			//---- MONTH
			if(Y_RANGE > 0){
				DATE.M_RS = DATE.M;
				DATE.M_RE = 12;
			}else{
				DATE.M_RS = DATE.M;
				DATE.M_RE = RANGE_ARRAY[1];
			}
			
			DATE.M_OS = DATE.M_RS;
			DATE.M_OE = DATE.M_RE;
			
			//---- DAY
			if(DATE.M_RS == DATE.M_RE){
				DATE.D_RS = DATE.D;
				DATE.D_RE = RANGE_ARRAY[2];
			}else{
				DATE.D_RS = DATE.D;
				DATE.D_RE = DAY_COUNT(DATE.Y_RS,DATE.M_RS);
			}
			
			DATE.D_OS = DATE.D_RS;
			DATE.D_OE = DATE.D_RE;
		}else{
			DATE.Y_RS = 1900;
			DATE.Y_RE = DATE.Y - -10;
			DATE.M_RS = 1;
			DATE.M_RE = 12;
			DATE.D_RS = 1;
			DATE.D_RE = DAY_COUNT(DATE.Y,DATE.M);
		}
		
		function DATE_RANGE(SWITCH){
			var INPUT_Y = DATE.OBJ_Y.val();
			var INPUT_M = DATE.OBJ_M.val();
			
			if(DATE.RANGE != ""){
				switch(SWITCH){
					// YEAR ACT
					case 1:
						if(RANGE_ARRAY[0] > 0){
							if(DATE.Y_OS == INPUT_Y){
								// month
								DATE.M_RS = DATE.M_OS;
								DATE.M_RE = 12;
								
								// day
								if(DATE.M_OS == INPUT_M){
									DATE.D_RS = DATE.D_OS;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}else{
									DATE.D_RS = 1;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}
							}
							
							if(DATE.Y_OE == INPUT_Y){
								// month
								DATE.M_RS = 1;
								DATE.M_RE = RANGE_ARRAY[1];
								
								// day
								if(RANGE_ARRAY[1] == INPUT_M){
									DATE.D_RS = 1;
									DATE.D_RE = RANGE_ARRAY[2];
								}else{
									DATE.D_RS = 1;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}
							}
							
							if(DATE.Y_OS < INPUT_Y && DATE.Y_OE > INPUT_Y){
								// month
								DATE.M_RS = 1;
								DATE.M_RE = 12;
								
								// day
								DATE.D_RS = 1;
								DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
							}
							
							MONTH_LIST();
						}
					break;
					
					// MONTH ACT
					case 2:
						if(RANGE_ARRAY[0] > 0){
							if(DATE.Y_OS == INPUT_Y){
								if(DATE.M_OS == INPUT_M){
									DATE.D_RS = DATE.D_OS;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}else{
									DATE.D_RS = 1;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}
							}
							
							if(DATE.Y_OE == INPUT_Y){
								if(RANGE_ARRAY[1] == INPUT_M){
									DATE.D_RS = 1;
									DATE.D_RE = RANGE_ARRAY[2];
								}else{
									DATE.D_RS = 1;
									DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
								}
							}
							
							if(DATE.Y_OS < INPUT_Y && DATE.Y_OE > INPUT_Y){
								DATE.D_RS = 1;
								DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
							}
						}else{
							if(DATE.M_OS == INPUT_M){
								DATE.D_RS = DATE.D_OS;
								DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
							}
							
							if(DATE.M_OE == INPUT_M){
								DATE.D_RS = 1;
								DATE.D_RE = RANGE_ARRAY[2];
							}
							
							if(DATE.M_OS < INPUT_M && DATE.M_OE > INPUT_M){
								DATE.D_RS = 1;
								DATE.D_RE = DAY_COUNT(INPUT_Y,INPUT_M);
							}
						}
					break;
				}
			}
		}
		
		function DAY_YEAR(){
			var DAYS = 0;
			for(var M=1;M<=DATE.M - 1;M++){
				DAYS = DAY_COUNT(DATE.Y,M) - -DAYS;
			}
			
			return DAYS - -DATE.D;
		}
		
		function YEAR_DAY(DAYS,YEARS_COUNT){
			var M_DAYS = 0;
			if(typeof(YEARS_COUNT) == "undefined"){
				YEARS_COUNT = 0;
			}
			
			for(var M=1;M<=12;M++){
				M_DAYS = DAY_COUNT(DATE.Y - -YEARS_COUNT,M);
				
				if(M_DAYS > DAYS){
					return YEARS_COUNT +','+ M +','+ DAYS;
				}
				
				DAYS = DAYS - M_DAYS;
			}
			
			return YEAR_DAY(DAYS,YEARS_COUNT - -1);
		}
				
		// YEAR
		function YEAR_LIST(){
			DATE.OBJ_Y.html("");
			
			for(Y=DATE.Y_RS;Y<=DATE.Y_RE;Y++){
				
				if(DATE.Y == Y){
					var OPTION_STR = '<option value="'+ Y +'" selected>'+ Y +'</option>';
				}else{
					var OPTION_STR = '<option value="'+ Y +'">'+ Y +'</option>';
				}
				
				DATE.OBJ_Y.append(OPTION_STR);
			}
		}
		
		// MONTH
		function MONTH_LIST(DEF_M){
			DATE.OBJ_M.html("");
			
			for(M=DATE.M_RS;M<=DATE.M_RE;M++){
				if(typeof(DEF_M) == "undefined" && M == DATE.M || typeof(DEF_M) != "undefined" && DEF_M == M){
					var OPTION_STR = '<option value="'+ M +'" selected>'+ M +'</option>';
				}else{
					var OPTION_STR = '<option value="'+ M +'">'+ M +'</option>';
				}
				
				DATE.OBJ_M.append(OPTION_STR);
			}
		}
		
		// DAY
		function DAY_LIST(INPUT_Y,INPUT_M){
			DATE.OBJ_D.html("");
			
			var DAY_END = DAY_COUNT(INPUT_Y,INPUT_M);
			
			if(DATE.RANGE == ""){
				DATE.D_RE = DAY_END;
			}
			
			for(D=DATE.D_RS;D<=DATE.D_RE;D++){
				if(DATE.D == D){
					DATE.OBJ_D.append('<option value="'+ D +'" selected>'+ D +'</option>');
				}else{
					DATE.OBJ_D.append('<option value="'+ D +'">'+ D +'</option>');
				}
			}
		}
		
		// DAY END COUNT
		function DAY_COUNT(LEAP_Y,LEAP_M){
			LEAP_Y = LEAP_Y - 0;
			LEAP_M = LEAP_M - 0;
			
			switch(LEAP_M){
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					var DAY_END = 31;
				break;
				
				case 4:
				case 6:
				case 9:
				case 11:
					var DAY_END = 30;
				break;
				
				case 2:
					if((LEAP_Y %4==0 && LEAP_Y % 100!=0) || (LEAP_Y % 400==0)){
						var DAY_END = 29;
					}else{
						var DAY_END = 28;
					}		
				break;
			}
			
			return DAY_END;
		}
		
		function accDiv(arg1,arg2){
			var t1=0,t2=0,r1,r2;
			try{ t1=arg1.toString().split(".")[1].length }catch(e){}
			try{ t2=arg2.toString().split(".")[1].length }catch(e){}
			with(Math){
				r1=Number(arg1.toString().replace(".",""))
				r2=Number(arg2.toString().replace(".",""))
				return (r1/r2)*pow(10,t2-t1);
			}
		}
			
		// ACT
		return this.each(function(KEY){
			switch(DATE.SWITCH){
				case 1:
					DATE.OBJ_Y = $(this);
					YEAR_LIST(1);
				break;
				case 2:
					DATE.OBJ_M = $(this);
					MONTH_LIST(1);
				break;
				case 3:
					DATE.OBJ_D = $(this);
					DAY_LIST(DATE.Y,DATE.M);
				break;
				
				default:
					var FUNC = $(this).attr("rel");
					
					switch(FUNC){
						case "y":
							DATE.OBJ_Y = $(this);
							YEAR_LIST();
							
							$(this).change(function(){
								DATE_RANGE(1);
								DAY_LIST($(this).val(),DATE.OBJ_M.val());
							});
						break;
						case "m":
							DATE.OBJ_M = $(this);
							MONTH_LIST();
							
							$(this).change(function(){
								DATE_RANGE(2);
								DAY_LIST(DATE.OBJ_Y.val(),$(this).val());
							});
						break;
						case "d":
							DATE.OBJ_D = $(this);
							DAY_LIST(DATE.Y,DATE.M);
							
							$(this).change(function(){
								DATE.D = $(this).val();
							});
						break;
					}
				break;
			}
		});
		
	};
})(jQuery);