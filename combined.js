/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};
Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}}
return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);}
if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);}
if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);}
if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);}
if(x.hour||x.hours){this.addHours(x.hour||x.hours);}
if(x.month||x.months){this.addMonths(x.month||x.months);}
if(x.year||x.years){this.addYears(x.year||x.years);}
if(x.day||x.days){this.addDays(x.day||x.days);}
return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");}
return true;};Date.validateMillisecond=function(n){return Date._validate(n,0,999,"milliseconds");};Date.validateSecond=function(n){return Date._validate(n,0,59,"seconds");};Date.validateMinute=function(n){return Date._validate(n,0,59,"minutes");};Date.validateHour=function(n){return Date._validate(n,0,23,"hours");};Date.validateDay=function(n,year,month){return Date._validate(n,1,Date.getDaysInMonth(year,month),"days");};Date.validateMonth=function(n){return Date._validate(n,0,11,"months");};Date.validateYear=function(n){return Date._validate(n,1,9999,"seconds");};Date.prototype.set=function(config){var x=config;if(!x.millisecond&&x.millisecond!==0){x.millisecond=-1;}
if(!x.second&&x.second!==0){x.second=-1;}
if(!x.minute&&x.minute!==0){x.minute=-1;}
if(!x.hour&&x.hour!==0){x.hour=-1;}
if(!x.day&&x.day!==0){x.day=-1;}
if(!x.month&&x.month!==0){x.month=-1;}
if(!x.year&&x.year!==0){x.year=-1;}
if(x.millisecond!=-1&&Date.validateMillisecond(x.millisecond)){this.addMilliseconds(x.millisecond-this.getMilliseconds());}
if(x.second!=-1&&Date.validateSecond(x.second)){this.addSeconds(x.second-this.getSeconds());}
if(x.minute!=-1&&Date.validateMinute(x.minute)){this.addMinutes(x.minute-this.getMinutes());}
if(x.hour!=-1&&Date.validateHour(x.hour)){this.addHours(x.hour-this.getHours());}
if(x.month!==-1&&Date.validateMonth(x.month)){this.addMonths(x.month-this.getMonth());}
if(x.year!=-1&&Date.validateYear(x.year)){this.addYears(x.year-this.getFullYear());}
if(x.day!=-1&&Date.validateDay(x.day,this.getFullYear(),this.getMonth())){this.addDays(x.day-this.getDate());}
if(x.timezone){this.setTimezone(x.timezone);}
if(x.timezoneOffset){this.setTimezoneOffset(x.timezoneOffset);}
return this;};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.prototype.isLeapYear=function(){var y=this.getFullYear();return(((y%4===0)&&(y%100!==0))||(y%400===0));};Date.prototype.isWeekday=function(){return!(this.is().sat()||this.is().sun());};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth());};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1});};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()});};Date.prototype.moveToDayOfWeek=function(day,orient){var diff=(day-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};Date.prototype.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000);};Date.prototype.getWeekOfYear=function(firstDayOfWeek){var y=this.getFullYear(),m=this.getMonth(),d=this.getDate();var dow=firstDayOfWeek||Date.CultureInfo.firstDayOfWeek;var offset=7+1-new Date(y,0,1).getDay();if(offset==8){offset=1;}
var daynum=((Date.UTC(y,m,d,0,0,0)-Date.UTC(y,0,1,0,0,0))/86400000)+1;var w=Math.floor((daynum-offset+7)/7);if(w===dow){y--;var prevOffset=7+1-new Date(y,0,1).getDay();if(prevOffset==2||prevOffset==8){w=53;}else{w=52;}}
return w;};Date.prototype.isDST=function(){console.log('isDST');return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D";};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST());};Date.prototype.setTimezoneOffset=function(s){var here=this.getTimezoneOffset(),there=Number(s)*-6/10;this.addMinutes(there-here);return this;};Date.prototype.setTimezone=function(s){return this.setTimezoneOffset(Date.getTimezoneOffset(s));};Date.prototype.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r[0]+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};Date.prototype.getDayName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()];};Date.prototype.getMonthName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()];};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(format){var self=this;var p=function p(s){return(s.toString().length==1)?"0"+s:s;};return format?format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(format){switch(format){case"hh":return p(self.getHours()<13?self.getHours():(self.getHours()-12));case"h":return self.getHours()<13?self.getHours():(self.getHours()-12);case"HH":return p(self.getHours());case"H":return self.getHours();case"mm":return p(self.getMinutes());case"m":return self.getMinutes();case"ss":return p(self.getSeconds());case"s":return self.getSeconds();case"yyyy":return self.getFullYear();case"yy":return self.getFullYear().toString().substring(2,4);case"dddd":return self.getDayName();case"ddd":return self.getDayName(true);case"dd":return p(self.getDate());case"d":return self.getDate().toString();case"MMMM":return self.getMonthName();case"MMM":return self.getMonthName(true);case"MM":return p((self.getMonth()+1));case"M":return self.getMonth()+1;case"t":return self.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return self.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return"";}}):this._toString();};
Date.now=function(){return new Date();};Date.today=function(){return Date.now().clearTime();};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this;};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this;};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this;};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var c={};c[this._dateElement]=this;return Date.now().add(c);};Number.prototype.ago=function(){var c={};c[this._dateElement]=this*-1;return Date.now().add(c);};(function(){var $D=Date.prototype,$N=Number.prototype;var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),de;var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
return this.moveToDayOfWeek(n,this._orient);};};for(var i=0;i<dx.length;i++){$D[dx[i]]=$D[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};for(var j=0;j<mx.length;j++){$D[mx[j]]=$D[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$D[de]=$D[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ");};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};Date.Grammar={};Date.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=((s.length==3)?Date.getMonthNumberFromName(s):(Number(s)-1));};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];var now=new Date();this.year=now.getFullYear();this.month=now.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
if(this.now){return new Date();}
var today=Date.today();var method=null;var expression=!!(this.days!=null||this.orient||this.operator);if(expression){var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";gap=(Date.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
if(this.unit=="week"){this.unit="day";this.value=this.value*7;}
this[this.unit+"s"]=this.value*orient;}
return today.add(this);}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour;}
if(this.weekday&&!this.day){this.day=(today.addDays((Date.getDayNumberFromName(this.weekday)-today.getDay()))).getDate();}
if(this.month&&!this.day){this.day=1;}
return today.set(this);}}};var _=Date.Parsing.Operators,g=Date.Grammar,t=Date.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=Date.CultureInfo.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken(Date.CultureInfo.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.mm,g.ss],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[Date.CultureInfo.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw Date.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};}());Date._parse=Date.parse;Date.parse=function(s){var r=null;if(!s){return null;}
try{r=Date.Grammar.start.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};Date.getParseFunction=function(fx){var fn=Date.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};Date.parseExact=function(s,fx){return Date.getParseFunction(fx)(s);};
var myWonderApp = myWonderApp || {};

var currentTime;
var locationFieldToSet;
myWonderApp.EmptyFields = function() {
}
myWonderApp.EmptyFields.prototype.getTodaysDate = function() {
    progressMessage.setProgressMessage("The start date was left empty, assuming 0:00 today")

    return Date.today().toString('yyyy-M-dd');
}
myWonderApp.EmptyFields.prototype.getTomorrowsDate = function() {
    progressMessage.setProgressMessage("The end date was left empty, assuming 0:00 tomorrow")

    return Date.parse('tomorrow').toString('yyyy-M-dd');
}
myWonderApp.EmptyFields.prototype.getMyLocation = function(callback) {
    progressMessage.setProgressMessage("Getting your current location");
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(callback, this.handleErrorsCallback, {
            enableHighAccuracy: true
        })
    }
}
myWonderApp.EmptyFields.prototype.handleErrorsCallback = function(error) {
    switch (error.code)
    {
        case error.PERMISSION_DENIED:
            progressMessage.setProgressMessage("You denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            progressMessage.setProgressMessage("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            progressMessage.setProgressMessage("The request to get your location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            progressMessage.setProgressMessage("An unknown error occurred, while getting your location");
            break;
    }
}
Function.prototype.prependArg = function(arg) {
    var func = this;

    return function() {
        var newargs = [arg];
        for (var i = 0; i < arguments.length; i++)
            newargs.push(arguments[i]);
        return func.apply(this, newargs);
    };
};var myWonderApp = myWonderApp || {};

var clientId// = '139949732944';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey// = 'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes// = 'https://www.googleapis.com/auth/plus.me';
var callerClass;
var callerMethod;
var parametersToCallerMethod;
myWonderApp.GoogleAuthenticationWrapper = function(client_id, api_key, api_scope, caller_class, caller_method,parameters_to_caller_method) {
    "use strict"
    clientId = client_id;
    apiKey = api_key;
    scopes = api_scope;
    callerClass = caller_class;
    callerMethod = caller_method;
    parametersToCallerMethod = parameters_to_caller_method;
    progressMessage.setProgressMessage("initialize the google authentication wrapper");
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleClientLoad = function() {
    progressMessage.setProgressMessage("set the google authentication api key");
//    console.log('handleClientLoad: ');
    gapi.client.setApiKey(apiKey);
    window.setTimeout(this.checkAuth, 1);
}
myWonderApp.GoogleAuthenticationWrapper.prototype.checkAuth = function() {
    progressMessage.setProgressMessage("check google authentication");
//    console.log('checkAuth: ');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthResult);
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthResult = function(authResult) {
    progressMessage.setProgressMessage("handle authentication result " + JSON.stringify(authResult));
    authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
//        console.log('handleAuthResult: ' + JSON.stringify(authResult));
//        console.log("database start date: " + myWonderApp.CalendarWrapper.prototype.getStartDate());
//        authorizeButton.style.visibility = 'hidden';
        callerMethod.call(callerClass,parametersToCallerMethod);
    } else {
//        console.log("else")
//        authorizeButton.style.visibility = '';
//        authorizeButton.onclick = handleAuthClick;
        myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthClick();
    }
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthClick = function(event) {
//    console.log('handleAuthClick: ');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
    return false;
}
var myWonderApp = myWonderApp || {};

var eventList = null;
var allLocations = null;
var startDate = null;
var endDate = null;
var todoItemsForLocation = null;
myWonderApp.CalendarWrapper = function() {
    progressMessage.setProgressMessage("initialize the google calendar wrapper");
//    eventList = null;
}
myWonderApp.CalendarWrapper.prototype.setEventsList = function(result) {
    progressMessage.setProgressMessage("set the events lists");
//    console.log('setEventsList');
    eventList = result;
}
myWonderApp.CalendarWrapper.prototype.getEventsList = function() {
    progressMessage.setProgressMessage("get the events lists");
//    console.log('getEventsList');
    return eventList;
}
myWonderApp.CalendarWrapper.prototype.getEventsListAPICall = function() {

//    console.log('getEventsListAPICall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('plus', 'v1', function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google plus api call");
//            console.log("request.execute: " + JSON.stringify(resp));

            me.setEventsList(resp.displayName);
        });
    });
//    this.setEventsList(
//    {
//        "kind": "calendar#events",
//        "etag": 'etag',
//        "summary": 'string',
//        "description": 'string',
//        "updated": 'datetime',
//        "timeZone": 'string',
//        "accessRole": 'string',
//        "defaultReminders": [
//            {
//                "method": 'string',
//                "minutes": 'integer'
//            }
//        ],
//        "nextPageToken": 'string',
//        "items": [
//            'events Resource'
//                ]
//    });
}
myWonderApp.CalendarWrapper.prototype.getEventsListCallendarAPICall = function() {
    "use strict"
//    console.log('getEventsListCallendarAPICall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary'
        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google calendar api call");
//            console.log("request.execute: " + JSON.stringify(resp.items[0].summary));
            me.setEventsList(resp.items[0].summary);
//            me.setEventsList(resp.displayName);
        });
    });

}
myWonderApp.CalendarWrapper.prototype.getTaskListCall = function() {
    "use strict"
//    console.log('getTaskListCall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('tasks', 'v1', function() {
        var request = gapi.client.tasks.tasklists.list();//{
//            'tasklist': 'primary'
//        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google tasks api call");
//            console.log("request.execute: " + JSON.stringify(resp));//.items[0].summary));
            me.setEventsList(resp.items[0].title);
//            me.setEventsList(resp.displayName);
        });
    });
}

