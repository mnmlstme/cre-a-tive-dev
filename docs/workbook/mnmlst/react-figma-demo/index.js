(()=>{"use strict";var e,a,t={},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var r=n[e]={exports:{}};return t[e].call(r.exports,r,r.exports,o),r.exports}o.m=t,o.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return o.d(a,{a}),a},o.d=(e,a)=>{for(var t in a)o.o(a,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((a,t)=>(o.f[t](e,a),a)),[])),o.u=e=>"kram."+e+".js",o.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),e={},a="Kram_module:",o.l=(t,n,r,i)=>{if(e[t])e[t].push(n);else{var l,s;if(void 0!==r)for(var c=document.getElementsByTagName("script"),m=0;m<c.length;m++){var p=c[m];if(p.getAttribute("src")==t||p.getAttribute("data-webpack")==a+r){l=p;break}}l||(s=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.setAttribute("data-webpack",a+r),l.src=t),e[t]=[n];var d=(a,n)=>{l.onerror=l.onload=null,clearTimeout(u);var o=e[t];if(delete e[t],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(n))),a)return a(n)},u=setTimeout(d.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=d.bind(null,l.onerror),l.onload=d.bind(null,l.onload),s&&document.head.appendChild(l)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="/",(()=>{var e={860:0};o.f.j=(a,t)=>{var n=o.o(e,a)?e[a]:void 0;if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(((t,o)=>n=e[a]=[t,o]));t.push(n[2]=r);var i=o.p+o.u(a),l=new Error;o.l(i,(t=>{if(o.o(e,a)&&(0!==(n=e[a])&&(e[a]=void 0),n)){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;l.message="Loading chunk "+a+" failed.\n("+r+": "+i+")",l.name="ChunkLoadError",l.type=r,l.request=i,n[1](l)}}),"chunk-"+a,a)}};var a=(a,t)=>{var n,r,[i,l,s]=t,c=0;if(i.some((a=>0!==e[a]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);s&&s(o)}for(a&&a(t);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0},t=self.webpackChunkKram_module=self.webpackChunkKram_module||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))})();var r={};o.r(r),o.d(r,{default:()=>i});const i=Object.assign({modules:[],project:"MyProject",plugin:{description:"React Native rendered in browser by react-native-web",languages:{jsx:"Javascript (React)",js:"Javascript (ES6)"},modules:[{language:"jsx"},{language:"js"}]},hashkey:"160b9720",moduleName:"Kram_160b9720_ReactFigma",title:"React-Figma Demo",basename:"ReactFigma",platform:"react-native",languages:["jsx"],init:{name:"Figma"},shape:{record:{name:"string"}},imports:[{from:"react-native",expose:["StyleSheet","Text","View"]}],scenes:[{blocks:[["heading",{tag:"h1",block:!0,markup:"#"},"Hello, Figma"],["fence",{tag:"code",preformatted:!0,lang:"jsx",markup:"```",block:!0,id:"krumb-3",mode:"eval"},'<Text className="hi">Hello, {name}</Text>\n'],["paragraph",{tag:"p",block:!0,markup:""},"This workbook demonstrates how we can use React to build","\n","components and frames in Figma. The focus is on using React","\n","as the ",["strong",{tag:"strong",block:!1,markup:"**"},"Single Source of Truth"]," for a design system,","\n","including components, styles, and design tokens."],["paragraph",{tag:"p",block:!0,markup:""},"We will build React components in this workbook and then","\n","use ",["link",{href:"https://github.com/react-figma/react-figma",tag:"a",block:!1,markup:""},"react-figma"],"\n","to inject them into a Figma file as components.","\n","This will allow us to prove out the component APIs and ensure the","\n","Figma components are completely specified."]],title:"Hello, Figma"},{blocks:[["heading",{tag:"h1",block:!0,markup:"#"},"A Simple ",["code_inline",{tag:"code",block:!1,markup:"`"},"Tag"]," Component"],["fence",{tag:"code",preformatted:!0,lang:"jsx",markup:"```",block:!0,id:"krumb-14",mode:"eval"},"<View style={tagStyles.root}>\n  <Text style={tagStyles.content}>Tag Text</Text>\n</View>\n"],["paragraph",{tag:"p",block:!0,markup:""},'Whenever we say "component", it may be unclear whether we\'re talking',"\n","about a ",["link",{href:"https://reactjs.org/docs/react-component.html",tag:"a",block:!1,markup:""},"React component"]," or a","\n",["link",{href:"https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma",tag:"a",block:!1,markup:""},"Figma component"],".","\n","This can cause a good deal of confusion and miscommunication between Design and Engineering","\n","teams."],["paragraph",{tag:"p",block:!0,markup:""},"Here we're taking a more abstract and implementation-dependent approach. We are not developing","\n","production-ready React components. We are developing a ",["em",{tag:"em",block:!1,markup:"_"},"specification"]," or ",["em",{tag:"em",block:!1,markup:"_"},"prototype"],"\n","for each of the components."],["paragraph",{tag:"p",block:!0,markup:""},"The choice of React for this representation is somewhat arbitrary.","\n","We need a way to describe a design which can have multiple implementations on various platforms,","\n","in such a way that abstracts out the platform dependencies and focuses on what's common between them.","\n","React is flexible enough, and there is tooling available to render to the web, native iOS/Android, as well as","\n","Figma (through ",["code_inline",{tag:"code",block:!1,markup:"`"},"react-figma"],")."],["fence",{tag:"code",preformatted:!0,lang:"jsx",markup:"```",block:!0,id:"krumb-24",mode:"define",type:"constant",name:"tagStyles"},'const tagStyles = StyleSheet.create({\n  root: {\n    backgroundColor: "#423248",\n    paddingVertical: 4,\n    paddingHorizontal: 8,\n  },\n  content: {\n    color: "white",\n    fontFamily: \'Verdana, Futura, "Trebuchet MS", sans-serif\',\n  },\n});\n']],title:"A Simple Tag Component"}]},{modules:[{language:"jsx",filepath:"react-native/MyProject/ReactFigma/index.jsx",use:'babel-loader?{presets:["@babel/preset-react"],"plugins":[["react-native-web",{"commonjs":true}]]}',bind:function(e,a,t){return e.mount(a,t)},loader:()=>Promise.all([o.e(51),o.e(293),o.e(401)]).then(o.bind(o,8401))}]});window.Kram_module=r})();