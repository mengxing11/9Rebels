/*
cron "30 21 * * *" jd_bean_change.js, tag:资产变化强化版by-ccwav
 */

//详细说明参考 https://github.com/ccwav/QLScript2

const $ = new Env('京东资产变动');
const notify = $.isNode() ? require('./sendNotify') : '';
const common = require('./utils/Rebels_jdCommon');
const { H5st } = require('./utils/Rebels_H')
const JXUserAgent = $.isNode() ? (process.env.JX_USER_AGENT ? process.env.JX_USER_AGENT : ``) : ``;
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let NowHour = new Date().getHours();

//默认开启缓存模式
let checkbeanDetailMode=1;
if ($.isNode() && process.env.BEANCHANGE_BEANDETAILMODE){
	checkbeanDetailMode=process.env.BEANCHANGE_BEANDETAILMODE*1;
}

const fs = require('fs');
const CR = require('crypto-js');
let matchtitle="昨日";
let yesterday="";
let TodayDate="";
let startDate="";
let endDate="";
try {
    const moment = require("moment");
    yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    TodayDate = moment().format("YYYY-MM-DD");
    startDate = moment().startOf("month").format("YYYY_MM");
    endDate = moment().endOf("month").format("YYYY-MM-DD");
} catch (e) {
    console.log("依赖缺失，请先安装依赖moment!");
    return
}

if (!fs.existsSync("./BeanCache")) {
    fs.mkdirSync("./BeanCache");
}

let strBeanCache = "./BeanCache/" + yesterday + ".json";
let strNewBeanCache = "./BeanCache/" + TodayDate + ".json";
let TodayCache = [];
let Fileexists = fs.existsSync(strBeanCache);
let TempBeanCache = [];
if(!Fileexists){
	yesterday=TodayDate;
	strBeanCache=strNewBeanCache;
	Fileexists = fs.existsSync(strBeanCache);
	matchtitle="今日";
}
if (Fileexists) {
    console.log("检测到资产变动缓存文件"+yesterday+".json，载入...");
    TempBeanCache = fs.readFileSync(strBeanCache, 'utf-8');
    if (TempBeanCache) {
        TempBeanCache = TempBeanCache.toString();
        TempBeanCache = JSON.parse(TempBeanCache);
    }
}

Fileexists = fs.existsSync(strNewBeanCache);
if (Fileexists) {
    console.log("检测到资产变动缓存文件"+TodayDate+".json，载入...");
    TodayCache = fs.readFileSync(strNewBeanCache, 'utf-8');
    if (TodayCache) {
        TodayCache = TodayCache.toString();
        TodayCache = JSON.parse(TodayCache);
    }
}


let allMessage = '';
let allMessage2 = '';
let allReceiveMessage = '';
let allWarnMessage = '';
let ReturnMessage = '';
let ReturnMessageMonth = '';
let allMessageMonth = '';

let MessageUserGp2 = '';
let ReceiveMessageGp2 = '';
let WarnMessageGp2 = '';
let allMessageGp2 = '';
let allMessage2Gp2 = '';
let allMessageMonthGp2 = '';
let IndexGp2 = 0;

let MessageUserGp3 = '';
let ReceiveMessageGp3 = '';
let WarnMessageGp3 = '';
let allMessageGp3 = '';
let allMessage2Gp3 = '';
let allMessageMonthGp3 = '';
let IndexGp3 = 0;

let MessageUserGp4 = '';
let ReceiveMessageGp4 = '';
let WarnMessageGp4 = '';
let allMessageGp4 = '';
let allMessageMonthGp4 = '';
let allMessage2Gp4 = '';
let IndexGp4 = 0;

let notifySkipList = "";
let IndexAll = 0;
let EnableMonth = "false";
let isSignError = false;
let ReturnMessageTitle="";
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let intPerSent = 0;
let i = 0;
let llShowMonth = false;
let Today = new Date();
let strAllNotify="";
let strSubNotify="";
let llPetError=false;
let strGuoqi="";
let RemainMessage = '\n';
RemainMessage += "⭕提醒:⭕" + '\n';
RemainMessage += '【京喜特价金币】京东特价版->我的->金币(可兑换无门槛红包)\n';
RemainMessage += '【话费积分】京东->充值中心-赚积分兑话费（180天效期）\n';
RemainMessage += '【超市卡】京东超市->超市卡赠金（30天效期，购买超市商品可用）\n';
RemainMessage += '【E卡】京东->我的->礼品卡(自营商品可用)\n';
RemainMessage += '【东东农场】京东->我的->东东农场,完成可兑换无门槛红包,可用于任意商品\n';
RemainMessage += '【新东东农场】京东->我的->东东农场,完成后获得固定商品券\n';
RemainMessage += '【其他】不同类别红包不能叠加使用，自测';

let WP_APP_TOKEN_ONE = "";

let TempBaipiao = "";
let llgeterror=false;
let time = new Date().getHours();
if ($.isNode()) {
	if (process.env.WP_APP_TOKEN_ONE) {		
		WP_APP_TOKEN_ONE = process.env.WP_APP_TOKEN_ONE;
	}	
}
//if(WP_APP_TOKEN_ONE)
	//console.log(`检测到已配置Wxpusher的Token，启用一对一推送...`);
//else
	//console.log(`检测到未配置Wxpusher的Token，禁用一对一推送...`);

let jdSignUrl = 'https://api.nolanstore.cc/sign'
if (process.env.SIGNURL)
	jdSignUrl = process.env.SIGNURL;

let epsignurl=""
if (process.env.epsignurl)
    epsignurl = process.env.epsignurl;

if ($.isNode() && process.env.BEANCHANGE_PERSENT) {
	intPerSent = parseInt(process.env.BEANCHANGE_PERSENT);
	console.log(`检测到设定了分段通知:` + intPerSent);
}

if ($.isNode() && process.env.BEANCHANGE_USERGP2) {
	MessageUserGp2 = process.env.BEANCHANGE_USERGP2 ? process.env.BEANCHANGE_USERGP2.split('&') : [];
	intPerSent = 0; //分组推送，禁用账户拆分
	console.log(`检测到设定了分组推送2,将禁用分段通知`);
}

if ($.isNode() && process.env.BEANCHANGE_USERGP3) {
	MessageUserGp3 = process.env.BEANCHANGE_USERGP3 ? process.env.BEANCHANGE_USERGP3.split('&') : [];
	intPerSent = 0; //分组推送，禁用账户拆分
	console.log(`检测到设定了分组推送3,将禁用分段通知`);
}

if ($.isNode() && process.env.BEANCHANGE_USERGP4) {
	MessageUserGp4 = process.env.BEANCHANGE_USERGP4 ? process.env.BEANCHANGE_USERGP4.split('&') : [];
	intPerSent = 0; //分组推送，禁用账户拆分
	console.log(`检测到设定了分组推送4,将禁用分段通知`);
}

//取消月结查询
//if ($.isNode() && process.env.BEANCHANGE_ENABLEMONTH) {
	//EnableMonth = process.env.BEANCHANGE_ENABLEMONTH;
//}

if ($.isNode() && process.env.BEANCHANGE_SUBNOTIFY) {	
	strSubNotify=process.env.BEANCHANGE_SUBNOTIFY;
	strSubNotify+="\n";
	console.log(`检测到预览置顶内容,将在一对一推送的预览显示...\n`);	
}

if ($.isNode() && process.env.BEANCHANGE_ALLNOTIFY) {	
	strAllNotify=process.env.BEANCHANGE_ALLNOTIFY;
	console.log(`检测到设定了公告,将在推送信息中置顶显示...`);
	strAllNotify = "✨✨✨✨✨✨✨公告✨✨✨✨✨✨✨\n"+strAllNotify;
	console.log(strAllNotify+"\n");
	strAllNotify +="\n🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏🎏\n"
}


if (EnableMonth == "true" && Today.getDate() == 1 && Today.getHours() > 17)
	llShowMonth = true;

let userIndex2 = -1;
let userIndex3 = -1;
let userIndex4 = -1;


if ($.isNode()) {
	Object.keys(jdCookieNode).forEach((item) => {
		cookiesArr.push(jdCookieNode[item])
	})
	if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false')
		console.log = () => {};
} else {
	cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

//查询开关
let strDisableList = "";
let DisableIndex=-1;
if ($.isNode()) {	
	strDisableList = process.env.BEANCHANGE_DISABLELIST ? process.env.BEANCHANGE_DISABLELIST.split('&') : [];
}

//东东农场
let EnableJdFruit=true;
DisableIndex = strDisableList.findIndex((item) => item === "东东农场");
if(DisableIndex!=-1){
	console.log("检测到设定关闭东东农场查询");
	EnableJdFruit=false;	
}

//特价金币
let EnableJdSpeed=true;
DisableIndex = strDisableList.findIndex((item) => item === "极速金币");
if(DisableIndex!=-1){
	console.log("检测到设定关闭特价金币查询");
	EnableJdSpeed=false;	
}

//领现金
let EnableCash=true;
DisableIndex=strDisableList.findIndex((item) => item === "领现金");
if(DisableIndex!=-1){
	console.log("检测到设定关闭领现金查询");
	EnableCash=false;	
}	

//7天过期京豆
let EnableOverBean=true;
DisableIndex=strDisableList.findIndex((item) => item === "过期京豆");
if(DisableIndex!=-1){
	console.log("检测到设定关闭过期京豆查询");
	EnableOverBean=false
}

//查优惠券
let EnableChaQuan=false;
DisableIndex=strDisableList.findIndex((item) => item === "查优惠券");
if(DisableIndex!=-1){
	console.log("检测到设定关闭优惠券查询");
	EnableChaQuan=false
}

DisableIndex=strDisableList.findIndex((item) => item === "活动攻略");
if(DisableIndex!=-1){
	console.log("检测到设定关闭活动攻略显示");
	RemainMessage="";
}

//汪汪赛跑
let EnableJoyRun=false;
DisableIndex=strDisableList.findIndex((item) => item === "汪汪赛跑");
if(DisableIndex!=-1){
	console.log("检测到设定关闭汪汪赛跑查询");
	EnableJoyRun=false
}

//京豆收益查询
let EnableCheckBean=true;
DisableIndex=strDisableList.findIndex((item) => item === "京豆收益");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京豆收益查询");
	EnableCheckBean=false
}