myWonderApp.CalendarWrapper.prototype.getTasksCallAPI = function() {
    "use strict"
//    console.log('getTasksCallAPI: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('tasks', 'v1', function() {
        var request = gapi.client.tasks.tasks.list(
//                {'tasklist':'MTM5Njc5MDM2ODE5NzAyNzg2MzE6MDow'});//{
                {'tasklist': '@default'
                });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google tasks api call");
//            console.log("request.execute: " + JSON.stringify(resp));//.items[0].summary));
            me.setEventsList(resp.items[0].title);
//            me.setEventsList(resp.displayName);
        });
    });
}

//This is an interface function
myWonderApp.CalendarWrapper.prototype.getAllTodoLocationsAsArray = function(callback, callerObjRef) {
    "use strict"

    var me = this;
//    progressMessage.setProgressMessage("get all to do locations as an array");
//    console.log("getAllTodoLocationsAsArray: " + me.getEndDate() + " " + me.getStartDate());
    var arrayAllLocations = [];
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMax': me.getEndDate(),
            'timeMin': me.getStartDate()
        });
        request.execute(function(resp) {
            if (!resp.items) {
                progressMessage.setProgressMessage("no items were found in your calendar" + JSON.stringify(resp));
                return;
//                throw("getAllTodoLocationsAsArray no items were found in your calendar" + JSON.stringify(resp));
            }
            progressMessage.setProgressMessage("get all to do locations as an array" + resp.items.length);
//            console.log("request.execute: " + resp.items.length);
            for (var i = 0; i < resp.items.length; i++) {
                if (!resp.items[i].location) {
                    progressMessage.setProgressMessage("there was no location set for " + JSON.stringify(resp.items[i]));
//                    throw ("there was no location set for " + JSON.stringify(resp.items[i]));
                } else {
                    arrayAllLocations = arrayAllLocations.concat(resp.items[i].location.split(','));
                }
            }
//            if ((callback && typeof(callback) === "function")) {
//              rely on google to deal with types duplicates
            me.setArrayAllTodoLocations(arrayAllLocations);
            callback.call(callerObjRef);
//            }
        });
    });
}
//This is an interface function
myWonderApp.CalendarWrapper.prototype.setArrayAllTodoLocations = function(locs) {
    "use strict"
    progressMessage.setProgressMessage("set an array of all to do locations " + locs);
//    console.log("setArrayAllTodoLocations: " + locs);
    allLocations = locs;
}
//This is an interface function
myWonderApp.CalendarWrapper.prototype.getAllTodoLocationsAsArrayGenerated = function() {
    "use strict"
    progressMessage.setProgressMessage("get an array of all to do locations");
//    console.log("getAllTodoLocationsAsArrayGenerated :" + allLocations);
    return allLocations;
}
myWonderApp.CalendarWrapper.prototype.setStartDate = function(date) {
    "use strict"
    progressMessage.setProgressMessage("set the start date");
//    console.log("setStartDate: " + date);
    this.startDate = new Date(date);
};
myWonderApp.CalendarWrapper.prototype.setEndDate = function(date) {
    progressMessage.setProgressMessage("set the end date");
    "use strict"
//    console.log("setEndDate: " + date);
    this.endDate = new Date(date);
}
myWonderApp.CalendarWrapper.prototype.getStartDate = function() {
    "use strict"
    progressMessage.setProgressMessage("get the start date");
//    console.log("getStartDate: " + startDate);
    return this.startDate;
};
myWonderApp.CalendarWrapper.prototype.getEndDate = function() {
    "use strict"
    progressMessage.setProgressMessage("get the end date");
//    console.log("getEndDate: " + endDate);
    return this.endDate;
}
myWonderApp.CalendarWrapper.prototype.searchTodoItems = function(key, callback, callerObjRef) {
    "use strict"

    var arrayAllTodoItemsForLocation = []

    var me = this;
//    console.log("searchTodoItems: " + me.getEndDate() + " " + me.getStartDate());
    me.setArrayAllTodoItemsForLocation(null);
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMax': me.getEndDate(),
            'timeMin': me.getStartDate()
        });
        request.execute(function(resp) {
//            console.log('searchTodoItems: ' + startDate + ' ' + endDate + ' ' + JSON.stringify(resp));
            if (!resp.items) {
                progressMessage.setProgressMessage("No items were found in your calendar " + JSON.stringify(resp));
//                throw("searchTodoItems no items were found in your calendar" + JSON.stringify(resp));
            }
            if (!(callback && typeof(callback) === "function")) {

                throw("the callback object provided is not a function");
            }
//            console.log("request.execute: " + resp.items.length + " " + JSON.stringify(resp.items));
            arrayAllTodoItemsForLocation.push(key, me.getSummaryAndDescriptionThatMatches(resp.items, key));
            me.setArrayAllTodoItemsForLocation(arrayAllTodoItemsForLocation);
            callback.call(callerObjRef, arrayAllTodoItemsForLocation);
        });
    });
};
myWonderApp.CalendarWrapper.prototype.searchTodoItemsKeyIsAnArray = function(keyArray, callback, callerObjRef) {
    "use strict"
    progressMessage.setProgressMessage("search to do items");
    for (var key in keyArray) {
        this.searchTodoItems(keyArray[key], callback, callerObjRef);
    }
}
myWonderApp.CalendarWrapper.prototype.getArrayAllTodoItemsForLocation = function() {
    "use strict"
    return todoItemsForLocation;
}
myWonderApp.CalendarWrapper.prototype.setArrayAllTodoItemsForLocation = function(todoItems) {
    "use strict"
    progressMessage.setProgressMessage("all to do items for locations");
    todoItemsForLocation = todoItems;
}
myWonderApp.CalendarWrapper.prototype.getSummaryAndDescriptionThatMatches = function(calendar_items, key) {
    if (calendar_items.length === 0) {
        return;
    }
    var pay_load = []

    for (var cal_itr = 0; cal_itr < calendar_items.length; cal_itr++) {
        if (calendar_items[cal_itr].location) {
            var locations = calendar_items[cal_itr].location.split(',');
            for (var loc_itr = 0; loc_itr < locations.length; loc_itr++) {
                if (locations[loc_itr] === key) {
//                console.log('locations: ' + locations[loc_itr] + ' ' + calendar_items[cal_itr].description + ' ' + calendar_items[cal_itr].summary);
                    pay_load.push({
                        'description': calendar_items[cal_itr].description,
                        'summary': calendar_items[cal_itr].summary
                    });
                }
            }
        }
    }
    progressMessage.setProgressMessage("get summary and description that matches");
    return JSON.stringify(pay_load);
}
google.maps.Map.prototype.markers = new Array();

