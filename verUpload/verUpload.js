window.verUpload = (function () {
    var FILES,
        EXT,
        NAME,
        size,
        method = "api/upload.php",
        lists,
        files,
        images;
    var uploads = function (param) {
        if (param.files) {
            files = document.querySelector(param.files)
        } else {
            console.log("请选择上传控件");
            return false;
        }
        props;
        var links = document.createElement("link");
        links.href = getPath + "asset/upload.css?v=1.0.0";
        links.type = "text/css";
        links.rel = "stylesheet";
        links.id = "ver-upload";
        document.getElementsByTagName("head")[0].appendChild(links);
        NAME = param.name ? param.name : files.name;
        var toarray = param.ext ? param.ext : [];
        if (toarray.length) {
            toarray = toarray.join("|");
            EXT = new RegExp("(" + toarray + ")$", "i");
        }
        var input_file;
        if (input_file = files.parentElement.querySelector("input[name='" + NAME + "']")) {
            files.parentElement.removeChild(input_file);
        }
        var input_file = document.createElement("input");
        if (param.success) success = param.success;
        if (param.fail) fail = param.fail;
        if (param.save) saves = param.save;
        if (param.method) method = param.method;
        if (param.load_list) lists = true;
        size = param.size ? param.size : 0;
        input_file.type = "file";
        input_file.name = NAME;
        input_file.style.display = "none";
        input_file.onchange = upload_files;
        files.parentElement.appendChild(input_file);
        files.onclick = function () {
            var fi = this.parentElement.querySelector("input[name='"+NAME+"'][type='file']");
            fi.click();
        }
    };
    var upload_files = function () {
        if(this.files){
            FILES = this.files[0];
        }else{
            this.style.display = "inline-block";
            return fail("当前浏览器版本太低，不支持上传插件！");
        }

        if (!FILES) return false;
        if (size > 0) {
            var s = FILES.size / 1024;
            if (s > size) {
                return fail("上传文件超过限制大小【" + size + "KB】");
            }
        }

        if (EXT) {
            var ext = FILES.name.split(".");
            ext = ext[ext.length - 1];
            if (!EXT.test(ext)) {
                return fail("不支持的文件格式【" + ext + "】");
            }
        }
        var rs = /^(image)/;
        if(rs.test(FILES.type)){
            images = this.parentElement.querySelector("img");
            if(!images){
                images = document.createElement("img");
                images.width = 120;
                this.parentElement.appendChild(images);
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                images.src = e.target.result;
            };
            reader.readAsDataURL(FILES);
        }
        if (lists) {
            //查看是否有列表
            var ul = this.parentElement.querySelector(".uploadFileList");
            if (!ul) {
                ul = document.createElement("ul");
                ul.className = "uploadFileList";
                this.parentElement.appendChild(ul);
            }
            var li = document.createElement("li");
            li.className = "uploadFileListItems";
            var div1 = document.createElement("div");
            div1.className = "uploadFilewrapper uploadFilemyPromption-wrapper";
            var uploadFilemainContain = document.createElement("div");
            uploadFilemainContain.className = "uploadFilemainContain";
            var uploadFilereturnCommission = document.createElement("div");
            uploadFilereturnCommission.className = "uploadFilereturnCommission";
            var uploadFileprocess = document.createElement("div");
            uploadFileprocess.className = "uploadFileprocess";
            var uploadFileicon_flag = document.createElement("i");
            uploadFileicon_flag.className = "uploadFileicon-flag";
            var uploadFileprocess_static = document.createElement("div");
            uploadFileprocess_static.className = "uploadFileprocess-static";
            var uploadFileprocess_active = document.createElement("div");
            uploadFileprocess_active.className = "uploadFileprocess-active";
            var uploadFileLodaingText = document.createElement("div");
            uploadFileLodaingText.className = "uploadFileLodaingText";
            uploadFileprocess.appendChild(uploadFileicon_flag);
            uploadFileprocess.appendChild(uploadFileprocess_static);
            uploadFileprocess.appendChild(uploadFileprocess_active);
            uploadFileprocess.appendChild(uploadFileLodaingText);
            uploadFilereturnCommission.appendChild(uploadFileprocess);
            uploadFilemainContain.appendChild(uploadFilereturnCommission);
            div1.appendChild(uploadFilemainContain);
            li.appendChild(div1);
            var div2 = document.createElement("div");
            div2.className = "uploadFileListItemsContents";
            var uploadFileListItemsName = document.createElement("span");
            uploadFileListItemsName.className = "uploadFileListItemsName";
            uploadFileListItemsName.innerText = FILES.name;
            div2.appendChild(uploadFileListItemsName);
            var uploadFileListItemsSizes = document.createElement("span");
            uploadFileListItemsSizes.className = "uploadFileListItemsSizes";
            var ss = (Math.floor((FILES.size * 100 / 1024)) / 100);
            var tt = "kb";
            if (ss > 1024) {
                ss = (Math.floor((FILES.size * 100 / 1024 / 1024)) / 100);
                tt = "Mb";
            }
            uploadFileListItemsSizes.innerText = ss + tt;
            div2.appendChild(uploadFileListItemsSizes);
            li.appendChild(div2);
            ul.appendChild(li);
        }
        var data = new FormData();
        data.append(NAME, FILES);
        data.append("name", NAME);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", method, true);
        xhr.upload.onprogress = function (evt) {
            var pro = Math.floor((evt.loaded / evt.total * 100));
            var width = pro + "%";
            if (pro >= 5 && pro <= 10) {
                width = "10%";
            } else if (pro > 10 && pro <= 20) {
                width = 20 + "%";
            } else if (pro > 20 && pro <= 30) {
                width = "30%";
            } else if (pro > 30 && pro <= 50) {
                width = "50%";
            } else if (pro > 50 && pro <= 75) {
                width = "75%";
            } else if (pro > 75 && pro <= 90) {
                width = "90%";
            }

            if (lists) {
                uploadFileprocess_active.style.width = width;
                if (pro < 100) {
                    uploadFileLodaingText.innerText = "已上传：" + width;
                } else {
                    uploadFileLodaingText.innerText = "文件处理中...";
                }
            } else {
                console.log(width);
            }
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    if (lists) {
                        uploadFileprocess_active.style.width = "100%";
                        uploadFileprocess_active.classList.remove("uploadFileError");
                        uploadFileprocess_active.classList.add("uploadFileSuccess");
                        uploadFileprocess_static.classList.remove("uploadFileError");
                        uploadFileprocess_static.classList.add("uploadFileSuccess");
                        uploadFileLodaingText.innerText = "上传成功！";
                    }
                    success(xhr.responseText);
                } else {
                    if (lists) {
                        uploadFileprocess_active.style.width = "100%";
                        uploadFileprocess_active.classList.add("uploadFileError");
                        uploadFileprocess_active.classList.remove("uploadFileSuccess");
                        uploadFileprocess_static.classList.add("uploadFileError");
                        uploadFileprocess_static.classList.remove("uploadFileSuccess");
                        uploadFileLodaingText.innerText = "上传失败！";
                    }
                    fail(xhr.responseText);
                }
            }
        };
        xhr.send(data);
    };

    var saves = function () {

    };

    var success = function (d) {
        console.log(d);

    };

    var fail = function (d) {
        console.log(d)
    };

    var getPath = function () {
        var jsPath = document.currentScript ? document.currentScript.src : function () {
            var js = document.scripts
                , last = js.length - 1
                , src;
            for (var i = last; i > 0; i--) {
                if (js[i].readyState === 'interactive') {
                    src = js[i].src;
                    break;
                }
            }
            return src || js[last].src;
        }();
        return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }();

    //追加函数
    var props = function () {
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                if ({}.toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }

        if (!("classList" in document.documentElement)) {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function () {
                    var self = this;

                    function update(fn) {
                        return function (value) {
                            var classes = self.className.split(/\s+/g),
                                index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        }
                    }

                    return {
                        add: update(function (classes, index, value) {
                            if (!~index) classes.push(value);
                        }),

                        remove: update(function (classes, index) {
                            if (~index) classes.splice(index, 1);
                        }),

                        toggle: update(function (classes, index, value) {
                            if (~index)
                                classes.splice(index, 1);
                            else
                                classes.push(value);
                        }),

                        contains: function (value) {
                            return !!~self.className.split(/\s+/g).indexOf(value);
                        },

                        item: function (i) {
                            return self.className.split(/\s+/g)[i] || null;
                        }
                    };
                }
            });
        }
    }();
    return uploads;
})();