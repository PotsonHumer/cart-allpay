<?php
	session_cache_limiter('private_no_expire, must-revalidate');
	session_start();
	include_once("../conf/config.inc.php");
	include_once("../libs/libs-mysql.php");
	$db = new DB($cms_cfg['db_host'],$cms_cfg['db_user'],$cms_cfg['db_password'],$cms_cfg['db_name']);
	$_SESSION[$cms_cfg['sess_cookie_name']]['SERVER_ID']=1;
	//取得網站的設定
	$sql="select * from ".$cms_cfg['tb_prefix']."_system_config where sc_id='1'";
	$selectrs = $db->query($sql);
	$row = $db->fetch_array($selectrs,1);
	$rsnum = $db->numRows($selectrs);
	if($rsnum >0 ){
		foreach($row as $key => $value){
			$_SESSION[$cms_cfg['sess_cookie_name']][$key]=$value;
		}
	}
	include_once("../libs/libs-main.php");
	$main = new MAINFUNC;
	include_once("../TP/class.TemplatePower.inc.php");
	include_once("../lang/".$cms_cfg['language']."-utf8.php");
	include_once("../allpay/index.php");
	include_once("../conf/default-items.php");
?>