google.maps.Map.prototype.addMarker = function(marker) {
    progressMessage.setProgressMessage("add to the  marker array");
    this.markers[this.markers.length] = marker;
};

google.maps.Map.prototype.getMarkers = function() {
    progressMessage.setProgressMessage("get a marker array");
    console.log("map.prototype.getmarker " + this.markers);
    return this.markers
};

google.maps.Map.prototype.clearMarkers = function() {
    progressMessage.setProgressMessage("clear all markers " + this.markers.length);
//    console.log('clearMarkers: ' + this.markers.length)
    for(var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};var myWonderApp = myWonderApp || {};
//https://developers.google.com/maps/articles/toomanymarkers

var infowindow = null;
var googleMap = null;
var wonderApp = null;
var marker = null;
var googleRequestDataStructure = null;
//not sure whether I really need to create a new array
//google.maps.Map.prototype.markers;

myWonderApp.PlaceWrapper = function(mapCanvas, database) {
    
    "use strict";
    
//    if (!(mapCanvas instanceof google.maps.Map)) {
//        progressMessage.setProgressMessage("map canvas is not an instance of google.maps.Map");
//        throw (" mapCanvas is not an instance of google.maps.Map");
//    }
//    if (database['searchTodoItemsKeyIsAnArray']!=='function') {
//        throw (" database does not have the searchTodoItemsKeyIsAnArray function defined ");
//    }
    infowindow = new google.maps.InfoWindow();
    googleMap = mapCanvas;
//    console.log("placeWrapper googleMap: " + googleMap)
    //not using 'this' because jasmine can't mock this.wonderapp
    wonderApp = database;
    //clear the array of places markers
    
//    console.log("create constructor");
    progressMessage.setProgressMessage("Initialization complete!");
};

myWonderApp.PlaceWrapper.prototype.getPlacesByBounds = function() {
    "use strict"
    progressMessage.setProgressMessage("get places by bounds");
//    if (!(boundingBox instanceof google.maps.LatLngBounds)) {
//        throw (" boundingBox is not an instance of google.maps.LatLngBounds");
//    }
//    if (!(arrayofLocations instanceof Array)) {
//        throw (" boundingBox is not an instance of Array");
//    }
    
    //var redmond = new google.maps.LatLng(47.69809670000001, -122.1545836);
    var request = this.getGoogleRequestDataStructure();
//    console.log("getPlacesByBounds: " + request.types + " box: " + JSON.stringify(request.bounds));
    this.getPlacesByBoundsCallGoogle(request);
};
myWonderApp.PlaceWrapper.prototype.getPlacesByBoundsCallGoogle = function(request) {
    "use strict"
    progressMessage.setProgressMessage("call the google places service");
//    console.log("getPlacesByBoundsCallGoogle: " + JSON.stringify(request));
    //map should not be a global variable
    var service = new google.maps.places.PlacesService(googleMap);//.nearbySearch(request, markerCallback);
    //service.textSearch(request, callback);
    //prependArg
//    http://metajack.im/2009/08/06/javascript-function-tricks-for-making-callbacks-better/
    service.nearbySearch(request, this.drawMarkersCallback.prependArg(request));
}
myWonderApp.PlaceWrapper.prototype.drawMarkersCallback = function() {
    "use strict"
    for (var i = 0; i < arguments.length-1; i++){
        console.log("drawMarkersCallback: " + i + " " + JSON.stringify(arguments[i]));
    }
    
    //using prepend args seems to screw with passing in function parameters
    var status = arguments[2];
    var results = arguments[1]
    progressMessage.setProgressMessage("drawMarkersCallback: status " + JSON.stringify(arguments[0]) + " " +status + " " + results.length);
    
    //console.log("callback: status " + status + " " + results.length);
    if (results.length===0){
        progressMessage.setProgressMessage("No places were found that match \"Where\" in your calendar: " + arguments[0].keyword +
            " try something like supermarket increase the search area or search route");
    }
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        
        for (var i = 0; i < results.length; i++) {
            myWonderApp.PlaceWrapper.prototype.createMarkerWithInfoWindow(arguments[0],results[i]);
        }
    }
}

