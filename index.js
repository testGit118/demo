alert("第三次创建分支")
$(function () {
  var iRet = WebVideoCtrl1.checkPluginInstall();
  if(!iRet)return;
  WebVideoCtrl1.insertPluginObject("videoss",500,300);
  WebVideoCtrl1.initPlugin("Dahua2",function () {
    //创建视频窗口
    WebVideoCtrl1.createMultiNodeDisplay(16);
    
    //设置窗口分割数
    WebVideoCtrl1.setSplitNum(3);
    
    //注册事件
    WebVideoCtrl1.registerEvent("SelectedView",responseSelectedViewSignal);
  });
  $("#closePtzLocate").hide();
  //显示操作信息
  function showOPInfo(szInfo, status, error) {
    var szTip = "<div>" + Foundation.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo;
    if (typeof status != "undefined")
    {
      szTip += "(" + status.toString() + ", " + error.toString() + ")";
    }
    szTip += "</div>";
    $("#opinfo").html(szTip + $("#opinfo").html());
  }
  
  //视频窗口
  function responseSelectedViewSignal(iNodeIndex,iViewIndex,iWinID){
    //更新对应播放器的信息
    var playrInfo = WebVideoCtrl1.getPlayerInfo(iWinID);
    //更新UI信息
    if(typeof playrInfo != "undefined"){
      //设备信息
      var deviceInfo = WebVideoCtrl1.getDeviceInfo(playrInfo.ip);
      if(typeof deviceInfo != "undefined"){
        DemoUI.updateDeviceInfo(playrInfo.ip);
        DemoUI.setCurChannel(playrInfo.channle);
        DemoUI.setCurStreamType(playrInfo.streamType);
      }
    }
  }
  
  //设备登录
  $("#login").on("click",function () {
    var szIP = "10.10.10.234",
    szPort = 37777,
    szUsername = 'admin',
    szPassword = 'admin123',
    rtspPort = 37777,
    protocol = 0;
    if ("" == szIP || "" == szPort) {
      return;
    }
    var port = parseInt(szPort);
    //判断当前设备是否已经登录
    var deviceInfo = WebVideoCtrl1.getDeviceInfo(szIP);
    if(typeof deviceInfo != "undefined"){
      if(WebVideoCtrl1.logout(szIP))
      {
        //添加提示
        showOPInfo(szIP + " Logout Device ");
        //删除设备信息
        DemoUI.removeDeviceInfo(szIP);
      }
    }
    WebVideoCtrl1.login(szIP,port,szUsername,szPassword,rtspPort,protocol,
      function(sIp,iDeviceID){
        alert("登录成功");
        view();
        //插入设备
        DemoUI.addDeviceIP(sIp);
        //获得通道号
        var channelNum = WebVideoCtrl1.getChannelNumber(iDeviceID);
        //更新通道数据
        DemoUI.modifyChannelList(channelNum);
      },
      function(iErrorCode,sError){
        alert("登录失败" + iErrorCode + sError)
      }
    );
  });
  
  //预览
  $("#view").on("click",function () {
    //获得当前选中的设备IP
    var sIP = '10.10.10.234';
    alert(sIP)
    //获得通道号
    var iChannel = 1;
    //获得码流类型
    var iStreamType = 1;
    //窗口选择模式
    var iMode = parseInt(0, 10);
    if(0 == iMode){
      WebVideoCtrl1.connectRealVideo(sIP,iChannel,iStreamType,function(iPlayerID){
          alert("预览成功" + sIP + " Channel:"+ iChannel.toString());
        },
        function(status,error){
          alert("预览失败" + 'status:' + status + ",error:" + error);
        }
      )
    }else{
      //窗口序号
      var iWinIndex = parseInt($("#winIndex").val(), 10);
      WebVideoCtrl1.connectRealVideoEx(iWinIndex,sIP,iChannel,iStreamType,function(iPlayerID){
          alert("预览成功" + sIP + " Channel:"+ iChannel.toString());
        },
        function(status,error){
          alert("预览失败" + 'status:' + status + ",error:" + error);
        }
      )
    }
  })
})

function view() {
  //获得当前选中的设备IP
  var sIP = '10.10.10.234';
  //获得通道号
  var iChannel = 1;
  //获得码流类型
  var iStreamType = 1;
  //窗口选择模式
  var iMode = parseInt(0, 10);
  if(0 == iMode){
    WebVideoCtrl1.connectRealVideo(sIP,iChannel,iStreamType,function(iPlayerID){
        alert("预览成功" + sIP + " Channel:"+ iChannel.toString());
      },
      function(status,error){
        alert("预览失败" + 'status:' + status + ",error:" + error);
      }
    )
  }else{
    //窗口序号
    var iWinIndex = parseInt($("#winIndex").val(), 10);
    WebVideoCtrl1.connectRealVideoEx(iWinIndex,sIP,iChannel,iStreamType,function(iPlayerID){
        alert("预览成功" + sIP + " Channel:"+ iChannel.toString());
      },
      function(status,error){
        alert("预览失败" + 'status:' + status + ",error:" + error);
      }
    )
  }
}

//  云台控制
/**  左上*/
function mouseUPLeftPTZControl(flag){
  //获得移动速度
  var speed = parseInt(3, 10);
  WebVideoCtrl1.moveUpperLeft(speed,speed,flag);
}
/**  上*/
function mouseUpPTZControl(flag){
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveUpwards(speed,flag);
}
/** 右上*/
function mouseUPRightPTZControl(flag){
  //获得移动速度
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveUpperRight(speed,speed,flag);
}
/**  左*/
function mouseLefPTZControl(flag){
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveLeft(speed,flag);
}
/**  开启*/
function openPtzLocate(){
  if(WebVideoCtrl1.enablePTZLocate()){
    //隐藏开启按钮
    $("#openPtzLocate").hide();
    //显示关闭按钮
    $("#closePtzLocate").show();
  }
}
/**  关闭*/
function closePtzLocate(){
  WebVideoCtrl1.disablePTZLocate(false);
  $("#closePtzLocate").hide();
  $("#openPtzLocate").show();
}
/**  右*/
function mouseRightPTZControl(flag){
  //获得移动速度
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveRight(speed,flag);
}
/**  左下*/
function mouseDownLeftPTZControl(flag){
  //获得移动速度
  var speed = parseInt(3)
  WebVideoCtrl1.moveLowerLeft(speed,speed,flag);
}
/**  下*/
function mouseDownPTZControl(flag){
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveLower(speed,flag);
}
/**  右下*/

function mouseDownRightPTZControl(flag){
  //获得移动速度
  var speed = parseInt(3, 10)
  WebVideoCtrl1.moveLowerRight(speed,speed,flag);
}

/**  变倍+*/
function PTZZoomIn(flag){
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlZoom(speed,0,flag);
}
/**  变倍-*/
function PTZZoomout(flag){
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlZoom(speed,1,flag);
}
/**  变焦+*/
function PTZFocusIn(flag){
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlFocus(speed,0,flag);
}
/**  变焦-*/
function PTZFoucusOut(flag){
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlFocus(speed,1,flag);
}
/**  光圈+*/
function PTZIrisIn(flag){
  //获得移动速度
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlAperture(speed,0,flag);
}
/**  光圈-*/
function PTZIrisOut(flag){
  var speed = parseInt(2, 10)
  WebVideoCtrl1.controlAperture(speed,1,flag);
}