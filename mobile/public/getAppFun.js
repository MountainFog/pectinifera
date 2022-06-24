
// demo的使用：比如获取校园卡一卡通头像（页面中的调用）
// function getUserIcons(){
//     getUserIcon(function(res){getUserIcon_Callback_Test(res);});
// }


// //园卡一卡通头像  ios回调
// function getUserIcon_Callback_Test (res){
//     res就是获取到的返回的信息
// }

//获取当前app的环境
function getEnv_app(){
	let u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端

    if (isAndroid) {
      return "Android";
    } else if (isIOS) {
      return "iOS";
    } else {
      console.log("其它")
    }
};

// 判断ios版本号
function getIosVersionFun_app () {
    if(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getIosVersion){
        return true
    }else{
        return false
    }
}

//1.校园卡一卡通头像  callback回调的函数名称
var getUserIcon_Callback_app =null;
function getUserIcon_app (callback){
    getUserIcon_Callback_app = callback;
    if(getEnv_app()=='Android'){
        window.android.getUserIcon()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getUserIcon()
        }else{
            window.webkit.messageHandlers.getUserIcon.postMessage(null);
        }
      
    }
}

//园卡一卡通头像  ios回调
function getUserIconCallback (res){
    console.log('数据',res)
    var getUserIconCallbackres = res;
    if(typeof(res)=='string'){
        getUserIconCallbackres = JSON.parse(res)
    }
    if(getUserIconCallbackres.data){
        var callback_res = decodeURIComponent(getUserIconCallbackres.data.userIconBase64);
    }else{
        var callback_res = decodeURIComponent(getUserIconCallbackres.d.userIconBase64);
        
    }
    console.log('1',callback_res)
    getUserIcon_Callback_app(callback_res)
}



//2.虚拟校园卡活体检测 调用回返回数据
var callback_ContrastFaceLive_app = null;
function contrastFaceLive_app (callback){
    callback_ContrastFaceLive_app = callback;
    if(getEnv_app()=='Android'){
        window.android.contrastFaceLive()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            contrastFaceLive()
        }else{
            window.webkit.messageHandlers.contrastFaceLive.postMessage(null);
        }
    
    }
}
//虚拟校园卡活体检测ios回调
function callbackContrastFaceLive(res){
    callback_ContrastFaceLive_app(res)
}



//3.移除加载动画
function stopProgress_app (){
    if(getEnv_app()=='Android'){
        window.android.stopProgress()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            stopProgress()
        }else{
            window.webkit.messageHandlers.stopProgress.postMessage(null);
        }
      
    }
}


//4.充值
function cardRecharge_app (){
    if(getEnv_app()=='Android'){
        window.android.openWindow("cardRecharge")
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            cardRecharge()
        }else{
            window.webkit.messageHandlers.cardRecharge.postMessage(null);
        }
      
    }
}

//5.挂失
function cardReportLoss_app (){
    if(getEnv_app()=='Android'){
        window.android.openWindow('cardReportLoss')
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            cardReportLoss()
        }else{
            window.webkit.messageHandlers.cardReportLoss.postMessage(null);
        }
      
    }
}

//6.打电话  参数说明Option:{"tel":号码};

function tel_app (option=null){
    if(getEnv_app()=='Android'){
        let letnumber = 'tel:'+ option.tel
        window.android.openWindow(letnumber)
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            tel(option.tel)
        }else{
            window.webkit.messageHandlers.tel.postMessage(option);
        }
      
    }
}

//7.调用相机、相册 option:{'ratio':"", mimeType: "image", maxSelectNum: 1, minSelectNum: 1,enableCrop: true, aspectRatioX: 2,aspectRatioY: 1,cropCompressQuality: 70,node:""}; node 指节点（需要初始化的input file 的 id）
//callback回调
var getImage_Data_app= null;
function uploadImg_app (option=null,callback){
    getImage_Data_app = callback;
    let fileElem = document.getElementById(option.node);
    if(getEnv_app()=='Android'){
        delete option.ratio;
        delete option.node;
        window.android.initMimeType(JSON.stringify(option))
        if (fileElem) {
          fileElem.click(); //触发input上传
        }
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
             uploadImg(option.ratio)
        }else{
            let iosoption = {ratio:""};
            iosoption.ratio = option.ratio;
            window.webkit.messageHandlers.uploadImg.postMessage(iosoption);

        }
    
    }
}
//调用相机、相册ios回调
function getImageData(res){
    getImage_Data_app(res)
}


//8.跳转身份码  参数说明 身份码  Option = "userCode"  / 支付码  Option = "payCode"
function goToUserInfoCode_app (Option=null){
    if(getEnv_app()=='Android'){
        window.android.goToUserInfoCode("userCode")
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            goToUserInfoCode(Option)
        }else{
            window.webkit.messageHandlers.goToUserInfoCode.postMessage(nul);
        }
      
    }
}