myWonderApp.PlaceWrapper.prototype.createMarkerWithInfoWindow = function(googleRequest,place) {
    "use strict"
    progressMessage.setProgressMessage("create marker with info window");
    console.log("createMarker : " + googleRequest.keyword);
    var marker = new google.maps.Marker({
        map: googleMap,
        position: place.geometry.location,
        //animation: google.maps.Animation.DROP,
        icon: place.icon
    });
    //add this marker to an array so it can be cleared later
    google.maps.Map.prototype.addMarker(marker);
    this.setMarker(marker);
    this.addEventListener.call(this, googleRequest,marker, place);
//    this.createInfoWidnowContentForPlace(place);
}

myWonderApp.PlaceWrapper.prototype.addEventListener = function(googleRequest,marker, place) {
    "use strict"
    progressMessage.setProgressMessage("add eventlistener");
//    console.log("addEventListener: " + marker + " " + place);
    var me = this;
    google.maps.event.addListener(marker, 'click', function() {
        console.log("addEventListener: click " + googleRequest.keyword);
        me.createInfoWindowContentForPlace(googleRequest,place);
        infowindow.open(googleMap, marker);
    });
}
myWonderApp.PlaceWrapper.prototype.createInfoWindowContentForPlace = function(googleRequest,place) {
    console.log("create info window content " + googleRequest.keyword);
    progressMessage.setProgressMessage("create info window content " + googleRequest.keyword);
    "use strict"
//    console.log("createInfoWindowContent: ")
//    css for the infowindow
//http://www.script-tutorials.com/google-places-api-practice/
    var infoWindowContent = "<img src=" + place.icon + " width=\"42\" height=\"42\">" +
            "<br>" + place.name + //"</p>" +
            //"<p>" + place.formatted_address + "</p>" + 
            "<br>" + place.types + //"</p>" +
            "<br> vicinity: " + place.vicinity +
            "<br> URL: " + place.url +
            "<br> Rating: " + place.rating;
//    console.log("createInfoWindowContentForPlace: " + infoWindowContent);
    this.setInfoWindowContent(infoWindowContent);
    wonderApp.searchTodoItemsKeyIsAnArray(googleRequest.keyword, this.appendTodoItemsToInfoWindowContent, this);
}
myWonderApp.PlaceWrapper.prototype.setInfoWindowContent = function(stringContent) {
    
    "use strict"
    progressMessage.setProgressMessage("set info window content " + stringContent);
    infowindow.setContent(stringContent);
//    console.log("setInfoWindowContent: " + infowindow.getContent());
}
myWonderApp.PlaceWrapper.prototype.appendTodoItemsToInfoWindowContent = function(arrayAllTodoItemsForLocation) {
    "use strict"
    progressMessage.setProgressMessage("append to info window content " + arrayAllTodoItemsForLocation);
    infowindow.setContent(this.getInfoWindowContent() + "<br> To do: " +
            arrayAllTodoItemsForLocation);
//    console.log("appendTodoItemsToInfoWindowContent: " + infowindow.getContent())
}
myWonderApp.PlaceWrapper.prototype.getInfoWindowContent = function() {
    "use strict"
    progressMessage.setProgressMessage("get info window content");
//    console.log("getInfoWindowContent");
    return infowindow.getContent();
}
myWonderApp.PlaceWrapper.prototype.setMarker = function(markerForTestAccess) {
    progressMessage.setProgressMessage("set marker");
    marker = markerForTestAccess;
}
myWonderApp.PlaceWrapper.prototype.getMarker = function() {
    progressMessage.setProgressMessage("get marker");
    return marker;
}
myWonderApp.PlaceWrapper.prototype.getGoogleRequestDataStructure = function() {
    progressMessage.setProgressMessage("get google request data structure");
    return googleRequestDataStructure;
}
myWonderApp.PlaceWrapper.prototype.setGoogleRequestDataStructure = function(arrayofLocations, boundingBox) {
    progressMessage.setProgressMessage("set google request data structure " + arrayofLocations);
    googleRequestDataStructure = {
        bounds: boundingBox,
        //location : redmond,
        //radius : 10,
//        types: arrayofLocations,
        keyword : arrayofLocations
    };
}
var myWonderApp = myWonderApp || {};

var progressMessageElement;
myWonderApp.ProgressMessageForUser = function(div_name) {
//    console.log("progress message for user constructor")
    progressMessageDiv = document.getElementById('warnings_panel')//document.createElement("div");
    //progressMessageDiv.setAttribute('id',div_name);
    //progressMessageDiv.setAttribute ('style',"width:100%;height:10%;text-align:center");
}
myWonderApp.ProgressMessageForUser.prototype.getProgressDivID = function(){
    return progressMessageDiv.getAttribute('id');
}
myWonderApp.ProgressMessageForUser.prototype.setProgressMessage = function(message){
    progressMessageDiv.innerHTML = message;
}
myWonderApp.ProgressMessageForUser.prototype.getProgressMessage = function(message){
    return progressMessageDiv.innerHTML;
}

