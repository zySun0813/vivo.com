<?php
    header('content-type:text/html;charset=utf-8');

    //1、首先连接数据库
    include('./conn.php');

    //2、获取从注册页面传来的表单数据
    $password = $_REQUEST['password'];
    $phone = $_REQUEST['phone'];

    //3、判断数据库中的user表中是否有该用户名，如果没有的话，允许注册，否则不允许
    $sqlphone = "select * from users where phone='$phone'";
    $result = $mysqli->query($sqlphone);
    if($result->num_rows>0){
        echo '{"status":200,"msg":"用户名已经存在","has":true}';
        //关闭数据库的连接
        $mysqli->close();
        //结束
        die;
    }

    //4、将用户传入过来的数据插入数据库中
    $sqlInsert = "insert into users(password,phone)values('$password','$phone')";
    $res = $mysqli->query($sqlInsert);
    //关闭数据库
    $mysqli->close();
    if($res){
        echo '{"status":200,"msg":"注册成功","regist":true,"has":false}';
    }else{
        echo '{"status":200,"msg":"注册失败","regist":true,"has":false}';
    }
?>