//9.跳转支付码码
function goToPayCode_app (){
    if(getEnv_app()=='Android'){
        window.android.goToPayCode()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            goToPayCode()
        }else{
            window.webkit.messageHandlers.goToPayCode.postMessage(null);
        }
      
    }
}

//10.清空搜索内容
function clearSearchKeyword_app (){
    if(getEnv_app()=='Android'){
        window.android.clearSearch()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            clearSearchKeyword()
        }else{
            window.webkit.messageHandlers.clearSearchKeyword.postMessage(null);
        }
      
    }
}


//11.获取token内部使用
var get_Token_app = null;
function tellGetToken_app (callback){
    get_Token_app = callback;
    if(getEnv_app()=='Android'){
        //  android 在web加载完毕时,自动调取js回调
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            tellGetToken()
        }else{
            window.webkit.messageHandlers.tellGetToken.postMessage(null);
        }
    
    }
}
//获取token内部使用ios回调
function getToken(res,type){
    get_Token_app(res,type)
}


//12.获取token第三方
var callback_GetToken_app = null;
function getToken_app(callback){
    callback_GetToken_app = callback;
    callback_GetToken_app({d:{access_token: 'callback_GetToken_app'}})
    return
    if(getEnv_app()=='Android'){
        // alert('Android', 'app.js')
        window.android.getToken()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getTokenNew()
        }else{
            window.webkit.messageHandlers.getTokenNew.postMessage(null);
        }
    
    }
}
//获取token第三方ios回调
function callbackGetToken(res,type){
    callback_GetToken_app(res,type)
}

//13.token失效内部使用
function tokenError_app (){
    if(getEnv_app()=='Android'){
        // window.android.tokenError()
         window.android.tokenExpired()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            tokenError("此账号已在别的地方重新登录")
        }else{
            window.webkit.messageHandlers.tokenError.postMessage(null);
        }
      
    }
}


//14.token失效第三方使用
function tokenExpired_app (){
    if(getEnv_app()=='Android'){
        window.android.tokenExpired()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            tokenExpired()
        }else{
            window.webkit.messageHandlers.tokenExpired.postMessage(null);
        }
      
    }
}

//15.修改页面title     参数说明：{"title":页面title} 
function refreshTitle_app (option=null){
    if(getEnv_app()=='Android'){
        window.android.setTitle(option.title)
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            refreshTitle(option.title)
        }else{
            window.webkit.messageHandlers.refreshTitle.postMessage(option);
        }
      
    }
}

//16.是否显示返回和关闭按钮  参数说明{"back":true,"close"：true}   true代表显示  back返回/close关闭
//有疑问安卓的不调用？？？？？？
function setShowTopView_app (option=null){
    if(getEnv_app()=='Android'){
        window.android.setShowTopView(JSON.stringify(option))
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            setShowTopView(JSON.stringify(option))
        }else{
            window.webkit.messageHandlers.setShowTopView.postMessage(option);
        }
      
    }
}


//17.获取定位
var callback_Location_app = null;
function getLocation_app (callback){
    callback_Location_app = callback;
    if(getEnv_app()=='Android'){
         window.DeviceInfo.getLocation()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           getLocation()
        }else{
            window.webkit.messageHandlers.getLocation.postMessage(null);
        }
    
    }
}
//获取定位ios回调
function callbackLocation(res){
    callback_Location_app(res)
}


//18.获取蓝牙信息
var callback_Bluetooth_app = null;
function bluetoothInfo_app(callback){
    callback_Bluetooth_app = callback;
    if(getEnv_app()=='Android'){
         window.DeviceInfo.bluetoothInfo()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
             bluetoothInfo()
        }else{
            window.webkit.messageHandlers.bluetoothInfo.postMessage(null);
        }
    
    }
}
//获取蓝牙信息ios回调
function callbackBluetooth(res){
    callback_Bluetooth_app(res);
}


//19.获取电池电量
var callback_DeviceLevel_app = null;
function deviceLevel_app (callback){
    callback_DeviceLevel_app = callback;
    if(getEnv_app()=='Android'){
        window.DeviceInfo.deviceLevel()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            deviceLevel()
        }else{
            window.webkit.messageHandlers.deviceLevel.postMessage(null);
        }
    
    }
}
//获取电池电量ios回调
function callbackDeviceLevel(res){
    callback_DeviceLevel_app(res);
}

//20.调用手机震动
function getShock_app (){
    if(getEnv_app()=='Android'){
        window.DeviceInfo.getShock()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getShock()
        }else{
            window.webkit.messageHandlers.getShock.postMessage(null);
        }
      
    }
}