/**
 * @name RouteBoxer
 * @version 1.0
 * @copyright (c) 2010 Google Inc.
 * @author Thor Mitchell
 *
 * @fileoverview The RouteBoxer class takes a path, such as the Polyline for a
 * route generated by a Directions request, and generates a set of LatLngBounds
 * objects that are guaranteed to contain every point within a given distance
 * of that route. These LatLngBounds objects can then be used to generate
 * requests to spatial search services that support bounds filtering (such as
 * the Google Maps Data API) in order to implement search along a route.
 * <br/><br/>
 * RouteBoxer overlays a grid of the specified size on the route, identifies
 * every grid cell that the route passes through, and generates a set of bounds
 * that cover all of these cells, and their nearest neighbours. Consequently
 * the bounds returned will extend up to ~3x the specified distance from the
 * route in places.
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

/**
 * Creates a new RouteBoxer
 *
 * @constructor
 */
function RouteBoxer() {
  this.R = 6371; // earth's mean radius in km
}

/**
 * Generates boxes for a given route and distance
 *
 * @param {google.maps.LatLng[] | google.maps.Polyline} path The path along
 *           which to create boxes. The path object can be either an Array of
 *           google.maps.LatLng objects or a Maps API v2 or Maps API v3
 *           google.maps.Polyline object.
 * @param {Number} range The distance in kms around the route that the generated
 *           boxes must cover.
 * @return {google.maps.LatLngBounds[]} An array of boxes that covers the whole
 *           path.
 */
RouteBoxer.prototype.box = function (path, range) {
  // Two dimensional array representing the cells in the grid overlaid on the path
  this.grid_ = null;
  
  // Array that holds the latitude coordinate of each vertical grid line
  this.latGrid_ = [];
  
  // Array that holds the longitude coordinate of each horizontal grid line  
  this.lngGrid_ = [];
  
  // Array of bounds that cover the whole route formed by merging cells that
  //  the route intersects first horizontally, and then vertically
  this.boxesX_ = [];

  // Array of bounds that cover the whole route formed by merging cells that
  //  the route intersects first vertically, and then horizontally
  this.boxesY_ = [];
  
  // The array of LatLngs representing the vertices of the path
  var vertices = null;

  // If necessary convert the path into an array of LatLng objects
  if (path instanceof Array) {
    // already an arry of LatLngs (eg. v3 overview_path)
    vertices = path;
  } else if (path instanceof google.maps.Polyline) {
    if (path.getPath) {
      // v3 Maps API Polyline object
      vertices = new Array(path.getPath().getLength());
      for (var i = 0; i < vertices.length; i++) {
        vertices[i] = path.getPath().getAt(i);
      }
    } else {
      // v2 Maps API Polyline object
      vertices = new Array(path.getVertexCount());
      for (var j = 0; j < vertices.length; j++) {
        vertices[j] = path.getVertex(j);
      }
    }
  }

  // Build the grid that is overlaid on the route
  this.buildGrid_(vertices, range);
  
  // Identify the grid cells that the route intersects
  this.findIntersectingCells_(vertices);
  
  // Merge adjacent intersected grid cells (and their neighbours) into two sets
  //  of bounds, both of which cover them completely
  this.mergeIntersectingCells_();

  // Return the set of merged bounds that has the fewest elements
  return (this.boxesX_.length <= this.boxesY_.length ?
          this.boxesX_ :
          this.boxesY_);
};

/**
 * Generates boxes for a given route and distance
 *
 * @param {LatLng[]} vertices The vertices of the path over which to lay the grid
 * @param {Number} range The spacing of the grid cells.
 */
RouteBoxer.prototype.buildGrid_ = function (vertices, range) {

  // Create a LatLngBounds object that contains the whole path
  var routeBounds = new google.maps.LatLngBounds();
  for (var i = 0; i < vertices.length; i++) {
    routeBounds.extend(vertices[i]);
  }
  
  // Find the center of the bounding box of the path
  var routeBoundsCenter = routeBounds.getCenter();
  
  // Starting from the center define grid lines outwards vertically until they
  //  extend beyond the edge of the bounding box by more than one cell
  this.latGrid_.push(routeBoundsCenter.lat());
  
  // Add lines from the center out to the north
  this.latGrid_.push(routeBoundsCenter.rhumbDestinationPoint(0, range).lat());
  for (i = 2; this.latGrid_[i - 2] < routeBounds.getNorthEast().lat(); i++) {
    this.latGrid_.push(routeBoundsCenter.rhumbDestinationPoint(0, range * i).lat());
  }

  // Add lines from the center out to the south  
  for (i = 1; this.latGrid_[1] > routeBounds.getSouthWest().lat(); i++) {
    this.latGrid_.unshift(routeBoundsCenter.rhumbDestinationPoint(180, range * i).lat());
  }

  // Starting from the center define grid lines outwards horizontally until they
  //  extend beyond the edge of the bounding box by more than one cell  
  this.lngGrid_.push(routeBoundsCenter.lng());
  
  // Add lines from the center out to the east
  this.lngGrid_.push(routeBoundsCenter.rhumbDestinationPoint(90, range).lng());
  for (i = 2; this.lngGrid_[i - 2] < routeBounds.getNorthEast().lng(); i++) {
    this.lngGrid_.push(routeBoundsCenter.rhumbDestinationPoint(90, range * i).lng());
  }
  
  // Add lines from the center out to the west
  for (i = 1; this.lngGrid_[1] > routeBounds.getSouthWest().lng(); i++) {
    this.lngGrid_.unshift(routeBoundsCenter.rhumbDestinationPoint(270, range * i).lng());
  }
  
  // Create a two dimensional array representing this grid
  this.grid_ = new Array(this.lngGrid_.length);
  for (i = 0; i < this.grid_.length; i++) {
    this.grid_[i] = new Array(this.latGrid_.length);
  }
};

/**
 * Find all of the cells in the overlaid grid that the path intersects
 *
 * @param {LatLng[]} vertices The vertices of the path
 */
RouteBoxer.prototype.findIntersectingCells_ = function (vertices) {
  // Find the cell where the path begins
  var hintXY = this.getCellCoords_(vertices[0]);
  
  // Mark that cell and it's neighbours for inclusion in the boxes
  this.markCell_(hintXY);

  // Work through each vertex on the path identifying which grid cell it is in
  for (var i = 1; i < vertices.length; i++) {
    // Use the known cell of the previous vertex to help find the cell of this vertex
    var gridXY = this.getGridCoordsFromHint_(vertices[i], vertices[i - 1], hintXY);
    
    if (gridXY[0] === hintXY[0] && gridXY[1] === hintXY[1]) {
      // This vertex is in the same cell as the previous vertex
      // The cell will already have been marked for inclusion in the boxes
      continue;
    
    } else if ((Math.abs(hintXY[0] - gridXY[0]) === 1 && hintXY[1] === gridXY[1]) ||
        (hintXY[0] === gridXY[0] && Math.abs(hintXY[1] - gridXY[1]) === 1)) {
      // This vertex is in a cell that shares an edge with the previous cell
      // Mark this cell and it's neighbours for inclusion in the boxes
      this.markCell_(gridXY);
      
    } else {
      // This vertex is in a cell that does not share an edge with the previous
      //  cell. This means that the path passes through other cells between
      //  this vertex and the previous vertex, and we must determine which cells
      //  it passes through
      this.getGridIntersects_(vertices[i - 1], vertices[i], hintXY, gridXY);
    }
    
    // Use this cell to find and compare with the next one
    hintXY = gridXY;
  }
};

