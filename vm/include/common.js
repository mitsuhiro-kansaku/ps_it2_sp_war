/******************************************************************************/
/*     PROCURESUITE   Common Javascript              Last Modified 2008/03/21 */
/*     対象ブラウザ： Internet Exproler 6.0/7.0                               */
/*                    NetScape Navigator 7.0                                  */
/*     notice      :  WindowsOS Only!!                                        */
/******************************************************************************/

function notContext ( ) {
    return false;
}
//document.oncontextmenu = notContext ;

/*----------------------------------------------------------------------------*/
/*   変数領域                                                                 */
/*----------------------------------------------------------------------------*/
var subWindow;                         //Window Object (PopUp)

/*----------------------------------------------------------------------------*/
/*   機　能：戻る、進む                                                       */
/*   引　数：戻るまたは進むページ数                                           */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function historyGo(PageCount){
  window.parent.history.go(PageCount);
}
/*----------------------------------------------------------------------------*/
/*   機　能：親画面のURL移動                                                  */
/*   引　数：移動するURL                                                      */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function gotopage(URL){
  window.top.location = URL;
}
/*----------------------------------------------------------------------------*/
/*   機　能：ポップアップウィンドウの作成                                     */
/*         （有効解像度が1000*740以上であれば中央に表示、                     */
/*           それ以下であれば左上を原点として表示）                           */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*   返り値：ポップアップウィンドウオブジェクト                               */
/*----------------------------------------------------------------------------*/
function poppage(OBJ,winName,Width,Height){
var attr = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,dependent=yes,width=";
var posLeft = 0;
var posTop = 0;
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
  if ((screen.width - Width) > 1){
    posLeft=(screen.width - Width) / 2;
  }
  if ((screen.height - Height) > 1){
    posTop=(screen.height - Height) / 2;
  }
  attr = attr + Width + ",height=";
  attr = attr + Height;
  attr = attr + ",left=" + posLeft;
  attr = attr + ",Top=" + posTop;

  subWindow=window.open(OBJ,winName,attr);

  return subWindow;
}
function popupWithAuthCheck(OBJ,winName,Width,Height){
    var pageId = getPageId(OBJ);
    var urlPrefix = getUrlPrefix(OBJ);
    $.post(
            urlPrefix+"authCheck",
        {
            "pageId":pageId
        },
        function(data){
            if(data==""){
                poppage(OBJ,winName,Width,Height);
            }
            else {
                alert(decodeURI(data));
            }
        }
    )
}



/*----------------------------------------------------------------------------*/
/*   機　能：ポップアップウィンドウの作成                                     */
/*         （有効解像度が1000*740以上であれば中央に表示、                     */
/*           それ以下であれば左上を原点として表示）                           */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*   返り値：ポップアップウィンドウオブジェクト                               */
/*----------------------------------------------------------------------------*/
function poppageFromDetail(OBJ,winName,Width,Height){
var attr = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,dependent=yes,width=";
var posLeft = 0;
var posTop = 0;
  if ((screen.width - Width) > 1){
    posLeft=(screen.width - Width) / 2;
  }
  if ((screen.height - Height) > 1){
    posTop=(screen.height - Height) / 2;
  }
  attr = attr + Width + ",height=";
  attr = attr + Height;
  attr = attr + ",left=" + posLeft;
  attr = attr + ",Top=" + posTop;

  subWindow2=window.open(OBJ,winName,attr);

//return subWindow2;
}

/*----------------------------------------------------------------------------*/
/*   機　能：マスタ検索ポップアップウィンドウの作成                           */
/*         （poppageファンクションの拡張。                                    */
/*           セット対象となるhtmlオブジェクトを可変長で指定する）             */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*         ：セット対象となるhtmlオブジェクト（可変長）                       */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function masterSearch(OBJ,winName,Width,Height){
  var subWindow = poppage(OBJ,winName,Width,Height);

  var argArray = argumentsToArray(arguments);
  //subWindow.setTargets(argArray.slice(4));
}