//21.调用扫一扫
var callback_Scan_app = null;
//方法一
function getScan_app (callback){
    callback_Scan_app = callback;
    if(getEnv_app()=='Android'){
        window.DeviceInfo.getScan()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getScan()
        }else{
            window.webkit.messageHandlers.getScan.postMessage(null);
        }
    
    }
}
//方法二
function getScan_app_v2 (callback){
    callback_Scan_app = callback;
    if(getEnv_app()=='Android'){
        window.DeviceInfo.getScan2()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getScan()
        }else{
            window.webkit.messageHandlers.getScan.postMessage(null);
        }
    
    }
}
//调用扫一扫ios回调
function callbackScan(res){
    callback_Scan_app(res)
}



//22.返回首页
function goToMain_app (){
    if(getEnv_app()=='Android'){
        window.android.goToMain()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            goToMain()
        }else{
            window.webkit.messageHandlers.goToMain.postMessage(null);
        }
      
    }
}



//23.自定义导航栏  参数说明{"isSetBackgroundColor":"true/false","red":"49","green":"30","blue":"30","alpha":"0-1","isSuspension":"true/false"}
//isSetBackgroundColor  是否设置背景色; red/green/blue/alpha  (rgba) ;  isSuspension  是否悬浮
function setActionBar_app (option=null){
    if(getEnv_app()=='Android'){
        window.android.setActionBar(JSON.stringify(option))
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            setActionBar(JSON.stringify(option))
        }else{
            window.webkit.messageHandlers.setActionBar.postMessage(option);
        }
      
    }
}



//24.调整屏幕亮度 参数说明{"screenBright":"0-1"}    screenBright  亮度
var callback_ScreenBright_app = null;
function setScreenBright_app(option=null,callback){
    callback_ScreenBright_app= callback
    if(getEnv_app()=='Android'){
         window.DeviceInfo.setScreenBright(JSON.stringify(option))
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            setScreenBright(option.screenBright)
        }else{
            window.webkit.messageHandlers.setScreenBright.postMessage(option);
        }
    
    }
}
//调整屏幕亮度 ios回调
function callbackScreenBright(res){
    callback_ScreenBright_app(res)
}



//25.获取IP地址
var callback_ConnectionInfo_app = null;
function getConnectionInfo_app(callback){
    callback_ConnectionInfo_app = callback
    if(getEnv_app()=='Android'){
        window.DeviceInfo.getConnectionInfo()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getConnectionInfo()
        }else{
            window.webkit.messageHandlers.getConnectionInfo.postMessage(null);

        }
    
    }
}
//获取IP地址 ios回调
function callbackConnectionInfo(res){
    callback_ConnectionInfo_app(res)
}



//26.跳转app   参数说明{"url":"跳转链接"}   
function openThirdApp_app (option=null){
    if(getEnv_app()=='Android'){
        window.DeviceInfo.openThirdApp(JSON.stringify(option))
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            openThirdApp(option.url)
        }else{
            window.webkit.messageHandlers.openThirdApp.postMessage(option);
        }
      
    }
}


//27.搜索 

var secrch_call_app =null;
function searchKeyword_app (callback){
    searchKeyword(callback)  
}
function searchKeyword (callback){
    secrch_call_app = callback;    
}
//android的搜索的回调
function voteIndexSearch (searchStr){
    secrch_call_app(searchStr)
}

//ios的搜索的回调
function searchAction (searchStr){
    secrch_call_app(searchStr)
}

//28.初始化FC蓝牙
function initDevice_app (){
    if(getEnv_app()=='Android'){
        window.FCBle.initDevice()
    }
    if(getEnv_app()=='iOS'){
      
    }
}