/**
 * Find the cell a path vertex is in by brute force iteration over the grid
 *
 * @param {LatLng[]} latlng The latlng of the vertex
 * @return {Number[][]} The cell coordinates of this vertex in the grid
 */ 
RouteBoxer.prototype.getCellCoords_ = function (latlng) {
  for (var x = 0; this.lngGrid_[x] < latlng.lng(); x++) {}
  for (var y = 0; this.latGrid_[y] < latlng.lat(); y++) {}
  return ([x - 1, y - 1]);
};

/**
 * Find the cell a path vertex is in based on the known location of a nearby
 *  vertex. This saves searching the whole grid when working through vertices
 *  on the polyline that are likely to be in close proximity to each other.
 *
 * @param {LatLng[]} latlng The latlng of the vertex to locate in the grid
 * @param {LatLng[]} hintlatlng The latlng of the vertex with a known location
 * @param {Number[]} hint The cell containing the vertex with a known location
 * @return {Number[]} The cell coordinates of the vertex to locate in the grid
 */ 
RouteBoxer.prototype.getGridCoordsFromHint_ = function (latlng, hintlatlng, hint) {
  var x, y;
  if (latlng.lng() > hintlatlng.lng()) {
    for (x = hint[0]; this.lngGrid_[x + 1] < latlng.lng(); x++) {}
  } else {
    for (x = hint[0]; this.lngGrid_[x] > latlng.lng(); x--) {}
  }
  
  if (latlng.lat() > hintlatlng.lat()) {
    for (y = hint[1]; this.latGrid_[y + 1] < latlng.lat(); y++) {}
  } else {        
    for (y = hint[1]; this.latGrid_[y] > latlng.lat(); y--) {}
  }
  
  return ([x, y]);
};


/**
 * Identify the grid squares that a path segment between two vertices
 * intersects with by:
 * 1. Finding the bearing between the start and end of the segment
 * 2. Using the delta between the lat of the start and the lat of each
 *    latGrid boundary to find the distance to each latGrid boundary
 * 3. Finding the lng of the intersection of the line with each latGrid
 *     boundary using the distance to the intersection and bearing of the line
 * 4. Determining the x-coord on the grid of the point of intersection
 * 5. Filling in all squares between the x-coord of the previous intersection
 *     (or start) and the current one (or end) at the current y coordinate,
 *     which is known for the grid line being intersected
 *     
 * @param {LatLng} start The latlng of the vertex at the start of the segment
 * @param {LatLng} end The latlng of the vertex at the end of the segment
 * @param {Number[]} startXY The cell containing the start vertex
 * @param {Number[]} endXY The cell containing the vend vertex
 */ 
RouteBoxer.prototype.getGridIntersects_ = function (start, end, startXY, endXY) {
  var edgePoint, edgeXY, i;
  var brng = start.rhumbBearingTo(end);         // Step 1.
  
  var hint = start;
  var hintXY = startXY;
  
  // Handle a line segment that travels south first
  if (end.lat() > start.lat()) {
    // Iterate over the east to west grid lines between the start and end cells
    for (i = startXY[1] + 1; i <= endXY[1]; i++) {
      // Find the latlng of the point where the path segment intersects with
      //  this grid line (Step 2 & 3)
      edgePoint = this.getGridIntersect_(start, brng, this.latGrid_[i]);
      
      // Find the cell containing this intersect point (Step 4)
      edgeXY = this.getGridCoordsFromHint_(edgePoint, hint, hintXY);
      
      // Mark every cell the path has crossed between this grid and the start,
      //   or the previous east to west grid line it crossed (Step 5)
      this.fillInGridSquares_(hintXY[0], edgeXY[0], i - 1);
      
      // Use the point where it crossed this grid line as the reference for the
      //  next iteration
      hint = edgePoint;
      hintXY = edgeXY;
    }
    
    // Mark every cell the path has crossed between the last east to west grid
    //  line it crossed and the end (Step 5)
    this.fillInGridSquares_(hintXY[0], endXY[0], i - 1);
    
  } else {
    // Iterate over the east to west grid lines between the start and end cells
    for (i = startXY[1]; i > endXY[1]; i--) {
      // Find the latlng of the point where the path segment intersects with
      //  this grid line (Step 2 & 3)
      edgePoint = this.getGridIntersect_(start, brng, this.latGrid_[i]);
      
      // Find the cell containing this intersect point (Step 4)
      edgeXY = this.getGridCoordsFromHint_(edgePoint, hint, hintXY);

      // Mark every cell the path has crossed between this grid and the start,
      //   or the previous east to west grid line it crossed (Step 5)
      this.fillInGridSquares_(hintXY[0], edgeXY[0], i);

      // Use the point where it crossed this grid line as the reference for the
      //  next iteration
      hint = edgePoint;
      hintXY = edgeXY;
    }
    
    // Mark every cell the path has crossed between the last east to west grid
    //  line it crossed and the end (Step 5)
    this.fillInGridSquares_(hintXY[0], endXY[0], i);
    
  }
};

/**
 * Find the latlng at which a path segment intersects with a given
 *   line of latitude
 *     
 * @param {LatLng} start The vertex at the start of the path segment
 * @param {Number} brng The bearing of the line from start to end
 * @param {Number} gridLineLat The latitude of the grid line being intersected
 * @return {LatLng} The latlng of the point where the path segment intersects
 *                    the grid line
 */ 
RouteBoxer.prototype.getGridIntersect_ = function (start, brng, gridLineLat) {
  var d = this.R * ((gridLineLat.toRad() - start.lat().toRad()) / Math.cos(brng.toRad()));
  return start.rhumbDestinationPoint(brng, d);
};

/**
 * Mark all cells in a given row of the grid that lie between two columns
 *   for inclusion in the boxes
 *     
 * @param {Number} startx The first column to include
 * @param {Number} endx The last column to include
 * @param {Number} y The row of the cells to include
 */ 
RouteBoxer.prototype.fillInGridSquares_ = function (startx, endx, y) {
  var x;
  if (startx < endx) {
    for (x = startx; x <= endx; x++) {
      this.markCell_([x, y]);
    }
  } else {
    for (x = startx; x >= endx; x--) {
      this.markCell_([x, y]);
    }            
  }      
};

/**
 * Mark a cell and the 8 immediate neighbours for inclusion in the boxes
 *     
 * @param {Number[]} square The cell to mark
 */ 
RouteBoxer.prototype.markCell_ = function (cell) {
  var x = cell[0];
  var y = cell[1];
  this.grid_[x - 1][y - 1] = 1;
  this.grid_[x][y - 1] = 1;
  this.grid_[x + 1][y - 1] = 1;
  this.grid_[x - 1][y] = 1;
  this.grid_[x][y] = 1;
  this.grid_[x + 1][y] = 1;
  this.grid_[x - 1][y + 1] = 1;
  this.grid_[x][y + 1] = 1;
  this.grid_[x + 1][y + 1] = 1;
};

/**
 * Create two sets of bounding boxes, both of which cover all of the cells that
 *   have been marked for inclusion.
 *
 * The first set is created by combining adjacent cells in the same column into
 *   a set of vertical rectangular boxes, and then combining boxes of the same
 *   height that are adjacent horizontally.
 *
 * The second set is created by combining adjacent cells in the same row into
 *   a set of horizontal rectangular boxes, and then combining boxes of the same
 *   width that are adjacent vertically.
 *     
 */ 