!(async() => {
	if (!cookiesArr[0]) {
		$.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
			"open-url": "https://bean.m.jd.com/bean/signIndex.action"
		});
		return;
	}
	for (i = 0; i < cookiesArr.length; i++) {
		if (cookiesArr[i]) {
			cookie = cookiesArr[i];
			$.pt_pin = (cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
			$.index = i + 1;
			$.beanCount = 0;
			$.incomeBean = 0;
			$.expenseBean = 0;
			$.todayIncomeBean = 0;
			$.todayOutcomeBean = 0;
			$.errorMsg = '';
			$.isLogin = true;
			$.nickName = '';
			$.levelName = '';
			$.message = '';
			$.balance = 0;
			$.expiredBalance = 0;
			$.xinJdFarmProdName = '';
			$.JdFarmProdName = '';
			$.JdtreeEnergy = 0;
			$.JdtreeTotalEnergy = 0;
			$.treeState = 0;
			$.JdwaterTotalT = 0;
			$.JdwaterD = 0;
			$.JDwaterEveryDayT = 0;
			$.JDtotalcash = 0;
			$.isPlusVip = false;
			$.isRealNameAuth = false;
			$.JingXiang = "";
			$.allincomeBean = 0; //月收入
			$.allexpenseBean = 0; //月支出
			$.beanChangeXi=0;
			$.YunFeiTitle="";
			$.YunFeiQuan = 0;
			$.YunFeiQuanEndTime = "";
			$.YunFeiTitle2="";
			$.YunFeiQuan2 = 0;
			$.YunFeiQuanEndTime2 = "";
			$.ECardinfo = "";
			$.PlustotalScore=0;
			$.CheckTime="";
			$.beanCache=0;			
			TempBaipiao = "";
			strGuoqi="";
			
			console.log(`******开始查询【京东账号${$.index}】${$.nickName || $.UserName}*********`);
		    $.UA = common.genUA($.UserName);
			await TotalBean();			
		    //await TotalBean2();
			if ($.beanCount == 0) {
				console.log("数据获取失败，等待30秒后重试....")
				await $.wait(30*1000);
				await TotalBean();		
			}
			if ($.beanCount == 0) {
				console.log("疑似获取失败,等待10秒后用第二个接口试试....")
				await $.wait(10*1000);
			    var userdata = await getuserinfo();
			    if (userdata.code == 1) {
			        $.beanCount = userdata.content.jdBean;
			    }
			}
			
			
			if (!$.isLogin) {
				await isLoginByX1a0He();
			}
			if (!$.isLogin) {
				$.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
					"open-url": "https://bean.m.jd.com/bean/signIndex.action"
				});

				if ($.isNode()) {
					await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
				}
				continue
			}
			
			if (TempBeanCache) {
			    for (let j = 0; j < TempBeanCache.length; j++) {
			        if (TempBeanCache[j].pt_pin == $.UserName) {
						$.CheckTime = TempBeanCache[j].CheckTime;
			            $.beanCache = TempBeanCache[j].BeanNum;
			            break;
			        }
			    }
			}
			
			var llfound = false;
			var timeString = "";
			var nowHour = new Date().getHours();
			var nowMinute = new Date().getMinutes();
			if (nowHour < 10)
			    timeString += "0" + nowHour + ":";
			else
			    timeString += nowHour + ":";

			if (nowMinute < 10)
			    timeString += "0" + nowMinute;
			else
			    timeString += nowMinute;

			if (TodayCache) {
			    for (let j = 0; j < TodayCache.length; j++) {
			        if (TodayCache[j].pt_pin == $.UserName) {
			            TodayCache[j].CheckTime = timeString;
			            TodayCache[j].BeanNum = $.beanCount;
			            llfound = true;
			            break;
			        }
			    }
			}
			if (!llfound) {

			    var tempAddCache = {
			        "pt_pin": $.UserName,
			        "CheckTime": timeString,
			        "BeanNum": $.beanCount
			    };
			    TodayCache.push(tempAddCache);
			}
						
			await getjdfruitinfo(); //东东农场
			await $.wait(1000);

			await getxinjdfruit(); //新东东农场
			await $.wait(1000);
			
			await Promise.all([        
			        cash(), //特价金币
			        bean(), //京豆查询
			        queryScores()
			    ])
				
			await showMsg();
			if (intPerSent > 0) {
				if ((i + 1) % intPerSent == 0) {
					console.log("分段通知条件达成，处理发送通知....");
					if ($.isNode() && allMessage) {
						var TempMessage=allMessage;
						if(strAllNotify)
							allMessage=strAllNotify+`\n`+allMessage;

						await notify.sendNotify(`${$.name}`, `${allMessage}`, {
							url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
						}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
					}
					if ($.isNode() && allMessageMonth) {
						await notify.sendNotify(`京东月资产变动`, `${allMessageMonth}`, {
							url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
						})
					}
					allMessage = "";
					allMessageMonth = "";
				}

			}
		}
	}
	
	var str = JSON.stringify(TodayCache, null, 2);
	fs.writeFile(strNewBeanCache, str, function (err) {
	    if (err) {
	        console.log(err);
	        console.log("添加缓存" + TodayDate + ".json失败!");
	    } else {
	        console.log("添加缓存" + TodayDate + ".json成功!");
	    }
	})

	//组1通知
	if (ReceiveMessageGp4) {
		allMessage2Gp4 = `【⏰商品白嫖清单⏰】\n` + ReceiveMessageGp4;
	}
	if (WarnMessageGp4) {
		if (allMessage2Gp4) {
			allMessage2Gp4 = `\n` + allMessage2Gp4;
		}
		allMessage2Gp4 = `【⏰商品白嫖活动任务提醒⏰】\n` + WarnMessageGp4 + allMessage2Gp4;
	}

	//组2通知
	if (ReceiveMessageGp2) {
		allMessage2Gp2 = `【⏰商品白嫖清单⏰】\n` + ReceiveMessageGp2;
	}
	if (WarnMessageGp2) {
		if (allMessage2Gp2) {
			allMessage2Gp2 = `\n` + allMessage2Gp2;
		}
		allMessage2Gp2 = `【⏰商品白嫖活动任务提醒⏰】\n` + WarnMessageGp2 + allMessage2Gp2;
	}

	//组3通知
	if (ReceiveMessageGp3) {
		allMessage2Gp3 = `【⏰商品白嫖清单⏰】\n` + ReceiveMessageGp3;
	}
	if (WarnMessageGp3) {
		if (allMessage2Gp3) {
			allMessage2Gp3 = `\n` + allMessage2Gp3;
		}
		allMessage2Gp3 = `【⏰商品白嫖活动任务提醒⏰】\n` + WarnMessageGp3 + allMessage2Gp3;
	}

	//其他通知
	if (allReceiveMessage) {
		allMessage2 = `【⏰商品白嫖清单⏰】\n` + allReceiveMessage;
	}
	if (allWarnMessage) {
		if (allMessage2) {
			allMessage2 = `\n` + allMessage2;
		}
		allMessage2 = `【⏰商品白嫖活动任务提醒⏰】\n` + allWarnMessage + allMessage2;
	}

	if (intPerSent > 0) {
		//console.log("分段通知还剩下" + cookiesArr.length % intPerSent + "个账号需要发送...");
		if (allMessage || allMessageMonth) {
			console.log("分段通知收尾，处理发送通知....");
			if ($.isNode() && allMessage) {
				var TempMessage=allMessage;
				if(strAllNotify)
					allMessage=strAllNotify+`\n`+allMessage;
				
				await notify.sendNotify(`${$.name}`, `${allMessage}`, {
					url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
				}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
			}
			if ($.isNode() && allMessageMonth) {
				await notify.sendNotify(`京东月资产变动`, `${allMessageMonth}`, {
					url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
				})
			}
		}
	} else {

		if ($.isNode() && allMessageGp2) {
			var TempMessage=allMessageGp2;
			if(strAllNotify)
				allMessageGp2=strAllNotify+`\n`+allMessageGp2;
			await notify.sendNotify(`${$.name}#2`, `${allMessageGp2}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessageGp3) {
			var TempMessage=allMessageGp3;
			if(strAllNotify)
				allMessageGp3=strAllNotify+`\n`+allMessageGp3;
			await notify.sendNotify(`${$.name}#3`, `${allMessageGp3}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessageGp4) {
			var TempMessage=allMessageGp4;
			if(strAllNotify)
				allMessageGp4=strAllNotify+`\n`+allMessageGp4;
			await notify.sendNotify(`${$.name}#4`, `${allMessageGp4}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessage) {
			var TempMessage=allMessage;
			if(strAllNotify)
				allMessage=strAllNotify+`\n`+allMessage;
			
			await notify.sendNotify(`${$.name}`, `${allMessage}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			}, '\n\n本通知 By https://github.com/9Rebels/jdmax',TempMessage)
			await $.wait(10 * 1000);
		}

		if ($.isNode() && allMessageMonthGp2) {
			await notify.sendNotify(`京东月资产变动#2`, `${allMessageMonthGp2}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			})
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessageMonthGp3) {
			await notify.sendNotify(`京东月资产变动#3`, `${allMessageMonthGp3}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			})
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessageMonthGp4) {
			await notify.sendNotify(`京东月资产变动#4`, `${allMessageMonthGp4}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			})
			await $.wait(10 * 1000);
		}
		if ($.isNode() && allMessageMonth) {
			await notify.sendNotify(`京东月资产变动`, `${allMessageMonth}`, {
				url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
			})
			await $.wait(10 * 1000);
		}
	}

	if ($.isNode() && allMessage2Gp2) {
		allMessage2Gp2 += RemainMessage;
		await notify.sendNotify("京东白嫖榜#2", `${allMessage2Gp2}`, {
			url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
		})
		await $.wait(10 * 1000);
	}
	if ($.isNode() && allMessage2Gp3) {
		allMessage2Gp3 += RemainMessage;
		await notify.sendNotify("京东白嫖榜#3", `${allMessage2Gp3}`, {
			url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
		})
		await $.wait(10 * 1000);
	}
	if ($.isNode() && allMessage2Gp4) {
		allMessage2Gp4 += RemainMessage;
		await notify.sendNotify("京东白嫖榜#4", `${allMessage2Gp4}`, {
			url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
		})
		await $.wait(10 * 1000);
	}
	if ($.isNode() && allMessage2) {
		allMessage2 += RemainMessage;
		await notify.sendNotify("京东白嫖榜", `${allMessage2}`, {
			url: `https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean`
		})
		await $.wait(10 * 1000);
	}

})()
.catch((e) => {
	$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
.finally(() => {
	$.done();
})
async function showMsg() {
	//if ($.errorMsg)
	//return
	ReturnMessageTitle="";
	ReturnMessage = "";
	var strsummary="";
	if (MessageUserGp2) {
		userIndex2 = MessageUserGp2.findIndex((item) => item === $.pt_pin);
	}
	if (MessageUserGp3) {
		userIndex3 = MessageUserGp3.findIndex((item) => item === $.pt_pin);
	}
	if (MessageUserGp4) {
		userIndex4 = MessageUserGp4.findIndex((item) => item === $.pt_pin);
	}
	
	if (userIndex2 != -1) {
		IndexGp2 += 1;
		ReturnMessageTitle = `【账号${IndexGp2}🆔】${$.nickName || $.UserName}`;
	}
	if (userIndex3 != -1) {
		IndexGp3 += 1;
		ReturnMessageTitle = `【账号${IndexGp3}🆔】${$.nickName || $.UserName}`;
	}
	if (userIndex4 != -1) {
		IndexGp4 += 1;
		ReturnMessageTitle = `【账号${IndexGp4}🆔】${$.nickName || $.UserName}`;
	}
	if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
		IndexAll += 1;
		ReturnMessageTitle = `【账号${IndexAll}🆔】${$.nickName || $.UserName}`;
	}
	
		
	if ($.JingXiang) {
		if ($.isRealNameAuth)
			if (cookie.includes("app_open"))
				ReturnMessageTitle += `(wskey已实名)\n`;
			else
				ReturnMessageTitle += `(已实名)\n`;
		else
			if (cookie.includes("app_open"))
				ReturnMessageTitle += `(wskey未实名)\n`;
			else
				ReturnMessageTitle += `(未实名)\n`;
			
	    ReturnMessage += `【账号信息】`;
	    if ($.isPlusVip) {
	        ReturnMessage += `Plus会员`;
	        if ($.PlustotalScore)
	            ReturnMessage += `(${$.PlustotalScore}分)`
	    } else {
	        ReturnMessage += `普通会员`;
	        if ($.PlustotalScore)
	            ReturnMessage += `(${$.PlustotalScore}分)`			
	    }  
	    ReturnMessage += `,京享值${$.JingXiang}\n`;	    
	}else{
		ReturnMessageTitle+= `\n`;
	}
	if (llShowMonth) {
		ReturnMessageMonth = ReturnMessage;
		ReturnMessageMonth += `\n【上月收入】：${$.allincomeBean}京豆 🐶\n`;
		ReturnMessageMonth += `【上月支出】：${$.allexpenseBean}京豆 🐶\n`;

		console.log(ReturnMessageMonth);

		if (userIndex2 != -1) {
			allMessageMonthGp2 += ReturnMessageMonth + `\n`;
		}
		if (userIndex3 != -1) {
			allMessageMonthGp3 += ReturnMessageMonth + `\n`;
		}
		if (userIndex4 != -1) {
			allMessageMonthGp4 += ReturnMessageMonth + `\n`;
		}
		if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
			allMessageMonth += ReturnMessageMonth + `\n`;
		}
		if ($.isNode() && WP_APP_TOKEN_ONE) {
			await notify.sendNotifybyWxPucher("京东月资产变动", `${ReturnMessageMonth}`, `${$.UserName}`);
		}

	}
	if (EnableCheckBean) {
	    if (checkbeanDetailMode == 0) {
	        ReturnMessage += `【今日京豆】收${$.todayIncomeBean}豆`;
	        strsummary += `收${$.todayIncomeBean}豆,`;
	        if ($.todayOutcomeBean != 0) {
	            ReturnMessage += `,支${$.todayOutcomeBean}豆`;
	        }
	        ReturnMessage += `\n`;
	        ReturnMessage += `【昨日京豆】收${$.incomeBean}豆`;

	        if ($.expenseBean != 0) {
	            ReturnMessage += `,支${$.expenseBean}豆`;
	        }
	        ReturnMessage += `\n`;
	    } else {	
			if (TempBeanCache){
				ReturnMessage += `【京豆变动】${$.beanCount-$.beanCache}豆(与${matchtitle}${$.CheckTime}比较)`;			
				strsummary += `变动${$.beanCount-$.beanCache}豆,`;
				ReturnMessage += `\n`;				
			}	
			else{
				ReturnMessage += `【京豆变动】未找到缓存,下次出结果统计`;
				ReturnMessage += `\n`;
			}		
		}
	}
	
	
	if ($.beanCount){		
		ReturnMessage += `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;
	} else {
		if($.levelName || $.JingXiang)
			ReturnMessage += `【当前京豆】获取失败,接口返回空数据\n`;
		else{
			ReturnMessage += `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;
		}			
	}	
	
	if ($.JDtotalcash) {
		ReturnMessage += `【特价金币】${$.JDtotalcash}币(≈${($.JDtotalcash / 10000).toFixed(2)}元)\n`;
	}	

	if ($.JdFarmProdName != "") {
		if ($.JdtreeEnergy != 0) {
			if ($.treeState === 2 || $.treeState === 3) {
				ReturnMessage += `【东东农场】${$.JdFarmProdName} 可以兑换了!\n`;
				TempBaipiao += `【东东农场】${$.JdFarmProdName} 可以兑换了!\n`;
				if (userIndex2 != -1) {
					ReceiveMessageGp2 += `【账号${IndexGp2} ${$.nickName || $.UserName}】${$.JdFarmProdName} (东东农场)\n`;
				}
				if (userIndex3 != -1) {
					ReceiveMessageGp3 += `【账号${IndexGp3} ${$.nickName || $.UserName}】${$.JdFarmProdName} (东东农场)\n`;
				}
				if (userIndex4 != -1) {
					ReceiveMessageGp4 += `【账号${IndexGp4} ${$.nickName || $.UserName}】${$.JdFarmProdName} (东东农场)\n`;
				}
				if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
					allReceiveMessage += `【账号${IndexAll} ${$.nickName || $.UserName}】${$.JdFarmProdName} (东东农场)\n`;
				}
			} else {
				if ($.JdwaterD != 'Infinity' && $.JdwaterD != '-Infinity') {
					ReturnMessage += `【东东农场】${$.JdFarmProdName}(${(($.JdtreeEnergy / $.JdtreeTotalEnergy) * 100).toFixed(0)}%,${$.JdwaterD}天)\n`;
				} else {
					ReturnMessage += `【东东农场】${$.JdFarmProdName}(${(($.JdtreeEnergy / $.JdtreeTotalEnergy) * 100).toFixed(0)}%)\n`;

				}
			}
		} else {
			if ($.treeState === 0) {
				TempBaipiao += `【东东农场】水果领取后未重新种植!\n`;

				if (userIndex2 != -1) {
					WarnMessageGp2 += `【账号${IndexGp2} ${$.nickName || $.UserName}】水果领取后未重新种植! (东东农场)\n`;
				}
				if (userIndex3 != -1) {
					WarnMessageGp3 += `【账号${IndexGp3} ${$.nickName || $.UserName}】水果领取后未重新种植! (东东农场)\n`;
				}
				if (userIndex4 != -1) {
					WarnMessageGp4 += `【账号${IndexGp4} ${$.nickName || $.UserName}】水果领取后未重新种植! (东东农场)\n`;
				}
				if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
					allWarnMessage += `【账号${IndexAll} ${$.nickName || $.UserName}】水果领取后未重新种植! (东东农场)\n`;
				}

			} else if ($.treeState === 1) {
				ReturnMessage += `【东东农场】${$.JdFarmProdName}种植中...\n`;
			} else {
				TempBaipiao += `【东东农场】状态异常!\n`;
				if (userIndex2 != -1) {
					WarnMessageGp2 += `【账号${IndexGp2} ${$.nickName || $.UserName}】状态异常! (东东农场)\n`;
				}
				if (userIndex3 != -1) {
					WarnMessageGp3 += `【账号${IndexGp3} ${$.nickName || $.UserName}】状态异常! (东东农场)\n`;
				}
				if (userIndex4 != -1) {
					WarnMessageGp4 += `【账号${IndexGp4} ${$.nickName || $.UserName}】状态异常! (东东农场)\n`;
				}
				if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
					allWarnMessage += `【账号${IndexAll} ${$.nickName || $.UserName}】状态异常! (东东农场)\n`;
				}
				//ReturnMessage += `【东东农场】${$.JdFarmProdName}状态异常${$.treeState}...\n`;
			}
		}
	}
	if ($.xinJdFarmProdName != "") {
			if ($.xintreeFullStage === 5) {
				ReturnMessage += `【新东东农场】$$.xinJdFarmProdName} 可以兑换了!\n`;
				TempBaipiao += `【新东东农场】${$.xinJdFarmProdName} 可以兑换了!\n`;
				if (userIndex2 != -1) {
					ReceiveMessageGp2 += `【账号${IndexGp2} ${$.nickName || $.UserName}】${$.xinJdFarmProdName} (新东东农场)\n`;
				}
				if (userIndex3 != -1) {
					ReceiveMessageGp3 += `【账号${IndexGp3} ${$.nickName || $.UserName}】${$.xinJdFarmProdName} (新东东农场)\n`;
				}
				if (userIndex4 != -1) {
					ReceiveMessageGp4 += `【账号${IndexGp4} ${$.nickName || $.UserName}】${$.xinJdFarmProdName} (新东东农场)\n`;
				}
				if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
					allReceiveMessage += `【账号${IndexAll} ${$.nickName || $.UserName}】${$.xinJdFarmProdName} (新东东农场)\n`;
				}
			} else if ($.xintreeFullStage === 0) {
				TempBaipiao += `【新东东农场】水果领取后未重新种植!\n`;

				if (userIndex2 != -1) {
					WarnMessageGp2 += `【账号${IndexGp2} ${$.nickName || $.UserName}】水果领取后未重新种植! (新东东农场)\n`;
				}
				if (userIndex3 != -1) {
					WarnMessageGp3 += `【账号${IndexGp3} ${$.nickName || $.UserName}】水果领取后未重新种植! (新东东农场)\n`;
				}
				if (userIndex4 != -1) {
					WarnMessageGp4 += `【账号${IndexGp4} ${$.nickName || $.UserName}】水果领取后未重新种植! (新东东农场)\n`;
				}
				if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
					allWarnMessage += `【账号${IndexAll} ${$.nickName || $.UserName}】水果领取后未重新种植! (新东东农场)\n`;
				}
			} else if ($.xintreeFullStage !=5 && $.xintreeFullStage !=0) {
				ReturnMessage += `【新东东农场】${$.xinJdFarmProdName}种植中...\n`;
			} 
	}
    let dwscore = await dwappinfo();
    if (dwscore){
      let dwappex = await dwappexpire();
      ReturnMessage += `【话费积分】${dwscore}`;
      if (dwappex){
        ReturnMessage += `(最近已过期:${dwappex})`;
      }
      ReturnMessage += `\n`;
    }
    let marketcard = await marketCard();
    if (marketcard && marketcard.balance != '0.00' ) {
        ReturnMessage += `【超市卡】${marketcard.balance}元`;
        if (marketcard.expirationGiftAmountDes) {
            ReturnMessage += `(${marketcard.expirationGiftAmountDes})`;
        }
        ReturnMessage += `\n`;
    }
	let Ecard = await getek();
    if (Ecard) {
        ReturnMessage += `【礼卡余额】${$.ECardinfo}元`;
        ReturnMessage += `\n`;
    }
	
	if(strGuoqi){		
		ReturnMessage += `💸💸💸临期京豆明细💸💸💸\n`;
		ReturnMessage += `${strGuoqi}`;
	}
	ReturnMessage += `🧧🧧🧧红包明细🧧🧧🧧\n`;
	ReturnMessage += `${$.message}`;
	strsummary+=`红包${$.balance}元`
	if($.YunFeiQuan){
		var strTempYF="【免运费券】"+$.YunFeiQuan+"张";
		if($.YunFeiQuanEndTime)
			strTempYF+="(有效期至"+$.YunFeiQuanEndTime+")";
		strTempYF+="\n";
		ReturnMessage +=strTempYF
	}
	if($.YunFeiQuan2){
		var strTempYF2="【免运费券】"+$.YunFeiQuan2+"张";
		if($.YunFeiQuanEndTime2)
			strTempYF+="(有效期至"+$.YunFeiQuanEndTime2+")";
		strTempYF2+="\n";
		ReturnMessage +=strTempYF2
	}
	
	if (userIndex2 != -1) {
		allMessageGp2 += ReturnMessageTitle+ReturnMessage + `\n`;
	}
	if (userIndex3 != -1) {
		allMessageGp3 += ReturnMessageTitle+ReturnMessage + `\n`;
	}
	if (userIndex4 != -1) {
		allMessageGp4 += ReturnMessageTitle+ReturnMessage + `\n`;
	}
	if (userIndex2 == -1 && userIndex3 == -1 && userIndex4 == -1) {
		allMessage += ReturnMessageTitle+ReturnMessage + `\n------\n`;
	}

	console.log(`${ReturnMessageTitle+ReturnMessage}`);

	if ($.isNode() && WP_APP_TOKEN_ONE) {
		var strTitle="京东资产变动";
		if($.JingXiang){
			if ($.isRealNameAuth)
				if (cookie.includes("app_open"))
					ReturnMessage=`【账号名称】${$.nickName || $.UserName}(wskey已实名)\n`+ReturnMessage;
				else
					ReturnMessage=`【账号名称】${$.nickName || $.UserName}(已实名)\n`+ReturnMessage;
			else
				if (cookie.includes("app_open"))
					ReturnMessage=`【账号名称】${$.nickName || $.UserName}(wskey未实名)\n`+ReturnMessage;
				else
					ReturnMessage=`【账号名称】${$.nickName || $.UserName}(未实名)\n`+ReturnMessage;
			
		}else{
			ReturnMessage=`【账号名称】${$.nickName || $.UserName}\n`+ReturnMessage;
		}
		if (TempBaipiao) {			
			TempBaipiao = `【⏰商品白嫖活动提醒⏰】\n` + TempBaipiao;
			ReturnMessage = TempBaipiao + `\n` + ReturnMessage;			
		} 
		
		ReturnMessage += RemainMessage;
		
		if(strAllNotify)
			ReturnMessage=strAllNotify+`\n`+ReturnMessage;
		
		await notify.sendNotifybyWxPucher(strTitle, `${ReturnMessage}`, `${$.UserName}`,'\n\n本通知 By https://github.com/9Rebels/jdmax',strsummary);
	}

	//$.msg($.name, '', ReturnMessage , {"open-url": "https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean"});
}
async function bean() {
	
	if (EnableCheckBean && checkbeanDetailMode==0) {	
			
	    // console.log(`北京时间零点时间戳:${parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000}`);
	    // console.log(`北京时间2020-10-28 06:16:05::${new Date("2020/10/28 06:16:05+08:00").getTime()}`)
	    // 不管哪个时区。得到都是当前时刻北京时间的时间戳 new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000

	    //前一天的0:0:0时间戳
	    const tm = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 - (24 * 60 * 60 * 1000);
	    // 今天0:0:0时间戳
	    const tm1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
	    let page = 1,
	    t = 0,
	    yesterdayArr = [],
	    todayArr = [];
	    do {
	        let response = await getJingBeanBalanceDetail(page);
	        await $.wait(1000);
	        // console.log(`第${page}页: ${JSON.stringify(response)}`);
	        if (response && response.code === "0") {
	            page++;
	            let detailList = response.jingDetailList;
	            if (detailList && detailList.length > 0) {
	                for (let item of detailList) {
	                    const date = item.date.replace(/-/g, '/') + "+08:00";
	                    if (new Date(date).getTime() >= tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes("物流") && !item['eventMassage'].includes('扣赠'))) {
	                        todayArr.push(item);
	                    } else if (tm <= new Date(date).getTime() && new Date(date).getTime() < tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes("物流") && !item['eventMassage'].includes('扣赠'))) {
	                        //昨日的
	                        yesterdayArr.push(item);
	                    } else if (tm > new Date(date).getTime()) {
	                        //前天的
	                        t = 1;
	                        break;
	                    }
	                }
	            } else {
	                $.errorMsg = `数据异常`;
	                $.msg($.name, ``, `账号${$.index}：${$.nickName}\n${$.errorMsg}`);
	                t = 1;
	            }
	        } else if (response && response.code === "3") {
	            console.log(`cookie已过期，或者填写不规范，跳出`)
	            t = 1;
	        } else {
	            console.log(`未知情况：${JSON.stringify(response)}`);
	            console.log(`未知情况，跳出`)
	            t = 1;
	        }
	    } while (t === 0);
	    for (let item of yesterdayArr) {
	        if (Number(item.amount) > 0) {
	            $.incomeBean += Number(item.amount);
	        } else if (Number(item.amount) < 0) {
	            $.expenseBean += Number(item.amount);
	        }
	    }
	    for (let item of todayArr) {
	        if (Number(item.amount) > 0) {
	            $.todayIncomeBean += Number(item.amount);
	        } else if (Number(item.amount) < 0) {
	            $.todayOutcomeBean += Number(item.amount);
	        }
	    }
	    $.todayOutcomeBean = -$.todayOutcomeBean;
	    $.expenseBean = -$.expenseBean;	    
	}
	
	if (EnableOverBean) {
	    await jingBeanDetail(); //过期京豆	    
	}
	await redPacket();
	if (EnableChaQuan)
	    await getCoupon();
}

async function Monthbean() {
	let time = new Date();
	let year = time.getFullYear();
	let month = parseInt(time.getMonth()); //取上个月
	if (month == 0) {
		//一月份，取去年12月，所以月份=12，年份减1
		month = 12;
		year -= 1;
	}

	//开始时间 时间戳
	let start = new Date(year + "-" + month + "-01 00:00:00").getTime();
	console.log(`计算月京豆起始日期:` + GetDateTime(new Date(year + "-" + month + "-01 00:00:00")));

	//结束时间 时间戳
	if (month == 12) {
		//取去年12月，进1个月，所以月份=1，年份加1
		month = 1;
		year += 1;
	}
	let end = new Date(year + "-" + (month + 1) + "-01 00:00:00").getTime();
	console.log(`计算月京豆结束日期:` + GetDateTime(new Date(year + "-" + (month + 1) + "-01 00:00:00")));

	let allpage = 1,
	allt = 0,
	allyesterdayArr = [];
	do {
		let response = await getJingBeanBalanceDetail(allpage);
		await $.wait(1000);
		// console.log(`第${allpage}页: ${JSON.stringify(response)}`);
		if (response && response.code === "0") {
			allpage++;
			let detailList = response.jingDetailList;
			if (detailList && detailList.length > 0) {
				for (let item of detailList) {
					const date = item.date.replace(/-/g, '/') + "+08:00";
					if (start <= new Date(date).getTime() && new Date(date).getTime() < end) {
						//日期区间内的京豆记录
						allyesterdayArr.push(item);
					} else if (start > new Date(date).getTime()) {
						//前天的
						allt = 1;
						break;
					}
				}
			} else {
				$.errorMsg = `数据异常`;
				$.msg($.name, ``, `账号${$.index}：${$.nickName}\n${$.errorMsg}`);
				allt = 1;
			}
		} else if (response && response.code === "3") {
			console.log(`cookie已过期，或者填写不规范，跳出`)
			allt = 1;
		} else {
			console.log(`未知情况：${JSON.stringify(response)}`);
			console.log(`未知情况，跳出`)
			allt = 1;
		}
	} while (allt === 0);

	for (let item of allyesterdayArr) {
		if (Number(item.amount) > 0) {
			$.allincomeBean += Number(item.amount);
		} else if (Number(item.amount) < 0) {
			$.allexpenseBean += Number(item.amount);
		}
	}

}

function apptaskUrl(functionId = "", body = "") {
  return {
    url: `${JD_API_HOST}?functionId=${functionId}`,
    body,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': '',
      'User-Agent': 'JD4iPhone/167774 (iPhone; iOS 14.7.1; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    timeout: 10000
  }
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.UA
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
							$.isPlusVip=data['isPlusVip'];
							$.isRealNameAuth=data['isRealNameAuth'];
							$.beanCount=(data['base'] && data['base'].jdNum) || 0 ;		
							$.JingXiang = (data['base'] && data['base'].jvalue) || 0 ;						
                        } else {
                            $.nickName = $.UserName
                        }
						
							
							
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function TotalBean2() {
	return new Promise(async(resolve) => {
		const options = {
			url: `https://wxapp.m.jd.com/kwxhome/myJd/home.json?&useGuideModule=0&bizId=&brandId=&fromType=wxapp&timestamp=${Date.now()}`,
			headers: {
				Cookie: cookie,
				'content-type': `application/x-www-form-urlencoded`,
				Connection: `keep-alive`,
				'Accept-Encoding': `gzip,compress,br,deflate`,
				Referer: `https://servicewechat.com/wxa5bf5ee667d91626/161/page-frame.html`,
				Host: `wxapp.m.jd.com`,
				'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.10(0x18000a2a) NetType/WIFI Language/zh_CN`,
			},
			timeout: 10000
		};
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err);
				} else {					
					if (data) {								
						data = JSON.parse(data);
						
						if (!data.user) {
							return;
						}
						const userInfo = data.user;						
						if (userInfo) {
							if (!$.nickName)
								$.nickName = userInfo.petName;
							if ($.beanCount == 0) {
								$.beanCount = userInfo.jingBean;
							}
							$.JingXiang = userInfo.uclass;
						}
					} else {
						$.log('京东服务器返回空数据');
					}
				}
			} catch (e) {
				$.logErr(e);
			}
			finally {
				resolve();
			}
		});
	});
}

