/*actions for this project*/
function initVoteContent() {
    var html = "";
    var pageCount = Math.ceil((voteFuncContent.length + 1) / 2);
    for (var i = 0; i < pageCount; i++) {
        if (i == 0) {
            html += '<div class="page ">';
            html += '<div class="page1-top">'
            html += '<div class="top-right"></div>'
            html += '<div class="top-leftU">Vote & Win Big</div>'
            html += '<div class="top-leftD">Pick your favourite shows and movies and stand a chance<br>to win Mi TVs, Mi Soundbars and lots more.</div>'
            html += '</div>'
            html += '<div class="topic toppic-top-first">';
            html += '<div class="title">' + voteFuncContent[i * 2].title + '</div>';
            html += '<div class="list list' + (i * 2 + 1) + '">';
            for (var j = 0; j < voteFuncContent[i * 2].poster.length; j++) {
                html += '<div id="' + "itemid_" + (i * 2 + 1) + "_" + (j + 1) + '" class="item item' + (j + 1) + '">';
                html += '<div class="poster-img" style="background-image:url(' + voteFuncContent[i * 2].poster[j].img + ')">';
                html += '<div class="item-bg item-vote"> </div>';
                html += '<div class="item-bg item-voted"> </div>';
                html += '</div>';
                html += '<div class="poster-name">' + voteFuncContent[i * 2].poster[j].name + '</div>';
                html += '</div>';
            };
            html += '</div>';
            html += '</div>';
            html += '</div>';
            continue;
        }
        html += '<div class="page">';
        html += '<div class="topic toppic-top0">';
        html += '<div class="title">' + voteFuncContent[i * 2 - 1].title + '</div>';
        html += '<div class="list list' + (i * 2) + '">';
        for (var j = 0; j < voteFuncContent[i * 2 - 1].poster.length; j++) {
            html += '<div  id="' + "itemid_" + (i * 2) + "_" + (j + 1) + '" class="item item' + (j + 1) + '">';
            html += '<div class="poster-img" style="background-image:url(' + voteFuncContent[i * 2 - 1].poster[j].img + ')">';
            html += '<div class="item-bg item-vote"> </div>';
            html += '<div class="item-bg item-voted"> </div>';
            html += '</div>';
            html += '<div class="poster-name">' + voteFuncContent[i * 2 - 1].poster[j].name + '</div>';
            html += '</div>';
        };
        html += '</div>';
        html += '</div>';
        if (i * 2 < voteFuncContent.length) {
            html += '<div class="topic toppic-top1">';
            html += '<div class="title">' + voteFuncContent[i * 2].title + '</div>';
            html += '<div class="list list' + (i * 2 + 1) + '">';
            for (var j = 0; j < voteFuncContent[i * 2].poster.length; j++) {
                html += '<div  id="' + "itemid_" + (i * 2 + 1) + "_" + (j + 1) + '" class="item item' + (j + 1) + '">';
                html += '<div class="poster-img" style="background-image:url(' + voteFuncContent[i * 2].poster[j].img + ')">';
                html += '<div class="item-bg item-vote"> </div>';
                html += '<div class="item-bg item-voted"> </div>';
                html += '</div>';
                html += '<div class="poster-name">' + voteFuncContent[i * 2].poster[j].name + '</div>';
                html += '</div>';
            };
            html += '</div>';
            html += '</div>';
        }
        if (i == pageCount-1) {
            html += '<div id="page-submit" class="page-submit"> </div>';
        }
        html += '</div>';
    }
    $("#pagecontent").html(html);
}

function clickFocus() {
    var focusObj = pageFocusList[currentFocus];
    var clickfunc = focusObj.clickfunc;
    if (clickfunc != "") {
        eval(clickfunc);
    }
}

function setFocus(idx) {
    var focusObj = pageFocusList[idx];
    var focusfunc = focusObj.focusfunc;
    if (focusfunc != "") {
        eval(focusfunc);
    }
}

function removeFocus(idx) {
    var focusObj = pageFocusList[idx];
    var unfocusfunc = focusObj.unfocusfunc;
    if (unfocusfunc != "") {
        eval(unfocusfunc);
    }
}

var conf = {
    backPressFunction: backPressed,
    focusList: pageFocusList,
    cancleKeyDownAction: cancleKeyDownAction,
    useBacktrace: false
};
initPage(conf);


function showPicFocus(pageNo, idx) {

    //已投票选项获取焦点后样式不变
    if (myVotedState[pageNo] == idx) {
        return;
    }
    var dom = $(".list" + pageNo + " .item" + idx + " .item-vote");
    if (dom.length == 0) {
        return;
    }
    if (dom.css("display") != "none") {
        $(".list" + pageNo + " .item" + idx + " .item-vote").hide()
    } else {
        dom.show()
    }
}