RouteBoxer.prototype.mergeIntersectingCells_ = function () {
  var x, y, box;
  
  // The box we are currently expanding with new cells
  var currentBox = null;
  
  // Traverse the grid a row at a time
  for (y = 0; y < this.grid_[0].length; y++) {
    for (x = 0; x < this.grid_.length; x++) {
      
      if (this.grid_[x][y]) {
        // This cell is marked for inclusion. If the previous cell in this
        //   row was also marked for inclusion, merge this cell into it's box.
        // Otherwise start a new box.
        box = this.getCellBounds_([x, y]);
        if (currentBox) {
          currentBox.extend(box.getNorthEast());
        } else {
          currentBox = box;
        }
        
      } else {
        // This cell is not marked for inclusion. If the previous cell was
        //  marked for inclusion, merge it's box with a box that spans the same
        //  columns from the row below if possible.
        this.mergeBoxesY_(currentBox);
        currentBox = null;
      }
    }
    // If the last cell was marked for inclusion, merge it's box with a matching
    //  box from the row below if possible.
    this.mergeBoxesY_(currentBox);
    currentBox = null;
  }

  // Traverse the grid a column at a time
  for (x = 0; x < this.grid_.length; x++) {
    for (y = 0; y < this.grid_[0].length; y++) {
      if (this.grid_[x][y]) {
        
        // This cell is marked for inclusion. If the previous cell in this
        //   column was also marked for inclusion, merge this cell into it's box.
        // Otherwise start a new box.
        if (currentBox) {
          box = this.getCellBounds_([x, y]);
          currentBox.extend(box.getNorthEast());
        } else {
          currentBox = this.getCellBounds_([x, y]);
        }
        
      } else {
        // This cell is not marked for inclusion. If the previous cell was
        //  marked for inclusion, merge it's box with a box that spans the same
        //  rows from the column to the left if possible.
        this.mergeBoxesX_(currentBox);
        currentBox = null;
        
      }
    }
    // If the last cell was marked for inclusion, merge it's box with a matching
    //  box from the column to the left if possible.
    this.mergeBoxesX_(currentBox);
    currentBox = null;
  }
};

/**
 * Search for an existing box in an adjacent row to the given box that spans the
 * same set of columns and if one is found merge the given box into it. If one
 * is not found, append this box to the list of existing boxes.
 *
 * @param {LatLngBounds}  The box to merge
 */ 
RouteBoxer.prototype.mergeBoxesX_ = function (box) {
  if (box !== null) {
    for (var i = 0; i < this.boxesX_.length; i++) {
      if (this.boxesX_[i].getNorthEast().lng() === box.getSouthWest().lng() &&
          this.boxesX_[i].getSouthWest().lat() === box.getSouthWest().lat() &&
          this.boxesX_[i].getNorthEast().lat() === box.getNorthEast().lat()) {
        this.boxesX_[i].extend(box.getNorthEast());
        return;
      }
    }
    this.boxesX_.push(box);
  }
};

/**
 * Search for an existing box in an adjacent column to the given box that spans
 * the same set of rows and if one is found merge the given box into it. If one
 * is not found, append this box to the list of existing boxes.
 *
 * @param {LatLngBounds}  The box to merge
 */ 
RouteBoxer.prototype.mergeBoxesY_ = function (box) {
  if (box !== null) {
    for (var i = 0; i < this.boxesY_.length; i++) {
      if (this.boxesY_[i].getNorthEast().lat() === box.getSouthWest().lat() &&
          this.boxesY_[i].getSouthWest().lng() === box.getSouthWest().lng() &&
          this.boxesY_[i].getNorthEast().lng() === box.getNorthEast().lng()) {
        this.boxesY_[i].extend(box.getNorthEast());
        return;
      }
    }
    this.boxesY_.push(box);
  }
};

/**
 * Obtain the LatLng of the origin of a cell on the grid
 *
 * @param {Number[]} cell The cell to lookup.
 * @return {LatLng} The latlng of the origin of the cell.
 */ 
RouteBoxer.prototype.getCellBounds_ = function (cell) {
  return new google.maps.LatLngBounds(
    new google.maps.LatLng(this.latGrid_[cell[1]], this.lngGrid_[cell[0]]),
    new google.maps.LatLng(this.latGrid_[cell[1] + 1], this.lngGrid_[cell[0] + 1]));
};

/* Based on the Latitude/longitude spherical geodesy formulae & scripts
   at http://www.movable-type.co.uk/scripts/latlong.html
   (c) Chris Veness 2002-2010
*/ 
google.maps.LatLng.prototype.rhumbDestinationPoint = function (brng, dist) {
  var R = 6371; // earth's mean radius in km
  var d = parseFloat(dist) / R;  // d = angular distance covered on earth's surface
  var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();
  brng = brng.toRad();

  var lat2 = lat1 + d * Math.cos(brng);
  var dLat = lat2 - lat1;
  var dPhi = Math.log(Math.tan(lat2 / 2 + Math.PI / 4) / Math.tan(lat1 / 2 + Math.PI / 4));
  var q = (Math.abs(dLat) > 1e-10) ? dLat / dPhi : Math.cos(lat1);
  var dLon = d * Math.sin(brng) / q;
  // check for going past the pole
  if (Math.abs(lat2) > Math.PI / 2) {
    lat2 = lat2 > 0 ? Math.PI - lat2 : - (Math.PI - lat2);
  }
  var lon2 = (lon1 + dLon + Math.PI) % (2 * Math.PI) - Math.PI;
 
  if (isNaN(lat2) || isNaN(lon2)) {
    return null;
  }
  return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
};

google.maps.LatLng.prototype.rhumbBearingTo = function (dest) {
  var dLon = (dest.lng() - this.lng()).toRad();
  var dPhi = Math.log(Math.tan(dest.lat().toRad() / 2 + Math.PI / 4) / Math.tan(this.lat().toRad() / 2 + Math.PI / 4));
  if (Math.abs(dLon) > Math.PI) {
    dLon = dLon > 0 ? -(2 * Math.PI - dLon) : (2 * Math.PI + dLon);
  }
  return Math.atan2(dLon, dPhi).toBrng();
};

/**
 * Extend the Number object to convert degrees to radians
 *
 * @return {Number} Bearing in radians
 * @ignore
 */ 
Number.prototype.toRad = function () {
  return this * Math.PI / 180;
};

/**
 * Extend the Number object to convert radians to degrees
 *
 * @return {Number} Bearing in degrees
 * @ignore
 */ 
Number.prototype.toDeg = function () {
  return this * 180 / Math.PI;
};

/**
 * Normalize a heading in degrees to between 0 and +360
 *
 * @return {Number} Return 
 * @ignore
 */ 
Number.prototype.toBrng = function () {
  return (this.toDeg() + 360) % 360;
};
var map;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];

