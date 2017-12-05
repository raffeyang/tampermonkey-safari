Registry.require(["helper","convert"],function(){var n=Registry.get("helper"),p=Registry.get("convert"),r,u,A=function(a){var d=n.isLocalImage(a);return a&&"http"==a.substr(0,4)||d},B={internal:!0,cookie:!0,"user-agent":!0,referer:!0,origin:!0,host:!0,"proxy-connection":!0,"accept-encoding":!0,"accept-charset":!0},E={"cache-control":"no-cache",pragma:"no-cache"},F={"cache-control":"max-age=0, must-revalidate"},v=function(a){return{responseXML:"",responseText:"",response:null,readyState:4,responseHeaders:"",
status:0,statusText:"",error:a||"Forbidden"}},w=function(a){if("Blob"===a.type)return new Blob([p.str2arrbuf(a.value)]);if("File"===a.type)return new File([p.str2arrbuf(a.value)],a.name,{type:a.meta,lastModified:a.lastModified||Date.now()});if("FormData"==a.type){var d=new FormData;Object.keys(a.value).forEach(function(b){var c="Array"===a.value[b].type,g=w(a.value[b]),e=c?g:[g];e.forEach(function(a,c){d.append(b,e[c])})});return d}if("Array"===a.type||"Object"===a.type){var k,c,g;"Object"===a?(g=
Object.keys(a.value),c=function(a){return a<g.length?g[a]:null},k={}):(c=function(b){return b<a.value.length?b:null},k=[]);for(var m,b=0;null!==(m=c(b));b++)k[m]=w(a.value[m]);return k}return a.value},G=function(a,d,k){void 0===k&&(k={});var c=n.assign({},d||{}),g=function(a,b){if(c[a])c[a]("function"==typeof b?b():b)};d=function(a,b){c[a]&&(g(a,b),c[a]=null)};if(k.internal||A(a.url)){var m=window.fetch&&a.url&&"http"==a.url.substr(0,4),b=!u&&a.anonymous,h=a.fetch;return m&&(b||h)?C(a,c,k,d,g):y(a,
c,k,d,g)}console.warn("xhr: invalid scheme of url:",a.url);a=v("Invalid scheme");d("onerror",a);d("ondone",a)},z="tm-finalurl"+rea.runtime.short_id.toLowerCase(),D="tm-setcookie"+rea.runtime.short_id.toLowerCase(),C=function(a,d,k,c,g){var m=function(a){var b=[],c,l;a.headers&&(c=a.headers.get(z)||a.url,a.headers.forEach(function(a,l){var c=l.toLowerCase();-1==[z,D].indexOf(c)&&b.push(c+":"+a)}),(l=a.headers.get(D))&&b.push("set-cookie:"+l));return{readyState:4,responseHeaders:b.join("\n"),finalUrl:c,
status:a.status,statusText:a.statusText}},b=function(b){(function(a,b){for(var l=[],t=0,c=a.length;t<c;t+=b)l.push(a.slice(t,b+t));return l})(b,parseInt(a.partialSize)).forEach(function(a){g("onpartial",{partial:a})})};try{var h={};h.method=a.method||"GET";h.redirect="follow";if(a.nocache||a.revalidate)h.cache="no-store";h.credentials=a.anonymous?"omit":"include";if(a.headers){var n={};Object.keys(a.headers).forEach(function(b){var c=b,d=a.headers[b];if(r)B[b.toLowerCase()]&&(c=r+b,d=null===d?"":
p.encodeS(d));else if(null===d)return;n[c]=d});h.headers=new window.Headers(n)}void 0!==a.data&&(h.body="typified"===a.data_type?w(a.data):"string"===typeof a.data?a.data:JSON.stringify(a.data));void 0!==a.timeout&&(h.timeout=a.timeout);var q=window.fetch(a.url,h).then(function(e){var f=m(e);200!=f.status&&0!=f.status?0<a.retries?(a.retries--,C(a,d,k,c,g)):(c("onerror",f),c("ondone",f)):function(){var b;if(e.ok)void 0!==a.responseType?function(){if(!a.convertBinary||"arraybuffer"!=a.responseType&&
"blob"!=a.responseType){if("arraybuffer"==a.responseType)return e.arrayBuffer();if("blob"==a.responseType)return e.blob();console.warn("xhr: responseType",a.responseType," is not implemented!");return e.text()}return e.arrayBuffer().then(function(a){return p.arrbuf2str(a)})}().then(function(a){f.response=a;b()}):e.text().then(function(a){f.responseText=a;b()});else return f.responseXML=null,f.responseText="",f.response=null,{done:function(a){a()}};return{done:function(a){b=a}}}().done(function(){if(a.partialSize&&
d.onpartial){var e=a.convertBinary&&f.response?f.response:f.responseText;["response","responseText","responseXML"].forEach(function(a){delete f[a]});e&&(e.length>a.partialSize?b(e):f.response_data=e)}c("onload",f);c("ondone",f)})}).catch(function(a){a=m({status:408,statusText:a.message||"Request Timeout"});c("onerror",a);c("ondone",a)})}catch(e){console.error(e.stack),h=v(e.message),c("onerror",h),c("ondone",h)}return{abort:function(){try{q.abort&&q.abort()}catch(a){}}}},y=function(a,d,k,c,g){var m,
b=new XMLHttpRequest(a.anonymous?{mozAnon:!0}:{}),h=function(l){var c="",d=a.url;if(2<=b.readyState&&(c=b.getAllResponseHeaders(),4==b.readyState)){c&&(c=c.replace(/tm-finalurl[0-9a-zA-Z]*\: .*[\r\n]{1,2}/i,""),c=c.replace(/tm-setcookie[0-9a-zA-Z]*\:/i,"set-cookie:"));var e;if(e=b.getResponseHeader(z))d=e}c={readyState:b.readyState,responseHeaders:c,finalUrl:d,status:4==b.readyState?b.status:0,statusText:4==b.readyState?b.statusText:""};l&&4==b.readyState?(b.responseType?(c.responseXML=null,c.responseText=
null,c.responseType=b.responseType):(c.responseXML=b.responseXML,c.responseText=b.responseText),c.response=b.response):(c.responseXML=null,c.responseText="",c.response=null);return c},u=function(b){(function(a,b){for(var c=[],l=0,d=a.length;l<d;l+=b)c.push(a.slice(l,b+l));return c})(b,parseInt(a.partialSize)).forEach(function(a){g("onpartial",{partial:a})})},q={onload:function(){var b=h(!0);4==b.readyState&&200!=b.status&&0!=b.status&&0<a.retries?(a.retries--,y(a,d,k,c,g)):function(){if(a.convertBinary&&
b.response){var c=b.responseType?b.responseType.toLowerCase():"";if("blob"==c){var d,e=new FileReader;e.onload=function(){b.response=p.arrbuf2str(e.result);d()};e.readAsArrayBuffer(b.response);return{done:function(a){d=a}}}"arraybuffer"==c?b.response=p.arrbuf2str(b.response):"json"==c&&(b.response=JSON.stringify(b.response))}return{done:function(a){a()}}}().done(function(){if(a.partialSize&&d.onpartial){var e=a.convertBinary&&b.response?b.response:b.responseText;["response","responseText","responseXML"].forEach(function(a){delete b[a]});
e&&(e.length>a.partialSize?u(e):b.response_data=e)}c("onload",b);4==b.readyState&&c("ondone",b)})},onerror:function(){var b=h();4==b.readyState&&200!=b.status&&0!=b.status&&0<a.retries?(a.retries--,y(a,d,k,c,g)):(c("onerror",b),c("ondone",b))},onloadstart:function(){g("onloadstart",function(){return h()})},onreadystatechange:function(){g("onreadystatechange",function(){return h()})},onprogress:function(a){g("onprogress",function(){var c=h(),d=c;void 0===d&&(d={});try{var e=null,f=null;if(a.lengthComputable||
0<a.total)e=a.loaded,f=a.total;else{var g=b.responseType&&-1==["","text"].indexOf(b.responseType)?null:b.responseText,k=Number(n.getStringBetweenTags(c.responseHeaders.toLowerCase(),"content-length:","\n").trim()),m=2<c.readyState&&g?g.length:0;0==k&&(k=-1);e=a.loaded||m;f=a.total||k}d.lengthComputable=a.lengthComputable;d.loaded=e;d.done=e;d.position=e;d.total=f;d.totalSize=f}catch(p){}return d})},ontimeout:function(){var a=h();c("ontimeout");c("ondone",a)}},e=0==Object.keys(q).concat(["ondone"]).filter(function(a){return!!d[a]}).length;
e||Object.keys(q).forEach(function(a){if(d[a]||-1!=["ontimeout","onload","onerror"].indexOf(a))b[a]=q[a]});try{if(!k.internal&&!A(a.url))throw Error("Invalid scheme of url: "+a.url);b.open(a.method,a.url,!e,a.user,a.password);if(a.headers||a.nocache||a.revalidate){var f={};a.headers&&n.assign(f,a.headers);a.nocache?n.assign(f,E):a.revalidate&&n.assign(f,F);Object.keys(f).forEach(function(a){var c=a,d=f[a];if(r)B[a.toLowerCase()]&&(c=r+a,d=null===d?"":p.encodeS(d));else if(null===d)return;try{b.setRequestHeader(c,
d)}catch(e){console.warn("xhr: rejected header",c,f[a])}})}void 0!==a.overrideMimeType&&b.overrideMimeType(a.overrideMimeType);void 0!==a.responseType&&(b.responseType=a.responseType);void 0!==a.timeout&&(b.timeout=a.timeout);void 0!==a.data?("typified"===a.data_type?b.send(w(a.data)):"string"===typeof a.data?b.send(a.data):b.send(JSON.stringify(a.data)),d.onprogress&&b.upload&&(b.upload.onprogress=q.onprogress)):b.send()}catch(l){console.error(l.stack);var x=v(l.message);c("onerror",x);c("ondone",
x);e&&(m=x)}m=m||(e?h():{});return n.copy({abort:function(){b.abort()}},m)};Registry.register("xmlhttprequest","5570",function(a,d){u=d;r=a;return{run:G,makeErrorResponse:v}})});
