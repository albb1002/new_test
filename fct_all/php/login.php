<?php
require "common/connect.php";

$userName = $_POST["user_name"];//用户名
$userPassword = $_POST["user_password"];//密码
if(!$userName){
    echo '<meta http-equiv="refresh" content="0;url=../login.html">';
}else{
    $sql = "select user_name,user_password from user where user_name='$userName' and user_password='$userPassword'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        echo '<meta http-equiv="refresh" content="0;url=../index.html">';
    }else{
        echo "<h1>用户名或者密码不正确</h1>";
        echo '<meta http-equiv="refresh" content="2;url=../login.html">';
    }
}


?>