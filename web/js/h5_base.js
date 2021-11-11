/**
 *
 */
var KC_LEFT = 37;
var KC_UP = 38;
var KC_RIGHT = 39;
var KC_DOWN = 40;
var KC_OK = 13;
var KC_ESC = 27;
var systemInfo = null;
var config = null;
var debugMode = false;
var debugDiv = null;
var music3rdPoped = false;
var pressHistory = new Array();
var focusHistory = new Array();
var detailMap = new Object();
var debugKeyCode = [38,40,37,39,38,40,37,39,38,40,37,39];
var debugKeyCodePos = 0;
var DK_PAGETYPE_DETAIL = 0;
var DK_PAGETYPE_MILIST = 1;
var DK_PAGETYPE_HEJI = 2;
var DK_PAGETYPE_ZHUANTI = 3;
var DK_PAGETYPE_ACTOR = 4;
var PERFOM_LEVEL_LOW = 1;
var PERFOM_LEVEL_MEDIUM = 2;
var PERFOM_LEVEL_HIGH = 3;
var perform_level = PERFOM_LEVEL_MEDIUM;
var perform_loaded = false;
var appVer = 0
var window_w = window.screen.height;
setTimeout(function () {
	window_w = $(window).height();
},1000)

function setDebugMode(isOn){
	if(isOn){
		debugMode = true;
		if(debugDiv == null){
			var $h1 = $("<h1></h1>");
			$("body").append($h1);
			debugDiv = $("<div></div>");
			debugDiv.attr("id","debugDiv");
			debugDiv.attr("style","position: fixed;left:0;top:0;color: white;opacity: 0.5;background-color: #000;z-index:9999");
			log("debug mod on.");
			try{
				log("resolution:" + window.screen.width + "*" + window.screen.height + " window:" + $(window).width() + "*" + $(window).height());
			}catch(e){}
		}
		$(document).ready(function() {
			$("body").append(debugDiv);
		});
	}
}
function log(text){
	if(debugMode && debugDiv != null){
		debugDiv.append(text + "<br>");
	}
}
function tryFunction(func, count){
	if(count == null){
		count = 0
	}
	count++
	if(count > 50){
		return;
	}
	if (config==null) {
		setTimeout(function(){tryFunction(func, count)}, 200)
	}else{
		try{
			eval('config.' + func)
		}catch(e){
			log(e.message)
		}
	}
}
function ONMENUPRESSED(){
	playAudio("keytone");
	//log("ONMENUPRESSED().");
}
function ONPLAYRESULT(jsondata){
	log("ONPLAYRESULT(). jsondata=" + jsondata);
	try{
		var result = JSON.parse(jsondata);
		if(result.status == -2){
			alert("播放失败，该影片已下架或不存在。");
		}else if(result.status!=0){
			alert("播放失败，错误码：" + result.status);
		}
	}catch(e){
	}
}
function ONPAGEINFO_INDIA(infojson){
	log("ONPAGEINFO_INDIA(). infojson=" + infojson);
	try{
		if(systemInfo!=null){
			return;
		}
		systemInfo = JSON.parse(infojson);
		if(systemInfo!=null){
			appVer = parseInt(systemInfo.appVer);
			tryFunction("pageInfoFunction(event)")
		}
	}catch(e){
		log(e)
	}
}
function ONPAGEINFO(infojson){
	log("ONPAGEINFO(). infojson=" + infojson);

	try{
		if(systemInfo!=null){
			return;
		}
		systemInfo = JSON.parse(infojson);
		if(systemInfo!=null && systemInfo.platformId != null && !isNaN(systemInfo.platformId)){
			//config.pageInfoFunction(event)
			tryFunction("pageInfoFunction(event)")
			var pfidNum = parseInt(systemInfo.platformId);
			if(pfidNum>200 && pfidNum<300){
				if(pfidNum<=205 || pfidNum==207){
					perform_level = PERFOM_LEVEL_LOW;
				}else if(pfidNum<=208){
					perform_level = PERFOM_LEVEL_MEDIUM;
				}else{
					perform_level = PERFOM_LEVEL_HIGH;
				}
			}else if(pfidNum>600 && pfidNum<700){
				if(pfidNum<=602){
					perform_level = PERFOM_LEVEL_LOW;
				}else{
					perform_level = PERFOM_LEVEL_HIGH;
				}
			}
			perform_loaded = true;
			if(typeof(systemInfo.appVer)!='undefined'){
				appVer = parseInt(systemInfo.appVer);
			}
		}
		log('perform_level=' + perform_level);
	}catch(e){
		log(e)
	}
}
function runAfterGetPerform(func, count){
	if(count == null){
		count = 1;
	}
	if(!perform_loaded && count<5){
		log("perform_loaded=" + perform_loaded +" loop=" + count);
		count ++;
		setTimeout(function(){runAfterGetPerform(func,count)}, 500);
		return;
	}
	log("perform_loaded=" + perform_loaded);
	func();
}
function ONBACKPRESSED(){
	//log("ONBACKPRESSED().");
	playAudio("keytone");
	if (config!=null && config.backPressFunction!=null) {
		if(!config.backPressFunction()){
			return false;
		}
	}
	try{
		window.duokantv.goBack();
	}catch(e){
		try{
			window.duokantv.exitApp()
		}catch(e){}
	}
}
function UPDATEMEDIAINFO(mediaInfo){
	try{
		log("UPDATEMEDIAINFO " + mediaInfo);
		var result = JSON.parse(mediaInfo);
		detailMap[result.mediaid + ""] = result;
	}catch(e){
	}
	for(var i = 0; i < playurl.length; i++) {
		if(result.paid==1 && playurl[i].needpay==1 && (playurl[i].mediaid_gitv == result.mediaid || playurl[i].mediaid_cntv == result.mediaid)){
			var playbtn = $('#movie' + i + '_playbtn');
			var payicon = $('#movie' + i + '_payicon');
			if(playbtn!=null && playbtn.length>0){
				playbtn.attr("loaded","1");
				playbtn.css("display","block");
			}
			if(payicon!=null && payicon.length>0){
				playbtn.attr("loaded","1");
				payicon.attr("class", "paidicon");
				payicon.css("display","block");
			}
		}
	}
}

