/*
IOS: 得间小说
原作者 @YaphetS0903
更新刷金币 @leaf
TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120

普通版极速版都可，跑一次3000金币，自己定时
少跑少黑，多跑多黑，金币上不封顶
此脚本只刷金币，不跑签到和宝箱，提现30和50分别需要阅读150分钟和180分钟，自行解决
某些新号会有3.88的提现

青龙：
捉随便一个包，拿用户id
ku=jxxxxxxxx 或 usr=jxxxxxxxx 或 userName=jxxxxxxxx
放到变量 djxsUserId 里面，多账号用@隔开
export djxsUserId='j12345678@j87654321'

V2P/圈X 重写：打开APP即可获取，没有的话点一下我的页面
[task_local]
#得间小说刷金币
0-59/15 8-23 * * * https://raw.githubusercontent.com/leafxcy/JavaScript/main/djxs_leaf.js, tag=得间小说刷金币, enabled=true
[rewrite_local]
https://dj.palmestore.com/zyuc/api/user/accountInfo url script-request-header https://raw.githubusercontent.com/leafxcy/JavaScript/main/djxs_leaf.js
[MITM]
hostname = dj.palmestore.com

*/
const $ = new Env('得间小说');
let jsname = '得间小说'

let djxsUserId = ($.isNode() ? process.env.djxsUserId : $.getdata('djxsUserId')) || '';
let userIdArr = []
let userIdx = 0

!(async () => {
    if (typeof $request !== "undefined") {
        await getRewrite()
    } else {
        for(let userIds of djxsUserId.split('@')) if(userIds) userIdArr.push(userIds)
        if(userIdArr.length==0) {console.log('没找到djxsUserId'); return;}
        for(userIdx=0; userIdx<userIdArr.length; userIdx++) {
            let p1 = randomString(32)
            for(let i=0; i<3; i++) {
                await video(userIdx,79,p1)
                await $.wait(1000)
            }
        }
    }
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

function getRewrite()
{
    if($request.url.indexOf("api/user/accountInfo") > -1) {
        let uid = $request.url.match(/usr=(\w+)/)[1]
        if(djxsUserId) {
            if(djxsUserId.indexOf(uid) > -1) 
                console.log(`检测到重复账户id：${uid}`)
            else {
                djxsUserId = djxsUserId + '@' + uid
                let accNum = djxsUserId.split('@').length
                console.log(`获取到第${accNum}个账户id：${uid}`)
                $.msg(`获取到第${accNum}个账户id：${uid}`)
                $.setdata(djxsUserId,'djxsUserId')
            }
        } else {
            console.log(`获取到第1个账户id：${uid}`)
            $.msg(`获取到第1个账户id：${uid}`)
            $.setdata(uid,'djxsUserId')
        }
    }
}

function video(uIdx,idx,p1) {
    return new Promise((resolve) => {
        let userId = userIdArr[uIdx]
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "dj.palmestore.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "X-Requested-With": "XMLHttpRequest"}
        let url = {
            url: `https://dj.palmestore.com/zycl/gold/receive?usr=${userId}&rgt=7&p1=${p1}&p2=126001&p3=17144260&p4=501660&p5=1001&p6=AAAAAAAAAAAAAAAAAAAA&p7=AAAAAAAAAAAAAAA&p9=0&p11=584&p16=iPhone13%2C2&p21=31303&p22=iOS%2C15.0&p25=14050160&zyeid=96face4f-b81d-4a7b-9166-0468c5a5dc87&ku=${userId}&kt=a7a6455e759b84a36494f5e8b7af67a3&idfa=00000000-0000-0000-0000-000000000000&type=videoTask&videoId=${idx}`,
            headers: hd,
        }
        $.get(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(`账户${uIdx+1}看视频：${result.msg}, 获得金币：${result.body.coin}`)
                } else {
                    console.log(`账户${uIdx+1}看视频失败：${result.msg}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        })
    })
}

function draw(uIdx,p1) {
    return new Promise((resolve) => {
        let userId = userIdArr[uIdx]
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "dj.palmestore.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "Cookie": `sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22j52491554%22%2C%22first_id%22%3A%2217e1680e1981d0f-0ae3d025548815-744c1751-329160-17e1680e19923bf%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217e1680e1981d0f-0ae3d025548815-744c1751-329160-17e1680e19923bf%22%7D; sajssdk_2015_cross_new_user=1`,
        "Referer": `https://dj.palmestore.com/zyam/app/app.php?activeId=68&ca=Wheel.Index&idfa=00000000-0000-0000-0000-000000000000&jailbreak=0&kt=4ea4c0918929c90c5e5f6100038770e2&ku=${userId}&p1=F114704798564E9F92264FD03083B782&p11=584&p12=&p16=iPhone13,2&p2=126001&p21=31303&p22=iOS,15.0&p25=14050160&p3=17144260&p4=501660&p5=1001&p6=AAAAAAAAAAAAAAAAAAAA&p7=AAAAAAAAAAAAAAA&p9=0&pc=10&rgt=7&usr=${userId}&zyeid=d9ef1831-680d-454a-947b-a234005379d3`,
        "X-Requested-With": "XMLHttpRequest"}
        let url = {
            url: `https://dj.palmestore.com/zyam/app/app.php?usr=${userId}&rgt=7&p1=F114704798564E9F92264FD03083B782&p2=126001&p3=17144260&p4=501660&p5=1001&p6=AAAAAAAAAAAAAAAAAAAA&p7=AAAAAAAAAAAAAAA&p9=0&p11=584&p16=iPhone13%2C2&p21=31303&p22=iOS%2C15.0&p25=14050160&zyeid=d9ef1831-680d-454a-947b-a234005379d3&pca=Wheel.Index&ku=${userId}&kt=4ea4c0918929c90c5e5f6100038770e2&ca=Wheel.Draw&idfa=00000000-0000-0000-0000-000000000000&activeId=68&drawType=2`,
            headers: hd,
        }
        $.get(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(`账户${uIdx+1}抽奖：${result.body.title}`)
                } else {
                    console.log(`账户${uIdx+1}抽奖失败：${result.msg}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        })
    })
}

function randomString(len=32) {
    let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    let maxLen = chars.length;
    let str = '';
    for (i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random()*maxLen));
    }
    return str;
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