var boxpolys = null;
var directions = null;
var routeBoxer = null;
var placeWrapper = null;
var database = null;
var start_address = null;
var end_address = null;
var end_date = null;
var start_date = null;
var progressMessage = null;
var emptyFields = null;
//var distance = null; // km

function initialize() {

    progressMessage = new myWonderApp.ProgressMessageForUser('warnings_panel');
    progressMessage.setProgressMessage("initialize the directions service");

//    console.log("initialize: ")
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService();

    // Create a map and center it on Manhattan.
    var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: manhattan,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    addDropDown(map);
//    addProgressMessage(map);

    progressMessage.setProgressMessage("get the map div");
//    console.log("directions: " + map);
    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
        map: map
    }
    progressMessage.setProgressMessage("initialize the directions renderer");
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

    // Instantiate an info window to hold step text.
    progressMessage.setProgressMessage("initialize the info window");
    stepDisplay = new google.maps.InfoWindow();

    progressMessage.setProgressMessage("initialize the routeboxer");
    routeBoxer = new RouteBoxer();
    //initDatabase();
    initGoogle()
    placeWrapper = new myWonderApp.PlaceWrapper(map, database);
    emptyFields = new myWonderApp.EmptyFields();
}

function addDropDown(map) {
    var dropdown = document.getElementById('dropdown-holder');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(dropdown);
}
function addProgressMessage(map) {
    var warnings = document.getElementById('warnings_panel');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(warnings);
}
function initDatabase() {
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
//    console.log("window.indexedDB: " + window.indexedDB)
    database = new myWonderApp.Reminder(window.indexedDB);
//    console.log("init database: before open callback" + database.getDataBase());
}
function initGoogle() {
    database = new myWonderApp.CalendarWrapper();
}

function calcRouteGoogle() {
    var testGoogleAuthetication =
            new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            database, database.getAllTodoLocationsAsArray,
            restOfTheProgram);
    testGoogleAuthetication.handleClientLoad();
//        database.getAllTodoLocationsAsArray();
}
function calcRoute() {
    database.getAllTodoLocationsAsArray(restOfTheProgram);
//    restOfTheProgram(start_address,end_address);
}

function restOfTheProgram() {
    console.log("restOfTheProgram: " + start_address + ' ' + end_address);
    clearBoxes();
    // First, remove any existing markers from the map.
    google.maps.Map.prototype.clearMarkers();
    for (i = 0; i < markerArray.length; i++) {
//        console.log("markers on map: " + JSON.stringify(markerArray[i]))
        markerArray[i].setMap(null);
    }

    // Now, clear the array itself.
    markerArray = [];

    // Retrieve the start and end locations and create
    // a DirectionsRequest using WALKING directions.
    var start = start_address;//document.getElementById('start').value;
    var end = end_address;//document.getElementById('end').value;
    var distance = distance_form
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var warnings = document.getElementById('warnings_panel');
            warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);

//            console.log("calcRoute: " + JSON.stringify(response));

            showSteps(response);
            // Box around the overview path of the first route

            var path = response.routes[0].overview_path;

            var boxes = routeBoxer.box(path, distance);
            //console.log("calcRoute: boxes " + JSON.stringify(boxes));
            drawBoxes(boxes);
            getPlacesWithinBoxes(boxes)
            //placeWrapper.getPlacesByBounds(['establishment'],boxes);
        } else {
            alert("Directions query failed: " + status);
        }
    });
}
function getPlacesWithinBoxes(boxes) {
    for (var i = 0; i < boxes.length; i++) {
        var locationsArray = database.getAllTodoLocationsAsArrayGenerated();
        for (var location_count = 0; location_count < locationsArray.length; location_count++) {
            placeWrapper.setGoogleRequestDataStructure([locationsArray[location_count]], boxes[i]);
            placeWrapper.getPlacesByBounds();//database.getAllTodoLocationsAsArrayGenerated(), boxes[i]);
        }
    }
}
// Draw the array of boxes as polylines on the map
function drawBoxes(boxes) {
    progressMessage.setProgressMessage("draw bounding boxes");
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
        boxpolys[i] = new google.maps.Rectangle({
            bounds: boxes[i],
            fillOpacity: 0,
            strokeOpacity: 1.0,
            strokeColor: '#000000',
            strokeWeight: 1,
            map: map
        });
    }
}

// Clear boxes currently on the map
function clearBoxes() {
    progressMessage.setProgressMessage("clear bounding boxes");
    if (boxpolys != null) {
        for (var i = 0; i < boxpolys.length; i++) {
            boxpolys[i].setMap(null);
        }
    }
    boxpolys = null;
}

function showSteps(directionResult) {
    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.
    progressMessage.setProgressMessage("set a marker for each navigation step");
    var myRoute = directionResult.routes[0].legs[0];


    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_point,
            map: map
        });
//        console.log("showSteps: " + myRoute.steps[i].start_point);
        //scan a round and display at start_point
        //getPlaces(myRoute.steps[i].start_point);
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
    }
}

function attachInstructionText(marker, text) {
    progressMessage.setProgressMessage("attach instructions to a navigation marker");
    google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on,
        // containing the text of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}
window.onload = function() {
    //initDatabase();
    initialize();
    var todobutton = document.getElementById("todo_btn");
    todobutton.onclick = function() {
        distance_form = document.getElementById("distance").value;
        if (distance_form === "") {
            document.getElementById("distance").value = 1;
            distance_form = parseFloat(document.getElementById("distance").value) * 1.609344;
        } else {
            distance_form = parseFloat(document.getElementById("distance").value) * 1.609344;
        }
        start_date = document.getElementById('startTime').value;
        if (start_date === "") {
            start_date = emptyFields.getTodaysDate();
            document.getElementById('startTime').value = start_date;
        }
        database.setStartDate(Date.parse(start_date));
//        console.log("start_date " + start_date);
        end_date = document.getElementById('endTime').value;
        if (end_date === "") {
            end_date = emptyFields.getTomorrowsDate();
            document.getElementById('endTime').value = end_date;
        }
        database.setEndDate(Date.parse(end_date));
//        console.log("end_date " + end_date);
        start_address = document.getElementById('startAddress').value;
        end_address = document.getElementById('destAddress').value;
        checkStartAddress();
    }
}
function checkStartAddress() {
    if (start_address === "") {
        progressMessage.setProgressMessage("start address is empty");
        emptyFields.getMyLocation(function(param) {
            progressMessage.setProgressMessage("start address" + param.coords.latitude + ", " + param.coords.longitude);
            document.getElementById('startAddress').value = param.coords.latitude + ", " + param.coords.longitude;
            start_address = document.getElementById('startAddress').value;
            checkEndAddress();
        });
    } else if (start_address !== "") {
        checkEndAddress();
    }
}
function checkEndAddress() {
    if (end_address === "") {
        progressMessage.setProgressMessage("end address is empty");
        emptyFields.getMyLocation(function(param) {
            progressMessage.setProgressMessage("end address" + param.coords.latitude + ", " + param.coords.longitude);
            document.getElementById('destAddress').value = param.coords.latitude + ", " + param.coords.longitude;
            end_address = document.getElementById('destAddress').value;
            calcRouteGoogle();
        });
    } else if (end_address !== "") {
        calcRouteGoogle();
    }
}