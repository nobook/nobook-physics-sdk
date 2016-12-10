function NBPhysics(callBack) {
    this.isDEBUG = false;
    if(this.isDEBUG) {
        this.host="http://wuli.nobook.cc/";
    } else {
        this.host="http://console.nobook.com.cn/";
    }
    this._callBackFunc=callBack;
    // 动态加载js
    this.head= document.getElementsByTagName('head')[0];
    this.ary = [
        'static/plugins/jQuery/jQuery-2.1.4.min.js',
        'static/plugins/layer-v2.2/layer.js',
        'static/js/TweenMax.min.js',
        'static/js/hammer.min.js',
        'static/js/keyboard.js',
        'static/js/pixi.js',
        'static/js/pixi-particles.js',
        'static/js/nbBox.js',
        'static/js/soundjs-0.6.2.combined.js',
        'static/plugins/clipboard/clipboard.js',
        'static/js/beep/Beep.js',
        'static/js/beep/Beep.Note.js',
        'static/js/beep/Beep.Voice.js',
        'static/js/beep/Beep.Trigger.js',
        'static/js/beep/Beep.Instrument.js'
    ];//动态插入依赖js
    this.__loadNextJS();
}

NBPhysics.prototype.__loadNextJS = function () {
    if(this.ary.length) {
        var path_=this.ary.shift();
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.onreadystatechange= function () {
            if (this.readyState == 'complete')
                this.__loadComplete();
        }.bind(this);
        script.onload= function(){
            this.__loadComplete();
        }.bind(this);
        script.src= path_;
        this.head.appendChild(script);
    }
}

NBPhysics.prototype.__loadComplete = function () {
    if(this.ary.length) {
        this.__loadNextJS();
    } else {
        // 所有js加载完成
        this.__init();
    }
}

NBPhysics.prototype.__init = function () {
    $.get("/static/js/electricity.js", function (data) {
        this._labjs=data;
        if(this._callBackFunc) {
            this._callBackFunc();
        }
    }.bind(this));
}

NBPhysics.prototype.__getJSID = function () {
    if(!this._labjs) return false;
    var id=new Date().getTime();
    var jsstr = this._labjs.replace("dd0ae49a87320653", id);
    eval(jsstr);
    return "ID_"+id;
}

/**
 * 创建player
 * @returns {*}
 */
NBPhysics.prototype.createPlayer = function (config) {
    var id_= this.__getJSID();
    if(!id_) return false;
    var PhysicsMain = window[id_].PhysicsMain;
    config.pMode=1;
    config.width = config.width || 500;
    config.height = config.height || 500;
    config.winresize = config.winresize == undefined ? false:config.winresize;
    return new PhysicsMain(config);
}

/**
 * 创建实验id
 * @param auth
 */
NBPhysics.prototype.createSceneId = function (obj) {
    var auth=obj.auth;
    var callBack=obj.callBack;
    $.get(this.host+"openapi/creat?appid="+auth.appid+"&time="+auth.time+"&code="+auth.code, function (data) {
        if(data.success) {
            //实验id为data.obj.sceneid
            callBack(data.obj.sceneid);
        }
    }, 'json');
}

/**
 * 打开编辑界面
 * @param obj
 */
NBPhysics.prototype.openEditPage = function (obj) {
    var auth=obj.auth;
    var sceneid=obj.sceneid;
    var url_="http://wuli.nobook.cc/openapi/edit?appid="+auth.appid+"&time="+auth.time+"&code="+auth.code+"&sceneid="+sceneid;
    window.open(url_);
}

global.NBPhysics = NBPhysics;
module.exports = NBPhysics;
