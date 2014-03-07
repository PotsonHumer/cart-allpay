<?php
	// 主要設定 ----
	$this->allpay_switch = true; // 於 cart class 使用歐付寶功能, true => 開啟 , false => 單獨使用歐付寶
	$this->anonymous_switch = false; // 匿名產品名稱, true => 開啟 , false => 關閉
	if($this->anonymous_switch){
		$this->anonymous_str = '網路訂單一筆'; // 匿名名稱設定
	}
	
	$this->all_cfg["MerchantID"] = "2000132"; // 特店編號
	$this->all_cfg["POST"] = "https://payment.allpay.com.tw"; // 串接主機 (正式)
	$this->all_cfg["POST"] = "http://payment-stage.allpay.com.tw"; // 串接主機 (測試) 正式環境請註解此行
	$this->all_cfg["PATH"] =  "/Cashier/AioCheckOut";
	
	$this->all_cfg["HashKey"] = "5294y06JbISpM5x9"; // Hash key
	$this->all_cfg["HashIV"] = "v77hoKGq4kWxNNIS"; // Hash IV
	
	$this->all_cfg["MerchantTradeDate"] = date("Y/m/d H:i:s"); // 廠商交易時間
	$this->all_cfg["ReturnURL"] = "http://potson.allmarketing.com.tw/new_cart/"; // 回傳網址
	$this->all_cfg["ClientBackURL"] = ""; // ALLPAY 會員回傳網址
	$this->all_cfg["OrderResultURL"] = ""; // ALLPAY 會員付款結果網址
	$this->all_cfg["PaymentInfoURL"] = $this->all_cfg["ReturnURL"]."/?ap_retrun=1"; // ATM or CVS(超商) 付費專屬資訊回傳網址
	$this->all_cfg["ItemURL"] = ""; // 商品銷售網址
	
	
	$this->all_cfg["PaymentType"] = "aio"; // 交易類型 ?? aio or allpay
	
	// allpay 參數
	if($this->all_cfg["PaymentType"] == "allpay"){
		$this->all_cfg["Currency"] = "TWD"; // 目前僅接受 TWD
		$this->all_cfg["EncodeChartset"] = "utf-8"; // Big5 or utf-8 預設 utf-8
		$this->all_cfg["UseAllpayAddress"] = ""; // 是否採用Allpay平台提供的住址 (0 or 1) 預設 0
		$this->all_cfg["ShippingDate"] = ""; // 預計出貨日 (預購商品用)
		$this->all_cfg["ConsiderHour"] = ""; // 商品猶豫期時間 (單位為小時，預設為168。 請勿低於168小時)
	}
	
	####################################################################################
	// 非預設參數	
	
	$this->all_cfg["TradeDesc"] = ""; // 交易描述
	$this->all_cfg["MerchantTradeNo"] = ""; // 廠商交易編號 (訂單編號，帶入  o_id)
	$this->all_cfg["TotalAmount"] = ""; // 交易金額 (帶入總金額)
	$this->all_cfg["ItemName"] = ""; // 商品名稱  (使用 # 分隔)
	$this->all_cfg["ChoosePayment"] = ""; // 選擇預設付款方式
	//$this->all_cfg["Remark"] = ""; // 暫無功能 放空值
	$this->all_cfg["ChooseSubPayment"] = ""; // 選擇預設付款子項目
	
	
	####################################################################################
		
	// Only ATM
	$this->all_cfg["ExpireDate"] = ""; // 允許繳費有效天數  (1 ~ 60) 預設 3
	
	// CVS & BARCODE
	$this->all_cfg["Desc_1"] = ""; // 出現在超商繳費平台螢幕上
	$this->all_cfg["Desc_2"] = "";
	$this->all_cfg["Desc_3"] = "";
	$this->all_cfg["Desc_4"] = "";
	
	// only Alipay
	$this->all_cfg["AlipayItemName"] = ""; // 商品名稱  (使用 # 分隔) 取代 ItemName
	$this->all_cfg["AlipayItemCounts"] = ""; // 商品購買數量  (使用 # 分隔)
	$this->all_cfg["AlipayItemPrice"] = ""; // 商品單價 "單價喔"!!~ (使用 # 分隔)
	$this->all_cfg["Email"] = ""; // 購買人 E-mail
	$this->all_cfg["PhoneNo"] = ""; // 購買人電話
	$this->all_cfg["UserName"] = ""; // 購買人姓名
	
	// only Tenpay
	$this->all_cfg["ExpireTime"] = ""; // 付款截止時間 (預設交易後72小時) yyy/MM/dd HH:mm:ss
	
	// only Credit 分期
	$this->all_cfg["CreditInstallment"] = "0"; // 刷卡分期期數
	$this->all_cfg["InstallmentAmount"] = "0"; // 使用刷卡分期的付款金額
	$this->all_cfg["Redeem"] = ""; // 信用卡是否使用紅利折抵 (Y or null)
	
	// only Credit 定額
	$this->all_cfg["PeriodAmount"] = ""; // 每次授權金額
	/*
	當此參數有設定值時，歐付寶會認定此次要以每次授權金額(PeriodAmount)所設定的金額做授權，
	則交易金額(TotalAmount)參數所設定的值會被換成此參數的值，表示此筆交易要定期定額做扣款。 
	(當此參數有設定金額時，請把TotalAmount也設定成跟PeriodAmount一樣)
	*/
	
	$this->all_cfg["PeriodType"] = ""; // 週期種類
	/*
	可設定以下參數:
	D:天
	M:月
	Y:年
	當設定為D時，表示以天為週期。
	當設為M時，表示以月為週期。
	當設為Y時，表示以年為週期。
	
	當使用定期定額時，此參數必須要設定
	*/
	
	$this->all_cfg["Frequency"] = ""; // 執行頻率
	/*
	此參數用來定義多久要執行一次。 至少要大於等於1次以上。 
	當PeriodType設為D時，最多可設365次。 當PeriodType設為M時，最多可設12次。 
	當PeriodType設為Y時，最多可設1次。 ※當使用定期定額時，此參數必須要設定
	*/
	
	$this->all_cfg["ExecTimes"] = ""; // 執行次數
	/*
	總共要執行幾次。
	至少要大於1次以上。
	當PeriodType設為D時，最多可設999次。
	當PeriodType設為M時，最多可設99次。
	當PeriodType設為Y時，最多可設9次。
	Ex1:當信用卡定期定額扣款為每個月扣1次500元，總共要扣12次時，
	PeriodAmount請帶500，
	PeriodType請帶M，Frequency請帶1，ExecTime請帶12。
	Ex2:當信用卡定期定額扣款為從6000元的交易金額中去固定扣款，每個月扣1次，總共要扣12次時，
	交易金額(TotalAmount)參數請帶6000，
	PeriodType請帶M，Frequency請帶1，ExecTime請帶12。
	※當使用定期定期時，此參數必須要設定	
	*/
	
	$this->all_cfg["PeriodReturnURL"] = ""; // 定期定額的執行結果回應
	/*
	若交易是信用卡定期定額的方式，則每次執行
	授權完，會將授權結果回傳到這個設定的URL。
	*/ 


	####################################################################################

	## ChoosePayment 付款方式說明 ##
	/*
		Credit : 信用卡
		WebATM : 網路ATM
		ATM : 自動櫃員機
		CVS : 超商代碼
		BARCODE : 超商條碼
		Alipay : 支付寶
		Tenpay : 財付通
		TopUpUsed : 儲值消費
	*/
	
	$this->all_cfg["allpay_type"] = array(
		"Credit" => $TPLMSG["CREDIT"],
		"WebATM" => $TPLMSG["WEBATM"],
		"ATM" => $TPLMSG["ATM"],
		"CVS" => $TPLMSG["CVS"],
		"BARCODE" => $TPLMSG["BARCODE"],
		"Alipay" => $TPLMSG["ALIPAY"],
		"Tenpay" => $TPLMSG["TENPAY"],
		//97 => $TPLMSG["TOPUPUSED"],
	);
	
	
	####################################################################################
	
	## ChooseSubPayment 指定付款方式說明 ##
	/*
		WebATM
		TAISHIN  WebATM_台新
		ESUN  WebATM_玉山
		HUANAN  WebATM_華南
		BOT  WebATM_台灣銀行
		FUBON  WebATM_台北富邦
		CHINATRUST  WebATM_中國信託
		FIRST  WebATM_第一銀行
		
		ATM
		TAISHIN  ATM_台新
		ESUN  ATM_玉山
		HUANAN  ATM_華南
		BOT  ATM_台灣銀行
		FUBON  ATM_台北富邦
		CHINATRUST  ATM_中國信託
		FIRST  ATM_第一銀行
		
		CVS
		CVS  超商代碼繳款
		OK  OK超商代碼繳款
		FAMILY  全家超商代碼繳款
		HILIFE  萊爾富超商代碼繳款
		IBON  7-11 ibon代碼繳款
		
		BARCODE
		BARCODE  超商條碼繳款
		
		Alipay  支付寶
		Tenpay  財付通
		Credit  信用卡_MasterCard_JCB_VISA
		
		TopUpUsed
		AllPay  儲值/餘額消費_歐付寶
		ESUN  儲值/餘額消費_玉山
	*/
	
	####################################################################################
	/*
		增加的 TPLMSG
	
		$TPLMSG["CREDIT"] = "Credit card"; //信用卡
		$TPLMSG["WEBATM"] = "Web ATM"; //網路ATM
		$TPLMSG["ATM"] = "ATM"; //自動櫃員機
		$TPLMSG["CVS"] = "CVS"; //超商代碼 (需加收 30 元手續費)
		$TPLMSG["BARCODE"] = "Barcode"; //超商條碼 (需加收 30 元手續費)
		$TPLMSG["ALIPAY"] = "Alipay"; //支付寶
		$TPLMSG["TENPAY"] = "Tenpay"; //財付通
		$TPLMSG["TOPUPUSED"] = "Top-up"; //儲值消費
		
		$TPLMSG['ALLPAY_BANK_CODE'] = "ATM Bank Code"; //ATM 銀行代碼
		$TPLMSG['ALLPAY_VACCOUNT'] = "ATM Premium Account"; //ATM 付費帳號
		$TPLMSG['ALLPAY_CVS_NO'] = "CVS code"; //超商繳費代碼
		$TPLMSG['ALLPAY_CVS_BAR_1'] = "Barcode 1"; //超商繳費條碼 1
		$TPLMSG['ALLPAY_CVS_BAR_2'] = "Barcode 2"; //超商繳費條碼 2
		$TPLMSG['ALLPAY_CVS_BAR_3'] = "Barcode 3"; //超商繳費條碼 3
		$TPLMSG['ALLPAY_EXPIRE'] = "Payment deadline"; //繳費期限
		$TPLMSG['ORDER_PENDING'] = "Pending payment"; //待付款
		$TPLMSG['ORDER_DONE'] = "Paid"; //已付款
	*/
?>