function ONRESUME(){
	try{window.duokantv.updatePaymentInfo(JSON.stringify(playurl));}catch(e){}
}

try{
	//捕获返回键动作
	window.duokantv.catchBackEvent();
	//请求系统信息
	window.duokantv.requestSystemInfo();
}catch(e){}

function addPressHistory(keycode){
	if(pressHistory.length>20){
		pressHistory.pop();
	}
	pressHistory.unshift(keycode);
}
function addFocusHistory(idx){
	if(focusHistory.length>20){
		focusHistory.pop();
	}
	focusHistory.unshift(idx);
}
function initPage(pageConfig){
	log("set pageConfig.");
	config = pageConfig;
}
function jumptoDKPage(type, id, ci,posterurl){
	if(type == null || isNaN(type) || type<0 || type>4 || id == null || isNaN(id)){
		log("jumptoDKPage() error. type=" + type + " id=" + id);
		return;
	}
	if(ci == null || ci == 1){
		ci= -1;
	}
	var datajson = '{"mediaID":"' + id + '", "type":' + type + ', "ci":' + ci + ', "invoker":25,"poster":"' + (posterurl==null?'':posterurl) + '"}'
	try{window.duokantv.jumpToDKDetail(datajson)}catch(e){}
}
function playMovie(urlobj, toDetail){
	var mediaid = null;
	toDetail = toDetail==null?false:toDetail;
	if(systemInfo != null){
		var lisence = systemInfo.licenseType;
		if(lisence == "gitv"){
			mediaid = urlobj.mediaid_gitv;
		}else if(lisence == "cntv"){
			mediaid = urlobj.mediaid_cntv;
		}
		if(detailMap!=null && detailMap[mediaid + ""]!=null){
			mediainfo = detailMap[mediaid + ""];
			if(mediainfo.medianeedpay == 1){
				if(mediainfo.paid == 0){
					//alert("该影片需付费观看，请跳转到详情页继续操作");
					//var datajson = '{"mediaID":"' + mediaid + '", "type":0, "ci":' + (urlobj.ci==1?-1:urlobj.ci) + ', "invoker":25}'
					jumptoDKPage(DK_PAGETYPE_DETAIL, mediaid, (urlobj.ci==1?-1:urlobj.ci));
					//try{window.duokantv.jumpToDKDetail(datajson)}catch(e){}
					return;
				}else if(mediainfo.paid == 1){
				}
			}
		}
		var playJson = '{"mediaid":' + mediaid + ', "ci":' + urlobj.ci + ', "medianame":"' + urlobj.medianame + '", "source":' + urlobj.source + '}';
		log("playMovie(). playJson=" + playJson);
		saveStatus();
		if(toDetail){
			jumptoDKPage(DK_PAGETYPE_DETAIL, mediaid, (urlobj.ci==1?-1:urlobj.ci));
		}else{
			try{window.duokantv.play(playJson);}catch(e){}
		}
	}
}

