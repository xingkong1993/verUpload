###### verupload.js 1.0.0

###### 一、使用须知：
verupload.js是一款文件上传插件，通过普通按钮或者任意控件元素上传文件，插件IE目前仅支持IE10+以上浏览器，后期将逐步开放支持低版本IE浏览器。

###### 二、方法介绍
使用verupload.js只需在js中new一个既可以使用，如下面实例：
~~~
new verUpload({
    files: "#files",
    name: "files",
    load_list: true,
    success:function (d) {
        alert(d);
    },
    fail:function (d) {
        alert(d)
    },
    size:1024*4,
    ext:['jpg','jpeg','png','gif']
});
<div>
    <button id="files">上传</button>
</div>
~~~ 

###### 三、相关参数说明
1. files：上传控件，任意修饰符，推荐使用ID。
2. name：上传文件字段名称，对应file中的name。
3. load_list：是否显示上传文件列表，默认为false。
4. success：上传成功回调函数。
5. fail：上传失败回调函数。
6. size：允许上传文件的最大值，单位Kb。
7. ext：允许上传的文件后缀集合。
8. method：上传文件的提交地址，默认为：api/upload.php。
9. data-upload-more：多文件上传标记，在上传控件中加入标记表示当前控件按钮支持多文件上传，写法：data-upload-more='true'

###### 四、样式示例
[文件上传](https://www.xincheng-blog.cn/details.html?id=20190402LRSmnvUyLs)

###### 五、实例图片
![文件上传](https://github.com/xingkong1993/image_relesess/blob/master/upload.png)
![文件上传](https://github.com/xingkong1993/image_relesess/blob/master/upload5.png)
![文件上传](https://github.com/xingkong1993/image_relesess/blob/master/upload6.png)
![文件上传](https://github.com/xingkong1993/image_relesess/blob/master/upload3.png)
![文件上传](https://github.com/xingkong1993/image_relesess/blob/master/upload4.png)

###### 版权信息
> Copyright © 2019 by [搬砖的小白](https://www.xincheng-blog.cn)  
> All rights reserved。