/*----------------------------------------------------------------------------*/
/*   機　能：ArgumentsオブジェクトをArray型に変換する                         */
/*         （Argumentsとは、Functionの引数を格納した                          */
/*           JavaScriptのネイティブなオブジェクト）                           */
/*   引　数：Argumentsオブジェクト                                            */
/*   返り値：Arrayオブジェクト                                                */
/*----------------------------------------------------------------------------*/
function argumentsToArray(arguments){
  return Array.prototype.slice.call(arguments);
}

/*----------------------------------------------------------------------------*/
/*   機　能：ページ移動(unload)時の処理                                       */
/*           親画面から呼び出された子ウィンドウを閉じる                       */
/*   引　数：なし                                                            */
/*   返り値：なし                                                             */
/*   備　考：ポップアップ画面を呼び出す画面はonunloadイベントで               */
/*           当関数を呼び出す事                                               */
/*----------------------------------------------------------------------------*/
function unLoad(){
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：ウィンドウにフォーカスを与える                                   */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function setFocus(){
    window.focus();
}
/*----------------------------------------------------------------------------*/
/*   機　能：ブラウザがＩＥか？                                               */
/*   引　数：なし                                                             */
/*   返り値：IE4,IE5,IE6,NN4,NN6.0,NN7                                        */
/*----------------------------------------------------------------------------*/
function isIE(){
	if( window.navigator.appName == "Microsoft Internet Explorer" ) {
		return true;
	} else {
		return false;
	}
}
/*----------------------------------------------------------------------------*/
/*   機　能：Cookie値の取得                                                   */
/*   引　数：Cookie名                                                         */
/*   返り値：Cookie値                                                         */
/*----------------------------------------------------------------------------*/
function getCookie(key) {
  if (window.opener){
    allValue = " " + window.opener.document.cookie + ";";
  }else{
    allValue = " " + document.cookie + ";";
  }
  sp = 0;
  ep = 0;
  len = allValue.length;
  while (sp < len) {
    ep = allValue.indexOf(";", sp);
    keyValue = allValue.substring(sp + 1, ep);
    eq = keyValue.indexOf("=");
    if (keyValue.substring(0, eq) == key) {
        return(unescape(keyValue.substring(eq + 1, ep - sp - 1)));
    }
    sp = ep + 1;
  }
  return("");
}
/*----------------------------------------------------------------------------*/
/*   機　能：Cookie値の設定                                                   */
/*   引　数：Cookie名                                                         */
/*         ：Cookie値                                                         */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function setCookie(key,val) {
  tmp = key + "=" + val + ";path=/;expires=Fri, 31-Dec-2999 23:59:59 GMT";
  document.cookie = tmp;
  tmp = key + "=" + val + ";path=/";
  document.cookie = tmp;
}
/*----------------------------------------------------------------------------*/
/*   機　能：ログアウト処理                                                   */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function logOut(){
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
  window.top.location.href = "/hogehoge/servlet/package.servletclass";
}
/*----------------------------------------------------------------------------*/
/*   機　能：波ダッシュ文字表示                                               */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function putWaveDash(){
  if (getBrowser() != "NN4"){
    document.write('\uff5e');
  }else {
    document.write('\u301c');
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：イメージ切替関係                                                 */
/*----------------------------------------------------------------------------*/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length);i+=2)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+1];}
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤー表示                                               */
/*----------------------------------------------------------------------------*/
function showWaitLayer() {
  if (document.all) {
    document.all.item("wait").style.left = (document.body.scrollLeft + (document.body.clientWidth - 320) / 2);
    document.all.item("wait").style.top  = (document.body.scrollTop + (document.body.clientHeight - 50) / 2);
    document.all.item("wait").style.visibility = "visible";
  }else if (document.layers) {
    document.layers["wait"].left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.layers["wait"].top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
    document.layers["wait"].visibility = "show";
  }else if (document.getElementById) {
    document.getElementById("wait").style.left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.getElementById("wait").style.top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
    document.getElementById("wait").style.visibility = "visible";
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤー非表示                                             */
/*----------------------------------------------------------------------------*/
function hiddenWaitLayer() {
  if (document.all) {
    document.all.item("wait").style.visibility = "hidden";
    document.all.item("wait").style.left = (document.body.scrollLeft + (document.body.clientWidth - 320) / 2);
    document.all.item("wait").style.top  = (document.body.scrollTop + (document.body.clientHeight - 50) / 2);
  }else if (document.layers) {
    document.layers["wait"].visibility = "hide";
    document.layers["wait"].left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.layers["wait"].top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
  }else if (document.getElementById) {
    document.getElementById("wait").style.visibility = "hidden";
    document.getElementById("wait").style.left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.getElementById("wait").style.top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤーが表示中か否かを返す                               */
/*----------------------------------------------------------------------------*/
function validWaitLayer() {
  if (document.all) {
    if (document.all.item("wait").style.visibility == "visible"){
      return true;
    }
  }else if (document.layers) {
    if (document.layers["wait"].visibility == "show"){
      return true;
    }
  }else if (document.getElementById) {
    if (document.getElementById("wait").style.visibility == "visible"){
      return true;
    }
  }
  return false;
}
/*----------------------------------------------------------------------------*/
/*   機　能：同一セッション対応用                                             */
/*   引　数：表示するURL                                                      */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function formatNumber( classname, strVal, afterpoint,labelID ) {
    if( isEmpty(afterpoint) ) {
        //小数点以下桁数
        afterpoint = 2;
    }

    var pt = getCssProperty(classname,"fontSize");
    if( !pt ) {
        classname = "FontSmall";
        pt = "9";
    }
    var family = getCssProperty(classname,"fontFamily");
    if( !isEmpty(family) ) {
        family = family.replace(/\"/g,"'");
    } else {
        family = "";
    }
    var weight = getCssProperty(classname,"fontWeight");
    if( !weight ) {
        weight="normal";
    }
    if( pt ) {
        pt = pt.substring(0,pt.indexOf("p"));
    } else {
        pt = 10; //　未設定の場合は10ptにする。
    }

    if( pt>9 ) {
        pt2= pt-2;
    } else {
        pt2 = pt-1;
    }

    var val;
    var i = strVal.indexOf('.');
    if (i >= 0) {
        strVal = strVal + "          ";
        strVal = trim(strVal.substring(0,i+afterpoint+1));
        val = '<SPAN STYLE="font-family:' + family + ';font-weight:' + weight + ';">' + '<label style="font-size:' + pt  + 'pt;">' + strVal.substring(0,i) + '</label>' + '<label style="font-size:' + pt2  + 'pt;">' + strVal.substr(i);
        for(j=trim(strVal).length-i;j<afterpoint+1;j++) {
            val = val + '&nbsp;';
        }
        val = val + '</label></SPAN>';
    } else {
        val = '<SPAN STYLE="font-family:' + family + ';font-weight:' + weight + ';">' + '<label style="font-size:' + pt  + 'pt;">' + strVal + '<label style="font-size:' + pt2  + 'pt;">';
        for(j=0;j<afterpoint+1;j++) {
            val = val + '&nbsp;';
        }
        val = val + '</label>' + '</label></SPAN>';
    }
    if ('' != labelID) {
        document.getElementById(labelID).innerHTML=val;
    } else {
        document.write(val);
        return;
    }
}
/*
function formatNumber( id, strVal ) {
	var pt = getCssProperty(getObj(id).className,"fontSize");
	if( pt ) {
		pt = pt.substring(0,pt.indexOf("p"));
	} else {
		pt = 10; //　未設定の場合は１０ptにする。
	}

    var val = strVal;
    var i = val.indexOf('.');
    if (i >= 0) {
        val = strVal.substring(0,i) + '<label style="font-size:' + (pt-2)  + 'pt;">' + strVal.substring(i) + '</label>';
    }
    document.write(val);

    return;
}
*/
function getCssProperty(classname,property) {
	var stylesheets;

	var i=0;
	while( !document.styleSheets[i].rules ) {
		i++;
	}
	stylesheets = document.styleSheets[i].rules;

/*	if( document.styleSheets[cssnumber].rules ) {
		stylesheets = document.styleSheets[cssnumber].rules;
	} else {
		stylesheets = document.styleSheets[cssnumber].cssRules
	}
*/
    for( var i = 0; i < stylesheets.length; i++ ) {
    var css = stylesheets[i];
		var wClassname = "."+classname.toLowerCase();
    if( css.selectorText.toLowerCase() == wClassname ) {
			return ( css.style[ property ] );
		}
	}

}

/*
function formatNumber( strVal,size,cl )
{
		var color = "";
		if( cl ) {
			color = "color:" + cl;
		}

    var val = strVal;
    var i = strVal.indexOf('.');
    if (i >= 0) {
        val = strVal.substring(0,i) + '<label style="font-size:' + size  + 'pt;' + color + '">' + strVal.substring(i) + '</label>';
    }
    document.write(val);

    return;
}
*/
function selectOn(obj) {
	obj.select();
}

function selectOff(obj) {
	if( obj.value == "" ) {
		obj.value="0";
	}
}

function getText(id) {
	return getText2(getObj(id));
}

function getText2(obj) {
	try {
		if( isIE() ) {
			return obj.innerText;
		} else {
			wStr = obj.innerHTML;
			while( wStr.indexOf("&nbsp;")>=0 ) {
	  		wStr = wStr.replace("&nbsp;",'');
			}
			return wStr;
		}
	} catch( e ) {
		alert("Undefinded Id="+obj.id);
	}
}

function setText(id,innertext) {
	if( !setText2(getObj(id),innertext) ) {
		alert("「"+id+"」に「"+innertext+"」をセットしようとして失敗しました。")
	}
}

function setText2(obj,innertext) {
	try {
		obj.innerText = innertext;
	} catch(e) {
		try {
		obj.innerHTML = innertext;
		} catch(e2) {
			return false;
		}
	}
	return true;
}

function getObj(id) {
	try {
		return document.getElementById(id);
	} catch( e ) {
		return null;
	}
}

function getDisplay(id) {
	if( getObj(id).style.display == "none" ) {
		return false;
	} else {
		return true;
	}
}

function setDisplay(id,flg) {
	try {
		if( flg ) {
		    getObj(id).style.display = "";
            if(id == "CALENDARBOX") getObj(id).style.display = "block";

            switch(id){
                case  "SEARCH_AREA":  // 検索条件
                case  "SEARCH_AREA2": // 検索条件（詳細）
                case  "SWITCH1":      // 検索条件をひらく
                case  "SWITCH2":      // 検索条件をとじる
                    getObj(id).style.display = "";
                    break;
                default:
                    getObj(id).style.display = "block";
                    break;
            }
		} else {
			getObj(id).style.display = "none";
		}
	} catch( e ) {
		alert("error:"+e+":"+id);
	}
}

function exists(id) {
	var ret = document.getElementById(id);
	if( ret ) {
		return true;
	} else {
		return false;
	}
}

function getEventX() {
	if( isIE() ) {
		return event.x;
	} else {
		return event.pageX;
	}
}

function getEventY() {
	if( isIE() ) {
		return event.y;
	} else {
		return event.pageY;
	}
}

function getScrollX() {
	if( isIE() ) {
		return document.body.scrollLeft;
	} else {
		return window.scrollX;
	}
}

function getScrollY() {
	if( isIE() ) {
		return document.body.scrollTop;
	} else {
		return window.scrollTop;
	}
}

function changeFontSize0() {
	return;
	if( getCookie("FONTSIZE") == "L" ) {
		document.getElementById("CSS_LAYOUT").href = "../../include/FontL.css";
	} else if( getCookie("FONTSIZE") == "M" ) {
		document.getElementById("CSS_LAYOUT").href = "../../include/FontM.css";
	} else {
		document.getElementById("CSS_LAYOUT").href = "../../include/FontS.css";
	}

}

function fGetXY(aTag){
	var oTmp=aTag;
	var pt=new Point(0,0);
	do{
		pt.x+=oTmp.offsetLeft;
		pt.y+=oTmp.offsetTop-oTmp.scrollTop;oTmp=oTmp.offsetParent;
	}while(oTmp.tagName.toUpperCase()!="BODY");
	return pt;
}

function Point(iX,iY){this.x=iX;this.y=iY;}

/*----------------------------------------------------------------------------*/
/*   機　能：文字列の前後の空白（半角、全角、制御文字）を削除する             */
/*   引　数：加工前文字列                                                     */
/*   返り値：加工後文字列                                                     */
/*   備　考：NN4.Xでは右の空白が除去されない為、rTrim関数をcallしている       */
/*----------------------------------------------------------------------------*/
function trim(str){
var wStr;
  wStr = str.replace(/^\s+|\s+$/g,'');
  wStr = wStr.replace(/^ +| +$/g,'');
  wStr = wStr.replace(/^　+|　+$/g,'');
  return  rTrim(wStr);
}
/*----------------------------------------------------------------------------*/
/*   機　能：文字列の後ろの空白（半角、全角、制御文字）を削除する             */
/*   引　数：加工前文字列                                                     */
/*   返り値：加工後文字列                                                     */
/*----------------------------------------------------------------------------*/
function rTrim(str){
var wStr = str;
  wStr = wStr.replace(/\s+$/g,'');
  wStr = wStr.replace(/ +$/g,'');
  return wStr.replace(/　+$/g,'');
}

function countByte(str) {
    var count = 0;
    for(var i = 0; i < str.length; i++) {
       if (escape(str.charAt(i)).length < 4) {
          count++;
       }
       else {
          count += 2;
       }
    }
    return count;
}

// 禁止Backspace
function banBackSpace(e){
    var ev = e || window.event;
    var obj = ev.target || ev.srcElement;
    if (!obj.type || !obj.getAttribute) {
        return false;
    }
    var t = obj.type || obj.getAttribute('type');

    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;

    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;

    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);

    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" ;

    if(flag2 || flag1)return false;
}
//禁止Backspace Firefox、Opera対策
document.onkeypress=banBackSpace;


//iFrame 高さに合わせる
function iframeHeight(id) {
 var ifm= document.getElementById(id);
 var subWeb = document.frames ? document.frames[id].document : ifm.contentDocument;
 if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.scrollHeight-15;
 }
}
//iFrame 高さに合わせる
function parentIframeHeight(id) {
 var ifm= parent.document.getElementById(id);
 var subWeb = parent.document.frames ? parent.document.frames[id].document : ifm.contentDocument;
 if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.scrollHeight-15;
 }
}

function getPageId(argument){
    var pageId = "";
    var params = argument.split('/');
    var masterIndex = -1;
    for(var i=0;i<params.length;i++){
        if(params[i]=="mst"||params[i]=="src"){
            masterIndex = i;
        }
    }
    if(masterIndex != -1){
        if(params.length <= masterIndex+2){
            return "";
        }
        var event = params[masterIndex+2].split('?')[0];
        pageId = params[masterIndex+1]+event.substring(0,1).toUpperCase()+event.substring(1);
    }else{
        pageId = params[params.length-1].split('?')[0];
    }
    return pageId;
}
function getUrlPrefix(argument){
    var urlPrefix = "";
    var params = argument.split('/');
    for(var i=0;i<params.length;i++){
        if(params[i]==".."){
            urlPrefix=urlPrefix+params[i]+"/";
        }
    }
    return urlPrefix;
}
function iframeChangeWithAuthCheck(){

    var params = arguments;
    var pageId = getPageId(params[0]);
    if(pageId == ""){
        iframeChange(params);
        return;
    }
    var urlPrefix = getUrlPrefix(params[0]);
    $.post(
        urlPrefix+"authCheck",
        {
            "pageId":pageId
        },
        function(data){
            if(data==""){
                iframeChange(argumentsToArray(params));
            }
            else {
                alert(decodeURI(data));
            }
        }
    )
}
//iframeChange get-->post
//param: url,key1,value1,key2,value2...,targetIframe
function iframeChange(){
    var params = arguments;
    if(Object.prototype.toString.apply(arguments[0]) == '[object Array]'){
        params = arguments[0];
    }
    var form = getObj("submitFrom");
    if(form==null){
      //add new from
      form = document.createElement("form");
      form.id="submitFrom";
      form.style.display="none";
      form.method="post";
      document.getElementsByTagName("body")[0].appendChild(form);
    }

    var length=0;
    if(params.length%2==0){
        length=params.length-1;
    }else{
        length=params.length;
    }
    form.innerHTML="";
    //add hidden to from
    for(var i=1;i<length;i+=2){
      var hidden = document.createElement("input");
      hidden.type="hidden";
        hidden.name=params[i];
        if(i+1<params.length){
            hidden.value=params[i+1];
      }
      form.appendChild(hidden);
  }

    if(params.length>0){
        //set from target
        if(params.length%2==0){
            form.target=params[length];
        }else{
          if(getObj("DATAAREA")!=null){
              if(typeof(pinName)!="undefined"){
                  if( getCookie(pinName)!="1" && getObj("SWITCH2").style.display=="" ) {
                      openSearchArea();
                  }
              }
              form.target="DATAAREA";
              getObj("DATAAREA").src = '../../layout/wait.vm';
          }
          if(getObj("BODYAREA")!=null){
              form.target="BODYAREA";
          }

      }
      // form submit
      form.action=params[0];
      setTimeout("formSubmit()",50);
    }
}
function formSubmit(){
  getObj("submitFrom").submit();
}

/*--------------------------------------------------------------------------*/
/*   機　能：テーブルの固定セールを設定する									*/
/*   引　数：テーブルID														*/
/*   引　数：固定行数														*/
/*   引　数：固定列数                                                       */
/*   返り値：なし                                                           */
/*--------------------------------------------------------------------------*/
function setTablefix(id,fixR,fixC) {

    var windowHeight = $(window).height();
    if($(".error").outerHeight() != null){
        if(id == "#SPSHP020ICHIRANTABLEFIX"){
            windowHeight = windowHeight - $(".error").height() - 20;
        }else{
            windowHeight = windowHeight - $(".error").height() - 35;
        }
    }

    $(function() {
    	$(id).tablefix({width: $(window).outerWidth(), height:  windowHeight, fixRows: fixR, fixCols: fixC});
    });
}

//禁止右鍵 start
function nocontextmenu()
{
    event.cancelBubble = true;
    event.returnvalue = false;
    return false;
}
document.oncontextmenu = nocontextmenu;
//禁止右鍵 end

function selectRow(no) {
    var checkName = "check"+no;
    if(getObj(checkName)!=null){
        if( getObj(checkName).checked ) {
            getObj("Row_"+no).style.backgroundColor = "#ffff99";
        } else {
            if (no % 2 == 0) {
                getObj("Row_"+no).style.backgroundColor = "#dce4ef";
            } else {
                getObj("Row_"+no).style.backgroundColor = "#ffffff";
            }
        }
    }
}
var maxSearchHeight = 120;
var minSearchHeight = 30;
var size;
function openSearchArea() {
    var i,cnt;

    if( getDisplay("SWITCH1") ) {
        // 開く
        setDisplay("SWITCH1",false);
        setDisplay("SWITCH2",true);
        setDisplay("SEARCH_AREA2",true);

        size = minSearchHeight;
        for(i=minSearchHeight+1,cnt=0; i<maxSearchHeight; i+=5,cnt) {
            setTimeout("changeSize1()",(++cnt)*10);
        }
    } else {
        // 閉じる
        setDisplay("SWITCH1",true);
        setDisplay("SWITCH2",false);
        setDisplay("SEARCH_AREA2",false);
        size = maxSearchHeight;
        for(i=maxSearchHeight-1,cnt=0; i>minSearchHeight; i-=5,cnt) {
            setTimeout("changeSize2()",(++cnt)*10);
        }
    }
    setTimeout("resetTableFix()", 300);

    // 検索ウィンドウは閉じること
    closeSearchBox();
}
var isTableFixEnabled = true;
function registReSizeEvent() {
    window.onresize = function() {
        if (isTableFixEnabled) {
            isTableFixEnabled = false;
            resetTableFix();
            isTableFixEnabled = true;
        }
    }
    window.onscroll = function() {
        if (isTableFixEnabled) {
            isTableFixEnabled = false;
            resetTableFix();
            isTableFixEnabled = true;
        }
    }
}

function resetTableFix() {
    var iframe = getObj("DATAAREA");
    if (iframe != null) {
        var bodyTableDiv = iframe.contentWindow.document.getElementById("bodyTableDiv");
        // テーブルが固定されていない場合、何もしない
        if (bodyTableDiv != null) {
            var bodyHeight = document.body.clientHeight;
            if($(".error",iframe.contentWindow.document).height() != null){
                if(iframe.contentWindow.document.getElementById("SPSHP020ICHIRANTABLEFIX") != null){
                    bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 20;
                }else{
                    bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 35;
                }
            }
            var top = bodyTableDiv.offsetTop + iframe.parentElement.offsetTop;

            var colTableDiv = iframe.contentWindow.document.getElementById("colTableDiv");
            var rowTableDiv = iframe.contentWindow.document.getElementById("rowTableDiv");
            var scrollBarWidth = 17;

            var userAgent = window.navigator.userAgent.toLowerCase();

            //  Edgeの場合のみ、スクロールバーの幅を16pxとする
            if (userAgent.indexOf('edge') != -1) {
                scrollBarWidth = 16;
            }

            var tempHeight = bodyHeight - top;
            var flgHeight = false;

            if (bodyHeight > top) {
                var divHeight = bodyTableDiv.offsetHeight;
                var bodyTable = bodyTableDiv.getElementsByTagName("table")[0];
                var tableHeight = bodyTable.offsetHeight - bodyTableDiv.offsetTop;
                var pageHeight = top + divHeight;
                if (divHeight - scrollBarWidth < tableHeight || bodyHeight < pageHeight) {
                    bodyTableDiv.style.height = bodyHeight - top + "px";
                    if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                        tempHeight -= scrollBarWidth;
                        flgHeight = true;
                    }
                    if (tempHeight > 0) {
                        colTableDiv.style.height = tempHeight + "px";
                    }
                }
            }
            var width = document.body.offsetWidth + document.body.scrollLeft - colTableDiv.offsetWidth;
            bodyTableDiv.style.width = width + "px";
            if (bodyTableDiv.offsetWidth > bodyTableDiv.clientWidth) {
                width -= scrollBarWidth;
            }
            rowTableDiv.style.width = width + "px";

            //  幅調整後に再度高さをチェックする（幅調整時に横スクロールバーが表示されてoffsetHeightとclientHeightの差異が発生するのを考慮するため）
            if (!flgHeight){
                if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                    tempHeight = bodyTableDiv.clientHeight;
                    flgHeight = true;
                }
            }else{
                if (bodyTableDiv.offsetHeight == bodyTableDiv.clientHeight) {
                    tempHeight = bodyTableDiv.clientHeight;
                }else{
                    flgHeight = false;
                }
            }
            if (flgHeight) {
                colTableDiv.style.height = tempHeight + "px";
            }
        }
    } else {
        resetTableFix2();
    }
}
function resetTableFix2() {
    var bodyTableDiv = document.getElementById("bodyTableDiv");
    // テーブルが固定されていない場合、何もしない
    if (bodyTableDiv != null) {
        var bodyHeight = document.body.clientHeight;
        if($(".error",iframe.contentWindow.document).height() != null){
            if(document.getElementById("SPSHP020ICHIRANTABLEFIX") != null){
                bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 20;
            }else{
                bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 35;
            }
        }
        var top = bodyTableDiv.offsetTop + bodyTableDiv.parentNode.offsetTop;

        var colTableDiv = document.getElementById("colTableDiv");
        var rowTableDiv = document.getElementById("rowTableDiv");
        var scrollBarWidth = 17;

        var userAgent = window.navigator.userAgent.toLowerCase();

        //  Edgeの場合のみ、スクロールバーの幅を16pxとする
        if (userAgent.indexOf('edge') != -1) {
            scrollBarWidth = 16;
        }

        var tempHeight = bodyHeight - top;
        var flgHeight = false;

        if (bodyHeight > top) {
            var divHeight = bodyTableDiv.offsetHeight;
            var bodyTable = bodyTableDiv.getElementsByTagName("table")[0];
            var tableHeight = bodyTable.offsetHeight - bodyTableDiv.offsetTop;
            var pageHeight = top + divHeight;
            if (divHeight - scrollBarWidth < tableHeight || bodyHeight < pageHeight) {
                bodyTableDiv.style.height = bodyHeight - top + "px";
                if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                    tempHeight -= scrollBarWidth;
                    flgHeight = true;
                }
                if (flgHeight) {
                    colTableDiv.style.height = tempHeight + "px";
                }
            }
        }
        var width = document.body.offsetWidth + document.body.scrollLeft - colTableDiv.offsetWidth;
        bodyTableDiv.style.width = width + "px";
        if (bodyTableDiv.offsetWidth > bodyTableDiv.clientWidth) {
            width -= scrollBarWidth;
        }
        rowTableDiv.style.width = width + "px";

        //  幅調整後に再度高さをチェックする（幅調整時に横スクロールバーが表示されてoffsetHeightとclientHeightの差異が発生するのを考慮するため）
        if (!flgHeight){
            if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                tempHeight = bodyTableDiv.clientHeight;
                flgHeight = true;
            }
        }else{
            if (bodyTableDiv.offsetHeight == bodyTableDiv.clientHeight) {
                tempHeight = bodyTableDiv.clientHeight;
            }else{
                flgHeight = false;
            }
        }
        if (flgHeight) {
            colTableDiv.style.height = tempHeight + "px";
        }
    }
}