var currentFocus = null;
var currentPage  = null;
var maxPage  = 1;
var nowTop = 0;
var isTurnPaging = false;
function turnPage(pageNum, prepage){
	log(new Date().getTime())
	if(pageNum == null || isNaN(pageNum)){
		return;
	}
	isTurnPaging = true;
	log("jumppage" + pageNum + " eprepage=" + prepage);
	$('body,html').stop();
	currentPage = pageNum;
	var pageDiv = $('#page' + pageNum);
	var scrollTo = (pageNum-1)*-window_w
	//var scrollTo = nowTop - pageDiv.position().top;
	var scrollOld = prepage<=pageNum?((pageNum-2)*-window_w):((pageNum)*-window_w);
	if (config!=null && config.turnPageFunction!=null) {
		try{config.turnPageFunction('start',currentPage)}catch(e){}
	}
	$('#pagecontent').css('transform','translate(0px, ' + scrollOld + 'px)');;
	pageDiv.css("visibility","");
	loadBkImg(pageNum);
	setTimeout(function(){isTurnPaging = false;}, 600)
	$('#pagecontent').transition({ y: scrollTo }, 800, 'easeOutQuint', function(){
		nowTop = scrollTo;
		if (config!=null && config.turnPageFunction!=null) {
			try{config.turnPageFunction('end',currentPage)}catch(e){}
		}
	});
	var focusMt = 0;
	if (config!=null && config.pageCount!=null) {
		focusMt = (pageNum-1)*(100/config.pageCount);
		//log(focusMt);
	}else{
		focusMt = (pageNum-1)*20;
	}
	$('#pageguidefocus').css('top',focusMt + "%");

	loadBkImg(pageNum+1);
	loadBkImg(pageNum-1);
	if(maxPage < pageNum){
		maxPage = pageNum;
	}
}

function loadBkImg(pageNum){
	var imgdom = $('#bkimg' + pageNum);
	if(imgdom!=null && imgdom.length>0 && imgdom.attr('loaded')!="1" && imgdom.attr('data-src')!=null){
		imgdom.attr('src', imgdom.attr('data-src'));
		imgdom.attr('loaded', "1");
	}
}

function jumpPage(pageNum){
	if(pageNum == null || isNaN(pageNum)){
		return;
	}
	log("jumppage" + pageNum);
	currentPage = pageNum;
	var pageDiv = $('#page' + pageNum);

	var scrollTo = (pageNum-1)*-window_w
	//var scrollTo = nowTop - pageDiv.position().top;
	var scrollOld = (pageNum-2)*-window_w;
	if (config!=null && config.turnPageFunction!=null) {
		try{config.turnPageFunction('start',currentPage)}catch(e){}
	}
	$('#pagecontent').css('transform','translate(0px, ' + scrollOld + 'px)');;
	pageDiv.css("visibility","");
	loadBkImg(pageNum);

	$('#pagecontent').transition({ y: scrollTo }, 0, 'easeOutQuint', function(){
		nowTop = scrollTo;
		isTurnPaging = false;
		if (config!=null && config.turnPageFunction!=null) {
			try{config.turnPageFunction('end',currentPage)}catch(e){}
		}
	});



	if (config!=null && config.pageCount!=null) {
		focusMt = (pageNum-1)*(100/config.pageCount);
		//log(focusMt);
	}else{
		focusMt = (pageNum-1)*20;
	}
	$('#pageguidefocus').css("top", focusMt + "%");
	loadBkImg(pageNum+1);
	loadBkImg(pageNum-1);
	if(maxPage < pageNum){
		maxPage = pageNum;
	}
	log("jumpPage(). pageNum=" + pageNum);
}
function saveStatus(tag){
	var storage = window.localStorage;
	if(storage){
		var json = '{"currentFocus":"' + currentFocus + '","currentPage":"' + currentPage + '","music3rdPoped":"' + music3rdPoped + '","maxPage":"' + maxPage + '","tmStart":"' + tm_start + '"}';
		//json = '{"page_' + tag + '":' + json'}';
		obj = getStatusObj();
		if(obj!=null){
			obj['page_' + tag] = JSON.parse(json);
		}else{
			obj = new Object();
			obj['page_' + tag] = JSON.parse(json);
		}

		//storage.currentFocus = currentFocus;
		//storage.currentPage = currentPage;
		//storage.music3rdPoped = music3rdPoped;
		saveStatusObj(obj)
		log("saveStatus() " + tag + " json=" +  JSON.stringify(obj));
	}else{
		log("saveStatus() " + tag + ".failed. localstorage unavailable.");
	}
}

