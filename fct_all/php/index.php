<?php
require "common/connect.php";
header("Access-Control-Allow-Origin:*");

$user_name = $_POST["user_name"];

if($user_name){
    echo true;
}else{
    echo false;
}

?>