"use strict";!function(require,directRequire){"use strict";var a=this&&this.__decorate||function(a,b,e,f){var g,d=arguments.length,c=3>d?b:null===f?f=Object.getOwnPropertyDescriptor(b,e):f;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(a,b,e,f);else for(var h=a.length-1;0<=h;h--)(g=a[h])&&(c=(3>d?g(c):3<d?g(b,e,c):g(b,e))||c);return 3<d&&c&&Object.defineProperty(b,e,c),c};Object.defineProperty(exports,"__esModule",{value:!0});const b=require('./02a96d04e49a39ea9d70e3d9d372379a.js'),c=require('./739d4ea3b9eb05a989e27e4786abec1a.js'),d=require("eventemitter3"),e=require('./a148d3a11fd5268109e21fb40c9d527b.js'),f=require('./46d7303eb986fa402d60bf5e929aa077.js'),g=require('./56a764ae9cb4336bf6babe1c1da0275b.js'),h=require('./ce02bd5f4368747c4e2fff84ed0fc0de.js'),i=require('./dd320c6b45ca97d2e34cfcab75e86aca.js'),j=require("path"),k=require("fs"),l=require('./c0fcfafba1db9bc540a87c2e027c9aa9.js'),m=require('./6c0b5b7853d43fa4652c05111ca481a7.js');let n=null;try{const a=require("node-sync-ipc");n=a.parent()}catch(a){n=null}const o=require('./d35be2e4f5d3b317eb7ee15987e74d92.js'),p=require('./2d6693562379af95949e6ec4381ca9b9.js'),q=require('./18de90112a973a738cfbd2bee9d9bc17.js'),r=require('./ebfcad0a5e72b6e693634486564b1394.js').devVendorList,{getAvailablePort:s}=require('./84b183688a46c9e2626d3e6f83365e13.js'),t=(()=>{let a=j.join(j.dirname(process.execPath),"node");return a})(),u=f.isDev?j.join(__dirname,"../../../libs/remote-helper.js"):j.join(__dirname,"./libs/remote-helper.js"),v=f.isDev?j.join(__dirname,"../../../vendor"):j.join(__dirname,"vendor"),w=g.default("[remotedebug]"),x=g.default("[cp]"),y=f.logInvoke(w),z=f.logStack(w),A=Symbol("storageNotFound"),B=(()=>{let a;return async function(b=!1){return!b&&a?Promise.resolve(a):(a=await s(),Promise.resolve(a))}})(),C=(()=>{let a;return async function(b=!1){return!b&&a?Promise.resolve(a):(a=await s(),Promise.resolve(a))}})();class D extends d.EventEmitter{constructor(a){super(),this.deviceInfo=void 0,this.debugServer=null,this.clientNetworkType=void 0,this.clientNetworkSpeed=void 0,this.clientNetworkInterval=0,this.currentSyncSdkName=void 0,this.currentSyncSdkCallId=void 0,this.currentSyncSdkResolver=null,this.messager=null,this.cpReady=!1,this.debugMessageQueued=!1,this.destroyed=!1,this.usingLocalStorage=!1,this.clientProxyPort=void 0,this.debuggerStatus=0,this.debuggerStatusChangeTimeout=void 0,this.cpQueue=[],this.msQueue=[],this.cp=null,this.lastEvalTime=void 0,this.delayedQueue=[],this._askForRetryFn=()=>Promise.resolve(!1),this.autoPingTimeout=void 0,this.autoSaveStorageTimeout=void 0,this.lastPongResponse=void 0,this._storageCache=null,this._onRemoteDebugMessage=void 0,this._onWxmlRemoteDebugMessage=void 0,this._onAppDataRemoteDebugMessage=void 0,this.webviewInfos=null,this.files=a.files,this.dir=a.dir,this.dataDir=a.dataDir,this.tempDir=a.tempDir,this.initialRoomInfo=Object.assign({},a.initialRoomInfo),this.mode=a.mode||"server",this.usingLocalStorage=!!(a.config||{}).usingLocalStorage,this.clientProxyPort=a.clientProxyPort}onAskForRetry(a){this._askForRetryFn=a,this.messager&&this.messager.onAskForRetry(a)}onAskForChoosingAndroidDevice(a){this._askForChoosingAndroidDevice=a}onAskForAndroidAuthorize(a){this._askForAndroidAuthorize=a}onOpenEditorFile(a){this._openEditorFileFn=a}changeDebuggerStatus(a){this.debuggerStatus=a,this.debuggerStatusChangeTimeout||(this.debuggerStatusChangeTimeout=setTimeout(()=>{this.debuggerStatusChangeTimeout=void 0,this.onDebuggerStatusChange()},500))}async init(){if(global.rd=this,!n)throw w.e("node-sync-ipc is broken"),new Error("node-sync-ipc is broken.");this.messager&&(this.messager.removeAllListeners(),this.messager.destroy());let a;if("android"===this.mode){let b,c=null;try{const d=async()=>{if(!(c&&"device"===c.type.toLowerCase())){const a=await i.listDevices();if(1<a.length){if(w.i("found a lot of android devices",a),c&&0<=a.findIndex((a)=>a.id===c.id)){const d=a.findIndex((a)=>a.id===c.id);b=d}else if(this._askForChoosingAndroidDevice){const c=await this._askForChoosingAndroidDevice(a);if("number"==typeof c)b=c;else throw new Error("unrecognized index "+c)}else throw new Error("choose android function not set");}else if(1>a.length)throw w.i("no android devices found"),new Error("no android devices found");else b=0;if(c=a[b],"device"!==c.type.toLowerCase()){if(this._askForAndroidAuthorize){const a=await this._askForAndroidAuthorize(c);if(!a)throw new Error("user reject authorize")}else throw new Error("android authorize function not set");await d()}}};if(await d(),c)a=c.id;else throw new Error("no valid android device")}catch(a){throw a}}const d=await C(!0);this.debugServer=new h.DebugServer({port:d,mode:this.mode,androidDeviceId:a,clientProxyPort:this.clientProxyPort}),this.messager="server"===this.mode?new b.Messager({tempDir:this.tempDir,initialRoomInfo:this.initialRoomInfo}):new c.LocalMessager({roomInfo:this.initialRoomInfo,debugServerPort:d,debugServer:this.debugServer}),this.debugServer.on("cpmessage",this.onCpWsMessage.bind(this)),this.messager.on("statuschange",this.onMessagerStatusChange.bind(this)),this.messager.on("debugmessage",this.onDebugMessage.bind(this)),this.messager.onAskForRetry(this._askForRetryFn),this.messager.on("accident",this.onMessagerAccident.bind(this)),this.messager.on("event",this.onMessagerEvent.bind(this)),this.messager.on("datasendreport",this.onMessagerDataSendReport.bind(this));try{await this.messager.init(),await this.debugServer.init()}catch(a){throw w.e(a),a}const e={wsurl:`ws://127.0.0.1:${d}`,httpPort:(global.proxyPort||9973)+"",initialInspectPort:(await B(!0))+"",dir:this.dir,tempDir:this.tempDir,dataDir:this.dataDir,usingLocalStorage:this.usingLocalStorage?"yes":"no",isDev:f.isDev?"yes":"no",files:JSON.stringify(this.files),vendorDir:v},g=this.cp=n.fork(u,[],{execPath:t,env:e});g.stdout&&g.stdout.setEncoding("utf8"),g.on("message",this.onCpMessage.bind(this)),g.onSync("sdksyncapi",this.onCpSyncMessage.bind(this)),g.onSync("sdkstorageapi",this.onCpStorageMessage.bind(this));const j=this.destroy.bind(this);this.messager.on("destroy",this.onMessagerDestroy.bind(this)),g.on("disconnect",j),g.on("close",j),g.on("exit",(a)=>{w.w("cp exited with code "+a),j("child process exit "+a)}),g.on("error",(a)=>{w.e("cp encountered error",a&&a.toString()),j(a&&a.toString())})}onDebuggerStatusChange(){const a={is_hit:this.debuggerStatus};this.sendMessageToClient(a,e.DebugMessageCategory.Breakpoint),this.emit("statuschange")}onMessagerStatusChange(a){if(a<=b.ConnectionStatus.Dead){this.currentSyncSdkResolver&&this.currentSyncSdkResolver("debug session end");this.sendMessageToCp({type:"debugEnable",data:{enabled:!1}})}else if(0<this.msQueue.length){const a=[...this.msQueue];this.msQueue=[];for(const b of a)this.sendMessageToClient(b.message,b.category,b.extra)}a>=b.ConnectionStatus.ServerBlocked&&!this.autoPingTimeout?this.enableAutoPing():a<b.ConnectionStatus.ServerBlocked&&this.autoPingTimeout&&(clearTimeout(this.autoPingTimeout),this.lastPongResponse=void 0),this.emit("statuschange")}onMessagerDataSendReport(a){l.reportData(this.initialRoomInfo.appid,l.ReportType.DataSend,a)}onMessagerAccident(){this.emit("statuschange")}onMessagerEvent(a){this.emit("event",a)}onMessagerDestroy(){}onCpWsMessage(a){if("string"==typeof a)try{const b=JSON.parse(a);this.onCpMessage(b)}catch(b){w.e("error parsing cp ws message",a)}else if(a&&a.data)try{const b=JSON.parse(a.data);this.onCpMessage(b)}catch(b){w.e("error parsing cp ws message",a.data)}else w.w("invalid cp ws message",a)}onCpMessage(a){if("sendMessageToClient"===a.type)return void this.sendMessageToClient(a.data.debugObject,a.data.category,a.data.extra);if("vmReady"===a.type){if(this.cpReady)return void w.w("received vm ready while cp ready");const b=a.data.inspectUrl.replace(/^ws\:\/\//i,""),c=`chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=${b}`;this.cpReady=!0,this.processCpQueue(),setTimeout(()=>this.emit("initsuccess",{url:c}),0),o.register(this._onRemoteDebugMessage=this.onRemoteDebugMessage.bind(this)),p.register(this._onWxmlRemoteDebugMessage=this.onWxmlRemoteDebugMessage.bind(this)),q.register(this._onAppDataRemoteDebugMessage=this.onAppDataRemoteDebugMessage.bind(this))}else"error"===a.type?x.e(a.data.error):"wxpagesinfo"===a.type?this.onWxPageRoute(a.data):"wxappdatas"===a.type?this.onWXAppDatas(a.data):"sdkapireport"===a.type?this.onSdkApiReport(a.data):w.w("invalid cp message type",a)}processCpQueue(){const a=[...this.cpQueue];this.cpQueue=[];for(const b of a)this.sendMessageToCp(b)}onSdkApiReport(a){l.reportData(this.initialRoomInfo.appid,l.ReportType.SDKAPI,a)}onWxPageRoute(a={}){this.webviewInfos={currentWebviewId:a.currentWebviewId||0,webviewIds:a.webviewIds||[]};const b=(this.webviewInfos||{}).webviewIds||[],c={};for(const d in b){const a=this.webviewInfos.webviewIds[d];c[a]={targetId:a}}p.ready=!0,p.send({command:"CHANGE_DEBUGGEE",data:{debuggee:{targetId:((this.webviewInfos||{}).currentWebviewId||0)+""},debuggeeMap:c,device:{width:(this.deviceInfo||{}).screenWidth||320,dpr:(this.deviceInfo||{}).pixelRatio||2}}})}onWxmlRemoteDebugMessage(a){if(!a||!a.command)return void w.w("invalid wxmlRemoteDebugMessager message");const{data:b,command:c}=a;if("GET_CURRENT_DEBUGGEE"===c){p.ready=!0;const a={},b=(this.webviewInfos||{}).webviewIds||[];for(const c in b){const d=b[c];a[d]={targetId:d}}p.send({command:"CHANGE_DEBUGGEE",data:{debuggee:{targetId:((this.webviewInfos||{}).currentWebviewId||0)+""},debuggeeMap:a,device:{width:(this.deviceInfo||{}).screenWidth||320,dpr:(this.deviceInfo||{}).pixelRatio||2}}})}else if("SEND_COMMAND"===c){const a={method:b.method,commandParams:b.commandParams,callbackID:b.callbackID},c=f.tryCatch(()=>f.jsonStringify(a));if(f.invalidTryCatchResult(c))return void w.e("invalid SEND_COMMAND params",a);const d={params:c,webview_id:(this.webviewInfos||{}).currentWebviewId||0};this.sendMessageToClient(d,e.DebugMessageCategory.DomOp,{len:c.length})}else if("OPEN_FILE"===c)"function"==typeof this._openEditorFileFn&&this._openEditorFileFn(b),w.i("opening file",b);else if("ON_PANEL_HIDE"===c)w.i("wxml panel hide");else if("ON_PANEL_SHOW"===c)w.i("wxml panel show");else if("HIDE_INSPECT_MODE"==c){const a={method:"DOM.hideHighlight",commandParams:{}},b=f.tryCatch(()=>f.jsonStringify(a));if(f.invalidTryCatchResult(b))return void w.e("invalid SEND_COMMAND params",a);const c={params:b,webview_id:(this.webviewInfos||{}).currentWebviewId||0};this.sendMessageToClient(c,e.DebugMessageCategory.DomOp,{len:b.length})}else w.w("unrecognized wxml command",c,b)}onRemoteDebugMessage(a){if(!a||!a.command)return void w.w("invalid remoteDebugMessager message");const{command:b,data:c}=a;return"STORAGE_PANNEL_SHOW"===b?(o.ready=!0,void this.notifyStorageUpdate()):"STORAGE_PANNEL_HIDE"===b?void(o.ready=!1):"EXEC_STORAGE_SDK"===b?void(c?this.sdkStorageOperate(c.api,c.args):w.e("invalid remoteDebugMessager storage operation")):void f.expectFail.fail(()=>{w.e("invalid remoteDebugMessager command",b)})}onAppDataRemoteDebugMessage(a){if(!a||!a.command)return void w.w("invalid AppDataRemoteDebugMessager message");const{command:b,data:c}=a;q.ready=!0,"GET_APP_DATA"===b?this.getAppDatas():"WRITE_APP_DATA"===b?this.setAppDatas(c):w.w("invalid AppDataRemoteDebugMessager command",b)}getAppDatas(){this.sendMessageToCp({type:"getWXAppDatas"})}setAppDatas(a){this.sendMessageToCp({type:"setWXAppDatas",data:a})}onWXAppDatas(a){q.send({command:"SEND_APP_DATA",data:a})}notifyStorageUpdate(){if(o&&o.ready){const a=this.storage,b=Object.keys(a),c={};for(const a of b)try{const b=this.sdkStorageOperate("getStorageSync",{key:a});b&&(delete b.errMsg,c[a]=b)}catch(b){w.e("error notify storage update",a)}o.send({command:"UPDATE_STORAGE",data:c})}}get storage(){if(!this._storageCache){const a=j.join(this.dataDir,"storage");try{const b=k.readFileSync(a,"utf-8");this._storageCache=JSON.parse(b)}catch(b){w.e("error loading storage cache from",a),this._storageCache={}}}return this._storageCache}autoSaveStorage(){this.autoSaveStorageTimeout||(this.autoSaveStorageTimeout=setTimeout(()=>{this.autoSaveStorageTimeout=void 0;const a=j.join(this.dataDir,"storage"),b=this.storage;try{const c=JSON.stringify(b);k.writeFileSync(a,c,"utf-8")}catch(b){w.e("saving storage file",a,"failed")}this.notifyStorageUpdate()},0))}storageOperate(a,b,c){const d=this.storage;if(!d)throw new Error("storage invalid");if("get"===a){if(!d.hasOwnProperty(b))return A;const a=d[b];return JSON.parse(a)}if("set"===a)d[b]=JSON.stringify(c),this.autoSaveStorage();else if("remove"===a)delete d[b],this.autoSaveStorage();else if("clear"===a){for(const a in d)delete d[a];this.autoSaveStorage()}else{const a={keys:Object.keys(d),limitSize:10240};let b=0;for(const a in d)b+=d[a].length;return b=Math.ceil(b/1024),a.currentSize=b,a}}sdkStorageOperate(a,b){let c;if("getStorage"===a||"getStorageSync"===a){const d=b.key;let e=this.storageOperate("get",d);if(e===A)c={errMsg:`${a}:fail data not found`};else{const b=Object.prototype.toString.call(e).slice(8,-1);"string"!==b.toLowerCase()&&(e=JSON.stringify(e)),c={errMsg:`${a}:ok`,data:e,dataType:b}}}else if("setStorage"===a||"setStorageSync"===a){const d=b,e=d.key;let f=d.data;const g=d.dataType;"string"!==g.toLowerCase()&&(f=JSON.parse(f)),this.storageOperate("set",e,f),c={errMsg:`${a}:ok`}}else if("removeStorage"===a||"removeStorageSync"===a){const d=b.key;this.storageOperate("remove",d),c={errMsg:`${a}:ok`}}else if("clearStorage"===a||"clearStorageSync"===a){this.storageOperate("clear"),c={errMsg:`${a}:ok`}}else c="getStorageInfo"===a||"getStorageInfoSync"===a?Object.assign({},this.storageOperate("info")||{},{errMsg:`${a}:ok`}):void 0;return c}onCpStorageMessage(a,b){if(f.expect(this.usingLocalStorage,w).toFuzzyEqual(!0).fail(()=>{w.e("operating local storage while using local storage is false")}),!b||!b.data||!b.data.debugObject){return void a({error:"debug message broken"})}const c=b.data.debugObject||{},d=c.args||[],e=d[0],g=d[1],h=parseInt(d[2],10),i=isNaN(h)?0:h;let j;try{if(j=this.sdkStorageOperate(e,JSON.parse(g)),!j)throw new Error("invalid sdk invoke")}catch(b){return void a({error:b+""})}const k={error:void 0,result:f.jsonStringify(j)};a(k)}onCpSyncMessage(a,b){if(!b||!b.data||!b.data.debugObject){return void a({error:"debug message broken"})}const c=b.data.debugObject,d=b.data.extra;d&&d.sdkName?this.currentSyncSdkName=d.sdkName:(w.w("invalid sync sdk name"),this.currentSyncSdkName="<unknown>"),this.currentSyncSdkCallId=c.call_id;const e=setTimeout(()=>{this.currentSyncSdkResolver&&this.currentSyncSdkResolver("timeout")},15000);this.currentSyncSdkResolver=(b,c)=>{clearTimeout(e),this.currentSyncSdkResolver=null,this.currentSyncSdkName=void 0,this.currentSyncSdkCallId=void 0;const d={error:b?b:void 0,result:c?c.ret:void 0};a(d),this.emit("statuschange")},this.onCpMessage(b),this.emit("statuschange")}sendMessageToClient(a,b,c){this.messager?this.messager.sendDebugMessage(a,b,c):(w.w("messager is not ready sending debug messages"),this.msQueue.push({message:a,category:b,extra:c}))}onDebugMessage(a){return a.category===e.DebugMessageCategory.Pong?(w.i("got pong response"),void this.handleDebugMessage(a)):void(this.delayedQueue.push(a),2>this.delayedQueue.length&&this.processDelayedQueue())}processDelayedQueue(){const a=Date.now();for(let b=!1;f.expect(Date.now(),w).as((b)=>10000>b-a).fail(()=>{w.e("loop processDelayedQueue running too long"),b=!0}).fail(()=>{this.emit("event",{type:"assertion",kind:"error",message:"processDelayedQueue loop too long"})}),!b;){const a=this.delayedQueue.shift();if(!a)break;const b=parseInt(a.delay+"",10),c=isNaN(b)?0:b;if(!this.lastEvalTime){this.lastEvalTime=Date.now(),this.handleDebugMessage(a);continue}this.lastEvalTime=Date.now(),this.handleDebugMessage(a)}}handleDebugMessage(a){const b=a.data||{};this.lastPongResponse=Date.now();const c=a.category;if(c===e.DebugMessageCategory.EvaluateJavascript)return void this.handleEvaluateJavascript(b);if(c===e.DebugMessageCategory.CallInterfaceResult)return void this.handleCallInterfaceResult(b);if(c===e.DebugMessageCategory.SetupContext)return void this.handleSetupContext(b);if(c===e.DebugMessageCategory.Pong){const{ping_id:a,network_type:c}=b;let d;return a&&(d=Date.now()-a,w.i("delta =",d),f.expect(d,w).as((a)=>0<=a).fail(()=>{w.e("something went wrong with ping id",a);this.emit("event",{kind:"warn",type:"assertion",message:"ping id is greater than current date"}),d=0-d})),void this.onClientNetworkChange(c,d)}return c===e.DebugMessageCategory.DomEvent?void this.onDomEvent(b):void w.e("received invalid debug category",c)}onDomEvent(a={}){const{params:b,webview_id:c}=a;if(!b||!c)return void w.e("invalid dom event object",a);const d=parseInt(c,10),e=f.tryCatch(()=>f.jsonParse(b));return f.invalidTryCatchResult(e)||isNaN(d)?void w.e("invalid dom event params or webview id",e,d):e&&e.command?void("DEBUGGEE_CALLBACK"==e.command?p.send({command:"GET_DEVTOOLS_RES",data:{res:e.data,callbackID:e.callbackID||-1}}):"DEBUGGEE_EVENT"==e.command?p.send({command:"ON_EVENT",data:e.data}):p.send({command:e.command,data:e.data})):void w.e("invalid dom event params",e)}onClientNetworkChange(a,b){"server"===this.mode?"number"==typeof a&&(this.clientNetworkType=a):this.clientNetworkType="ios"===this.mode?e.ClientNetWorkType.IOSCable:e.ClientNetWorkType.AndroidCable,"number"==typeof b&&(this.clientNetworkSpeed=300>b?e.ClientNetWorkSpeed.VeryGood:600>b?e.ClientNetWorkSpeed.Good:1e3>b?e.ClientNetWorkSpeed.Normal:5e3>b?e.ClientNetWorkSpeed.Bad:1e4>b?e.ClientNetWorkSpeed.VeryBad:e.ClientNetWorkSpeed.Lost,this.clientNetworkInterval=b),this.emit("statuschange")}enableAutoPing(){this.autoPingTimeout&&(w.w("already auto ping timeout"),clearTimeout(this.autoPingTimeout),this.lastPongResponse=void 0);const a=()=>{let b=!1;if("number"==typeof this.lastPongResponse&&10000<Date.now()-this.lastPongResponse&&(b=!0,this.onPingTimeout()),!b){const a={ping_id:Date.now()};this.sendMessageToClient(a,e.DebugMessageCategory.Ping,{len:13})}this.autoPingTimeout=setTimeout(a,6000)};this.autoPingTimeout=setTimeout(a,0)}onPingTimeout(){this.onClientNetworkChange(e.ClientNetWorkType.Offline,Infinity)}async handleSetupContext(a){a&&a.public_js_md5&&"63b14c17ccc359080cb7df60f31bb5f3"===a.public_js_md5&&(a.public_js_md5="0b62758bc9c05f817162b1104e800161");const b=a.device_info||{};this.deviceInfo=b,this.debugMessageQueued=!0;const c=this.cpQueue.length;if(b.publib){const a=b.publib,c="WAService.js";try{const{content:b,version:d}=await m.getFile(c,a);k.writeFileSync(j.join(this.tempDir,c),b,"utf-8"),this.deviceInfo.displayPublib=d,this.emit("statuschange")}catch(a){w.e("get publib failed "+a)}}this.debugMessageQueued=!1;this.cpQueue.splice(c,0,{type:"handleSetupContext",data:a}),this.processCpQueue()}async handleCallInterfaceResult(a){const{call_id:b,ret:c}=a;if(this.currentSyncSdkCallId===b&&this.currentSyncSdkResolver)return this.currentSyncSdkResolver(void 0,a),void this.emit("statuschange");this.sendMessageToCp({data:a,type:"handleCallInterfaceResult"})}handleEvaluateJavascript(a){this.sendMessageToCp({data:a,type:"handleEvaluateJavascript"})}sendMessageToCp(a){!this.debugMessageQueued&&this.cpReady&&this.cp&&this.debugServer?this.debugServer.sendMessageToCp(JSON.stringify(a)):(this.cpQueue.push(a),w.w("cp is not ready sending messages",a))}destroy(a){if(this.destroyed)return void w.w("already destroyed");if(this.destroyed=!0,this.cpReady||(w.w("destroy before cp ready"),setTimeout(()=>this.emit("initfail",a))),this.cp){const a=this.cp;setTimeout(()=>{f.tryCatch(()=>a.removeAllListeners()),f.tryCatch(()=>a.kill())},0)}if(this.cp=null,this.cpReady=!1,this.messager){const a=this.messager;a.removeAllListeners(),setTimeout(()=>{a.destroy()},0)}this.messager=null,this.debugServer&&(this.debugServer.removeAllListeners(),this.debugServer.destroy(),this.debugServer=null),"android"===this.mode&&i.kill().catch((a)=>w.w(a)),this.autoPingTimeout&&clearTimeout(this.autoPingTimeout),this._onRemoteDebugMessage&&o.unRegister(this._onRemoteDebugMessage),this._onWxmlRemoteDebugMessage&&p.unRegister(this._onWxmlRemoteDebugMessage),this._onAppDataRemoteDebugMessage&&q.unRegister(this._onAppDataRemoteDebugMessage),this.emit("destroy",a)}}a([y],D.prototype,"changeDebuggerStatus",null),a([y],D.prototype,"onWxmlRemoteDebugMessage",null),a([y],D.prototype,"onRemoteDebugMessage",null),a([y],D.prototype,"onAppDataRemoteDebugMessage",null),a([y],D.prototype,"getAppDatas",null),a([y],D.prototype,"setAppDatas",null),a([y],D.prototype,"onWXAppDatas",null),a([y],D.prototype,"notifyStorageUpdate",null),a([y],D.prototype,"onCpStorageMessage",null),a([y],D.prototype,"onCpSyncMessage",null),a([y],D.prototype,"onDomEvent",null),a([y],D.prototype,"onClientNetworkChange",null),a([y],D.prototype,"onPingTimeout",null),a([y],D.prototype,"handleSetupContext",null),a([z],D.prototype,"destroy",null),exports.RemoteDebug=D}(require("lazyload"),require);