function getStatusObj(){
	var storage = window.localStorage;
	if(storage){
		var status = storage.status;
		if(status == null || status == ""){
			return;
		}
		try{
			var json = JSON.parse(status);
			if(json != null){
				return json;
			}

		}catch(e){
			log(e.message);
		}
	}else{
		log("getStatus() " + tag + ".failed. localstorage unavailable.");
	}
	return null;
}
function saveStatusObj(status){
	var storage = window.localStorage;
	if(storage){
		if(status == null || status == ""){
			return;
		}
		storage.status = JSON.stringify(status);
	}else{
		log("saveStatusObj() " + tag + ".failed. ");
	}
	return null;
}

function getStatus(tag){
	var storage = window.localStorage;
	if(storage){
		var status = getStatusObj();
		if(status == null || status == "" || status['page_' + tag] == null){
			log("getStatus null")
			return;
		}
		try{
			var json = status['page_' + tag];
			if(json == null){
				return;
			}

			if(json.currentFocus!=null && !isNaN(json.currentFocus)){
				currentFocus = parseInt(json.currentFocus);
			}
			if(json.currentPage!=null && !isNaN(json.currentPage)){
				currentPage = parseInt(json.currentPage);
			}
			if(json.music3rdPoped!=null && json.music3rdPoped){
				music3rdPoped = json.music3rdPoped;
			}
			if(json.maxPage!=null && !isNaN(json.maxPage)){
				maxPage = parseInt(json.maxPage);
			}
			if(json.tmStart!=null && !isNaN(json.tmStart)){
				tm_start = parseInt(json.tmStart);
			}
			log("getStatus()" + tag + ".currentFocus=" + currentFocus + " currentPage=" + currentPage + " music3rdPoped=" + music3rdPoped + " maxPage=" + maxPage  + " tm_start=" + tm_start);
		}catch(e){
			log(e.message);
		}
	}else{
		log("getStatus()" + tag + ".failed. localstorage unavailable.");
	}
}
function cleanStatus(tag){
	var storage = window.localStorage;
	if(storage){
		obj = getStatusObj();
		if(obj!=null){
			obj['page_' + tag] = null;
		}
		saveStatusObj(obj)
		log("cleanStatus()." + tag);
	}else{
		log("cleanStatus().failed. localstorage unavailable.");
	}
}