function showSubmit() {
    var submitDom = $(".page-submit");
    if (submitDom.length == 0) {
        return;
    };
    var scale = 1.2
    if (submitDom.css("transform") && submitDom.css("transform").indexOf("1.2") > -1) {
        scale = 1
    }
    submitDom.transition({
        scale: scale
    }, 200, "linear", function () {});

}

function voteFunc(pageNo, idx) {
    log(pageNo + "  " + idx);
    if (myVotedState[pageNo] != idx) {
        var votedDom = $(".list" + pageNo + " .item" + idx + " .item-voted");
        var voteDom = $(".list" + pageNo + " .item" + idx + " .item-vote");
        var domOld = $(".list" + pageNo + " .item" + myVotedState[pageNo] + " .item-voted");
        if (votedDom.length == 0 || voteDom.length == 0) {
            return;
        }
        domOld.hide(); //上一个选中态样式消失
        votedDom.show(); //当前选中态样式出现
        voteDom.hide(); //当前选中态焦点框消失
        myVotedState[pageNo] = idx; //更新选中态对象

        // gtag("event","vote2-vote:categoryNo="+(pageNo)+",nomineeNo="+idx+",channel："+"pc");
    }
}

function inputEmail() {

    var inputDom = $("#dialog-input");
    if (inputDom && inputDom.css("border").indexOf("0.6") > -1) {
        inputDom.css("border", "1px solid rgba(255, 255, 255,1)")
        // mygetFocus();
    } else {
        inputDom.css("border", "1px solid rgba(255, 255, 255,0.6)")
    }
}

function mygetFocus() {
    $("#dialog-input").focus();
}

function updateDialogBtn() {
    var submitDom = $(".dialog-button");
    if (submitDom.length == 0) {
        return;
    };
    if (submitDom.css("background-image") && submitDom.css("background-image").indexOf("submit2") > -1) {
        submitDom.css("background-image", "url(https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/398e1e9e4b653acd71c38a629a35f81e/submit1.png)")
    } else {
        submitDom.css("background-image", "url(https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/8ab5244003197c08b8e99a85edd59670/submit2.png)")
    }
}

function updateSkipBtn() {
    var submitDom = $(".dialog-skip");
    if (submitDom.length == 0) {
        return;
    };
    if (submitDom.css("background-image") && submitDom.css("background-image").indexOf("skip2") > -1) {
        submitDom.css("background-image", "url(https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/1b6b109102a6aa92ce6da79d6fb9ff66/skip1.png)")
    } else {
        submitDom.css("background-image", "url(https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/8dcdde5caffa8ebe6b018b21430b7e0a/skip2.png)")
    }
}

function cancelDialog() {
    if ($(".dialog").css("display") != "none") {
        $(".dialog").hide();
        // $(".vote-over").show();
        var email = $.trim($("#dialog-input").val());
        var eStr = 'input:0'
        if (typeof email == "undefined" || email == null || email == "") {
            eStr = 'input:1'
        }
        gtag("event", eStr, {
            'event_category': 'skip',
            'event_label': 'web'
        });
    }
    $(".vote-over2").show()
    // CloseWebPage()
}

function submit() {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    var email = $.trim($("#dialog-input").val());
    if (!reg.test(email)) {
        showTip("Enter a valid email ID");
        return;
    }
    $(".dialog").hide();
    $(".vote-over").show();

    var vStr = ''
    for (v in myVotedState) {
        if (myVotedState[v] != 0) {
            vStr += voteFuncContent[v - 1].title + ':' + voteFuncContent[v - 1].poster[myVotedState[v] - 1].name + "-" + voteFuncContent[v - 1].poster[myVotedState[v] - 1].title + ','
        }
    }
    vStr = vStr.substr(0, vStr.length - 1)
    gtag("event", "card_selected:1,email_address:" + email + "," + vStr, {
        'event_category': 'submit_email_and_result',
        'event_label': 'web'
    });
}

