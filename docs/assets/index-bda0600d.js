import{i as h,_ as l,r as c}from"./runtime-2607a40c.js";h({});l(()=>import("./templates.html-9d41c6b1.js"),[]).then(n=>c(n,"undefined","html",(e,o)=>{const d=new DOMParser().parseFromString(e.default,"text/html").body;for(let i=d.firstElementChild;i;i=d.firstElementChild)o.appendChild(i)}));l(()=>import("./scenes.html-78173412.js"),[]).then(n=>c(n,"undefined","html",(e,o)=>{const d=new DOMParser().parseFromString(e.default,"text/html").body,i=Object.fromEntries(Array.prototype.map.call(d.children,r=>[r&&r.dataset.scene,r]).filter(([r])=>!!r));return function(f,p){const s=i[f];if(s)for(let t=s.firstElementChild;t;t=s.firstElementChild){if(t.tagName==="SCRIPT"){const _=t.firstChild;s.removeChild(t),t=document.createElement("script"),t.appendChild(_)}p.appendChild(t)}}}));l(()=>import("./module-e461a79c.js"),[]).then(n=>c(n,"Kram_81736e8a_word-wrap","js",function(e,o,a){if(typeof(e&&e.mount)=="function")return e.mount(o,a)}));