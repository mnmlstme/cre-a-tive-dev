(()=>{"use strict";var e,t,n,r,a={},o={};function l(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,exports:{}};return a[e].call(n.exports,n,n.exports,l),n.exports}l.m=a,l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"==typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"==typeof n.then)return n}var a=Object.create(null);l.r(a);var o={};e=e||[null,t({}),t([]),t(t)];for(var i=2&r&&n;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,l.d(a,o),a},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((t,n)=>(l.f[n](e,t),t)),[])),l.u=e=>"kram."+e+".js",l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},r="Kram_module:",l.l=(e,t,a,o)=>{if(n[e])n[e].push(t);else{var i,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var d=s[u];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==r+a){i=d;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.setAttribute("data-webpack",r+a),i.src=e),n[e]=[t];var m=(t,r)=>{i.onerror=i.onload=null,clearTimeout(p);var a=n[e];if(delete n[e],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(r))),t)return t(r)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),c&&document.head.appendChild(i)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="/",(()=>{var e={803:0};l.f.j=(t,n)=>{var r=l.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,a)=>r=e[t]=[n,a]));n.push(r[2]=a);var o=l.p+l.u(t),i=new Error;l.l(o,(n=>{if(l.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",i.name="ChunkLoadError",i.type=a,i.request=o,r[1](i)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,a,[o,i,c]=n,s=0;if(o.some((t=>0!==e[t]))){for(r in i)l.o(i,r)&&(l.m[r]=i[r]);c&&c(l)}for(t&&t(n);s<o.length;s++)a=o[s],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0},n=self.webpackChunkKram_module=self.webpackChunkKram_module||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i={};l.r(i),l.d(i,{default:()=>c});const c=Object.assign({modules:[],project:"MyProject",plugin:{displayName:"Elm",description:"The Elm Architecture: a pure functional language with ADTs and an MVU architecture",languages:{elm:"Elm",css:"Cascading Style Sheets",svg:"Scalable Vector Graphics"},modules:[{language:"elm"},{language:"css"},{language:"svg"}]},hashkey:"5269f509",moduleName:"Kram_5269f509_ElmIntro",title:"Introduction to Elm",basename:"ElmIntro",platform:"elm",languages:["elm","css"],init:{count:999,tenth:.1,hello:"Hello, world"},shape:{record:{count:"int",tenth:"float",hello:"string"}},imports:[],scenes:[{blocks:[["fence",{tag:"code",preformatted:!0,lang:"elm",markup:"```",block:!0,id:"krumb-0",mode:"eval"},'Html.div [ class "hi" ]\n  [Html.text hello]\n\n'],["heading",{tag:"h1",block:!0,markup:"#"},"Introduction"],["paragraph",{tag:"p",block:!0,markup:""},"We can write Html expressions in Elm and have them rendered."],["heading",{tag:"h3",block:!0,markup:"###"},"subtitle"],["paragraph",{tag:"p",block:!0,markup:""},"We can also pull in CSS classes and reference them using the ",["code_inline",{tag:"code",block:!1,markup:"`"},"class"]," attribute."],["fence",{tag:"code",preformatted:!0,lang:"css",markup:"```",block:!0,id:"krumb-13",mode:"define"},".hi {\n  font-family: Georgia;\n  color: #835cf0;\n  font-size: 4rem;\n}\n"]],title:"Introduction"},{blocks:[["fence",{tag:"code",preformatted:!0,lang:"elm",markup:"```",block:!0,id:"krumb-15",mode:"eval"},'Html.input\n  [ Attr.type_ "number"\n  , Attr.value <| asString count\n  ]\n  []\n'],["heading",{tag:"h1",block:!0,markup:"#"},"Functions"],["paragraph",{tag:"p",block:!0,markup:""},"We can put lots of examples in the same file like this."],["paragraph",{tag:"p",block:!0,markup:""},'We can also define "helper" functions to make the view more',"\n","concise."],["fence",{tag:"code",preformatted:!0,lang:"elm",markup:"```",block:!0,id:"krumb-25",mode:"define",type:"function",name:"asString"},"asString: Int -> String\nasString n =\n  String.fromInt n\n"],["paragraph",{tag:"p",block:!0,markup:""},"Alternatively, we can use views to test or demo the functions","\n","that we define in the same file."]],title:"Functions"}]},{modules:[{language:"elm",filepath:"elm/MyProject/ElmIntro/Main.elm",use:"[object Object],[object Object]",bind:function(e,t,n){let{Elm:r}=e,a=t.appendChild(document.createElement("div")),o=a.appendChild(document.createElement("div")),l=r.MyProject.ElmIntro.Main.init({node:o,flags:n});return(e,t)=>{console.log("Elm rendering scene ",e),l.ports.kram_render.send(e-1);let n=a.lastElementChild;n&&n.style&&"fixed"===n.style.position&&(console.log("Adjusting position of Elm debug tools"),n.style.position="absolute"),t.appendChild(a)}},loader:()=>l.e(838).then(l.t.bind(l,3838,23))},{language:"lang",filepath:"elm/MyProject/ElmIntro/styles.css",use:"[object Object]",bind:function(e,t){let n=document.createElement("style");return n.innerHTML=e.default,t.appendChild(n),function(e,t){}},loader:()=>l.e(455).then(l.bind(l,2455))}]});window.Kram_module=i})();