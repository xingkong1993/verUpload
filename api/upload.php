<?php
try{
    $files = $_FILES;
    $post = $_REQUEST;
    if (empty($files[$post['name']])) {
        header("HTTP/1.0 201");
        exit("没有上传文件！");
    }

    $files = $files[$post['name']];

    if ($files['error'] != 0) {
        header("HTTP/1.0 201");
        exit("文件上传失败！".$files['error']);
    }
    $dir = "../upload";
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }
    $files['name'] = @iconv("UTF-8", "GB2312//IGNORE", $files['name']);
    move_uploaded_file($files['tmp_name'], $dir . "/" . $files["name"]);
    exit("上传成功！");
} catch (Exception $e){
    header("HTTP/1.0 201");
    exit("文件上传失败！".$e->getMessage());
}
