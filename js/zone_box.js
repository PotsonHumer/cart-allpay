// JavaScript Document

/* 使用方法

$(document).zone_box({
	MAIN_ID : "", // 縣市元素 ID (select 元素)
	SUB_ID : "", // 區域元素 ID (select 元素)
	ZIP_ID : "", // 郵遞區號 ID (input 元素)
	ZIP_GET : "", // 輸入郵遞區號
},function(ZIP){
	//callback
});

*/

(function($){
	$.fn.zone_box = function(OPTION,CALLBACK){
		var ZONE = jQuery.extend({
			MAIN_ID : "", // 縣市元素 ID (select 元素)
			SUB_ID : "", // 區域元素 ID (select 元素)
			ZIP_ID : "", // 郵遞區號 ID (input 元素)
			ZIP_GET : "", // 輸入郵遞區號
			
			//----
			MAIN : "",
			SUB : "",
			CODE : "",
			MAIN_STR : "",
			SUB_STR : "",
			REINPUT : false,
		}, OPTION);
				
		ZONE.MAIN = new Array("請選擇","台北市","新北市","基隆市","宜蘭縣","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","嘉義市","嘉義縣","雲林縣","台南市","高雄市","澎湖縣","屏東縣","台東縣","花蓮縣","金門縣","連江縣"); //全省各縣市
		ZONE.SUB = new Array(23);
		ZONE.SUB[0] = new Array("請選擇");//請選擇 
		ZONE.SUB[1] = new Array("中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區(木柵)","文山區(景美)");//台北市 
		ZONE.SUB[2] = new Array("萬里區","金山區","板橋區","汐止區","深坑區","石碇區","瑞芳區","平溪區","雙溪區","貢寮區","新店區","坪林區","烏來區","永和區","中和區","土城區","三峽區","樹林區","鶯歌區","三重區","新莊區","泰山區","林口區","蘆洲區","五股區","八里區","淡水區","三芝區","石門區");//台北縣 
		ZONE.SUB[3] = new Array("仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區");//基隆市 
		ZONE.SUB[4] = new Array("宜蘭市","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","羅東鎮","三星鄉","大同鄉","五結鄉","冬山鄉","蘇澳鎮","南澳鄉");//宜蘭縣 
		ZONE.SUB[5] = new Array("中壢市","平鎮","龍潭鄉","楊梅鎮","新屋鄉","觀音鄉","桃園市","龜山鄉","八德市","大溪鎮","復興鄉","大園鄉","蘆竹鄉");//桃園縣 
		ZONE.SUB[6] = new Array("無分區");//新竹市 
		ZONE.SUB[7] = new Array("竹北市","湖口鄉","新豐鄉","新埔鄉","關西鎮","芎林鄉","寶山鄉","竹東鎮","五峰鄉","橫山鄉","尖石鄉","北埔鄉","峨嵋鄉");//新竹縣 
		ZONE.SUB[8] = new Array("竹南鎮","頭份鎮","三灣鄉","南庄鄉","獅潭鄉","後龍鎮","通霄鎮","苑裡鎮","苗栗市","造橋鄉","頭屋鄉","公館鄉","大湖鄉","泰安鄉","鉰鑼鄉","三義鄉","西湖鄉","卓蘭鄉");//苗栗縣 
		ZONE.SUB[9] = new Array("中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區","大安區");//台中市 
		ZONE.SUB[10] = new Array("彰化市","芬園鄉","花壇鄉","秀水鄉","鹿港鎮","福興鄉","線西鄉","和美鎮","伸港鄉","員林鎮","社頭鄉","永靖鄉","埔心鄉","溪湖鎮","大村鄉","埔鹽鄉","田中鎮","北斗鎮","田尾鄉","埤頭鄉","溪州鄉","竹塘鄉","二林鎮","大城鄉","芳苑鄉","二水鄉");//彰化縣 
		ZONE.SUB[11] = new Array("南投市","中寮鄉","草屯鎮","國姓鄉","埔里鎮","仁愛鄉","名間鄉","集集鄉","水里鄉","魚池鄉","信義鄉","竹山鎮","鹿谷鄉");//南投縣 
		ZONE.SUB[12] = new Array("無分區");//嘉義市 
		ZONE.SUB[13] = new Array("番路鄉","梅山鄉","竹崎鄉","阿里山鄉","中埔鄉","大埔鄉","水上鄉","鹿草鄉","太保市","朴子市","東石鄉","六腳鄉","新港鄉","民雄鄉","大林鎮","漢口鄉","義竹鄉","布袋鎮");//嘉義縣 
		ZONE.SUB[14] = new Array("斗南市","大埤鄉","虎尾鎮","土庫鎮","褒忠鄉","東勢鄉","台西鄉","崙背鄉","麥寮鄉","斗六市","林內鄉","古坑鄉","莿桐鄉","西螺鎮","二崙鄉","北港鎮","水林鄉","口湖鄉","四湖鄉","元長鄉");//雲林縣 
		ZONE.SUB[15] = new Array("中區","東區","南區","西區","北區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","大內區","山上區","新市區","安定區");//台南市 
		ZONE.SUB[16] = new Array("新興區","前金區","苓雅區","鹽埕區","鼓山區","旗津區","前鎮區","三民區","楠梓區","小港區","左營區","仁武區","大社區","岡山區","路竹區","阿蓮區","田寮區","燕巢區","橋頭區","梓官區","彌陀區","永安區","湖內區","鳳山區","大寮區","林園區","鳥松區","大樹區","旗山區","美濃區","六龜區","內門區","杉林區","甲仙區","桃源區","三民區","茂林區","茄萣區");//高雄市 
		ZONE.SUB[17] = new Array("馬公市","西嶼鄉","望安鄉","七美鄉","白沙鄉","湖西鄉");//澎湖縣 
		ZONE.SUB[18] = new Array("屏東市","三地門鄉","霧台鄉","瑪家鄉","九如鄉","里港鄉","高樹鄉","鹽埔鄉","長治鄉","麟洛鄉","竹田鄉","內埔鄉","萬丹鄉","潮州鎮","泰武鄉","來義鄉","萬巒鄉","嵌頂鄉","新埤鄉","南州鄉","林邊鄉","東港鎮","琉球鄉","佳冬鄉","新園鄉","枋寮鄉", "枋山鄉","春日鄉","獅子鄉","車城鄉","牡丹鄉","恆春鎮","滿州鄉");//屏東縣 
		ZONE.SUB[19] = new Array("台東市","綠島鄉","蘭嶼鄉","延平鄉","卑南鄉","鹿野鄉","關山鎮","海端鄉","池上鄉","東河鄉","成氐","長濱鄉","太麻里鄉","金峰鄉","大武鄉","達仁鄉");//台東縣 
		ZONE.SUB[20] = new Array("花蓮市","新城鄉","秀林鄉","吉安鄉","壽豐鄉","鳳林鎮","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","玉里鎮","卓溪鄉","富里鄉");//花蓮縣 
		ZONE.SUB[21] = new Array("金沙鎮","金湖鎮","金寧鄉","金城鎮");//金門縣 
		ZONE.SUB[22] = new Array("南竿鄉","北竿鄉");//連江縣 
		ZONE.CODE = new Array(23); 
		ZONE.CODE[0] = new Array("0");//請選擇 
		ZONE.CODE[1] = new Array("100","103","104","105","106","108","110","111","112","114","115","116","117");//台北市
		ZONE.CODE[2] = new Array("207","208","220","221","222","223","224","226","227","228","231","232","233","234","235","236","237","238","239","241","242","243","244","247","248","249","251","252","253");//新北市
		ZONE.CODE[3] = new Array("200","201","202","203","204","205","206");//基隆市
		ZONE.CODE[4] = new Array("260","261","262","263","264","265","266","267","268","269","270","272");//宜蘭縣
		ZONE.CODE[5] = new Array("320","324","325","326","327","328","330","333","334","335","336","337","338");//桃園縣
		ZONE.CODE[6] = new Array("300");//新竹市
		ZONE.CODE[7] = new Array("302","303","304","305","306","307","308","310","311","312","313","314","315");//新竹縣
		ZONE.CODE[8] = new Array("350","351","352","353","354","356","357","358","360","361","362","363","364","365","366","367","368","369");//苗栗縣
		ZONE.CODE[9] = new Array("400","401","402","403","404","406","407","408","411","412","413","414","420","421","422","423","424","426","427","428","429","432","433","434","435","436","437","438","439");//台中市
		ZONE.CODE[10] = new Array("500","502","503","504","505","506","507","508","509","510","511","5112","513","514","515","516","520","521","522","523","524","525","526","527","528","530");//彰化縣
		ZONE.CODE[11] = new Array("540","541","542","544","545","546","551","552","553","555","556","557","558");//南投縣
		ZONE.CODE[12] = new Array("600");//嘉義市
		ZONE.CODE[13] = new Array("602","603","604","605","606","607","608","611","612","613","614","615","616","621","622","623","624","625");//嘉義縣
		ZONE.CODE[14] = new Array("630","631","632","633","634","635","636","637","638","640","643","646","647","648","649","651","652","653","654","655");//雲林縣
		ZONE.CODE[15] = new Array("700","701","702","703","704","708","709","710","711","712","713","714","715","716","717","718","719","720","721","722","723","724","725","726","727","730","731","732","733","734","735","736","737","741","742","743","744","745");//台南市
		ZONE.CODE[16] = new Array("800","801","802","803","804","805","806","807","811","812","813","814","815","820","821","822","823","824","825","826","827","828","829","830","831","832","833","840","842","843","844","845","846","847","848","849","851","852");//高雄市
		ZONE.CODE[17] = new Array("880","881","882","883","884","885");//澎湖縣
		ZONE.CODE[18] = new Array("900","901","902","903","904","905","906","907","908","909","911","912","913","920","921","922","923","924","925","926","927","928","929","931","932","940","941","942","943","944","945","946","947");//屏東縣
		ZONE.CODE[19] = new Array("950","951","952","953","954","955","956","957","958","959","961","962","963","964","965","966");//台東縣
		ZONE.CODE[20] = new Array("970","971","972","973","974","975","976","977","978","979","981","982","983");//花蓮縣
		ZONE.CODE[21] = new Array("890","891","892","893");//金門縣
		ZONE.CODE[22] = new Array("209","210");//連江縣
		
		// MAIN
		$.each(ZONE.MAIN,function(KEY,VALUE){
			var op_val = (VALUE=="請選擇")?"":VALUE;
			ZONE.MAIN_STR += '<option value="'+ op_val +'" rel="'+ KEY +'">'+ VALUE +'</option>';
		})
		
		$("#"+ ZONE.MAIN_ID).append(ZONE.MAIN_STR);
		
		// SUB
		$("#"+ ZONE.MAIN_ID).change(function(){
			var MAIN_KEY = $(this).find("option:selected").attr('rel');
			
			zip_row(MAIN_KEY);
			
			$("#"+ ZONE.SUB_ID).html("").append(ZONE.SUB_STR);
			
			zip_load();
		});
		
		$("#"+ ZONE.SUB_ID).change(function(){
			zip_load();
		});
		
		// ZIP RE SELECT
		if(ZONE.ZIP_GET != ""){
			for(var I=0;I<ZONE.SUB.length;I++){
				zip_row(I);
			}
		}
		
		// ZIP INPUT
		$("#"+ ZONE.ZIP_ID).keyup(function(){
			ZONE.ZIP_GET = $(this).val();
			for(var I=0;I<ZONE.SUB.length;I++){
				zip_row(I);
			}
		})
		
		// ZIP
		function zip_load(){
			var ZIP = $("#"+ ZONE.SUB_ID).find("option:selected").attr('zip');
			$("#"+ ZONE.ZIP_ID).html("").val(ZIP);
			try{
				CALLBACK(ZIP);
			}catch(e){}
		}
		
		// ZIP_ROW
		function zip_row(MAIN_KEY){
			ZONE.SUB_STR = "";
			$.each(ZONE.SUB[MAIN_KEY],function(KEY,VALUE){
				var KEY_FIRST = (KEY == 0 && ZONE.ZIP_GET == "" || ZONE.ZIP_GET != "" && ZONE.ZIP_GET == ZONE.CODE[MAIN_KEY][KEY])?'selected':'';
				ZONE.SUB_STR += '<option value="'+ VALUE  +'" '+ KEY_FIRST +' zip="'+ ZONE.CODE[MAIN_KEY][KEY] +'">'+ VALUE +'</option>';
				
				if(ZONE.ZIP_GET == ZONE.CODE[MAIN_KEY][KEY]){
					$("#"+ ZONE.MAIN_ID +" option:eq("+ MAIN_KEY +")").attr("selected","selected");
					ZONE.REINPUT = true;
				}
			});
			
			if(ZONE.REINPUT){
				$("#"+ ZONE.SUB_ID).html("").append(ZONE.SUB_STR);
				ZONE.REINPUT = false;
				
				zip_load();
			}
		}
	};
})(jQuery);