<?php
class MAINFUNC{

    //寄送確認信,電子報
    function ws_mail_send($from,$to,$mail_content,$mail_subject,$mail_type,$goto_url,$none_direct=0){
        global $TPLMSG,$cms_cfg;
        if($mail_type =="epaper"){
            set_time_limit(0);
        }
        $from_email=explode(",",$from);
        $from_name=(trim($_SESSION[$cms_cfg['sess_cookie_name']]["sc_company"]))?$_SESSION[$cms_cfg['sess_cookie_name']]["sc_company"]:$from_email[0];
        $mail_subject = "=?UTF-8?B?".base64_encode($mail_subject)."?=";
        //寄給送信者
        $MAIL_HEADER   = "MIME-Version: 1.0\n";
        $MAIL_HEADER  .= "Content-Type: text/html; charset=\"utf-8\"\n";
        $MAIL_HEADER  .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email[0].">"."\n";
        $MAIL_HEADER  .= "Reply-To: ".$from_email[0]."\n";
        $MAIL_HEADER  .= "Return-Path: ".$from_email[0]."\n";    // these two to set reply address
        $MAIL_HEADER  .= "X-Priority: 1\n";
        $MAIL_HEADER  .= "Message-ID: <".time()."-".$from_email[0].">\n";
        $MAIL_HEADER  .= "X-Mailer: PHP v".phpversion()."\n";          // These two to help avoid spam-filters
        $to_email = explode(",",$to);
        for($i=0;$i<count($to_email);$i++){
            if($i!=0 && $i%2==0){
                sleep(2);
            }
            if($i!=0 && $i%5==0){
                sleep(10);
            }
            if($i!=0 && $i%60==0){
                sleep(300);
            }
            if($i!=0 && $i%600==0){
                sleep(2000);
            }
            if($i!=0 && $i%1000==0){
                sleep(10000);
            }
            @mail($to_email[$i], $mail_subject, $mail_content,$MAIL_HEADER);
        }
        //除了電子報、忘記密碼外寄給管理者
        if($mail_type !="epaper" && $mail_type!="pw"){
            $MAIL_HEADER   = "MIME-Version: 1.0\n";
            $MAIL_HEADER  .= "Content-Type: text/html; charset=\"utf-8\"\n";
            $MAIL_HEADER  .= "From: =?UTF-8?B?".base64_encode($to_email[0])."?= <".$to_email[0].">"."\n";
            $MAIL_HEADER  .= "Reply-To: ".$to_email[0]."\n";
            $MAIL_HEADER  .= "Return-Path: ".$to_email[0]."\n";    // these two to set reply address
            $MAIL_HEADER  .= "X-Priority: 1\n";
            $MAIL_HEADER  .= "Message-ID: <".time()."-".$to_email[0].">\n";
            $MAIL_HEADER  .= "X-Mailer: PHP v".phpversion()."\n";          // These two to help avoid spam-filters
            $mail_subject .= " from ".$_SERVER["HTTP_HOST"]."--[For Administrator]";
            for($i=0;$i<count($from_email);$i++){
                @mail($from_email[$i], $mail_subject, $mail_content,$MAIL_HEADER);
            }
        }
        $goto_url=(empty($goto_url))?$cms_cfg["base_url"]:$goto_url;
		
		if(empty($none_direct)){
	        echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
	        echo "<script language=javascript>";
	        echo "Javascript:alert('".$TPLMSG['ACTION_TERM_JS']."')";
	        echo "</script>";
	        echo "<script language=javascript>";
	        echo "document.location='".$goto_url."'";
	        echo "</script>";
		}
    }
	
	// 共通方法
	function share_function(){}
}
?>