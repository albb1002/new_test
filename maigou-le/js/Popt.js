Array.prototype.unique = function () {//去数组重复
    return this.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");
}
var Iput = {
    confg: {
        idIframe: "PoPx", //默认可不用改
        idBox: "PoPy", //默认可不用改
        content: "", //传过来的内容
        ok: null, //弹出框之后执行的函数
        id: null, //不能为空一般传this对像而不是对像ID
        event: window.event, //这个必写一般为e就可以了
        soll: null,
        pop: null //指定ID点击时不关闭
    },
    get: function (obj) { return document.getElementById(obj); },
    lft: function (e) {
        var l = 0;
        while (e) { l += e.offsetLeft; e = e.offsetParent; }
        return l
    },
    ltp: function (e) {
        var t = 0;
        while (e) { t += e.offsetTop; e = e.offsetParent; }
        return t
    },
    clear: function () {
        Iput.confg.hand = "0"; Iput.confg.ok = null; Iput.confg.top = 0; Iput.confg.left = 0; Iput.confg.bodyHeight = 0; Iput.confg.bodyWidth = 0; Iput.confg.width = 0; Iput.confg.pop = null;
    },
    stopBubble: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();    //w3c
        } else {
            window.event.cancelBubble = true; //IE
        }
    },
    pop: function () {
        var $a = document.getElementsByTagName("body").item(0);
        var $c = document.createElement("iframe");
        var $b = document.createElement("div");
        $c.setAttribute('id', Iput.confg.idIframe);
        $b.setAttribute('id', Iput.confg.idBox);
        if ($a) {
            if (Iput.get(Iput.confg.idIframe)) {
                Iput.colse();
            }
            $a.appendChild($c);
            if ($c) {
                $c.ownerDocument.body.appendChild($b);
            }
            Iput.get(Iput.confg.idBox).innerHTML = Iput.confg.content;
            Iput.drice(Iput.confg.event);
        }

        if (!document.all) {
            window.document.addEventListener("click", Iput.hide, false);
        }
        else {
            window.document.attachEvent("onclick", Iput.hide);
        }
    },
    drice: function (e) {
        var bodyHith = Iput.confg.bodyHeight == 0 ? document.body.scrollHeight : Iput.confg.bodyHeight;
        var bodywidth = Iput.confg.bodyWidth == 0 ? document.body.scrollWidth : Iput.confg.bodyWidth;
        if (!e) e = window.event;
        var top = 0, left = 0;
        var a = Iput.get(Iput.confg.idBox);
        var b = Iput.get(Iput.confg.idIframe);
        var c = Iput.confg.id.offsetHeight;
        var d = Iput.confg.id.offsetWidth;
        if (Iput.confg.soll != null) {
            st = document.getElementById(Iput.confg.soll).scrollTop;
            sl = document.getElementById(Iput.confg.soll).scrollLeft;
        }
        if (Iput.get(Iput.confg.idIframe)) {
            if (Iput.confg.hand == "1") {
                top = Iput.confg.top + document.body.scrollTop + document.documentElement.scrollTop + e.clientY;
                left = Iput.confg.left + e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                if (a.offsetHeight + top > bodyHith) { top = top - a.offsetHeight + Iput.get(Iput.confg.idBox).firstChild.offsetHeight; }
                if (a.offsetWidth + left > bodywidth) { left = left - a.offsetWidth + Iput.get(Iput.confg.idBox).firstChild.offsetWidth; }
            }
            else if (Iput.confg.hand == "0") {
                height = c;
                top = Iput.confg.top + Iput.ltp(Iput.confg.id);
                left = Iput.confg.left + Iput.lft(Iput.confg.id);
                if (a.firstChild.offsetHeight + top + c > bodyHith) { top = top - a.firstChild.offsetHeight - c; }
                if (a.firstChild.offsetWidth + left > bodywidth) { left = left - a.firstChild.offsetWidth + d; }
            }
            else {
                height = c;
                top = Iput.confg.top - Iput.get(Iput.confg.hand).scrollTop + Iput.ltp(Iput.confg.id);
                left = Iput.confg.left - Iput.get(Iput.confg.hand).scrollLeft + Iput.lft(Iput.confg.id);

                if (a.offsetHeight + top > bodyHith) { top = top - a.offsetHeight - c; }
                if (a.offsetWidth + left > bodywidth) { left = left - a.offsetWidth - d; }

            }
        }
    },
    show: function () {
        var config = arguments[0]; var that = Iput.confg;
        Iput.clear();
        for (var i in that) { if (config[i] != undefined) { that[i] = config[i]; } };
        Iput.pop();
        if (Iput.confg.ok != null) {
            Iput.action(Iput.confg.ok());
        }
    },
    $colse: function () { Iput.colse(); },
    action: function (obj) {
        eval(obj);
    },
    ischeck: function (bol) {
        var objs = form1.getElementsByTagName("input");
        if (bol) {
            for (var i = 0; i < objs.length; i++) { if (objs[i].type.toLowerCase() == "checkbox") { objs[i].checked = true; } }
        }
        else {
            for (var i = 0; i < objs.length; i++) { if (objs[i].type.toLowerCase() == "checkbox") { objs[i].checked = false; } }
        }
    },
    contains: function (star, end, isIgnoreCase) {
        if (isIgnoreCase) {
            star = star.toLowerCase();
            end = end.toLowerCase();
        }
        var startChar = end.substring(0, 1);
        var strLen = end.length;
        for (var j = 0; j < star.length - strLen + 1; j++) {
            if (star.charAt(j) == startChar)//如果匹配起始字符,开始查找
            {
                if (star.substring(j, j + strLen) == end)//如果从j开始的字符与str匹配，那ok
                {
                    return true;
                }
            }
        }
        return false;
    },
    gData: function (name, value) {
        var top = window.top, cache = top['_CACHE'] || {};
        top['_CACHE'] = cache;
        return value ? cache[name] = value : cache[name];
    },
    rData: function (name) {
        var cache = window.top['_CACHE'];
        if (cache && cache[name]) delete cache[name];
    }
}
