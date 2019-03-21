<?php
try {
    $files = $_FILES;
    $post = $_REQUEST;
    if (empty($files[$post['name']])) {
        header("HTTP/1.0 201");
        exit("没有上传文件！");
    }
    $files = $files[$post['name']];
    $dir = "../upload";
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }
    //数组重组
    get_arr($files);
    if(count($files,1) == count($files)){
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
    } else {
        $file = [];
//        var_dump($files);
        foreach ($files as $va) {
            if ($va['error'] != 0) {
                $file[]= $va['name'];
                continue;
            }
            $va['name'] = @iconv("UTF-8", "GB2312//IGNORE", $va['name']);
            move_uploaded_file($va['tmp_name'], $dir . "/" . $va["name"]);
        }
        if(empty($file)){
            exit(json_encode(['msg'=>"上传成功"]));
        } else {
            exit(json_encode(['msg'=>"上传成功","data"=>$file]));
        }
    }

} catch (Exception $e) {
    header("HTTP/1.0 201");
    exit("文件上传失败！" . $e->getMessage());
}

function get_arr(&$files){
    if(empty($files)){
        return [];
    }
    $data = [];
    foreach ($files as $key=>$value){
        if(is_array($value)){
            foreach ($value as $ks=>$val){
                $data[$ks][$key] = $val;
            }
        }else {
            $data[$key] = $value;
        }
    }

    $files = $data;
}