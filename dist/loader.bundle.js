(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{117:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return h}));var r=n(147),a=n.n(r),o=function(e){var t=e.url,n=e.type,r=e.data,a=e.headers,o=e.beforeSend,u=e.onError;return new Promise((function(e,i){var c={url:t,contentType:"application/json",type:n,async:!0,beforeSend:function(e){a&&Object.keys(a).length&&Object.keys(a).map((function(t){var n="function"==typeof a[t]?a[t]():a[t];e.setRequestHeader(t,n)})),o&&o(e)},success:function(t){e(t)},error:function(e,t,n){i(e.responseJSON),u&&u(e.responseJSON)}};r&&(c.data=JSON.stringify(r)),$.ajax(c)}))},u=n(282),i=n.n(u),c=function(e){var t=e.hostURL,n=e.beforeSend,r=e.onErrors,u=void 0===r?{}:r,c={},s=function(e){if(e&&e.hasOwnProperty("message")){var t=e.message;u.hasOwnProperty(t)&&u[t]()}u.hasOwnProperty("default")&&u.default()},l=function(e){return function(r,a){return o({url:t+r,data:a,type:e,beforeSend:n,headers:c,onError:s})}},f=function(e){return function(r){return o({url:t+r,type:e,beforeSend:n,headers:c,onError:s})}};return{addHeader:function(e,t){c[e]=t},get:f("GET"),post:l("POST"),put:l("PUT"),delete:f("DELETE"),downloadStream:function(e){window.open(t+e)},postMultipart:function(e,r,o){var u=o.onLoad,s=o.onProgress,l=o.onError,f=o.fileKey,h=new FormData;return i()(r,(function(e,t){if(null!=e)if(Array.isArray(e))for(var n=0;n<e.length;n++)h.append(t,t!==f&&"object"===a()(e[n])?JSON.stringify(e[n]):e[n]);else h.append(t,t!==f&&"object"===a()(e)?JSON.stringify(e):e)})),new Promise((function(r,a){$.ajax({url:t+e,type:"POST",async:!0,xhr:function(){var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",(function(e){s&&s(e)})),e.upload.addEventListener("load",(function(e){u&&u(e)})),e.upload.addEventListener("error",(function(e){l&&l(e)})),e},beforeSend:function(e){c&&Object.keys(c).length&&Object.keys(c).map((function(t){var n="function"==typeof c[t]?c[t]():c[t];e.setRequestHeader(t,n)})),n&&n(e)},data:h,cache:!1,dataType:"json",processData:!1,contentType:!1,success:function(e){r(e)},error:function(e,t,n){a({rsp:e.responseJSON},t,n)}})}))}}},s={hostURL:"".concat("https://survey-spa.herokuapp.com","/api")},l={hostURL:"".concat("https://survey-spa.herokuapp.com","/api")},f=c(s),h=c(l)},144:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={0:{defaultPath:"/surveys"},1:{defaultPath:"/surveys"},2:{defaultPath:"/survey"}}},230:function(e,t,n){"use strict";n.d(t,"b",(function(){return x})),n.d(t,"a",(function(){return A}));var r=n(0),a=n.n(r),o=n(589),u=n(58),i=n(124),c=n.n(i),s=n(146),l=n.n(s),f=n(88),h=n(87),d=n(144),p=function(e){var t=e.render,n=e.component,r=l()(e,["render","component"]);return a.a.createElement(o.b,c()({},r,{render:function(e){return f.a.getAuthen()?a.a.createElement(o.a,{to:{pathname:d.a[h.a.getState().role].defaultPath}}):t?t(e):a.a.createElement(n,e)}}))},m=n(295),v=n(591),g=n(290),y=n.n(g),E=n(291),b=n.n(E),P=function(e){var t=e.render,n=e.component,r=e.roles,u=l()(e,["render","component","roles"]);return a.a.createElement(o.b,c()({},u,{render:function(e){return f.a.getAuthen()?r.includes(h.a.getState().role)?t?t(e):a.a.createElement(n,e):a.a.createElement(o.a,{to:{pathname:d.a[h.a.getState().role].defaultPath}}):a.a.createElement(o.a,{to:{pathname:"/login"}})}}))};n(547);var S=Object(m.a)({palette:{primary:{main:y.a[700]},secondary:b.a}}),w=a.a.lazy((function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(2),n.e(5)]).then(n.bind(null,805))})),O=a.a.lazy((function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(2),n.e(29)]).then(n.bind(null,806))})),T=a.a.lazy((function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(2),n.e(30)]).then(n.bind(null,807))})),x=Object(u.a)(),A=function(){return a.a.createElement(v.a,{theme:S},a.a.createElement(o.c,{history:x},a.a.createElement(r.Suspense,{fallback:null},a.a.createElement(o.d,null,a.a.createElement(P,{path:"/",exact:!0,render:function(e){return null},roles:[0]}),a.a.createElement(P,{path:"/survey",exact:!0,render:function(e){return a.a.createElement(O,e)},roles:[2]}),a.a.createElement(P,{path:"/surveys",exact:!0,render:function(e){return a.a.createElement(T,e)},roles:[0,1]}),a.a.createElement(p,{path:"/login",exact:!0,render:function(e){return a.a.createElement(w,e)}})))))}},270:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(117),a={login:function(e){return r.b.post("/auth/login",e)},auth:function(){return r.a.get("/auth/check-auth")}}},313:function(e,t,n){n(314),e.exports=n(546)},546:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),u=n.n(o),i=n(230),c=n(117),s=n(88);(function(){return c.a.addHeader("Authorization",(function(){var e=s.a.getAuthen();return e?"Bearer ".concat(e):null})),s.a.loadAuthen().then((function(e){return Promise.resolve()})).catch((function(e){return Promise.resolve()}))})().then((function(){u.a.render(a.a.createElement(i.a,null),document.getElementById("app"))}))},547:function(e,t,n){"use strict";n.r(t);var r=n(15),a=n(289),o=n.n(a),u=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.trim().toLowerCase())},i=function(e){return!1===/\D/gi.test(e.trim())};r.a(r.d,"isTax",(function(e){return this.test("isTax",e,(function(e){return!e||(14===e.length||10===e.length)}))})),r.a(r.d,"notHaveNumber",(function(e){return this.test("notHaveNumber",e,(function(e){return!1===/\d/gi.test(e)}))})),r.a(r.c,"notEmpty",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"no data";return this.test("notEmpty",e,(function(e){return!o()(e)}))})),r.a(r.d,"isPhone",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"no data";return this.test("isPhone",e,(function(e){return i(e)}))})),r.a(r.d,"isPhoneOrEmail",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"no data";return this.test("isPhoneOrEmail",e,(function(e){return i(e)||u(e)}))})),r.a(r.d,"onlyWord",(function(e){return this.test("onlyWord",e,(function(e){return!0===/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/gi.test(e.replace(/\s/gi,""))}))})),r.a(r.d,"noSpecialChar",(function(e){return this.test("onlyWord",e,(function(e){return!1===/\W/gi.test(e.replace(/\s/gi,""))}))})),r.a(r.d,"haveChar",(function(e){return this.test("haveChar",e,(function(e){return!0===/[a-z]/gi.test(e)}))})),r.a(r.d,"haveNumber",(function(e){return this.test("haveNumber",e,(function(e){return!0===/\d/gi.test(e)}))})),r.a(r.d,"equalTo",(function(e,t){return this.test({name:"equalTo",exclusive:!1,message:t,params:{reference:e.path},test:function(t){return t===this.resolve(e)}})})),r.a(r.d,"notEqualTo",(function(e,t){return this.test({name:"notEqualTo",exclusive:!1,message:t,params:{reference:e.path},test:function(t){return t!==this.resolve(e)}})})),r.a(r.b,"notReach",(function(e){return this.test({name:"notReach",exclusive:!1,message:e,test:function(e){var t=this.parent,n=new Date(e).getTime();return new Date(t.to).getTime()-n>0}})}))},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e},n=e,r=[];return{getState:function(){return n},setState:function(e){var a=n;return n=t(e),Promise.all(r.map((function(e){return e(n,a)})))},onChange:function(e){return r.push(e),function(){var t=r.indexOf(e);r.splice(t,1)}}}}()},88:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r,a,o,u=n(269),i=n.n(u),c=n(141),s=n.n(c),l=function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:localStorage;i()(this,e),s()(this,"engine",null),s()(this,"get",(function(e){var n,r=t.engine.getItem(e);if(null==r)return null;try{n=JSON.parse(r)}catch(e){console.log(e),n=null}return n})),s()(this,"set",(function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null==e)t.engine.removeItem(n);else try{t.engine.setItem(n,JSON.stringify(e),r)}catch(e){console.log(e)}})),this.engine=n},f=n(180),h=n.n(f),d=n(270),p=n(87),m={getItem:h.a.get,setItem:h.a.set,removeItem:h.a.remove},v=(r=new l(m),a=[],{onChange:function(e){return a.push(e),function(){var t=a.indexOf(e);a.splice(t,1)}},clearAuthen:function(){o(null)},loadAuthen:function(){return new Promise((function(e,t){r.get("token")?d.a.auth().then((function(n){n?p.a.setState(n).then((function(){return e()})):t()})).catch((function(e){o(null)})):t()}))},getAuthen:function(){return r.get("token")},setAuthen:o=function(e,t){r.set(e,"token",t),Promise.all(a.map((function(t){return t(e)})))}})}},[[313,28,1,0,10,9,27,13,18,26,16,17,15,21,6,7,8,11,12,14,19,20,22,23,24,25]]]);