function isLoginByX1a0He() {
	return new Promise((resolve) => {
		const options = {
			url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
			headers: {
				"Cookie": cookie,
				"referer": "https://h5.m.jd.com/",
				"User-Agent": "jdapp;iPhone;10.1.2;15.0;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
			},
			timeout: 10000
		}
		$.get(options, (err, resp, data) => {
			try {
				if (data) {
					data = JSON.parse(data);
					if (data.islogin === "1") {
						console.log(`使用X1a0He写的接口加强检测: Cookie有效\n`)
					} else if (data.islogin === "0") {
						$.isLogin = false;
						console.log(`使用X1a0He写的接口加强检测: Cookie无效\n`)
					} else {
						console.log(`使用X1a0He写的接口加强检测: 未知返回，不作变更...\n`)
						$.error = `${$.nickName} :` + `使用X1a0He写的接口加强检测: 未知返回...\n`
					}
				}
			} catch (e) {
				console.log(e);
			}
			finally {
				resolve();
			}
		});
	});
}

function getJingBeanBalanceDetail(page) {
  return new Promise(async resolve => {
    const options = {
      "url": `https://bean.m.jd.com/beanDetail/detail.json?page=${page}`,
      "body": `body=${escape(JSON.stringify({"pageSize": "20", "page": page.toString()}))}&appid=ld`,
      "headers": {
				'User-Agent': $.UA,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie,
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`getJingBeanBalanceDetail API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            // console.log(data)
          } else {
            // console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        // $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function jingBeanDetail() {
	return new Promise(async resolve => {
		setTimeout(async () => {
			var strsign = "";
			if (epsignurl) {
				strsign = await getepsign('jingBeanDetail', { "pageSize": "20", "page": "1" });
				strsign = strsign.body;
			}
			else
				strsign = await getSignfromNolan('jingBeanDetail', { "pageSize": "20", "page": "1" });

			const options = {
				"url": `https://api.m.jd.com/client.action?functionId=jingBeanDetail`,
				"body": strsign,
				"headers": {
					'User-Agent': $.UA,
					'Host': 'api.m.jd.com',
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie': cookie,
				}
			}
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log(`${JSON.stringify(err)}`)
						console.log(`${$.name} jingBeanDetail API请求失败，请检查网路重试`)
					} else {
						if (data) {
							data = JSON.parse(data);
							if (data?.others?.jingBeanExpiringInfo?.detailList) {
								const { detailList = [] } = data?.others?.jingBeanExpiringInfo;
								detailList.map(item => {
									strGuoqi += `【${(item['eventMassage']).replace("即将过期京豆", "").replace("年", "-").replace("月", "-").replace("日", "")}】过期${item['amount']}豆\n`;
								})
							}
						} else {
							console.log(`jingBeanDetail 京东服务器返回空数据`)
						}
					}
				} catch (e) {
					if (epsignurl)
						$.logErr(e, resp)
					else
						console.log("因为没有指定带ep的Sign,获取过期豆子信息次数多了就会失败.")
				} finally {
					resolve(data);
				}
			})
		}, 0 * 1000);
	})
  } 
  
