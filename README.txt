cart-allpay
===========

購物車 + 歐付寶套件 Class
內附必須使用的 js 檔案與需要更新的程式串


公版需要更動部分
================

	1.
	libs-sysconfig.php => 增加 include_once("allpay/index.php");
	注意!: 必須置於 include_once("conf/default-items.php"); 之後
	
	2.
	ws-products-detail1-tpl.html => 更改 myform 傳送目標至 {TAG_ROOT_PATH}cart/

	3.
	ws-fn-left-member-tpl.html => 更改 member.php?func=m_zone&mzt=order 連結 : 
	{TAG_ROOT_PATH}cart/?func=c_order , 並將各連結帶入根目錄標籤 {TAG_ROOT_PATH}~~