function changeSize1() {
    size+=5;
    document.getElementById("SEARCH_AREA").style.height = size;
    if( size >= maxSearchHeight ) {
        getObj("SEARCH_AREA2").style.display = "";
        // Chrome対策（検索エリアが縮んでしまう）
        getObj("Adjust").style.width = getObj("SEARCH_AREA2").offsetWidth;
    }
}
function changeSize2() {
    size-=5;
    document.getElementById("SEARCH_AREA").style.height = size;
}
function clear(){
    document.Body.reset();
}
/*---サブミットイベント発生する時に、全てボタンは連打防止---*/
function buttonDisable(){
   var i;
   var buttonArr = $("input[type='button']");
    for(i = 0;i < buttonArr.length; i++){
        buttonArr[i].disabled = true;
    }
}
function buttonUsableForList(alertMessage){
    if(alertMessage.indexOf("E035")!=-1){

        if (null == parent.document.getElementById("DATAAREA")
        || "undefined" == parent.document.getElementById("DATAAREA")) {
            buttonUsable();
        } else {
            parent.document.getElementById("DATAAREA").contentWindow.buttonUsable();
        }
    }
}
function buttonUsable(){
    var i;
    var buttonArr = $("input[type='button']");
     for(i = 0;i < buttonArr.length; i++){
         buttonArr[i].disabled = false;
     }
     var iconArr = $(".Icon");
     if(null != iconArr){
         for(i = 0;i < iconArr.length; i++){
             iconArr[i].disabled = false;
         }
     }
 }
