<?php
header("Content-type: text/html; charset=utf-8");
$conn = new mysqli("localhost", "root","","test");
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

?>