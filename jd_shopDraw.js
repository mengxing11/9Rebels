/*
店铺左侧刮刮乐

京东APP-店铺-左侧悬浮（抽奖）

也可点击顶部【精选】后面的【活动】选项，找到抽奖活动

必须有venderId= 参数
//export jd_shopDraw_venderId="" //店铺ID，多个 @ 链接或者 | 链接 或者 & 链接

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺左侧刮刮乐
1 1 1 1 * jd_shopDraw.js, tag=店铺刮刮乐, enabled=true
 */

const $ = new Env('店铺左侧刮刮乐');
var iｉl='jsjiami.com.v7';const llI11l=iii1II;(function(i1iiI,i1ilIl,llI11I,Il1i11,iii1li,Iil1i1,IIii11){return i1iiI=i1iiI>>0x6,Iil1i1='hs',IIii11='hs',function(iliIl1,Ii1il1,iii1ll,IIliI1,il1lI){const i1iil=iii1II;IIliI1='tfi',Iil1i1=IIliI1+Iil1i1,il1lI='up',IIii11+=il1lI,Iil1i1=iii1ll(Iil1i1),IIii11=iii1ll(IIii11),iii1ll=0x0;const IliIIl=iliIl1();while(!![]&&--Il1i11+Ii1il1){try{IIliI1=-parseInt(i1iil(0x23b,'KvvG'))/0x1*(parseInt(i1iil(0x1c0,'#an('))/0x2)+-parseInt(i1iil(0x1f7,'8y6r'))/0x3*(-parseInt(i1iil(0x26d,'Frzv'))/0x4)+parseInt(i1iil(0x21c,'[Plo'))/0x5+-parseInt(i1iil(0x283,'KvvG'))/0x6+parseInt(i1iil(0x239,'#an('))/0x7*(-parseInt(i1iil(0x271,'8RP4'))/0x8)+parseInt(i1iil(0x2c0,'A^ny'))/0x9*(-parseInt(i1iil(0x1be,'M@uf'))/0xa)+parseInt(i1iil(0x2c1,'JSbr'))/0xb;}catch(I1il1l){IIliI1=iii1ll;}finally{il1lI=IliIIl[Iil1i1]();if(i1iiI<=Il1i11)iii1ll?iii1li?IIliI1=il1lI:iii1li=il1lI:iii1ll=il1lI;else{if(iii1ll==iii1li['replace'](/[SUrYTyNqHLlfGBgWAt=]/g,'')){if(IIliI1===Ii1il1){IliIIl['un'+Iil1i1](il1lI);break;}IliIIl[IIii11](il1lI);}}}}}(llI11I,i1ilIl,function(lI1l1l,IIliII,iiliI,Ill11I,I1il1i,IliIIi,lI1l1i){return IIliII='\x73\x70\x6c\x69\x74',lI1l1l=arguments[0x0],lI1l1l=lI1l1l[IIliII](''),iiliI=`\x72\x65\x76\x65\x72\x73\x65`,lI1l1l=lI1l1l[iiliI]('\x76'),Ill11I=`\x6a\x6f\x69\x6e`,(0x14f551,lI1l1l[Ill11I](''));});}(0x3300,0x693d5,Iii11l,0xce),Iii11l)&&(iｉl=Iii11l);const ii1iil=$['isNode']()?require(llI11l(0x2b2,')HGn')):'',lllI1l=$[llI11l(0x201,'H%7a')]()?require(llI11l(0x1c7,'PPLJ')):'',i11iii=require(llI11l(0x1d3,'8RP4'));let llI1Ii=[],lllI1i='';if($['isNode']()){Object[llI11l(0x298,'#j[J')](lllI1l)[llI11l(0x2af,'Geoi')](ii1il1=>{const I1llIl=llI11l;llI1Ii[I1llIl(0x26c,'j9cy')](lllI1l[ii1il1]);});if(process['env']['JD_DEBUG']&&process[llI11l(0x1ac,'JSbr')][llI11l(0x2a6,'A2op')]===llI11l(0x225,')G9%'))console[llI11l(0x24a,'A2op')]=()=>{};}else llI1Ii=[$[llI11l(0x1ea,'JSbr')](llI11l(0x1ce,')tRF')),$[llI11l(0x216,')G9%')]('CookieJD2'),...illIii($[llI11l(0x2a0,'B]y&')](llI11l(0x28f,'Pcu^'))||'[]')[llI11l(0x2c6,'ghXH')](lI1llI=>lI1llI[llI11l(0x194,'6*lU')])][llI11l(0x1ef,'Frzv')](illIil=>!!illIil);function iii1II(_0x4879d9,_0x598d7f){const _0x18f2c5=Iii11l();return iii1II=function(_0x160a0e,_0x48e449){_0x160a0e=_0x160a0e-0x18c;let _0x4a57d2=_0x18f2c5[_0x160a0e];if(iii1II['UZEyym']===undefined){var _0x2fc472=function(_0x35d1bb){const _0x30c323='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x1ad4e4='',_0x320718='';for(let _0x51d846=0x0,_0x280d29,_0x2bfb69,_0x17beb1=0x0;_0x2bfb69=_0x35d1bb['charAt'](_0x17beb1++);~_0x2bfb69&&(_0x280d29=_0x51d846%0x4?_0x280d29*0x40+_0x2bfb69:_0x2bfb69,_0x51d846++%0x4)?_0x1ad4e4+=String['fromCharCode'](0xff&_0x280d29>>(-0x2*_0x51d846&0x6)):0x0){_0x2bfb69=_0x30c323['indexOf'](_0x2bfb69);}for(let _0x716fc4=0x0,_0x19002f=_0x1ad4e4['length'];_0x716fc4<_0x19002f;_0x716fc4++){_0x320718+='%'+('00'+_0x1ad4e4['charCodeAt'](_0x716fc4)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x320718);};const _0x32d11b=function(_0x529347,_0x5561cf){let _0x4f84ae=[],_0x486b39=0x0,_0x147cec,_0x372a5d='';_0x529347=_0x2fc472(_0x529347);let _0x28df7f;for(_0x28df7f=0x0;_0x28df7f<0x100;_0x28df7f++){_0x4f84ae[_0x28df7f]=_0x28df7f;}for(_0x28df7f=0x0;_0x28df7f<0x100;_0x28df7f++){_0x486b39=(_0x486b39+_0x4f84ae[_0x28df7f]+_0x5561cf['charCodeAt'](_0x28df7f%_0x5561cf['length']))%0x100,_0x147cec=_0x4f84ae[_0x28df7f],_0x4f84ae[_0x28df7f]=_0x4f84ae[_0x486b39],_0x4f84ae[_0x486b39]=_0x147cec;}_0x28df7f=0x0,_0x486b39=0x0;for(let _0x511c0d=0x0;_0x511c0d<_0x529347['length'];_0x511c0d++){_0x28df7f=(_0x28df7f+0x1)%0x100,_0x486b39=(_0x486b39+_0x4f84ae[_0x28df7f])%0x100,_0x147cec=_0x4f84ae[_0x28df7f],_0x4f84ae[_0x28df7f]=_0x4f84ae[_0x486b39],_0x4f84ae[_0x486b39]=_0x147cec,_0x372a5d+=String['fromCharCode'](_0x529347['charCodeAt'](_0x511c0d)^_0x4f84ae[(_0x4f84ae[_0x28df7f]+_0x4f84ae[_0x486b39])%0x100]);}return _0x372a5d;};iii1II['ECyWJy']=_0x32d11b,_0x4879d9=arguments,iii1II['UZEyym']=!![];}const _0x73381f=_0x18f2c5[0x0],_0x3f00bc=_0x160a0e+_0x73381f,_0x3162e9=_0x4879d9[_0x3f00bc];return!_0x3162e9?(iii1II['lMgfjz']===undefined&&(iii1II['lMgfjz']=!![]),_0x4a57d2=iii1II['ECyWJy'](_0x4a57d2,_0x48e449),_0x4879d9[_0x3f00bc]=_0x4a57d2):_0x4a57d2=_0x3162e9,_0x4a57d2;},iii1II(_0x4879d9,_0x598d7f);}let li1i1l=[0x3b9fce4f];if(process['env'][llI11l(0x1dd,'#an(')]){if(process[llI11l(0x21e,'PPLJ')]['jd_shopDraw_venderId'][llI11l(0x23a,'8RP4')]('|'))li1i1l=[...process[llI11l(0x1f0,'KvvG')]['jd_shopDraw_venderId']['split']('|'),...li1i1l];else process['env']['jd_shopDraw_venderId']['includes']('@')?li1i1l=[...process[llI11l(0x264,'$5bR')]['jd_shopDraw_venderId'][llI11l(0x20b,'s!*]')]('@'),...li1i1l]:li1i1l=[...process[llI11l(0x213,'A^ny')][llI11l(0x291,'a@*4')]['split']('&'),...li1i1l];}let II1i1='';const lI1lll=llI11l(0x1e0,'A2op');!(async()=>{const i1iii=llI11l,Ill1I={'soiph':function(i11iiI,lIli11){return i11iiI==lIli11;},'whjsQ':i1iii(0x2cd,'k5^d'),'cIqLs':i1iii(0x1d0,'8RP4'),'Fjlfu':'https://bean.m.jd.com/bean/signIndex.action','cwwCf':i1iii(0x220,'Geoi'),'vKLBb':function(lllI1I,lillI1){return lllI1I<lillI1;},'LOjaD':i1iii(0x235,'8y6r'),'gtAto':function(IlIlii,i1l1i1){return IlIlii===i1l1i1;},'txjEz':'gnyts','VzCFN':function(liil11,iiillI){return liil11(iiillI);},'jhADp':function(l1l111,l1iIII){return l1l111+l1iIII;},'MPkgo':function(llI1I1){return llI1I1();}};if(li1i1l[i1iii(0x20f,'CwaN')]<=0x0){$[i1iii(0x1c9,'Frzv')](i1iii(0x1d0,'8RP4'));return;}if(!llI1Ii[0x0]){$[i1iii(0x26b,'8RP4')]($['name'],i1iii(0x2a7,'M@uf'),Ill1I[i1iii(0x2b0,'#j[J')],{'open-url':Ill1I[i1iii(0x257,'KrY%')]});return;}console['log'](Ill1I[i1iii(0x226,'ghXH')]+li1i1l);for(let IlIlil=0x0;Ill1I['vKLBb'](IlIlil,llI1Ii[i1iii(0x25c,'j9cy')]);IlIlil++){if(Ill1I[i1iii(0x272,'MnzH')]==='FfXZZ'){if(Ill1I['soiph'](typeof l1l11i,Ill1I['whjsQ']))try{return IilIl1[i1iii(0x285,'#j[J')](lIII1l);}catch(II1il){return lilIl['log'](II1il),IilIlI[i1iii(0x2d1,'MnzH')](iIli11['name'],'',i1iii(0x2ca,'X%E#')),[];}}else{if(llI1Ii[IlIlil]){if(Ill1I[i1iii(0x206,'P5kP')](Ill1I[i1iii(0x273,'8y6r')],i1iii(0x1c5,'#j[J'))){l1i11I[i1iii(0x28a,'Geoi')](Ill1I[i1iii(0x292,'M@uf')]);return;}else{lllI1i=llI1Ii[IlIlil],$[i1iii(0x234,'8RP4')]=Ill1I['VzCFN'](decodeURIComponent,lllI1i[i1iii(0x1e1,'KrY%')](/pt_pin=([^; ]+)(?=;?)/)&&lllI1i[i1iii(0x240,'CwaN')](/pt_pin=([^; ]+)(?=;?)/)[0x1]),$[i1iii(0x1a9,')tRF')]=IlIlil+0x1,$[i1iii(0x2b6,'B]y&')]=!![],$[i1iii(0x28e,'PEsx')]='',message='',console[i1iii(0x27e,'8y6r')](Ill1I[i1iii(0x2bc,'Geoi')](i1iii(0x19f,'#an(')+$[i1iii(0x27a,'d[dF')]+'】',$[i1iii(0x2a8,'H%7a')]||$[i1iii(0x23c,')G9%')])+'\x0a');if(!$[i1iii(0x2a2,'P$08')]){$[i1iii(0x1d2,'VxH7')]($[i1iii(0x1b8,'wkJG')],'【提示】cookie已失效','京东账号'+$['index']+'\x20'+($['nickName']||$[i1iii(0x2a1,']^2$')])+i1iii(0x1e4,'wkJG'),{'open-url':Ill1I[i1iii(0x260,'s!*]')]});$['isNode']()&&await ii1iil[i1iii(0x1b2,'d[dF')]($[i1iii(0x288,'8y6r')]+i1iii(0x1cc,'PEsx')+$[i1iii(0x2bd,'PPLJ')],i1iii(0x2cc,')G9%')+$[i1iii(0x22a,'wkJG')]+'\x20'+$[i1iii(0x243,'KvvG')]+'\x0a请重新登录获取cookie');continue;}$['UA']=i11iii[i1iii(0x1e8,'($6Q')]($[i1iii(0x27b,'DIv!')]),await Ill1I[i1iii(0x1d8,'dZiK')](iIiII);}}}}if(II1i1){if($[i1iii(0x228,'JSbr')]())await ii1iil[i1iii(0x1ed,'KrY%')](''+$[i1iii(0x24c,'KvvG')],''+II1i1);$[i1iii(0x248,'dlE3')]($['name'],'',II1i1);}})()[llI11l(0x215,'A2op')](I1lIll=>{const I1llIi=llI11l;$[I1llIi(0x277,'ghXH')]('','❌\x20'+$[I1llIi(0x192,'PPLJ')]+I1llIi(0x223,'Pcu^')+I1lIll+'!','');})[llI11l(0x28d,'s!*]')](()=>{const IIii1I=llI11l;$[IIii1I(0x1d4,'X%E#')]();});async function iIiII(){const llI11i=llI11l,I1lIli={'lPikG':llI11i(0x1c6,'#an('),'UXKBS':llI11i(0x1fd,'j9cy'),'vDkCw':function(II1ii,IIIIII){return II1ii+IIIIII;},'yroiW':llI11i(0x1e9,'M@uf'),'MgxMQ':function(lillII,ii1ilI){return lillII<ii1ilI;},'Enkdr':llI11i(0x27f,'PPLJ'),'hvpnU':function(lI1ll1,iIiI1){return lI1ll1==iIiI1;},'UgaJB':function(liil1I,i11ii1){return liil1I===i11ii1;},'pNkFM':function(IlIliI){return IlIliI();},'PhToH':function(l1iII1,iiill1){return l1iII1===iiill1;},'BWpKB':llI11i(0x297,'gImx'),'PRMJa':function(lIli1i){return lIli1i();},'DcRKl':llI11i(0x1ee,'PEsx')};for(let IIIII1=0x0;I1lIli[llI11i(0x261,'KrY%')](IIIII1,li1i1l['length']);IIIII1++){if('HkDFJ'===I1lIli['Enkdr']){lilIli['msg'](Iliili['name'],I1lIli['lPikG'],I1lIli[llI11i(0x286,'MnzH')],{'open-url':I1lIli[llI11i(0x279,'dZiK')]});return;}else console[llI11i(0x22f,'JSbr')](llI11i(0x19d,'^ZmY')+(IIIII1+0x1)+llI11i(0x2a4,'Frzv')+li1i1l[IIIII1]),$[llI11i(0x195,'$5bR')]=li1i1l[IIIII1],await iil1lI(),await $[llI11i(0x214,'gImx')](0x1f4),I1lIli[llI11i(0x1ec,'VxH7')]($[llI11i(0x1a6,'gImx')],0x1)&&(I1lIli[llI11i(0x1bb,'j9cy')](llI11i(0x2be,'B]y&'),'EpEZB')?await I1lIli['pNkFM'](iiiliI):l1i111[llI11i(0x18d,'zjAi')]()),await $[llI11i(0x2b9,'KrY%')](0x1f4),$[llI11i(0x1cf,'KrY%')]!=0x2?I1lIli[llI11i(0x269,'PEsx')]('bAdsh',I1lIli['BWpKB'])?await I1lIli[llI11i(0x1de,'Frzv')](li1i1I):lliil1['log'](I1lIli[llI11i(0x25f,'PPLJ')](I1lIli[llI11i(0x26a,'wkJG')]+IIllI['result'][llI11i(0x1e7,')HGn')],'\x0a')):console[llI11i(0x1f2,'P5kP')](I1lIli['DcRKl']);}}async function iil1lI(){const i1iIi1=llI11l,llI1II={'XwVaS':function(lillIi,illIi1){return lillIi!==illIi1;},'vkIec':'hmdYq','hzPdy':'hzeLK','RwWDC':'RTLMI','JIkWJ':function(ii1ili,liil1i){return ii1ili===liil1i;},'eHqDO':i1iIi1(0x217,'DIv!'),'PVeGX':function(lI1lil,i1l1iI){return lI1lil!==i1l1iI;},'VAiTE':i1iIi1(0x290,'P$08'),'fNFDA':'object','qPQZc':i1iIi1(0x267,'Pcu^'),'sjwTu':function(liil1l,lI1lii){return liil1l==lI1lii;},'OydRf':'kDOHo','vnXcu':'deUAv','ifhpr':i1iIi1(0x1e6,'[Plo'),'iujwi':i1iIi1(0x29d,'MnzH'),'hjSnB':i1iIi1(0x1da,'s!*]'),'DrfDm':'*/*','CkzFY':'keep-alive','ygOpX':i1iIi1(0x281,'8RP4')};sign=await i11iii[i1iIi1(0x24e,'H%7a')](llI1II['iujwi'],{'vendorId':$['venderId']});let lIli1l={'url':lI1lll+'?functionId=getSignInfo','headers':{'Host':i1iIi1(0x254,'#j[J'),'Content-Type':llI1II['hjSnB'],'Accept':llI1II[i1iIi1(0x1a0,'B]y&')],'Connection':llI1II['CkzFY'],'Cookie':lllI1i,'User-Agent':$['UA'],'Accept-Language':llI1II[i1iIi1(0x1e3,'^ZmY')],'Accept-Encoding':i1iIi1(0x287,'Ek0s')},'body':''+sign};return new Promise(Iiili1=>{const I11i1I=i1iIi1,Iil1l1={'qIyqc':function(i1i11I,il1iIl){const l1l1il=iii1II;return llI1II[l1l1il(0x231,'a@*4')](i1i11I,il1iIl);}};llI1II['vnXcu']===llI1II[I11i1I(0x1a4,'^60E')]?IiiIll[I11i1I(0x1dc,'VxH7')](IIlii):$[I11i1I(0x29f,'P$08')](lIli1l,(il1iIi,iii1il,II11li)=>{const iliIi1=I11i1I,I1l11i={'wNIHt':function(iIIiiI){return iIIiiI();}};if(llI1II[iliIi1(0x22c,')tRF')](llI1II[iliIi1(0x249,'CwaN')],iliIi1(0x1b0,'Frzv')))ll1l1['log'](IllIIi);else try{if(llI1II[iliIi1(0x1bc,')G9%')]===llI1II[iliIi1(0x270,')tRF')])Iil1l1[iliIi1(0x1fa,'^60E')](I1l1Il[iliIi1(0x2b3,'PEsx')],0x0)&&(Illl1i[iliIi1(0x2bf,'a@*4')]=lIIiil['result'][iliIi1(0x20e,'MnzH')][iliIi1(0x1f8,'PPLJ')]);else{if(il1iIi)llI1II['JIkWJ'](llI1II[iliIi1(0x29c,']^2$')],iliIi1(0x193,'#j[J'))?I1l11i[iliIi1(0x2ce,'1lR8')](lIIill):$[iliIi1(0x1c9,'Frzv')](il1iIi);else{if(llI1II[iliIi1(0x2b1,'^60E')](llI1II[iliIi1(0x25d,'d[dF')],llI1II[iliIi1(0x2ac,'8RP4')]))lIIili[iliIi1(0x282,'KvvG')]('抽奖结果：💨\x20\x20空气\x0a');else{II11li=JSON[iliIi1(0x1db,'($6Q')](II11li);if(typeof II11li==llI1II[iliIi1(0x29b,'#j[J')]){if(llI1II[iliIi1(0x252,'1lR8')](iliIi1(0x230,'j9cy'),llI1II['qPQZc']))llI1II[iliIi1(0x29e,'8y6r')](II11li['code'],0x0)&&($[iliIi1(0x2c4,'wkJG')]=II11li[iliIi1(0x200,'#j[J')][iliIi1(0x1c1,')HGn')][iliIi1(0x2d0,'j9cy')]);else return illIli[iliIi1(0x199,'B]y&')](l11i1l);}else{}}}}}catch(i1l1II){llI1II['XwVaS'](llI1II[iliIi1(0x1b1,'JSbr')],llI1II[iliIi1(0x2a9,'j9cy')])?Ii1iIl=[...iliIIi['env'][iliIi1(0x20a,'A2op')][iliIi1(0x232,'$5bR')]('|'),...ill11I]:$['log'](i1l1II);}finally{Iiili1();}});});}async function iiiliI(){const l1l1ii=llI11l,I1l11l={'mCJbj':function(i1l1Il,llIli){return i1l1Il!==llIli;},'ljxta':'BOMPT','EEpxr':l1l1ii(0x1ae,'gImx'),'JiZaV':function(i1i11l,i1i11i){return i1i11l===i1i11i;},'SCNIR':l1l1ii(0x237,'M@uf'),'jJiMP':l1l1ii(0x1b9,'ghXH'),'aRdGq':function(II11l1,Iil1lI){return II11l1+Iil1lI;},'DFkoG':l1l1ii(0x2a5,'B]y&'),'vCRhd':l1l1ii(0x1b5,'KrY%'),'sHBLn':l1l1ii(0x24d,'VxH7'),'nTPnB':l1l1ii(0x204,'JSbr'),'HlpTB':l1l1ii(0x1d7,'X%E#'),'Vhjrl':l1l1ii(0x2c9,'d[dF'),'PwOES':l1l1ii(0x25a,'KrY%')};sign=await i11iii[l1l1ii(0x2cb,'^ZmY')]('signActivityRule',{'vendorId':$[l1l1ii(0x21f,'P5kP')]});let lilIIi={'url':lI1lll+'?functionId=signActivityRule','headers':{'Host':l1l1ii(0x196,'PPLJ'),'Content-Type':I1l11l[l1l1ii(0x1df,'s!*]')],'Accept':l1l1ii(0x1fe,'A2op'),'Connection':I1l11l[l1l1ii(0x21b,'Frzv')],'Cookie':lllI1i,'User-Agent':$['UA'],'Accept-Language':l1l1ii(0x2c7,'PPLJ'),'Accept-Encoding':I1l11l['PwOES']},'body':''+sign};return new Promise(IiiliI=>{const Ii1iii=l1l1ii,iii1iI={'PMrEn':'账号未登录\x0a'};I1l11l['nTPnB']===I1l11l['nTPnB']?$['post'](lilIIi,(llIll,il1iII,iilli)=>{const Il1i1I=iii1II,IlllIl={'ZQphM':Il1i1I(0x222,'wkJG')};if(Il1i1I(0x238,'X%E#')!=='FhUXU')liliI['log'](Il1i1I(0x1b6,'wkJG'));else try{if(I1l11l[Il1i1I(0x2b8,')G9%')](I1l11l[Il1i1I(0x19e,'M@uf')],I1l11l[Il1i1I(0x191,'^ZmY')])){if(llIll)I1l11l[Il1i1I(0x1fb,'B]y&')](I1l11l['SCNIR'],Il1i1I(0x18f,'VyT#'))?$['log'](llIll):IiiIii[Il1i1I(0x1a1,')G9%')](iii1iI[Il1i1I(0x262,'$Wz4')]);else{if(I1l11l[Il1i1I(0x207,'JSbr')](Il1i1I(0x203,'VyT#'),'Kwdqa')){iilli=JSON[Il1i1I(0x299,')tRF')](iilli);if(typeof iilli==I1l11l[Il1i1I(0x18c,'$Wz4')])iilli['code']==0x0&&console['log'](I1l11l[Il1i1I(0x1f5,'8y6r')](I1l11l[Il1i1I(0x1bf,'MnzH')](I1l11l[Il1i1I(0x25e,'CwaN')],iilli[Il1i1I(0x1b4,'a@*4')][Il1i1I(0x280,'VyT#')]),'\x0a'));else{}}else Iliiii=[...i1illI[Il1i1I(0x259,'8y6r')][Il1i1I(0x1d9,'k5^d')]['split']('@'),...i1IIl];}}else{if(i1lI['env']['jd_shopDraw_venderId']['includes']('|'))lilIii=[...i1ill1[Il1i1I(0x209,'CwaN')][Il1i1I(0x1a8,'s!*]')][Il1i1I(0x1fc,'#an(')]('|'),...iIIl1l];else i1l1li['env'][Il1i1I(0x27c,'MnzH')][Il1i1I(0x1ff,'P5kP')]('@')?llIli1=[...iliIII[Il1i1I(0x22e,'M@uf')][Il1i1I(0x1a8,'s!*]')]['split']('@'),...iIIl1i]:I1lllI=[...ill111[Il1i1I(0x2c5,'H%7a')]['jd_shopDraw_venderId'][Il1i1I(0x1e2,')HGn')]('&'),...Iliil1];}}catch(iIIiii){if(I1l11l[Il1i1I(0x25b,'DIv!')](I1l11l[Il1i1I(0x1a7,'VyT#')],Il1i1I(0x1ad,'A^ny')))return lI11II[Il1i1I(0x1f9,'Ek0s')](l1llI1),llIIll[Il1i1I(0x2ad,')G9%')](IillIi[Il1i1I(0x2ab,'M@uf')],'',IlllIl[Il1i1I(0x208,'X%E#')]),[];else $['log'](iIIiii);}finally{I1l11l[Il1i1I(0x202,'^60E')](I1l11l[Il1i1I(0x24b,'X%E#')],Il1i1I(0x1c4,'A2op'))?IiiliI():I1i11i[Il1i1I(0x224,'CwaN')](I1i11l);}}):iIIl1I[Ii1iii(0x277,'ghXH')](I1iIli);});}async function li1i1I(){const iIIilI=llI11l,iIIiil={'wKBCc':'已经参与过活动~\x0a','QiiJw':function(I1iIIi){return I1iIIi();},'KzEUj':iIIilI(0x1b7,'dZiK'),'EkXuq':function(I1iIIl,lI1IIl){return I1iIIl===lI1IIl;},'gYtHw':iIIilI(0x24f,'a@*4'),'oNwvA':function(i1ilI,iii1lI){return i1ilI==iii1lI;},'ReEkq':'vrBRR','FhqFs':function(i1ilI1,Iiilii){return i1ilI1!==Iiilii;},'JQtfm':iIIilI(0x1aa,'dlE3'),'HHmCv':function(Iil1li,Iiilil){return Iil1li+Iiilil;},'ajtVy':iIIilI(0x241,'CwaN'),'uzNJk':iIIilI(0x2aa,'PPLJ'),'LQqHd':iIIilI(0x211,'dZiK'),'DmBgT':'vfhGF','GWpFM':function(Iil1ll,iillI){return Iil1ll===iillI;},'dAwNz':iIIilI(0x1b3,'zjAi'),'zjaXk':iIIilI(0x266,'Ek0s'),'dGUEu':iIIilI(0x23f,'#an('),'dwmCI':iIIilI(0x1d6,'PEsx'),'RnJLu':'application/x-www-form-urlencoded','Kuwzc':iIIilI(0x219,'MnzH'),'SQuea':iIIilI(0x246,'B#d4'),'yJcXs':iIIilI(0x2b7,'Geoi')};sign=await i11iii['getSign'](iIIilI(0x1c2,'Frzv'),{'vendorId':$[iIIilI(0x268,'8y6r')],'sourceRpc':iIIiil[iIIilI(0x1f4,'dZiK')]});let i1l1Ii={'url':lI1lll+iIIilI(0x1ab,'P$08'),'headers':{'Host':iIIiil[iIIilI(0x1a5,'KvvG')],'Content-Type':iIIiil[iIIilI(0x23e,'P5kP')],'Accept':iIIiil['Kuwzc'],'Connection':'keep-alive','Cookie':lllI1i,'User-Agent':$['UA'],'Accept-Language':iIIiil['SQuea'],'Accept-Encoding':iIIiil[iIIilI(0x1cd,'$Wz4')]},'body':''+sign};return new Promise(lI1III=>{const il1l1=iIIilI;il1l1(0x19b,'8RP4')===iIIiil[il1l1(0x2c8,'Frzv')]?i1illl[il1l1(0x27e,'8y6r')]('','❌\x20'+I1llil['name']+',\x20失败!\x20原因:\x20'+I1llii+'!',''):$[il1l1(0x23d,'6*lU')](i1l1Ii,(IllIiI,i1il1,I1l111)=>{const Ii1iil=il1l1,IIii1l={'iwkHi':iIIiil[Ii1iil(0x251,']^2$')],'LFdGG':function(I1iIII){return iIIiil['QiiJw'](I1iIII);},'ehtpU':iIIiil[Ii1iil(0x1a2,'ghXH')]};try{IllIiI?$['log'](IllIiI):iIIiil[Ii1iil(0x294,'B#d4')](iIIiil[Ii1iil(0x198,'zjAi')],Ii1iil(0x1eb,'^ZmY'))?II11I1['log'](IIii1l[Ii1iil(0x1e5,'P$08')]):(I1l111=JSON[Ii1iil(0x27d,'KrY%')](I1l111),iIIiil[Ii1iil(0x2b5,'CwaN')](typeof I1l111,iIIiil[Ii1iil(0x1d5,'^ZmY')])?iIIiil['EkXuq'](iIIiil[Ii1iil(0x233,'Ek0s')],'vrBRR')?I1l111['code']==0x0?iIIiil[Ii1iil(0x2b4,'8RP4')](iIIiil[Ii1iil(0x1d1,'gImx')],iIIiil[Ii1iil(0x218,'JSbr')])?IIlli[Ii1iil(0x296,'$5bR')](l1iil):I1l111['result'][Ii1iil(0x1f6,'j9cy')]?($[Ii1iil(0x255,'[Plo')]=I1l111[Ii1iil(0x1ca,'M@uf')][Ii1iil(0x289,'dlE3')][Ii1iil(0x242,'#j[J')]||'',console[Ii1iil(0x212,'s!*]')](iIIiil['HHmCv'](iIIiil['HHmCv'](iIIiil[Ii1iil(0x274,'Ek0s')],$[Ii1iil(0x227,'8y6r')]),Ii1iil(0x276,'#j[J')))):iIIiil[Ii1iil(0x2ae,'8y6r')]!=='scuAm'?IliI1l['log'](lliiil):console['log'](Ii1iil(0x284,'CwaN')):console[Ii1iil(0x1a1,')G9%')](iIIiil[Ii1iil(0x2cf,'P5kP')]):IIii1l['LFdGG'](llIlil):iIIiil[Ii1iil(0x26e,'H%7a')]===iIIiil[Ii1iil(0x21a,'B]y&')]?console['log'](Ii1iil(0x256,'Frzv')):l1lIil[Ii1iil(0x1cf,'KrY%')]=IiiIli['result'][Ii1iil(0x2a3,'[Plo')][Ii1iil(0x205,'6*lU')]);}catch(I1iII1){if(iIIiil['GWpFM'](Ii1iil(0x1a3,'Geoi'),iIIiil[Ii1iil(0x22d,'ghXH')]))$['log'](I1iII1);else{I1lliI=llIllI[Ii1iil(0x275,'A2op')](I1ilI1);if(typeof iillll==IIii1l[Ii1iil(0x18e,'DIv!')])IiiIl1['code']==0x0&&(II1liI['isSign']=IlI1i1[Ii1iil(0x197,'P5kP')]['signInfo'][Ii1iil(0x2d0,'j9cy')]);else{}}}finally{iIIiil[Ii1iil(0x29a,'X%E#')](lI1III);}});});}function Iii11l(){const iili1=(function(){return[...[iｉl,'lLljYUsHHjWiUaGmAyi.rAcSoBrmHqg.vfT7UtNB==','estcLW','thldImkdW5pdJCklWOdcGhRdSSkBqa','5OMA5AAv57QE5P+A77YI8yssUMmr56Iq5RgmaG','yKdcUmoiWRm','lqLRW4xcIq','DWO2hCkOaSorb8o/W57cOvJdJgrDbeG','qZNdGI8','W4pcO8k3FmkteY5wns4','oCkaW6a','WPP5W6HoAW','zmkmrSkwFSoPWR1rW5q','j8obW4RcMCk6FwO','z3xcQCoYEs3dLCor','AmkcWPBcHCoVimorW4pdQW','W6NdTmoJxmoO','oCoIkmkSW5/dKXjvomkFWP3cJqupj8ooWR7dG8oKW7y','x1BdLb7dVa','p8kjW5pcSSkn','a27cNsn1','5OQV5Aw357Iz5PYN77+m8l+YHYvg56Mi5RohW6G','cIHX','CCkXyae/','EutcS8oi','g1SwemoS','WRRcUSkzWROs','Dg/cJmo/WPC','W5hdV8kxW4JcQG','hZruW5tcS8kTWRX3W7pdP8oi','xJldMb7dNW','W4ZdN8o0xG','WOqIW7hcLKZdICke','W6hdHmkdW77cQ8o3W55D','W5xdG8olrCo5W7eD','h01mWQPghqRcPa','5lU65BMi6zoT5OQY5AwE77YA','5REy5yUV5AEt5zcZ77Y3','DdLYWPjrW7xdVmoA','44cS5O+p56AF44gd6k245yEc6iYJ5y+u5lQd5lUa6lAk5y+w5lU7reiKehlcO8kz55MP5O+35lYl55sXW5NcPXrkwqRNM5RKUBxKUP3NRAlLIlhOJ5BLJPu','p0ddUCoqnvVcRmkd','W5XDW5VcSmon','gSoloSowbG','uN7dIdC','W4P+WRe8W4W','WR1FW4W','wcldOqddGq','m8kaW7xcG8koW75h','veVcPSoDWQm','jIRdVCkyWRm','W6ZdISolW5vxisjudqlcOr0','ANpcRSo8','W5PxWQKUW7O','WOJcJtOWEq','WOO0W4NcNuRdLmkl','mSkvW67cTSodWR1lsaNcT8o7WQ/cNSoqA8kPW7K','WR1VW6f1CW','eb3cKrG','WOVXIRoMWRe','r8kcWP4','p8khW4BcGSkF','pmoBkSoLjCoFWRxdNq','WQy3W4dcQg8','oSo1jmk2W5ddKG','h8olW50OmcpdLdNcTmowWPBdOSor','cLJcJMpdHCoBW54tsKrKW4C','iCocWP/cJCoC','W4VdPSo2zmoW','WRi9yqnOWO8','neFdRa','oSoCdW','e8oaySoFcSoqWQVcLCoMlmoiz0NdRa','WQRcTxzxyW','W7/dO1dcHXZdUmoGWOT9W7e','6kYC5yIS6zM/5OE/5z2nWQCWW4JcHgBOVQxLHzxMOiZKVzNMLPtLHkFLRQzD5BML6k2A6ykF6l6+6isQ5P+j5y+t6i+S5yYvW5v2tmkiWRXg','WPxcTmobfmoIWRBcKq','5lM85lIW6lAn5y+G','W6JdMCoFBdj7','DSknAuGq','twdcKbeH','W7PxW6ZcI8omnq','fsjh','W4hcNmk5W7BcQa','nbbLWQO','WQvpWPOZW5O','W4WMyWr8','5RE55yMn5AEU5zgX77YJ','WRFcLmofp8o5','b8ojiSoY','qLtcQCoJWOC','W4NdHsHnqmk+','ecj4W73dHSkFWRVdJq','cmoyjSk5bSkqWRldNmklaCkCEW','C1tcKIWPaq','nYz/WOD5','WPmMW7FcGuG','rmkIi8ofDG','W4P4WRK+W4e','frNcIXNcLI8','5B+Y5AsA566z','uhxdNsBdRG','WOhJGjdKUOpKUQVOT7NLJ5W','WQC1W6pcTKa','WRXdW4W','hmohoSkArq','d8kNW6VcGmk+','hXRdSmkVWPK','gtZcNCoXWQW','ESkEybCV','W7qHCcb5'],...(function(){return[...['k8omW7VcI8k+FMnWWOWqbY7cTMjqWODrWQZcSSoq','aLqabSoX','W7JcGCkZsmkx','WOpdLSoYrmo9W6WAggRdItSolxBdUr4','xa7dJa','D8kLWQ5stG','vCkBqcyz','WRHiW7fpBW','WRJcSNnwEq','DHNdNGdcLW','W6FdO1VcK3/dTSo4WOTTW60','cJDNWOLF','iCoJbmkQW5VdIa','fGNcIbBcJW','5lM35lMs6l+M5zQ05lQj56QB5Psp5O6r','qCkMimobt8oS','WRuVxW8','omoFfCkQtmo6','s0NdLbZdOq','W4zdW57cQmoP','WRHwW7TZya','s8kuvbuN','ds/dVdNdO8o4W5Td','gqneW4dcQW','WRmZf8oYWP1hsI/cGa','WRhcJmoFW55WkWPu','WQpcTNbH','jN/dQ8o1fq','uY99WQj+','sfJcM8opWRG','44kB5O+q56sv44kM6kYO5ywJ6i655y6q5lMF5lUU6lsK5y235lIoWQ/cKI7cOSoJt8kl55Mu5OYA5lYT55Abg8o5rCkxWP7dKUEzRos5Ros4IUETMUwiNEIoR+wnJW','r8khjCoZkmorWRFdK8omb8oDFaC','z1lcGWGx','WRZcSha','tNRdLIFdO8o+','W4NcKmkjumkS','ANpcPCoYxINLTyRLPOxMLPihxCo0','W5lcNmkZW6pcIW','kfulcmoGW53dKSk6','dG/cQWxcNtu','5RAN5yQxWRem5lQe5A6V5z+w','wCkHCbq6','aSohWRe','WRiqWQ0CW6dcM8knWO0JW6pdMSk/efyfkCo5ySoNC8oplLG','WO/cVmkEWPu','WRNcQ8oWeSoH','AgZcO8k3wMldKSoqW7reh8k5','WORcO8kaWPWmWOy+W4tcP3PyhZlcMSoAW5vOESo5WPVdTXqDWPaAn8kMW5H6tmkhWRbh','y8kuiCodqW','W7hdICoYDJrZW5y9WPCoW4xcSrH1W6icW6VcPfvf','imoyW5tcLmk/CNjaWPCEhL7cUcPjWPrdW7pcNCoBvbvovmoLWOrfcK7cKfxdPem','W67cMSoKzJS','a8oBWRe','W6fKCmoeWRDeFGlcGCktDCoFEmkPWPmLWQZdUgpdPq','WOdcJvPfAq','cCoeW5tcRmku','vGLzWQzNWO3cHSkYoCoqAmkMgMBcHgtdHSkUA1NcSSkIWOyoW7RcNmkmeSoKW5aeW6/cLSkH','cH3cJa/cKG','WRhcLCouW5Ln','WOVcTSo6n8ot','W5hORRNPH7/ML5RNMBtLVRtOJ4JLJkKaW4i+WOFdR8oBoarNbb1sWQ4RWPqLW7LiW5tcJaCllSoEbNLHWPpdUchcMmk2W6qgdSoSDCkvWR0dbCohW6HP','W5xdH8oSySo3','j1nSWOTb','WQpcKSozW4jDaqLigHNcRHtdUJBdJJG','W7NcNSo4qb8','5Rsh5yQ35AEZ5zkt776v','xGxdJJBcKmkDW6u','WOdcLmoIpCob','b8ocWQBcPCoJ','fbNcLGJcTdqQnSkYW5m','5BE757Ut5yYi5lQx6l+W5Rw35yIqW4RdKa','WRBcTNT7Bxi','gcxcHG','gHpdVW','Bv7cHG','ymkzyXWfD8o1rIZcNa','sSkdh8oHwq','taRdIW3dMW','W7PxW6JcI8of','h2hcMX/dR8o7W6iPAq','amoBhmo+dmoq','Fb84','bZxdOCkUWOG','WQKUW5/cK3S','W7HWq8oEWQS','W7TqW4VcKSoyyCo3eSkbWO9KWRWvWQZdOcxcH8kPWQSuue8Ezx4CWO8FW5K4bmoFWP7cSxdcICouW7VcJf17W4iS','ffih','Af/cGJuWewy5','yetcUCooWRRdTG','ofRdLmouh18','gZ/dKSk9WOe','W4KvrJL8','CbhdLIVcVG','W4pdMrrptSk1','zKxcOc0Q','CWNdOdpcPW','WRhcGSkaWPGO','WOlcRtS','vbLYWQv8W5JdMCozkSobDSoxas3cGgtcJCk/tva','mSoyW4JcKCkI','pqZcRa7cOG','zSker8o+gCk7W6jQW4RcGGG9WPy','cZHhW6NcK8kKWRrr','WOVcPImHtmke','wmkzWOVcH8oOiG','6lsi5yYZ5P2G55UF5B25WPi','lCohW4m','s8kDWPS','zmkrBqy','xrXzWRv8'],...(function(){return['WRDjW59ZEexcUq','WPLxWQapW78','CZhdJJtcNa','uN4k','WQCQW4FcLxK','WOBcT319za','xXuEW7q9s1NcJSkvWOGRBbW','AcG+j8oN','dmogoq','D1tcJZ0Gb0OU','5RwU5yMhW47cGU+/Tq','p0JdT8oE','6kYS5yQX6zQ95OwL5zYNWQmqWODaW5NOV5NLHPBMO5NKVyBMLlVLHQ7LR7fS5BQc6k6D6yoA6l+c6iEJ5PYN5yYO6i6B5yYSWOWhcwRdLqy','b8on5AEi6lElWQDL5yY95zMPWPxcTq','WOVcRcO','WRznW4DKFa','nmokcmkmsq','FsRdHJddJW','ubpdTd3cLCkm','W5iqsZj4','WRiGvG93','bZb3W6VdH8kPWPFdMHtdOxVcJ8kgWQWYqq','m00YaSoA','m8o8cmkbvq','wxhdKW','vq/dNq','W7f9W7dcL8oN','imoSamklW4i','ftD6W7ddLW','qHuAbSo1','W4LmWR0AW4FcLSktW4C','EbBdLINdRa','eCoRW6lcSmkd','CLVdPb7dRG','WQ3cU8kLWQGW','WRXjyCorWRjtEG','W7vrWRSeW7ZcK8kBW5e','tNRdICoRWRtcN8ouWRVcNG','WOvFW45Lv1dcTCkE','W5RdHtrs','u1/cQXuW','W7HOqmohWObkFJBcRmkbA8oNymktWPuUWQtdRW','WORcOJKLua','5OMA5AAv57QE5P+A77YI','FedcP8oE','kdJcLCoaWQVcMCoqWRe','uwZdGG','xZ3dNd/dHSo7','pg3dQb5LW4/cGb1vW7hcQGaTCq','ib55WRXR','W53cUCk3','WPhcQaqJwW','uHjk','WPJcM8kYWRWl','eYRcNCox','imoXWOpcR8o6','nKZdRSoOeL3cRW','bSothCk0W5i','xhmQbCoKW4ddRa','W4pdVmkKW4/cHG','wCk0DMe3','WOFcHCoEWRtdNCoDW7v8C8oecq','C1hcO8kvWRVcRevHsfhcVmkp','pfzcWR5Q','5lM85lUd6l+d5zUr5lQo56M65PwS5O+/','irBcLaRcJW','W4BdHsa','sdBdMq','aaBcKrZdLNS6oSkYW4ycWRrZxSoaW5xcTG','WOPoWRqIW5K','W79bW5hcHCoFmW','W4ldH1ZcO3q','WQpcHsyPFW','h8oSjmouha','b8ocW4JcNSkJ','kHVcGchcQW','W7VcM8kIW77cLG','z8kohSoGDG','aYLG','w8krE8oclSokWOddM8oK','Arqnb8o+','zSkzWOJcM8oa','wZ3dGs7dJ8o9W7mU','wxtcNSo2FW','WQi8xqny','W7fmWR8','W6nrW4ZcIG','W6pdRs83meTAW5xcNuJdQW','futdMmoClW','W7mFW5PYWRVcTCkEpmo8CrpcKG','ou0Zj8ok','WQ4gW6frWRRdG8okW5qlW7xdICkIca','nb5kW6BcNG','wsddHq/dKa','CrORo8o9','tHXFWQvX','mVcxG7ZcSq','o8osga','W6H/b1O9W5LkWRPfW6COWRldPG','E8kCaCoMFW','W73dQfhcKKK','WPvuWOSXW4hdPSkPla','eJv/W7tcSSkLWQj6W6/dOmoqWPRdLKNcQ8knWQhcUmoCWQy','fX3cIH/cNW','qtFdIa','jSo5jmoIda','W6mvqZP5vSkwACoXdSkMWQyYE8kYma','W6zxW7uGW6JcMCknWO8YW4JcG8kRqrq'];}())];}())];}());Iii11l=function(){return iili1;};return Iii11l();};function illIii(iill1){const Ilil1i=llI11l,iii1l1={'hdZXv':'object','SCqEz':function(IIliIl,II11ll){return IIliIl==II11ll;},'wVqNn':function(liiI1I,ililII){return liiI1I+ililII;},'jfTtb':function(lI1II1,i1ilII){return lI1II1+i1ilII;},'NvIFj':Ilil1i(0x190,')HGn'),'ZpTbX':Ilil1i(0x241,'CwaN'),'JUCYr':Ilil1i(0x2ba,'$Wz4'),'xXaJc':function(iIIii1,IllIi1){return iIIii1==IllIi1;},'IJTDZ':Ilil1i(0x1c8,'P5kP'),'jfiaZ':function(lilIII,Ii1ilI){return lilIII===Ii1ilI;},'yZYBm':Ilil1i(0x1bd,'gImx'),'PCFHU':'请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie'};if(iii1l1[Ilil1i(0x21d,'Ek0s')](typeof iill1,Ilil1i(0x210,'Pcu^'))){if(iii1l1['IJTDZ']===iii1l1[Ilil1i(0x263,'dZiK')])try{return JSON[Ilil1i(0x247,'zjAi')](iill1);}catch(II11i1){if(iii1l1[Ilil1i(0x19a,'dZiK')](iii1l1[Ilil1i(0x1cb,'dlE3')],iii1l1['yZYBm']))return console[Ilil1i(0x1f1,'^60E')](II11i1),$[Ilil1i(0x244,'M@uf')]($['name'],'',iii1l1[Ilil1i(0x236,'s!*]')]),[];else{l1lIll=I1l1II['parse'](IIli1I);if(typeof I1i11I==iii1l1[Ilil1i(0x1af,')G9%')])iii1l1['SCqEz'](ilI1li['code'],0x0)&&Iillii[Ilil1i(0x2bb,'Pcu^')](iii1l1[Ilil1i(0x1c3,'H%7a')](iii1l1[Ilil1i(0x293,'Geoi')](iii1l1[Ilil1i(0x2c2,'VxH7')],IlI1iI['result'][Ilil1i(0x22b,'$5bR')]),'\x0a'));else{}}}else IIll1[Ilil1i(0x245,'8y6r')]['isWin']?(Illl1I[Ilil1i(0x229,'VyT#')]=lliiiI[Ilil1i(0x19c,'KrY%')][Ilil1i(0x1f3,'gImx')][Ilil1i(0x221,'H%7a')]||'',lilil[Ilil1i(0x258,'6*lU')](iii1l1[Ilil1i(0x2c3,'P$08')](iii1l1[Ilil1i(0x1ba,'M@uf')](iii1l1[Ilil1i(0x20c,'KrY%')],ll1ll['Prize']),iii1l1[Ilil1i(0x28b,')G9%')]))):Illl11[Ilil1i(0x1dc,'VxH7')](Ilil1i(0x295,'#j[J'));}}var version_ = 'jsjiami.com.v7';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