//29.FCBle模块连接(只有安卓有)蓝牙WiFi锁
//参数说明option {"password":"setPassword","lockId":"setLockId","aesKey":"setAesKey","ssid":"setSsid","wifiPassword":"setWifiPassword","url":"setUrl","port":10}
var callback_bindDevice_app = null;
function bindDevice_app (option=null,callback){
    callback_bindDevice_app = callback;
    if(getEnv_app()=='Android'){
        window.FCBle.bindDevice(option)
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//FCBle模块连接的回调
function bindDeviceCallback(callbackJson){
    callback_bindDevice_app(callbackJson);

}

//30.FCBle模块蓝牙开锁(只有安卓有)
//参数说明 option为 {"mac":"mac","lockId":"setLockId","aesKey":"setAesKey"}
var callback_openLock_app = null;
function openLock_app(option=null,callback){
    callback_openLock_app = callback;
    if(getEnv_app()=='Android'){
        window.FCBle.openLock(option)
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//FCBle模块蓝牙开锁的回调
function openLockCallback(callbackJson){
    callback_openLock_app(callbackJson);
}

//31.FCBle模块配置网络(只有安卓有)
//参数说明 option为 {"mac":"mac","lockId":"setLockId","aesKey":"setAesKey","ssid":"setSsid","wifiPassword":"setWifiPassword","url":"setUrl","port":1}
var callback_configNetwork_app = null;
function configNetwork_app(option=null,callback){
    callback_configNetwork_app = callback;
    if(getEnv_app()=='Android'){
        window.FCBle.configNetwork(option)
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//FCBle模块配置网络的回调
function configNetworkCallback(callbackJson){
    callback_configNetwork_app(callbackJson);

}

//32.低功率蓝牙设备数据传输接口2.0
//32.1) 判断低功耗设备是否打开,callback回调
var callback_onBtLeCallBack_app = null;
function isBtLeOpen_app(callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){
        window.BtLe.isBtLeOpen()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//32.2) 请求权限,callback回调
function requestPermissions_app(callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){
        window.BtLe.requestPermissions()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}

//32.3) 打开蓝牙 ,callback回调
function openBtle_app(callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){
        window.BtLe.openBtle()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}

//32.4) 手机搜索蓝牙设备   (2)参数可有可无 有的话搜指定设备 option 为 {'name':'设备名称'}  ,callback回调
function searchBtle_app(option=null,callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){       
        if(!option){
            window.BtLe.searchBtle(JSON.stringify(option))
        }else{
            window.BtLe.searchBtle()
        }     
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//32.5) 连接设备 option 为  {'address':'设备Mac地址'}  ,callback回调
function connectBtLe_app(option=null,callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){       
         window.BtLe.connectBtLe(JSON.stringify(option))   
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//32.6) 发送数据 option 为  {'address':'设备Mac地址','serviceUUID':'服务UUID','writeCharacterUUID':'APP向设备写UUID','notifyCharacterUUID':'设备发送通知给APP的UUID','data':'要发送的数据'}
    //如果三个UUID都不传则使用默认的
	// 默认的UUID,如有错误请通知我更正
	// 'serviceUUID':6E400001-B5A3-F393-E0A9-E50E24DCCA9E
	// 'writeCharacterUUID':6E400003-B5A3-F393-E0A9-E50E24DCCA9E
    // 'notifyCharacterUUID':6E400002-B5A3-F393-E0A9-E50E24DCCA9E
    // callback回调
function pushBtLeData_app(option=null,callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){       
         window.BtLe.pushBtLeData(JSON.stringify(option))   
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}

//32.7) 断开连接 option 为  {'address':'设备Mac地址'} ,callback回调
function disconnectBtLe_app(option=null,callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){       
         window.BtLe.disconnectBtLe(JSON.stringify(option))   
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}
//32.8) 请求蓝牙权限 ,callback回调
function requestBlePermissions_app(callback){
    callback_onBtLeCallBack_app = callback;
    if(getEnv_app()=='Android'){       
        window.BtLe.requestBlePermissions()   
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
           
        }else{
            
        }
      
    }
}

function onBtLeCallBack(callbackJson){
    callback_onBtLeCallBack_app(callbackJson)
}



//33.获取高德定位
var callback_AMapLocation_app = null;
function getLocation_app (callback){
    callback_AMapLocation_app = callback;
    if(getEnv_app()=='Android'){
         window.DeviceInfo.getAMapLocation()
    }
    if(getEnv_app()=='iOS'){
        if(!getIosVersionFun_app()){
            getAMapLocation()
        }else{
            window.webkit.messageHandlers.getAMapLocation.postMessage(null);
        }
    
    }
}
//获取定位ios回调
function callbackAMapLocation(res){
    callback_AMapLocation_app(res)
}


//34.是否需要刷新页面   //isNeedRefresh为boolean（true，false）
function getIsNeedRefresh_app(isNeedRefresh) {
    if(getEnv_app()=='Android'){
        window.android.isNeedRefresh(isNeedRefresh)
   }
   if(getEnv_app()=='iOS'){
       if(!getIosVersionFun_app(isNeedRefresh)){
        isNeedRefresh()
       }else{
           window.webkit.messageHandlers.isNeedRefresh.postMessage(isNeedRefresh);
       }
   
   }
    
}

//35.重新加载当前页面  //isClearHostory是否清除历史记录为boolean（true，false）
function getWebReload_app(isClearHostory) {
    if(getEnv_app()=='Android'){
        window.android.webReload(isClearHostory)
   }
   if(getEnv_app()=='iOS'){
       if(!getIosVersionFun_app()){
            webReload(isClearHostory)
       }else{
           window.webkit.messageHandlers.webReload.postMessage(isClearHostory);
       }
   
   }
    
}