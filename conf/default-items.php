<?php
		$ws_array["order_status"] = array(
			0 => $TPLMSG["ORDER_NEW"],
			1 => $TPLMSG["ORDER_DEALING"],
			2 => $TPLMSG["ORDER_PRODUCTS_SEND"],
			3 => $TPLMSG["ORDER_COMPLETED"],
			4 => $TPLMSG['ORDER_PENDING'],
			5 => $TPLMSG['ORDER_DONE'],
			9 => $TPLMSG["ORDER_CANCEL"],
			10 => $TPLMSG["ORDER_REJECT"]
		);
		
		if($allpay->allpay_switch && !empty($allpay->all_cfg["allpay_type"])){
			$ws_array["payment_type"] = array( 1 => $TPLMSG["PAYMENT_CASH_ON_DELIVERY"] ) + $allpay->all_cfg["allpay_type"];
		}else{
			$ws_array["payment_type"] = array( 0 => $TPLMSG["PAYMENT_ATM"] , 1 => $TPLMSG["PAYMENT_CASH_ON_DELIVERY"] );
		}
		
		$ws_array["contact_s"]=array(
			1 => 'Mr.',
			2 => 'Miss.',
			3 => 'Mrs.',
		);
?>