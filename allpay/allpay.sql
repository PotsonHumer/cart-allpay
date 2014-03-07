-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生日期: 2014 年 02 月 25 日 16:06
-- 伺服器版本: 5.0.22
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫: `amg_potson`
--

-- --------------------------------------------------------

--
-- 表的結構 `eng_allpay_order`
--

CREATE TABLE IF NOT EXISTS `eng_allpay_order` (
  `ao_id` int(8) NOT NULL auto_increment,
  `o_id` varchar(20) NOT NULL,
  `MerchantID` varchar(10) NOT NULL COMMENT '特店編號',
  `RtnCode` int(11) NOT NULL COMMENT '交易狀態 1 => 成功 , 其他失敗',
  `RtnMsg` varchar(200) NOT NULL COMMENT '交易訊息',
  `TradeNo` varchar(20) NOT NULL COMMENT '歐付寶交易編號',
  `TradeAmt` text NOT NULL COMMENT '總金額',
  `PaymentDate` varchar(20) NOT NULL COMMENT '付款時間',
  `PaymentType` varchar(20) NOT NULL COMMENT '付款類型',
  `PaymentTypeChargeFee` text NOT NULL COMMENT '手續費',
  `TradeDate` varchar(20) NOT NULL COMMENT '訂單成立時間',
  `SimulatePaid` tinyint(1) NOT NULL COMMENT '模擬付款',
  `CheckMacValue` text NOT NULL COMMENT '檢查碼',
  PRIMARY KEY  (`ao_id`),
  KEY `o_id` (`o_id`),
  KEY `TradeNo` (`TradeNo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=53 ;

-- --------------------------------------------------------

--
-- 表的結構 `eng_allpay_payinfo`
--

CREATE TABLE IF NOT EXISTS `eng_allpay_payinfo` (
  `ap_id` int(8) NOT NULL auto_increment,
  `o_id` varchar(20) NOT NULL,
  `MerchantID` varchar(10) NOT NULL COMMENT '廠商編號',
  `RtnCode` int(11) NOT NULL COMMENT 'ATM = 2:取號成功 CVS或BARCODE = 10100073:取號成功 其餘為失敗',
  `RtnMsg` varchar(255) NOT NULL COMMENT '交易訊息',
  `TradeNo` varchar(20) NOT NULL COMMENT 'AllPay的交易編號',
  `TradeAmt` text NOT NULL COMMENT '交易金額',
  `PaymentType` varchar(20) NOT NULL COMMENT '付款方式',
  `TradeDate` varchar(20) NOT NULL COMMENT '訂單成立時間',
  `CheckMacValue` text NOT NULL COMMENT '檢查碼',
  `BankCode` varchar(3) NOT NULL COMMENT 'ATM 銀行代碼',
  `vAccount` varchar(16) NOT NULL COMMENT 'ATM 虛擬帳號',
  `PaymentNo` varchar(14) NOT NULL COMMENT 'CVS 繳費代碼',
  `Barcode1` varchar(20) NOT NULL COMMENT 'CVS 條碼第一段號',
  `Barcode2` varchar(20) NOT NULL COMMENT 'CVS 條碼第二段號',
  `Barcode3` varchar(20) NOT NULL COMMENT 'CVS 條碼第三段號',
  `ExpireDate` varchar(10) NOT NULL COMMENT '繳費期限',
  PRIMARY KEY  (`ap_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