function isReversePress(keyCode1, keyCode2){
	if(keyCode1-keyCode2==2 || keyCode2-keyCode1==2){
		return true;
	}
}
var backtraceFlag = false;
function handleKeyDownAction(event){
	//log('keydown event.keyCode=' + event.keyCode)
	if(config == null){
		return false;
	}
	if(!debugMode){
		if(debugKeyCode[debugKeyCodePos]==event.keyCode){
			debugKeyCodePos ++;
			if(debugKeyCodePos>=debugKeyCode.length){
				setDebugMode(true);
			}
		}else{
			debugKeyCodePos = 0;
		}
	}
	if(event.keyCode == 27){
		ONBACKPRESSED();
		return false;
	}
	//true 继续  false取消监听
	if (config!=null && config.cancleKeyDownAction!=null) {
		if(!config.cancleKeyDownAction(event)){
			return true;
		}
	}
	if (config!=null && config.keyPressFunction!=null) {
		if(!config.keyPressFunction(event)){
			return false;
		}
	}
	if(isTurnPaging){
		return false;
	}
	if(currentFocus!=null && config!=null && config.focusList!=null && currentFocus<config.focusList.length && currentFocus>=0){
		var focusObj = config.focusList[currentFocus];
		var nextId = -1;
		var nextNode = "none";
		if(event.keyCode == KC_LEFT){
			nextNode = focusObj.leftto;
		}else if(event.keyCode == KC_UP){
			nextNode = focusObj.upto;
		}else if(event.keyCode == KC_RIGHT){
			nextNode = focusObj.rightto;
		}else if(event.keyCode == KC_DOWN){
			nextNode = focusObj.downto;
		}else if(event.keyCode == KC_OK){
			clickFocus();
			playAudio("keytone");
			return false;
		}else{
			playAudio("error");
			return false;
		}

		if(isNaN(nextNode)){
			if(nextNode=="prev"){
				nextId = currentFocus - 1;
			}else if(nextNode=="next"){
				nextId = currentFocus + 1;
			}else if(nextNode=="none"){
				nextId = -1;
			}
		}else{
			nextId = parseInt(nextNode);
		}
		if(config!=null && config.useBacktrace==false) {
		}else{
			if(backtraceFlag){
				if(focusHistory.length>3 && isReversePress(pressHistory[2],event.keyCode)){
					nextId = focusHistory[3];
				}
				backtraceFlag = false;
			}else if(focusHistory.length>1 && isReversePress(pressHistory[0],event.keyCode)){
				nextId = focusHistory[1];
				backtraceFlag = true;
			}
		}
		if(nextId!=-1){
			var prePage = focusObj.page;
			removeFocus(currentFocus);
			currentFocus = nextId;
			var curPage = config.focusList[currentFocus].page;
			if(curPage!=prePage){
				turnPage(curPage, prePage);
			}
			setFocus(currentFocus);
			playAudio("keytone");
			addPressHistory(event.keyCode);
		}else{
			playAudio("error");
		}

		return false;
	}
}
function handleKeyUpAction(event){
	if (config!=null && config.keyUpFunction!=null) {
		if(!config.keyUpFunction(event)){
			return false;
		}
	}
}
// $(document).keydown(function(event){
// 	//if(appVer<45){
// 	return handleKeyDownAction(event)
// 	//}
// 	//return false;
// });
// $(document).keyup(function(event){
// 	//if(appVer<45){
// 	return handleKeyUpAction(event)
// 	//}
// 	return false;
// });
function ONKEYPRESSED(action, keyCode){
	//log('ONKEYPRESSED ' + action + " kc=" + keyCode)
	/*if(action == 'keyDown'){
	 event = new Event('onKeyDown')
	 if(keyCode==19){
	 event.keyCode=KC_UP
	 }else if(keyCode==20){
	 event.keyCode=KC_DOWN
	 }else if(keyCode==21){
	 event.keyCode=KC_LEFT
	 }else if(keyCode==22){
	 event.keyCode=KC_RIGHT
	 }else if(keyCode==66){
	 event.keyCode=KC_OK
	 }
	 handleKeyDownAction(event)
	 }else if(action == 'keyDown'){
	 event = new Event('onKeyDown')
	 if(keyCode==19){
	 event.keyCode=KC_UP
	 }else if(keyCode==20){
	 event.keyCode=KC_DOWN
	 }else if(keyCode==21){
	 event.keyCode=KC_LEFT
	 }else if(keyCode==22){
	 event.keyCode=KC_RIGHT
	 }else if(keyCode==66){
	 event.keyCode=KC_OK
	 }
	 handleKeyUpAction(event)
	 }*/
}
function playAudio(type){
	setTimeout(function(){
		try{window.duokantv.playSound(type)}catch(e){}
	}, 1);
}
(function($){
	$.fn.extend({
		"slideUp":function(value){

			var docthis = this;
			//默认参数
			value=$.extend({
				"li_h":"30",
				"time":1050,
				"movetime":1000
			},value)

			//向上滑动动画
			function autoani(){
				$("li:first",docthis).transition({"marginTop":-value.li_h},value.movetime,'linear',function(){
					$(this).css("margin-top",0).appendTo(".line");
				})
			}

			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
		}
	})
})(jQuery)

function gblen(str){
	var len = 0;
	for (var i=0; i<str.length; i++) {
		if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
			len += 2;
		} else {
			len ++;
		}
	}
	return len;
};
function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
