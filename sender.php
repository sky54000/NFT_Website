<?php
/*
 **************************************
 *									  *
 * Config here                        *
 *									  *
 **************************************
 */

$to = 'askipteam@protonmail.com';
$siteName = "NFT Website - perso.nassoy-robin.fr";

/*
 *************************************************************
 *									                         *
 *      PHP to send e-mail      							 *
 *									                         *
 *************************************************************
 */

$name = $_POST['fname'];
$mail = $_POST['email'];
$subject = $_POST['subj'];
$message = $_POST['mssg'];

if (isset($name) && isset($mail) && isset($message)) {
	

	$mailSub = '[Contact] [' . $siteName . '] '.$subject;

	$body = 'Sender Name: ' . $name . "\n\n";
	$body .= 'Sender Mail: ' . $mail . "\n\n";
	$body .= 'Message Subject: ' . $subject . "\n\n";
	$body .= 'Message: ' . $message;

	$header = 'From: ' . $mail . "\r\n";
	$header .= 'Reply-To:  ' . $mail . "\r\n";
	$header .= 'X-Mailer: PHP/' . phpversion();

	echo mail($to, $mailSub, $body, $header);
}else{
	echo '0';
}
?>