function getepsign(n, o, t = "sign") {
  let e = {
    url: epsignurl, 
    form: {
      functionId: n, body: $.toStr(o),
    }, headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  return new Promise(n => {
    $.post(e, async (o, t, e) => {
      try {
        o ? console.log(o) : e = JSON.parse(e)
        if (e.code === 200 && e.data) {
          n({body: e.data.convertUrlNew})
        }
      } catch (n) {
        $.logErr(n, t)
      } finally {
        n({body: e.convertUrlNew})
      }
    })
  })
}

function getSignfromNolan(functionId, body) {	
    var strsign = '';
	let data = {
      "fn":functionId,
      "body": body
    }
    return new Promise((resolve) => {
        let url = {
            url: jdSignUrl,
            body: JSON.stringify(data),
		    followRedirect: false,
		    headers: {
		        'Accept': '*/*',
		        "accept-encoding": "gzip, deflate, br",
		        'Content-Type': 'application/json'
		    },
		    timeout: 30000
        }
        $.post(url, async(err, resp, data) => {
            try {				
                data = JSON.parse(data);
                if (data && data.body) {                    
                    if (data.body)
                        strsign = data.body || '';
                    if (strsign != '')
                        resolve(strsign);
                    else
                        console.log("签名获取失败.");
                } else {
                    console.log("签名获取失败.");
                }				
            }catch (e) {
                $.logErr(e, resp);
            }finally {
				resolve(strsign);
			}
        })
    })
}


function redPacket() {
	return new Promise(async resolve => {
		const options = {
			"url": `https://api.m.jd.com/client.action?functionId=myhongbao_getUsableHongBaoList&body=%7B%22appId%22%3A%22appHongBao%22%2C%22appToken%22%3A%22apphongbao_token%22%2C%22platformId%22%3A%22appHongBao%22%2C%22platformToken%22%3A%22apphongbao_token%22%2C%22platform%22%3A%221%22%2C%22orgType%22%3A%222%22%2C%22country%22%3A%22cn%22%2C%22childActivityId%22%3A%22-1%22%2C%22childActiveName%22%3A%22-1%22%2C%22childActivityTime%22%3A%22-1%22%2C%22childActivityUrl%22%3A%22-1%22%2C%22openId%22%3A%22-1%22%2C%22activityArea%22%3A%22-1%22%2C%22applicantErp%22%3A%22-1%22%2C%22eid%22%3A%22-1%22%2C%22fp%22%3A%22-1%22%2C%22shshshfp%22%3A%22-1%22%2C%22shshshfpa%22%3A%22-1%22%2C%22shshshfpb%22%3A%22-1%22%2C%22jda%22%3A%22-1%22%2C%22activityType%22%3A%221%22%2C%22isRvc%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22extend%22%3A%22-1%22%2C%22organization%22%3A%22JD%22%7D&appid=JDReactMyRedEnvelope&client=apple&clientVersion=7.0.0`,
			"headers": {
				'Host': 'api.m.jd.com',
				'Accept': '*/*',
				'Connection': 'keep-alive',
				'Accept-Language': 'zh-cn',
				'Referer': 'https://h5.m.jd.com/',
				'Accept-Encoding': 'gzip, deflate, br',
				"Cookie": cookie,
				'User-Agent': $.UA
			}
		}
		$.get(options, (err, resp, data) => {
			try {				
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`redPacket API请求失败，请检查网路重试`)
				} else {
					if (data) {
						data = JSON.parse(data);
						$.jxRed = 0,
						$.jsRed = 0,
						$.jdRed = 0,
						$.jdhRed = 0,
						$.jdwxRed = 0,
						$.jdGeneralRed = 0,
						$.jxRedExpire = 0,
						$.jsRedExpire = 0,
						$.jdRedExpire = 0,
						$.jdhRedExpire = 0;
						$.jdwxRedExpire = 0,
						$.jdGeneralRedExpire = 0
						
						let t = new Date();
						t.setDate(t.getDate() + 1);
						t.setHours(0, 0, 0, 0);
						t = parseInt((t - 1) / 1000)*1000;
						
						for (let vo of data.hongBaoList || []) {
						    if (vo.orgLimitStr) {								
						        if (vo.orgLimitStr.includes("京喜") && !vo.orgLimitStr.includes("特价")) {
						            $.jxRed += parseFloat(vo.balance)
						            if (vo['endTime'] === t) {
						                $.jxRedExpire += parseFloat(vo.balance)									
						            }
									continue;	
						        } else if (vo.orgLimitStr.includes("购物小程序")) {
						            $.jdwxRed += parseFloat(vo.balance)
						            if (vo['endTime'] === t) {
						                $.jdwxRedExpire += parseFloat(vo.balance)
						            }
									continue;	
						        } else if (vo.orgLimitStr.includes("京东商城")) {
						            $.jdRed += parseFloat(vo.balance)
						            if (vo['endTime'] === t) {
						                $.jdRedExpire += parseFloat(vo.balance)
						            }
									continue;	
						        } else if (vo.orgLimitStr.includes("极速") || vo.orgLimitStr.includes("京东特价") || vo.orgLimitStr.includes("京喜特价")) {
						            $.jsRed += parseFloat(vo.balance)
						            if (vo['endTime'] === t) {
						                $.jsRedExpire += parseFloat(vo.balance)
						            }
									continue;	
						        } else if (vo.orgLimitStr && vo.orgLimitStr.includes("京东健康")) {
						            $.jdhRed += parseFloat(vo.balance)
						            if (vo['endTime'] === t) {
						                $.jdhRedExpire += parseFloat(vo.balance)
						            }
									continue;	
						        }
						    }
						    $.jdGeneralRed += parseFloat(vo.balance)
						    if (vo['endTime'] === t) {
						        $.jdGeneralRedExpire += parseFloat(vo.balance)
						    }
						}
						
						$.balance = ($.jxRed+$.jsRed+$.jdRed +$.jdhRed+$.jdwxRed+$.jdGeneralRed).toFixed(2);
						$.jxRed = $.jxRed.toFixed(2);
						$.jsRed = $.jsRed.toFixed(2);
						$.jdRed = $.jdRed.toFixed(2);						
						$.jdhRed = $.jdhRed.toFixed(2);
						$.jdwxRed = $.jdwxRed.toFixed(2);
						$.jdGeneralRed = $.jdGeneralRed.toFixed(2);						
						$.expiredBalance = ($.jxRedExpire + $.jsRedExpire + $.jdRedExpire+$.jdhRedExpire+$.jdwxRedExpire+$.jdGeneralRedExpire).toFixed(2);
						$.message += `【红包总额】${$.balance}(总过期${$.expiredBalance})元 \n`;
						if ($.jxRed > 0){
							if($.jxRedExpire>0)
								$.message += `【京喜红包】${$.jxRed}(将过期${$.jxRedExpire.toFixed(2)})元 \n`;
							else
								$.message += `【京喜红包】${$.jxRed}元 \n`;
						}
							
						if ($.jsRed > 0){
							if($.jsRedExpire>0)
								$.message += `【京喜特价】${$.jsRed}(将过期${$.jsRedExpire.toFixed(2)})元(原极速版) \n`;
							else
								$.message += `【京喜特价】${$.jsRed}元(原极速版) \n`;
						}
							
						if ($.jdRed > 0){
							if($.jdRedExpire>0)
								$.message += `【京东红包】${$.jdRed}(将过期${$.jdRedExpire.toFixed(2)})元 \n`;
							else
								$.message += `【京东红包】${$.jdRed}元 \n`;
						}
							
						if ($.jdhRed > 0){
							if($.jdhRedExpire>0)
								$.message += `【健康红包】${$.jdhRed}(将过期${$.jdhRedExpire.toFixed(2)})元 \n`;
							else
								$.message += `【健康红包】${$.jdhRed}元 \n`;
						}
							
						if ($.jdwxRed > 0){
							if($.jdwxRedExpire>0)
								$.message += `【微信小程序】${$.jdwxRed}(将过期${$.jdwxRedExpire.toFixed(2)})元 \n`;
							else
								$.message += `【微信小程序】${$.jdwxRed}元 \n`;
						}
							
						if ($.jdGeneralRed > 0){
							if($.jdGeneralRedExpire>0)
								$.message += `【全平台通用】${$.jdGeneralRed}(将过期${$.jdGeneralRedExpire.toFixed(2)})元 \n`;
							else
								$.message += `【全平台通用】${$.jdGeneralRed}元 \n`;
							
						}
							
					} else {
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}

function getCoupon() {
    return new Promise(resolve => {
        let options = {
            url: `https://wq.jd.com/activeapi/queryjdcouponlistwithfinance?state=1&wxadd=1&filterswitch=1&_=${Date.now()}&sceneval=2&g_login_type=1&callback=jsonpCBKB&g_ty=ls`,
            headers: {
                'authority': 'wq.jd.com',
                "User-Agent": $.UA,
                'accept': '*/*',
                'referer': 'https://wqs.jd.com/',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'cookie': cookie
            },
			timeout: 10000
        }
        $.get(options, async(err, resp, data) => {
            try {				
                data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);
                let couponTitle = '';
                let couponId = '';
                // 删除可使用且非超市、生鲜、京贴;
                let useable = data.coupon.useable;
                $.todayEndTime = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 999)).getTime();
                $.tomorrowEndTime = new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999)).getTime();
				$.platFormInfo="";
                for (let i = 0; i < useable.length; i++) {
					//console.log(useable[i]);
                    if (useable[i].limitStr.indexOf('全品类') > -1) {
                        $.beginTime = useable[i].beginTime;
                        if ($.beginTime < new Date().getTime() && useable[i].quota <= 100 && useable[i].coupontype === 1) {                           
							//$.couponEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
                            $.couponName = useable[i].limitStr;
							if (useable[i].platFormInfo) 
								$.platFormInfo = useable[i].platFormInfo;
							
							var decquota=parseFloat(useable[i].quota).toFixed(2);
							var decdisc= parseFloat(useable[i].discount).toFixed(2);
							if (useable[i].quota>useable[i].discount+5 && useable[i].discount<2)
								continue
							$.message += `【全品类券】满${decquota}减${decdisc}元`;
							
							if (useable[i].endTime < $.todayEndTime) {
								$.message += `(今日过期,${$.platFormInfo})\n`;
							} else if (useable[i].endTime < $.tomorrowEndTime) {
								$.message += `(明日将过期,${$.platFormInfo})\n`;
							} else {
								$.message += `(${$.platFormInfo})\n`;
							}
							
                        }
                    }
					if (useable[i].couponTitle.indexOf('运费券') > -1 && useable[i].limitStr.indexOf('自营商品运费') > -1) {
					    if (!$.YunFeiTitle) {
					        $.YunFeiTitle = useable[i].couponTitle;
					        $.YunFeiQuanEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					        $.YunFeiQuan += 1;
					    } else {
					        if ($.YunFeiTitle == useable[i].couponTitle) {
					            $.YunFeiQuanEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					            $.YunFeiQuan += 1;
					        } else {
					            if (!$.YunFeiTitle2)
					                $.YunFeiTitle2 = useable[i].couponTitle;
								
					            if ($.YunFeiTitle2 == useable[i].couponTitle) {
					                $.YunFeiQuanEndTime2 = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					                $.YunFeiQuan2 += 1;
					            }
					        }

					    }

					}
                    if (useable[i].couponTitle.indexOf('特价版APP活动') > -1 && useable[i].limitStr=='仅可购买活动商品') {						
                        $.beginTime = useable[i].beginTime;
                        if ($.beginTime < new Date().getTime() && useable[i].coupontype === 1) {                            
							if (useable[i].platFormInfo) 
								$.platFormInfo = useable[i].platFormInfo;
							var decquota=parseFloat(useable[i].quota).toFixed(2);
							var decdisc= parseFloat(useable[i].discount).toFixed(2);
							
							$.message += `【特价版券】满${decquota}减${decdisc}元`;
							
							if (useable[i].endTime < $.todayEndTime) {
								$.message += `(今日过期,${$.platFormInfo})\n`;
							} else if (useable[i].endTime < $.tomorrowEndTime) {
								$.message += `(明日将过期,${$.platFormInfo})\n`;
							} else {
								$.message += `(${$.platFormInfo})\n`;
							}
							
                        }

                    }
                    //8是支付券， 7是白条券
                    if (useable[i].couponStyle == 7 || useable[i].couponStyle == 8) {
                        $.beginTime = useable[i].beginTime;
                        if ($.beginTime > new Date().getTime() || useable[i].quota > 50 || useable[i].coupontype != 1) {
                            continue;
                        }
                        
                        if (useable[i].couponStyle == 8) {
                            $.couponType = "支付立减";
                        }else{
							$.couponType = "白条优惠";
						}
						if(useable[i].discount<useable[i].quota)
							$.message += `【${$.couponType}】满${useable[i].quota}减${useable[i].discount}元`;
						else
							$.message += `【${$.couponType}】立减${useable[i].discount}元`;
                        if (useable[i].platFormInfo) 
                            $.platFormInfo = useable[i].platFormInfo;                            
                        
                        //$.couponEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
						
                        if (useable[i].endTime < $.todayEndTime) {
                            $.message += `(今日过期,${$.platFormInfo})\n`;
                        } else if (useable[i].endTime < $.tomorrowEndTime) {
                            $.message += `(明日将过期,${$.platFormInfo})\n`;
                        } else {
                            $.message += `(${$.platFormInfo})\n`;
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            }
            finally {
                resolve();
            }
        })
    })
}

function jdfruitRequest(function_id, body = {}, timeout = 1000) {
	return new Promise(resolve => {
		setTimeout(() => {
			$.get(taskfruitUrl(function_id, body), (err, resp, data) => {
				try {
					if (err) {
						console.log('\n东东农场: API查询请求失败 ‼️‼️')
						console.log(JSON.stringify(err));
						console.log(`function_id:${function_id}`)
						$.logErr(err);
					} else {
						if (safeGet(data)) {							
							data = JSON.parse(data);
							if (data.code=="400"){
								console.log('东东农场: '+data.message);
								llgeterror = true;
							}
							else
								$.JDwaterEveryDayT = data?.firstWaterInit?.totalWaterTimes;
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			})
		}, timeout)
	})
}

async function getjdfruitinfo() {
    if (EnableJdFruit) {
        llgeterror = false;

        await jdfruitRequest('taskInitForFarm', {
            "version": 14,
            "channel": 1,
            "babelChannel": "120"
        });
		
		if (llgeterror)
			return
		
        await getjdfruit();
        if (llgeterror) {
            console.log(`东东农场API查询失败,等待10秒后再次尝试...`)
            await $.wait(10 * 1000);
            await getjdfruit();
        }
        if (llgeterror) {
            console.log(`东东农场API查询失败,有空重启路由器换个IP吧.`)
        }

    }
	return;
}
var iｉl='jsjiami.com.v7';(function(iii1l1,IIliIl,II11ll,liiI1I,ililII,lI1II1,i1ilII){return iii1l1=iii1l1>>0x8,lI1II1='hs',i1ilII='hs',function(iIIii1,IllIi1,lilIII,Ii1ilI,II11i1){const il1ll=iii1II;Ii1ilI='tfi',lI1II1=Ii1ilI+lI1II1,II11i1='up',i1ilII+=II11i1,lI1II1=lilIII(lI1II1),i1ilII=lilIII(i1ilII),lilIII=0x0;const iliIil=iIIii1();while(!![]&&--liiI1I+IllIi1){try{Ii1ilI=parseInt(il1ll(0x142,'wcuc'))/0x1+parseInt(il1ll(0x1dc,'JjgA'))/0x2+parseInt(il1ll(0x1df,'%#1N'))/0x3+-parseInt(il1ll(0x1de,'ES$9'))/0x4*(-parseInt(il1ll(0x1dd,'esZF'))/0x5)+-parseInt(il1ll(0x18d,'nj^j'))/0x6*(parseInt(il1ll(0x1d5,'orzi'))/0x7)+parseInt(il1ll(0x212,'esZF'))/0x8*(parseInt(il1ll(0x13d,'Wuha'))/0x9)+-parseInt(il1ll(0x13f,'dvhR'))/0xa*(parseInt(il1ll(0x16a,'JjgA'))/0xb);}catch(iliIii){Ii1ilI=lilIII;}finally{II11i1=iliIil[lI1II1]();if(iii1l1<=liiI1I)lilIII?ililII?Ii1ilI=II11i1:ililII=II11i1:lilIII=II11i1;else{if(lilIII==ililII['replace'](/[GnpVlkqbxQYhERdPNLFHU=]/g,'')){if(Ii1ilI===IllIi1){iliIil['un'+lI1II1](II11i1);break;}iliIil[i1ilII](II11i1);}}}}}(II11ll,IIliIl,function(lill1i,il1li,iIIill,iilii,Ill11i,iilil,Ill11l){return il1li='\x73\x70\x6c\x69\x74',lill1i=arguments[0x0],lill1i=lill1i[il1li](''),iIIill=`\x72\x65\x76\x65\x72\x73\x65`,lill1i=lill1i[iIIill]('\x76'),iilii=`\x6a\x6f\x69\x6e`,(0x150b31,lill1i[iilii](''));});}(0xc200,0xd47c0,Iii11l,0xc4),Iii11l)&&(iｉl=Iii11l);function Iii11l(){const iii1ll=(function(){return[...[iｉl,'qNHhjpRsbjkiGbFamiEP.nYcULoQHmd.URbvVx7l==','W4lcGSkjvJ0kWOldJNqbe8o8uW','dmkZq0hdLG','WPBcK8k2W6G','EN3cK1L+WQi0da','ESkREZHa','tLVcIglcRG','eSkHrSkjBW','nCojo29dWRpORRRMS7hLPl3OTQxVVARORPhMOy7MNztNVlNOTRNPHA7OR7W','W4FcJdFdIai','WQm3WRjbhSo1W49ppeS7feegk3a6WQpcQCk0WR0KW4nbD8kesGmPisJcLCkmW6DP','W7LtaCoVWQ1wkKauiSkaWQWLvNddT8oI','W7baWRXgWOa','WPNdQmk4fCkSwCkjlmoiWOtcJW','h8o6i15X','W4jOWQFcNa','W6xcOmk9W4dcOc5oCCo7W6tcM8o0W6O','W550WORcQg4','W4lcHmkextCdWOFdGNGTm8oDFq','CJtdVGNcSCoVW5FcJSopWQ7dHNi5cq','WOHUW5/cSSkF','uSkUCIrw','WPj2W5GXpGuYsctdQ8kTW7rc','W7OrWPP7xa','lJHleGf8W6b5WQrTW6ddMs8JsqldLgvn','W4CLWPrP','W6ZdL3q','CmoWpWrTWQ0Dvw7dObC','W7vMWPPQWODAESoI','W6FdIhC/WPGKyqC','zNpcSe3cVq','WRJdUSocWRddVq','C8oxW7b4WOSF','WRxdRCk9gCknt8kEcSo3WOlcGtb4','W5DwaCo8','W55aWP9mWPy','lZy6emos','jmkeWQWNW7PhWRmyW4m','W5n6WR3cRa','WOT/W4ZcL8kWD8kmumkdbKVdScO','uazvWO3cOCksfmo6WQnryW','W7S2ChnaWQVcMCkYW78OWPWBW55N','tblcIJNcSq','WPFcP8k4W4ddOa','WPVdUCoAWRRdGG','WPZdRmkJfa','aSkyDCkWwZ7cG3ZcLYKd','fmoVWPpcPSodWOqGEa','xSoavSkTradcSM4','AMezWO8','bSkpE8kTEYxcKLVcHd8','W6pcTaxdHtq','W6rdcmogoq','W57cQSkNW6DJ','WQdcKcNdQCoVWP81CN9pW6euWOldKItdKW','WPrhW4dcH8keomoDWRi','WRVcLJxdRG','W4/dPSkYjSof','BhVdKe5TWQq5l8ogwCkezCkqWOOsWQ8','WQqmWOe','m8o9W7ZdTCkM','y8o1ibb5','W4TWWRNcISoX','W5LdWP9MWRPrBSoiW4SliqRcTwldNHa','WQD6W4NcM8knFmkyAW','WQXWar0l','WPNcMCk4W4hdOSkI','oCkDx2/dVq','W7hdIhCHWRq','oHe2hmoI','gM1qetG','E8ojdGPk','WOCzrG','W6zTg8ooeG','WP8NWO7cJCko','W7dcQmkwW5Db','WQi2W5aYW70hlmofW4KPfHhcGG','vuhcIJldUCkndNKBWO/dTW','bos4Nos5SEwfSUwCM8ouWQOGxbxMNlJORypORj7MSiVLP6VOT7lcJUkbNU+5HUkcTU+5Va','FwOEWODY'],...(function(){return[...['dmkewKxdIq','bwXYlsBdTCozWQzz','ESk+Bt9r','W6dcPCkXW4dcQYvhtSoKW5pcJSozW4m','W4bOWQhcKmoVW4jhhW','Cx/dJK5M','FZnqWPNcPG','CCoSad3cV8kj','WQS1DsDp','WRG3WRrya8kOWOKgja','WPJdVG91iJRdGmoYWRtcHq','sM3cSq','W4bOWQhcKmoZW59eaH/cUCoT','WQJcMdxdRSo4','l8oxbSkMwG','WQxdPSoSWPddNxGsDmo3W60','W7NdGgSyWRumzHO6ASkdW6D8avSzaq','aCkCBmkuva','WOzLW6RcO8kx','CSoWoqG','cITlWRb3','W6/dVGauW691q8oZBavR','WRBdS8oqhwPBW5/dKvm','BCkoWRC','eXbHWRjq','laNdM8kXWR9alSkaiSkM','kInyjWa0','WQNdKmohWO/dLq','W75jb8oAlq','WOT3ACodwq','WOnrW5ZcRmkh','E8o8W77dSCoQ','WPFdVCk+cmkkemodCCo5WOBcIxjbmJ1gdbWexe3cKmkfdSo0FCkvWQJdVYtcThRcJmoUiq','WRX3iIeTW7ldM8oQW6uaWRa2W55Woa','rvxcUIJdPq','uLdcIdpdHCkDcN8IWPldTIdcICorW4bNlv0YmbFcLSourrRdHCkFgCoeWR1WcJa','W7bOWPP0','W63dNfuhWQe','Fc7cTI/cUSkTW4JcLmktWQy','W7JdTSkffSoBCW','CNpdJfDwWQ86bG','FJ9OWOig','W6ZdTSkdfG','WOpdMw7dG2pdNNlcTmoZW5KFe8ozWOy5','b8kzEW','WPJdOXPYktNdTSoJWQu','bCkMWQ0BW5i','W5vwb8oWWP1ag10WmCkd','W5DuomoEWPi','WOT/W4ZcL8kWD8kmqa','gmo8ba','jSoEkM98W7W5W5jGW4uia8o8W5yr','WQCSWQe','w255t8k3W4Cix8ko','WRZcMdpdVa','kIny','xSoIhXXO','wCk6trPlyW','WRG2WQvscmk8WPm','rupcKhJcSmk/omkJ','b8o1bmktyW','WOFdGSoucKTCW5tdHvS2','f8oMgCksFvRcMG','WOv6W6lcQgi','eqHHWRvj','WQ10W5W','AJ19WOCw','eH/dICk1WO5loCk2','WQldT8k3W5rIWO3cUSod','poAxL+s4U+s7VowfQowFM0VcQmkYC0xMNzBORydORi7MSBNLP4xOTBNdTEkcNE+7PUkbU++4Ma','bmo6bSkJA3NcLSoUA1arWPtcGXLqW4tcU35PxNHpE1FcRmkgW4O','ah1ufYC','W550WRtcRa','asmJcSo0W44qsCoBzSkHzCo0W6mfd8kAaSk4wCkmbXdcKSkWA241WQxcIYldK8kJW73cNNmhdCooWPGKWRuknCkyjtitW4nUcSoQWO9wW5BcTWZdQ3vDWRtdPGa','hoAuOEs5KEs5TEwgPowFPeihF8ocmEADH+IUMoIVNoAWVEwMUoI1NCkv4OoE77Qi4OoF77Ue','W7KXCNzaWQZcMCo+W40NWPm8W6m','jYFdRLHuWOCWaG','WRNcNZzIW6b4sYufFmkqW7W','W4ysWOBdN8o1BSkcWQOcFHSIW4K','WPxcUYddQCoK','fCkSWRy6W4W'],...(function(){return['WPpdPSkTpCklwa','WRvKWPXVWRWjlq','W6PKuSktsSkvWP8mWRVcUvLVmMi','WQ9GmYesWR3ORzJMS4NLPRJOTAdVV5lORQtMOAZMN7lNVjdOT63PH43ORBa','ccCNfSoUWPDEeSotECkMzmoHW6ayhmodtmkXw8orc03cJSo9yx41WQxcKc/dMCkPWO/cMsyxcSoyWO8PW482b8kQs2S','nSkxWRSVW7zBWR0bW4m','ENiiWOTKWOddRXnRjq','W5vwb8oWWOfDgea','CNpdJfDkWRi5g8oJr8kh','jSoEkM9UW6yHW59FW7qhaCoR','W5rZWRtcV8ox','W6XnWQtcNmosW4LtntNcRSoWm0rfuCkj','lmkXsq','nHtcK8k3WPTni8kx','w1tcJc/dN8oercqJW4JcTMldN8kwW5m+or85','WOTmW5pcSmkf','t03cHq','ACkoWQVcT8ofWO4','eHlcI3pcRmkgh8kN','kHjuWQ58W7BdMCkVWQ3dQa','W6FcRSkoW4K','W6tcQSkiW7nAWRhcNa','W6VdOSkUfSoL','aCo4W6NdVmkb','BZNcPWldISkWW5K','Cs3cNWhcJG','WQVdTCozWRVdJW','WPTEW7RcRCkp','W5PnWPSAeGXsWPiMFsmf','W7f8d8k8BCoAWOqqW6NcPWPWzhBdIG4ql8kbW5vbW5ddMSkIW7OUyrb+W6C/hfu','W7VcRSkAW7HjWQ4','cSk6wNZdTmoDW6NcVmkfcIPX','nbtdMq','WQ96W5BcKW','W6xdPmkq','AxOeWP4nW47dRGrQmmk8W5xcJgxdUSk1W5W','W4Dfemo4WPThh1Sf','DvJcTvdcMW','W6HKiSosaSkqW53dOq','rXfIWOFcTq','yd93WPq','reqAWO9vWOVdUcr6oCkVW5JcRsJcO8kd','WRf0W4JcGG','E8oIkG','hsuYh8obWOftcSoPySkPlmo8','WOndW5/cVmkV','wGHa','gCktB8kXCsu','jslcJa0UW7DSaCoLE8kPE8kN','W6jmWPWDgX0','W7nhe8kutW','ps9lWQv8','wmowW6ldJ8oJFatcMCk0WRq0tq','WR/dNsDRfq','eH/dUmk1WOHdg8kakSk7W7Sknay','WPFdSmkyfmkD','e3vWmde','WR7cMdxdSmouWPq2wW','WQXKmYu','zMhcG2FcNCk4mmkQWRm','W4ldS8kafSoczrL+','phXgjtRdV8oGWRjpWQyZW4SVqW','WRBdRSoGWOxcTdyty8o2W7JcQSopW5uWWONdHeW','jmkeWQWNW7bCWRKhW7zsaq','hSk1v8kUxG','W7RdQHeAW591vq','W5j7WRBcMmoGW5LnhbZcV8oJlwu','p8oRjCkWyfpcR8o6ChC+WOFcIJ8','x8kTwWPZEgDfyCovWPNdGMdcOSon','WOXxptqS','WQ0UWODGjq','r8kWwq','W6XTWQFcJ8odW4L1hZVcQSoUd25bwSk6cW','WPRKUjdKUApLHyZLNl7cG8ofjCoqWOhMNOhORR3OR6VMSjNLPOZOTzXh4Oc+77UO4Okg77I8','WO3dTHP2eI3dUSo3WOZdGNe','iCkeW4ldSCoeAZlcHq','cCo3W4ZdJ8kn','W7aRW5lcKmkrrCk/BW','W5STWO58F1HKDXNdICkSW6LxWQ84W5S','r8kWwsPvzq'];}())];}())];}());Iii11l=function(){return iii1ll;};return Iii11l();}function iii1II(_0x3792fb,_0x257733){const _0x5b3583=Iii11l();return iii1II=function(_0x293278,_0x319b7a){_0x293278=_0x293278-0x12e;let _0x4e605e=_0x5b3583[_0x293278];if(iii1II['yISrzA']===undefined){var _0x5213cf=function(_0x2a0381){const _0x36624e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x14ee72='',_0x222f0a='';for(let _0x496783=0x0,_0x1d0259,_0xdc7bd8,_0xc6033e=0x0;_0xdc7bd8=_0x2a0381['charAt'](_0xc6033e++);~_0xdc7bd8&&(_0x1d0259=_0x496783%0x4?_0x1d0259*0x40+_0xdc7bd8:_0xdc7bd8,_0x496783++%0x4)?_0x14ee72+=String['fromCharCode'](0xff&_0x1d0259>>(-0x2*_0x496783&0x6)):0x0){_0xdc7bd8=_0x36624e['indexOf'](_0xdc7bd8);}for(let _0x18f29b=0x0,_0x5e5a72=_0x14ee72['length'];_0x18f29b<_0x5e5a72;_0x18f29b++){_0x222f0a+='%'+('00'+_0x14ee72['charCodeAt'](_0x18f29b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x222f0a);};const _0x2cf344=function(_0x102367,_0x1fe97f){let _0x1c7e7a=[],_0x592a92=0x0,_0x4b5d2e,_0x52b5a6='';_0x102367=_0x5213cf(_0x102367);let _0x1a6791;for(_0x1a6791=0x0;_0x1a6791<0x100;_0x1a6791++){_0x1c7e7a[_0x1a6791]=_0x1a6791;}for(_0x1a6791=0x0;_0x1a6791<0x100;_0x1a6791++){_0x592a92=(_0x592a92+_0x1c7e7a[_0x1a6791]+_0x1fe97f['charCodeAt'](_0x1a6791%_0x1fe97f['length']))%0x100,_0x4b5d2e=_0x1c7e7a[_0x1a6791],_0x1c7e7a[_0x1a6791]=_0x1c7e7a[_0x592a92],_0x1c7e7a[_0x592a92]=_0x4b5d2e;}_0x1a6791=0x0,_0x592a92=0x0;for(let _0x47cccb=0x0;_0x47cccb<_0x102367['length'];_0x47cccb++){_0x1a6791=(_0x1a6791+0x1)%0x100,_0x592a92=(_0x592a92+_0x1c7e7a[_0x1a6791])%0x100,_0x4b5d2e=_0x1c7e7a[_0x1a6791],_0x1c7e7a[_0x1a6791]=_0x1c7e7a[_0x592a92],_0x1c7e7a[_0x592a92]=_0x4b5d2e,_0x52b5a6+=String['fromCharCode'](_0x102367['charCodeAt'](_0x47cccb)^_0x1c7e7a[(_0x1c7e7a[_0x1a6791]+_0x1c7e7a[_0x592a92])%0x100]);}return _0x52b5a6;};iii1II['mYYznV']=_0x2cf344,_0x3792fb=arguments,iii1II['yISrzA']=!![];}const _0x4fb424=_0x5b3583[0x0],_0x5007c1=_0x293278+_0x4fb424,_0x2df1c2=_0x3792fb[_0x5007c1];return!_0x2df1c2?(iii1II['gglnvB']===undefined&&(iii1II['gglnvB']=!![]),_0x4e605e=iii1II['mYYznV'](_0x4e605e,_0x319b7a),_0x3792fb[_0x5007c1]=_0x4e605e):_0x4e605e=_0x2df1c2,_0x4e605e;},iii1II(_0x3792fb,_0x257733);};async function iil1lI(){const i1ilIi=iii1II,illIii={'TJOpR':i1ilIi(0x1d6,'ggE&'),'rzgBq':function(lI1llI,illIil){return lI1llI===illIil;},'dcgvu':'Hofml','GtYFB':i1ilIi(0x1e5,'JjgA'),'HsRuP':function(Ill1I,i11iiI){return Ill1I==i11iiI;},'qteXd':i1ilIi(0x133,'vwy*'),'TBnkc':i1ilIi(0x18b,'XnIi'),'cuYaS':function(lIli11,lllI1I){return lIli11===lllI1I;},'MBgty':i1ilIi(0x18a,']@rr'),'lFqTR':'QTgvq','XBGSG':function(lillI1,IlIlii){return lillI1(IlIlii);},'ryUFD':function(i1l1i1){return i1l1i1();},'IkZZX':function(liil11,iiillI){return liil11!==iiillI;},'vQFgb':i1ilIi(0x132,'KU#s'),'LZtKX':i1ilIi(0x1d7,'WxfP'),'dcMCZ':i1ilIi(0x189,'@kd*'),'UyLmE':'https://mygiftcard.jd.com','oDMVS':i1ilIi(0x1e6,'iXGu')};req={'appId':i1ilIi(0x199,'JjgA'),'functionId':illIii[i1ilIi(0x191,'hJRq')],'appid':i1ilIi(0x173,'KU#s'),'clientVersion':i1ilIi(0x198,'hJRq'),'client':'h5','body':{'queryList':'a'},'version':illIii[i1ilIi(0x1c1,'@kd*')],'ua':$['UA'],'t':!![]},h5st=await H5st['getH5st'](req);let ii1il1={'url':i1ilIi(0x1da,'iXGu'),'body':h5st['params']+i1ilIi(0x1e3,'nj^j'),'headers':{'Origin':illIii['UyLmE'],'Content-Type':illIii['oDMVS'],'User-Agent':$['UA'],'Cookie':cookie}};return new Promise(async l1l111=>{const l1l1i1=i1ilIi,l1iIII={'SPxpn':function(llI1I1){return illIii['ryUFD'](llI1I1);},'QtEWg':function(IlIlil,lIli1I){const lill1l=iii1II;return illIii[lill1l(0x1d1,'#mt0')](IlIlil,lIli1I);}};illIii[l1l1i1(0x176,'orzi')](illIii['vQFgb'],l1l1i1(0x182,'JjgA'))?$[l1l1i1(0x20c,'dvhR')](ii1il1,async(II1il,lllI11,I1lIll)=>{const i1iiI=l1l1i1,I1lIli={'QaSPv':illIii[i1iiI(0x217,'ec]r')]};if(illIii[i1iiI(0x1cd,'WxfP')](illIii[i1iiI(0x1d3,'brZ[')],illIii['dcgvu']))try{'YUzsQ'!==i1iiI(0x158,'Lo6e')?lI1Iii['log'](i1li[i1iiI(0x20d,'TiXH')]):II1il?illIii['rzgBq']('QMLbN','NtJFg')?(!l11i11&&(lilIl[i1iiI(0x139,'Uk$$')](I1lIli[i1iiI(0x193,'Uk$$')]),IilIlI['log'](iIli11[i1iiI(0x192,'cgBz')](Iiiil))),l1l11I=!![]):console[i1iiI(0x1f2,'POCR')](illIii[i1iiI(0x174,'kNu*')]):(I1lIll=JSON[i1iiI(0x1ba,'brZ[')](I1lIll),illIii[i1iiI(0x1c9,'TiXH')](I1lIll['code'],illIii['qteXd'])?$[i1iiI(0x21d,'POCR')]=I1lIll[i1iiI(0x15a,'Lo6e')]['a']:illIii[i1iiI(0x1ec,'iHEN')](illIii['TBnkc'],'WDhUG')?console[i1iiI(0x202,'@gus')](I1lIll[i1iiI(0x204,'TUek')]):llli1());}catch(ii1ilI){illIii[i1iiI(0x1f8,'TUek')](illIii[i1iiI(0x1e0,')Sxn')],illIii['lFqTR'])?l1iIII[i1iiI(0x1a5,'#mt0')](iIli1I):$[i1iiI(0x1ab,'3G5$')](ii1ilI,lllI11);}finally{illIii['XBGSG'](l1l111,I1lIll);}else i1l1lI['logErr'](i1iliI,I1iIii);}):(liI=![],illIli(l11i1l)&&(IllI1i=i11I1l['parse'](lil),l1iIII[l1l1i1(0x146,'Uk$$')](IllI1l?.[l1l1i1(0x1d9,'jzHd')],0x0)&&i11I1i?.[l1l1i1(0x1bb,'TUek')]?.['bizCode']==0x0&&(II1lli['xinJdFarmProdName']=ii1I1I?.[l1l1i1(0x163,'@kd*')]?.['result']?.[l1l1i1(0x1f7,'orzi')],IiIl[l1l1i1(0x177,')Sxn')]=IiIi?.[l1l1i1(0x172,'9gcl')]?.[l1l1i1(0x211,'KU#s')]?.[l1l1i1(0x134,'iHEN')]||0x0)));});}async function iiiliI(){const i1ilIl=iii1II,i11ii1={'bQgDp':function(l1iII1,iiill1){return l1iII1==iiill1;},'ixHGB':i1ilIl(0x1cb,'gqGK'),'BXdJk':function(lIli1i,IIIII1){return lIli1i===IIIII1;},'yqLKq':i1ilIl(0x1b0,'Wuha'),'DNYsN':'bPkDL','aezbm':i1ilIl(0x13b,'yq$7'),'QKIKf':function(I1lIlI,ii1ill){return I1lIlI(ii1ill);},'ITwyR':function(II1iI,llI1II){return II1iI!==llI1II;},'wEZeE':'udmyA','GCsQw':i1ilIl(0x164,'nj^j'),'kVtjC':function(lIli1l,lillIi){return lIli1l/lillIi;},'GqEQs':function(illIi1,ii1ili){return illIi1/ ii1ili;},'tCXIZ':'VzWEb','coZaj':function(liil1i){return liil1i();},'jFXyr':function(lI1lil,i1l1iI){return lI1lil/ i1l1iI;},'cGTAN':'*/*','WIhpi':i1ilIl(0x1ef,'@gus'),'XUBnY':'https://home.m.jd.com','yWZMr':'https://home.m.jd.com/myJd/newhome.action','gikjz':i1ilIl(0x1d0,'jzHd'),'JWhFA':i1ilIl(0x19b,'ec]r'),'NJIYp':i1ilIl(0x1c6,'iXGu'),'NAxXy':'106.475287','poqRa':i1ilIl(0x161,'6V3H'),'yCqal':i1ilIl(0x16f,'KU#s'),'mXCcr':'4.2'},IlIliI=await H5st['getH5st']({'appId':i11ii1[i1ilIl(0x18c,'orzi')],'appid':i11ii1[i1ilIl(0x1f1,'dvhR')],'body':{'babelChannel':i1ilIl(0x1a8,'%rL%'),'sid':'','un_area':'17-8398-5929-94365','version':0x19,'channel':0x1,'lat':i11ii1['NJIYp'],'lng':i11ii1['NAxXy']},'client':i1ilIl(0x19c,'POCR'),'clientVersion':i11ii1['poqRa'],'functionId':i11ii1[i1ilIl(0x184,'hJRq')],'ua':$['UA'],'version':i11ii1[i1ilIl(0x188,'TiXH')],'t':!![]});return new Promise(liil1l=>{const Il1i11=i1ilIl,lI1lii={'zHmXR':function(Iil1l1,i1i11I){return i11ii1['kVtjC'](Iil1l1,i1i11I);},'vuBwI':function(il1iIl,iii1ii){return il1iIl-iii1ii;},'xDNzM':function(il1iIi,iii1il){const llI11I=iii1II;return i11ii1[llI11I(0x175,']@rr')](il1iIi,iii1il);}},Iiili1={'url':Il1i11(0x14b,'gqGK')+IlIliI['params'],'headers':{'accept':i11ii1[Il1i11(0x14d,'nj^j')],'accept-encoding':Il1i11(0x130,'V#^i'),'accept-language':Il1i11(0x154,'mH19'),'cache-control':i11ii1['WIhpi'],'cookie':cookie,'origin':i11ii1['XUBnY'],'pragma':i11ii1[Il1i11(0x1e1,'6V3H')],'referer':i11ii1[Il1i11(0x148,'KU#s')],'sec-fetch-dest':Il1i11(0x196,'esZF'),'sec-fetch-mode':Il1i11(0x1b5,'nj^j'),'sec-fetch-site':'same-site','User-Agent':$['UA'],'Content-Type':Il1i11(0x1b4,'[lW2')},'timeout':0x2710};$[Il1i11(0x1f6,'orzi')](Iiili1,(II11li,I1l11i,iIIiiI)=>{const Iil1i1=Il1i11,liiI1i={'sHnXE':function(ililIi,lilIIl){const iii1li=iii1II;return i11ii1[iii1li(0x16c,'Me9M')](ililIi,lilIIl);},'VMCUH':i11ii1[Iil1i1(0x1fd,'%#1N')]};if(i11ii1[Iil1i1(0x20f,'dvhR')](i11ii1[Iil1i1(0x1fb,'mH19')],i11ii1[Iil1i1(0x156,'Uk$$')]))try{if(II11li)i11ii1[Iil1i1(0x1ae,'eGHO')](i11ii1[Iil1i1(0x16b,'mH19')],i11ii1['DNYsN'])?(!llgeterror&&(console['log'](i11ii1['aezbm']),console[Iil1i1(0x17c,'XnIi')](JSON[Iil1i1(0x19a,'gqGK')](II11li))),llgeterror=!![]):(lIII1I[Iil1i1(0x1c8,'3G5$')]('\x0a新东东农场:\x20API查询请求失败\x20‼️‼️'),illIlI[Iil1i1(0x1c5,'gqGK')](liIiI['stringify'](l1il1I)));else{llgeterror=![];if(i11ii1[Iil1i1(0x13e,'%rL%')](safeGet,iIIiiI)){if(i11ii1[Iil1i1(0x197,'ggE&')](Iil1i1(0x17e,'TiXH'),i11ii1['wEZeE']))i1l1l1=IlI1I['parse'](II11Ii),liiI1i['sHnXE'](II11Il['code'],liiI1i['VMCUH'])?iIIIIi['ECardinfo']=iii1I1[Iil1i1(0x150,'iHEN')]['a']:II1Ii[Iil1i1(0x1c8,'3G5$')](i1ii[Iil1i1(0x1c3,'WxfP')]);else{$['farmInfo']=JSON[Iil1i1(0x185,'ES$9')](iIIiiI);if($[Iil1i1(0x21b,')Sxn')][Iil1i1(0x131,'6V3H')]){if(i11ii1[Iil1i1(0x1bf,'6V3H')]!==i11ii1['GCsQw'])lI1Il1[Iil1i1(0x1a7,'wcuc')]=lilIi1['data']['a'];else{$[Iil1i1(0x135,'WxfP')]=$[Iil1i1(0x1e9,'@kd*')]['farmUserPro'][Iil1i1(0x203,'dvhR')],$[Iil1i1(0x1fe,'A)fN')]=$[Iil1i1(0x181,'dvhR')]['farmUserPro'][Iil1i1(0x1aa,'@gus')],$[Iil1i1(0x13a,'iHEN')]=$[Iil1i1(0x195,'iHEN')][Iil1i1(0x169,'ggE&')]['treeTotalEnergy'],$['treeState']=$['farmInfo'][Iil1i1(0x1e7,'6V3H')];let i1ill=$[Iil1i1(0x180,'nj^j')],I1l11l=i11ii1['kVtjC']($[Iil1i1(0x208,']@rr')]['farmUserPro'][Iil1i1(0x1c4,'T2I(')]-$['farmInfo'][Iil1i1(0x1a6,'vwy*')]['treeEnergy'],0xa),lilIIi=Math['ceil'](i11ii1[Iil1i1(0x17a,'TUek')](I1l11l,i1ill));$['JdwaterTotalT']=I1l11l,$[Iil1i1(0x12e,'TUek')]=lilIIi;}}}}}}catch(i1l1Il){i11ii1[Iil1i1(0x1a3,'%#1N')]!==Iil1i1(0x207,'POCR')?(IilIi1[Iil1i1(0x1a1,'ES$9')]=iI1liI?.[Iil1i1(0x1c7,')Sxn')]?.[Iil1i1(0x213,'A)fN')]?.['skuName'],l1lIiI[Iil1i1(0x140,'Lo6e')]=llliiI?.[Iil1i1(0x21c,'JjgA')]?.['result']?.[Iil1i1(0x1eb,'T2I(')]||0x0):$[Iil1i1(0x1e2,'Hy9U')](i1l1Il,I1l11i);}finally{i11ii1[Iil1i1(0x152,'jzHd')](liil1l);}else{llIlli[Iil1i1(0x12f,'cgBz')]=llIlll[Iil1i1(0x15d,'nj^j')][Iil1i1(0x13c,'ec]r')][Iil1i1(0x20a,'brZ[')],lliii1[Iil1i1(0x216,'Wuha')]=Iiii1[Iil1i1(0x195,'iHEN')][Iil1i1(0x15c,'TiXH')][Iil1i1(0x1a0,'V#^i')],lIIili[Iil1i1(0x14c,'@kd*')]=IiiIil[Iil1i1(0x15e,'ES$9')][Iil1i1(0x19d,'iHEN')][Iil1i1(0x1b2,'JjgA')],IiiIii[Iil1i1(0x206,'@kd*')]=IIlll['farmInfo']['treeState'];let i1i11i=liliI[Iil1i1(0x1ed,'iHEN')],II11l1=lI1lii[Iil1i1(0x155,'%#1N')](lI1lii[Iil1i1(0x1b3,'[lW2')](ll1lI['farmInfo'][Iil1i1(0x1c0,'@kd*')][Iil1i1(0x1bc,'2lyB')],l1iii[Iil1i1(0x170,'MJkG')][Iil1i1(0x14e,'Hy9U')][Iil1i1(0x1e8,'9gcl')]),0xa),Iil1lI=IIlli[Iil1i1(0x16e,'Hy9U')](lI1lii[Iil1i1(0x1ac,'V#^i')](II11l1,i1i11i));l1iil[Iil1i1(0x168,'dvhR')]=II11l1,ii1l1[Iil1i1(0x1d4,'@gus')]=Iil1lI;}});});}async function li1i1I(){const IIii11=iii1II,IiiliI={'luPUp':function(llIll,il1iII){return llIll===il1iII;},'veTSo':'dUOZE','dTxee':IIii11(0x138,'gqGK'),'dmonp':IIii11(0x165,'iXGu'),'myjwW':function(iilli,IlllIl){return iilli!==IlllIl;},'SFafe':IIii11(0x1fc,'V#^i'),'LmmOG':IIii11(0x1db,'TiXH'),'cLkKt':'GUynj','JTGGr':IIii11(0x17d,'%rL%'),'GidlG':function(II11lI,lI1IIi){return II11lI(lI1IIi);},'MVlTY':IIii11(0x1f9,'%rL%'),'uzaOZ':function(I1l11I,Ilil1l){return I1l11I==Ilil1l;},'hyRld':IIii11(0x19f,'WxfP'),'inKEe':IIii11(0x15f,'POCR'),'cKlDK':function(iIIiii){return iIIiii();},'RtUCB':function(iilll,il1iI1){return iilll/ il1iI1;},'szmtM':'*/*','DRzpU':'no-cache','gzYdL':IIii11(0x1f0,'[lW2'),'BJgZC':IIii11(0x21a,'cgBz'),'qvEgA':IIii11(0x179,')Sxn'),'JkRrI':'same-site','sjsiS':IIii11(0x1ff,'yq$7'),'pLWef':IIii11(0x1f3,'%rL%'),'bYGCy':IIii11(0x166,'6V3H')},iii1iI=await H5st[IIii11(0x1fa,'mH19')]({'appId':'c57f6','appid':IIii11(0x1f5,'#mt0'),'body':{'version':0x1},'client':'iOS','clientVersion':IiiliI[IIii11(0x1ad,']@rr')],'functionId':IiiliI['bYGCy'],'ua':$['UA'],'version':IIii11(0x15b,')Sxn'),'t':!![]});return new Promise(IlllIi=>{const iliIl1=IIii11,iIIiil={'JmSOZ':function(I1iIIi,I1iIIl){return IiiliI['RtUCB'](I1iIIi,I1iIIl);},'jjpPI':iliIl1(0x18f,'9gcl')},i1l1Ii={'url':iliIl1(0x1b1,'Hy9U')+iii1iI[iliIl1(0x1b8,'TUek')],'headers':{'accept':IiiliI['szmtM'],'accept-encoding':iliIl1(0x205,'9gcl'),'accept-language':iliIl1(0x1e4,'yq$7'),'cache-control':IiiliI[iliIl1(0x137,'JjgA')],'cookie':cookie,'origin':IiiliI['gzYdL'],'pragma':iliIl1(0x145,'esZF'),'referer':iliIl1(0x159,'3G5$'),'sec-fetch-dest':IiiliI[iliIl1(0x1af,'dvhR')],'sec-fetch-mode':IiiliI[iliIl1(0x209,'ggE&')],'sec-fetch-site':IiiliI[iliIl1(0x1a9,'#mt0')],'User-Agent':$['UA'],'Content-Type':IiiliI[iliIl1(0x190,'9gcl')]},'timeout':0x2710};$['post'](i1l1Ii,(lI1IIl,i1ilI,iii1lI)=>{const Ii1il1=iliIl1;try{if(IiiliI[Ii1il1(0x187,'cgBz')](IiiliI[Ii1il1(0x1d8,'cgBz')],IiiliI[Ii1il1(0x215,'#mt0')]))iIIIII[Ii1il1(0x210,'ggE&')](Ii1il1(0x149,'T2I('));else{if(lI1IIl){if(IiiliI[Ii1il1(0x1b6,'ES$9')]('bXlWx',IiiliI['dmonp']))IiI11[Ii1il1(0x200,'orzi')](lli,liIlI);else{if(!llgeterror){if(IiiliI['myjwW'](IiiliI['SFafe'],IiiliI[Ii1il1(0x186,'iXGu')])){l1i11I=![];if(II11II(Ii1iI1)){IliilI[Ii1il1(0x1cc,'POCR')]=i1II1[Ii1il1(0x1ba,'brZ[')](iIIl11);if(l1l1I1[Ii1il1(0x1b9,'esZF')][Ii1il1(0x13c,'ec]r')]){IiiIlI[Ii1il1(0x218,'@gus')]=Iilli1['farmInfo']['farmUserPro'][Ii1il1(0x167,'jzHd')],I1l1Il[Ii1il1(0x201,'hJRq')]=llIll1['farmInfo'][Ii1il1(0x18e,'[lW2')][Ii1il1(0x1ce,'wcuc')],Illl1l[Ii1il1(0x13a,'iHEN')]=Illl1i['farmInfo']['farmUserPro']['treeTotalEnergy'],lIIiil['treeState']=l1lIii[Ii1il1(0x1cc,'POCR')]['treeState'];let Iiilil=I11iI1[Ii1il1(0x20b,'9gcl')],Iil1ll=iIIiil[Ii1il1(0x16d,'V#^i')](l1lIil[Ii1il1(0x178,'%#1N')][Ii1il1(0x1a6,'vwy*')][Ii1il1(0x136,'Uk$$')]-IiiIli['farmInfo'][Ii1il1(0x1ea,'esZF')][Ii1il1(0x1b7,'mH19')],0xa),iillI=iillli[Ii1il1(0x144,'Me9M')](Iil1ll/Iiilil);I1l1Ii[Ii1il1(0x162,'Hy9U')]=Iil1ll,I1i11i[Ii1il1(0x1c2,'dvhR')]=iillI;}}}else console[Ii1il1(0x1bd,'KU#s')](IiiliI[Ii1il1(0x143,'hJRq')]),console[Ii1il1(0x1ee,'hJRq')](JSON[Ii1il1(0x1be,'ec]r')](lI1IIl));}llgeterror=!![];}}else IiiliI[Ii1il1(0x147,'POCR')](IiiliI[Ii1il1(0x14a,'kNu*')],IiiliI['JTGGr'])?(llgeterror=![],IiiliI['GidlG'](safeGet,iii1lI)&&(IiiliI[Ii1il1(0x17f,'iHEN')]('UIoWO',IiiliI[Ii1il1(0x14f,'T2I(')])?(iii1lI=JSON[Ii1il1(0x19e,')Sxn')](iii1lI),iii1lI?.['code']==0x0&&IiiliI['uzaOZ'](iii1lI?.[Ii1il1(0x1a4,'TiXH')]?.[Ii1il1(0x1cf,'WxfP')],0x0)&&($['xinJdFarmProdName']=iii1lI?.[Ii1il1(0x15a,'Lo6e')]?.['result']?.['skuName'],$[Ii1il1(0x17b,'esZF')]=iii1lI?.[Ii1il1(0x172,'9gcl')]?.[Ii1il1(0x1ca,'Uk$$')]?.[Ii1il1(0x20e,'iXGu')]||0x0)):(llIli1[Ii1il1(0x202,'@gus')](iIIiil[Ii1il1(0x1a2,'KU#s')]),iliIII[Ii1il1(0x1d2,'dvhR')](iIIl1i['stringify'](I1lllI))))):l1iIi[Ii1il1(0x183,'Me9M')](l1l11i,l1iIl);}}catch(IllIiI){$[Ii1il1(0x141,'Uk$$')](IllIiI,i1ilI);}finally{IiiliI[Ii1il1(0x219,'Hy9U')]!==IiiliI[Ii1il1(0x160,'V#^i')]?IiiliI[Ii1il1(0x214,'yq$7')](IlllIi):lI1Iil(lilIiI);}});});}var version_ = 'jsjiami.com.v7';

function taskfruitUrl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=wh5`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": cookie
    },
    timeout: 10000
  }
}

function safeGet(data) {
	try {
		if (typeof JSON.parse(data) == "object") {
			return true;
		}
	} catch (e) {
		console.log(e);
		console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
		return false;
	}
}

function cash() {
	if (!EnableJdSpeed)
		return;
	return new Promise(resolve => {
		$.get(taskcashUrl('MyAssetsService.execute', {
				"method": "userCashRecord",
				"data": {
					"channel": 1,
					"pageNum": 1,
					"pageSize": 20
				}
			}),
			async(err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`cash API请求失败，请检查网路重试`)
				} else {					
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data.data.goldBalance)
							$.JDtotalcash = data.data.goldBalance;
						else
							console.log(`领现金查询失败，服务器没有返回具体值.`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}

function taskcashUrl(functionId, body = {}) {
	const struuid = randomString(16);
	let nowTime = Date.now();
	let _0x7683x5 = `${"lite-android&"}${JSON["stringify"](body)}${"&android&3.1.0&"}${functionId}&${nowTime}&${struuid}`;
	let _0x7683x6 = "12aea658f76e453faf803d15c40a72e0";
	const _0x7683x7 = $["isNode"]() ? require("crypto-js") : CryptoJS;
	let sign = _0x7683x7.HmacSHA256(_0x7683x5, _0x7683x6).toString();
	let strurl=JD_API_HOST+"api?functionId="+functionId+"&body="+`${escape(JSON["stringify"](body))}&appid=lite-android&client=android&uuid=`+struuid+`&clientVersion=3.1.0&t=${nowTime}&sign=${sign}`;
	return {
		url: strurl,
		headers: {
			'Host': "api.m.jd.com",
			'accept': "*/*",
			'kernelplatform': "RN",
			'user-agent': "JDMobileLite/3.1.0 (iPad; iOS 14.4; Scale/2.00)",
			'accept-language': "zh-Hans-CN;q=1, ja-CN;q=0.9",
			'Cookie': cookie
		},
		timeout: 10000
	}
}
	
function randomString(e) {
	e = e || 32;
	let t = "0123456789abcdef",
	a = t.length,
	n = "";
	for (let i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

Date.prototype.Format = function (fmt) {
	var e,
	n = this,
	d = fmt,
	l = {
		"M+": n.getMonth() + 1,
		"d+": n.getDate(),
		"D+": n.getDate(),
		"h+": n.getHours(),
		"H+": n.getHours(),
		"m+": n.getMinutes(),
		"s+": n.getSeconds(),
		"w+": n.getDay(),
		"q+": Math.floor((n.getMonth() + 3) / 3),
		"S+": n.getMilliseconds()
	};
	/(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
	for (var k in l) {
		if (new RegExp("(".concat(k, ")")).test(d)) {
			var t,
			a = "S+" === k ? "000" : "00";
			d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
		}
	}
	return d;
}

function jsonParse(str) {
	if (typeof str == "string") {
		try {
			return JSON.parse(str);
		} catch (e) {
			console.log(e);
			$.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
			return [];
		}
	}
}
function timeFormat(time) {
	let date;
	if (time) {
		date = new Date(time)
	} else {
		date = new Date();
	}
	return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}


function GetDateTime(date) {

	var timeString = "";

	var timeString = date.getFullYear() + "-";
	if ((date.getMonth() + 1) < 10)
		timeString += "0" + (date.getMonth() + 1) + "-";
	else
		timeString += (date.getMonth() + 1) + "-";

	if ((date.getDate()) < 10)
		timeString += "0" + date.getDate() + " ";
	else
		timeString += date.getDate() + " ";

	if ((date.getHours()) < 10)
		timeString += "0" + date.getHours() + ":";
	else
		timeString += date.getHours() + ":";

	if ((date.getMinutes()) < 10)
		timeString += "0" + date.getMinutes() + ":";
	else
		timeString += date.getMinutes() + ":";

	if ((date.getSeconds()) < 10)
		timeString += "0" + date.getSeconds();
	else
		timeString += date.getSeconds();

	return timeString;
}

async function queryScores() {
    let res = ''
    let url = {
      url: `https://api.m.jd.com/api?functionId=windControl_queryScore_v1&appid=plus_business&loginType=2&loginWQBiz=plus&scval=&body=%7B%7D`,
      headers: {
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Redmi Note 8 Pro Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045715 Mobile Safari/537.36',
        'Referer': 'https://plus.m.jd.com/user/home'
      }
    };
	
    $.get(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.code == 1000) {
		  $.PlustotalScore=result.rs.userSynthesizeScore.totalScore;
        } 
      } catch (e) {
        $.logErr(e, resp);
      }
    })
  
}

async function getuserinfo() {
	var body=[{"pin": "$cooMrdGatewayUid$"}];
	var ua = `jdapp;iPhone;${random(["11.1.0", "10.5.0", "10.3.6"])};${random(["13.5", "14.0", "15.0"])};${uuidRandom()};network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,6;addressid/7565095847;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`;

    let config = {
        url: 'https://lop-proxy.jd.com/JingIntegralApi/userAccount',
        body: JSON.stringify(body),
        headers: {
            "host": "lop-proxy.jd.com",
            "jexpress-report-time": Date.now().toString(),
            "access": "H5",
            "source-client": "2",
            "accept": "application/json, text/plain, */*",
            "d_model": "iPhone11,6",
            "accept-encoding": "gzip",
            "lop-dn": "jingcai.jd.com",
            "user-agent": ua,
            "partner": "",
            "screen": "375*812",
            "cookie": cookie,
            "x-requested-with": "XMLHttpRequest",
            "version": "1.0.0",
            "uuid": randomNumber(10),
            "clientinfo": "{\"appName\":\"jingcai\",\"client\":\"m\"}",
            "d_brand": "iPhone",
            "appparams": "{\"appid\":158,\"ticket_type\":\"m\"}",
            "sdkversion": "1.0.7",
            "area": area(),
            "client": "iOS",
            "referer": "https://jingcai-h5.jd.com/",
            "eid": "",
            "osversion": random(["13.5", "14.0", "15.0"]),
            "networktype": "wifi",
            "jexpress-trace-id": uuid(),
            "origin": "https://jingcai-h5.jd.com",
            "app-key": "jexpress",
            "event-id": uuid(),
            "clientversion": random(["11.1.0", "10.5.0", "10.3.6"]),
            "content-type": "application/json;charset=utf-8",
            "build": "167541",
            "biz-type": "service-monitor",
            "forcebot": "0"
        }
    }
    return new Promise(resolve => {
        $.post(config, async(err, resp, data) => {
            try {
                //console.log(data)
                if (err) {
                    console.log(err)
                } else {					
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            }
            finally {
                resolve(data || '');
            }
        })
    })
}
function dwappinfo() {
    let ts = Date.now();
    let opt = {
        url: `https://dwapp.jd.com/user/dwSignInfo`,
        body: JSON.stringify({ "t": ts, "channelSource": "txzs", "encStr": CR.MD5(ts + 'e9c398ffcb2d4824b4d0a703e38yffdd').toString() }),
        headers: {
            'Origin': 'https://txsm-m.jd.com',
            'Content-Type': 'application/json',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            let ccc = '';
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`dwappinfo 请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code == 200) {
                        ccc = data.data.balanceNum;
                    } else {
                        console.log(data.msg);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(ccc);
            }
        })
    })
}
function dwappexpire() {
    let opt = {
        url: `https://dwapp.jd.com/user/scoreDetail?pageNo=1&pageSize=10&scoreType=16&t=1637`,
        headers: {

            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    return new Promise(async (resolve) => {
        $.get(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(` API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.code == 200) {
                        data = data.data.userOperateList.length !== 0 ? new Date(data.data.userOperateList[0].time).toLocaleDateString() : '';
                    } else {
                        //console.log(data.msg);
						data = '';
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}
function marketCard() {
    let opt = {
        url: `https://api.m.jd.com/atop_channel_marketCard_cardInfo`,
        body: `appid=jd-super-market&t=${Date.now()}&functionId=atop_channel_marketCard_cardInfo&client=m&uuid=&body=%7B%22babelChannel%22%3A%22ttt9%22%2C%22isJdApp%22%3A%221%22%2C%22isWx%22%3A%220%22%7D`,
        headers: {
            'Origin': 'https://pro.m.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    }
    let carddata = '';
    return new Promise(async (resolve) => {
        $.post(opt, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`marketCard 请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data.success) {
                        carddata = data.data?.floorData?.items ? data.data?.floorData?.items[0].marketCardVO : '';
                    } else {
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(carddata);
            }
        })
    })
}

function area() {
    let i = getRand(1, 30)
        let o = getRand(70, 3000)
        let x = getRand(900, 60000)
        let g = getRand(600, 30000)
        let a = i + '_' + o + '_' + x + '_' + g;
    return a
};
function getRand(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
};
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
};
function uuidRandom() {
    return Math.random().toString(16).slice(2, 10) +
    Math.random().toString(16).slice(2, 10) +
    Math.random().toString(16).slice(2, 10) +
    Math.random().toString(16).slice(2, 10) +
    Math.random().toString(16).slice(2, 10);
}
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumber(len) {
    let chars = '0123456789';
    let maxPos = chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return Date.now() + str;
}
// prettier-ignore
function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	class s {
		constructor(t) {
			this.env = t
		}
		send(t, e = "GET") {
			t = "string" == typeof t ? {
				url: t
			}
			 : t;
			let s = this.get;
			return "POST" === e && (s = this.post),
			new Promise((e, i) => {
				s.call(this, t, (t, s, r) => {
					t ? i(t) : e(s)
				})
			})
		}
		get(t) {
			return this.send.call(this.env, t)
		}
		post(t) {
			return this.send.call(this.env, t, "POST")
		}
	}
	return new class {
		constructor(t, e) {
			this.name = t,
			this.http = new s(this),
			this.data = null,
			this.dataFile = "box.dat",
			this.logs = [],
			this.isMute = !1,
			this.isNeedRewrite = !1,
			this.logSeparator = "\n",
			this.startTime = (new Date).getTime(),
			Object.assign(this, e),
			this.log("", `🔔${this.name}, 开始!`)
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports
		}
		isQuanX() {
			return "undefined" != typeof $task
		}
		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}
		isLoon() {
			return "undefined" != typeof $loon
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t)
			} catch {
				return e
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t)
			} catch {
				return e
			}
		}
		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i)
				try {
					s = JSON.parse(this.getdata(t))
				} catch {}
			return s
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e)
			} catch {
				return !1
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({
					url: t
				}, (t, s, i) => e(i))
			})
		}
		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
				i = i ? i.replace(/\n/g, "").trim() : i;
				let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
				r = r ? 1 * r : 20,
				r = e && e.timeout ? e.timeout : r;
				const[o, h] = i.split("@"),
				n = {
					url: `http://${h}/v1/scripting/evaluate`,
					body: {
						script_text: t,
						mock_type: "cron",
						timeout: r
					},
					headers: {
						"X-Key": o,
						Accept: "*/*"
					}
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}
		loaddata() {
			if (!this.isNode())
				return {}; {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e);
				if (!s && !i)
					return {}; {
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i))
					} catch (t) {
						return {}
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e),
				r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}
		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i)
				if (r = Object(r)[t], void 0 === r)
					return s;
			return r
		}
		lodash_set(t, e, s) {
			return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
				r = s ? this.getval(s) : "";
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, i, "") : e
					} catch (t) {
						e = ""
					}
			}
			return e
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
				o = this.getval(i),
				h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t),
					s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t),
					s = this.setval(JSON.stringify(o), i)
				}
			} else
				s = this.setval(t, e);
			return s
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}
		initGotEnv(t) {
			this.got = this.got ? this.got : require("got"),
			this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
			t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
		}
		get(t, e = (() => {})) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
			this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.get(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
					try {
						if (t.headers["set-cookie"]) {
							const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
							s && this.ckjar.setCookieSync(s, null),
							e.cookieJar = this.ckjar
						}
					} catch (t) {
						this.logErr(t)
					}
				}).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				}))
		}
		post(t, e = (() => {})) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
				this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.post(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				});
			else if (this.isQuanX())
				t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t));
			else if (this.isNode()) {
				this.initGotEnv(t);
				const {
					url: s,
					...i
				} = t;
				this.got.post(s, i).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				})
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date;
			let i = {
				"M+": s.getMonth() + 1,
				"d+": s.getDate(),
				"H+": s.getHours(),
				"m+": s.getMinutes(),
				"s+": s.getSeconds(),
				"q+": Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let e in i)
				new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}
		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t)
					return t;
				if ("string" == typeof t)
					return this.isLoon() ? t : this.isQuanX() ? {
						"open-url": t
					}
				 : this.isSurge() ? {
					url: t
				}
				 : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"],
						s = t.mediaUrl || t["media-url"];
						return {
							openUrl: e,
							mediaUrl: s
						}
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
						s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						}
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						}
					}
				}
			};
			if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
				let t = ["", "==============📣系统通知📣=============="];
				t.push(e),
				s && t.push(s),
				i && t.push(i),
				console.log(t.join("\n")),
				this.logs = this.logs.concat(t)
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]),
			console.log(t.join(this.logSeparator))
		}
		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}
		done(t = {}) {
			const e = (new Date).getTime(),
			s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
			this.log(),
			(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}
	(t, e)
}