function parentButtonDisable(){
    var buttonAll=parent.document.getElementsByTagName("input");
    if(buttonAll != null){
    for(var i=0;i < buttonAll.length;i++){
        if(buttonAll[i].type == "button"){
            buttonAll[i].disabled= true;
            }
        }
    }
}
function parentButtonEnable(){
    var buttonAll=parent.document.getElementsByTagName("input");
    if(buttonAll != null){
    for(var i=0;i < buttonAll.length;i++){
        if(buttonAll[i].type == "button"){
            buttonAll[i].disabled= false;
            }
        }
    }
}

/*----------------------------------------------------------------------------*/
/*   機　能：XSS攻撃文字列をクリア                                                  */
/*----------------------------------------------------------------------------*/
function cleanXss(s){
    if(typeof(s)!='string'){
        return s;
    }
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&apos;');
}
/*----------------------------------------------------------------------------*/
/*   機　能：キーダウン時の処理のキャンセル             （禁止Backspace IE、Chrome 対策）                         */
/*----------------------------------------------------------------------------*/
document.onkeydown = keydownCancel;
function keydownCancel(){
    switch(event.keyCode){
       case  8: // backspace
           if(document.activeElement.type != "text"     &&
              document.activeElement.type != "password" &&
              document.activeElement.type != "textarea"  )
               return false;
           if(document.getElementById(document.activeElement.id).readOnly == true)
               return false;
           break;
       case 13: // Enter
           if(document.activeElement.type !='button'     &&
              document.activeElement.type !='submit'     &&
              document.activeElement.type !='reset'      &&
              document.activeElement.type !='textarea'   &&
              document.activeElement.type !='select-one' )
               return false;
           break;
       default:
           break;
    }
    return true;
}