//true继续  false取消监听
function cancleKeyDownAction() {
    if ($(".vote-over").css("display") != "none" && $(".dialog").css("display") == "none") { //答题结束
        return false;
    }
    if ($(".dialog").css("display") != "none") {
        if (currentFocus == pageFocusList.length - 3 && (event.keyCode == KC_OK)) {
            return true;
        }
        if (currentFocus == pageFocusList.length - 3 && (event.keyCode != KC_DOWN)) { //input按下 或者ok 继续
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function backPressed() {
    if ($(".dialog").css("display") != "none") {
        $(".dialog").hide();
        currentFocus = pageFocusList.length - 4;
        return false;
    }
    return true;
}

function showTip(text) {
    text = text || "Thank you!"
    $("#tip").fadeIn(1200);
    $("#tip").html('<div class="tip-icon"></div><div>'+text+'</div>');
    setTimeout(function () {
        $("#tip").fadeOut(1200);
    }, 2300)
}

$(".item").hover(function (event) {
    console.log("in", event)
}, function (event) {
    console.log("out", event)
})

$("#pagecontent").on('mouseenter', '.item', function (event) {
    var target = event.target || event.srcElement;
    var id = upTo(target, "itemid_");
    if (id == -1) {
        return;
    }
    var pageNo = id.split("_")[1];
    var index = id.split("_")[2];
    if (myVotedState[pageNo] != index) {
        var voteDom = $("#" + id + " .item-vote");
        voteDom.show();
    }
})

$("#pagecontent").on('mouseleave', '.item', function (event) {
    var target = event.target || event.srcElement;
    var id = upTo(target, "itemid_");
    if (id == -1) {
        return;
    }
    var pageNo = id.split("_")[1];
    var index = id.split("_")[2];
    if (myVotedState[pageNo] != index) {
        var voteDom = $("#" + id + " .item-vote");
        voteDom.hide();
    }
})

//pc
$("#pagecontent").click(function (event) {
    var target = event.target || event.srcElement;
    var id = upTo(target, "itemid_");
    if (id == -1) {
        return;
    } else if (id == "showdialog") {
        showdialog();
        return;
    }
    var pageNo = id.split("_")[1];
    var index = id.split("_")[2];
    if (myVotedState[pageNo] != index) {
        var votedDom = $("#" + id + " .item-voted");
        var voteDom = $("#" + id + " .item-vote");
        var domOld = $("#itemid_" + pageNo + "_" + myVotedState[pageNo] + " .item-voted");
        if (votedDom.length == 0 || voteDom.length == 0) {
            return;
        }
        domOld.hide(); //上一个选中态样式消失
        votedDom.show(); //当前选中态样式出现
        voteDom.hide(); //当前选中态焦点框消失
        myVotedState[pageNo] = index; //更新选中态对象
        gtag("event", "card_selected=1," + voteFuncContent[pageNo - 1].title + ":" + voteFuncContent[pageNo - 1].poster[index - 1].name + "-" + voteFuncContent[pageNo - 1].poster[index - 1].title, {
            'event_category': 'card_click',
            'event_label': 'web'
        });
    } else {
        var votedDom = $("#" + id + " .item-voted");
        votedDom.hide()
        myVotedState[pageNo] = 0
        gtag("event", "card_selected=0," + voteFuncContent[pageNo - 1].title + ":" + voteFuncContent[pageNo - 1].poster[index - 1].name + "-" + voteFuncContent[pageNo - 1].poster[index - 1].title, {
            'event_category': 'card_click',
            'event_label': 'web'
        });
    }
    window.votedCount = 0;
    for (v in myVotedState) {
        if (myVotedState[v] != 0) {
            votedCount++
        };
    }
    var submitDom = $(".page-submit");
    if (window.votedCount < 1) {
        submitDom.css("background-image", 'url("./img/btn_submit_disable.png")')
    } else {
        submitDom.css("background-image", 'url("./img/btn_submit.png")')
    }
});
$("#dialog-button").click(function () {
    submit();
});
$("#dialog-skip").click(function () {
    cancelDialog();
});
$("#dialog").click(function () {
    $(".dialog").hide();
});
$("#dialog-main").click(function () {
    event.stopPropagation();
});

function showdialog(event) {
    window.votedCount = 0;
    for (v in myVotedState) {
        if (myVotedState[v] != 0) {
            votedCount++
        };
    }
    if (window.votedCount < 1) {
        showTip("Vote To Submit");
        return;
    }

    $(".dialog").show();
    var vStr = ''
    for (v in myVotedState) {
        if (myVotedState[v] != 0) {
            vStr += voteFuncContent[v - 1].title + ':' + voteFuncContent[v - 1].poster[myVotedState[v] - 1].name + "-" + voteFuncContent[v - 1].poster[myVotedState[v] - 1].title + ','
        }
    }
    vStr = vStr.substr(0, vStr.length - 1)
    gtag("event", "card_selected=1," + vStr, {
        'event_category': 'submit_result',
        'event_label': 'web'
    });
}

function upTo(el, tagetId) {
    tagetId = tagetId.toLowerCase();
    if (el.id && el.id.toLowerCase().indexOf(tagetId) != -1) {
        return el.id;
    }
    if (el.id && el.id.toLowerCase().indexOf("page-submit") > -1) {
        return "showdialog"
    }
    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.id && el.id.toLowerCase().indexOf(tagetId) != -1) {
            return el.id;
        }
        if (el.id && el.id.toLowerCase().indexOf("page-submit") > -1) {
            return "showdialog"
        }
    }
    return -1;
}

function CloseWebPage() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = 'about:blank ';
    } else {
        window.location.href = "about:blank";
        window.close();
    }
}