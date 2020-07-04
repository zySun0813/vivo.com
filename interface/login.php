<?php
    header('content-type:text/html;charset=utf-8');

    //1、连接数据库
    include('./conn.php');

    //2、接收从登录页面传输过来的数据
    $phone = $_REQUEST['phone'];
    $password = $_REQUEST['password'];

    //3、查询数据库中是否有匹配该用户名和密码的用户
    $sql = "select * from users where phone='$phone' and password='$password'";
    $result = $mysqli->query($sql);
    if($result->num_rows>0){
        echo '{"status":200,"msg":"登录成功","login":true}';
    }else{
        echo '{"status":200,"msg":"帐号或密码错误","login":false}';
    }

    //4、关闭数据库的连接
    $mysqli->close();
?>