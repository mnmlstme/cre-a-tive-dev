var C=Object.defineProperty;var L=(s,e,o)=>e in s?C(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var d=(s,e,o)=>(L(s,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const x="modulepreload",P=function(s){return"/"+s},w={},R=function(e,o,r){if(!o||o.length===0)return e();const t=document.getElementsByTagName("link");return Promise.all(o.map(n=>{if(n=P(n),n in w)return;w[n]=!0;const i=n.endsWith(".css"),E=i?'[rel="stylesheet"]':"";if(!!r)for(let a=t.length-1;a>=0;a--){const c=t[a];if(c.href===n&&(!i||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${E}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":x,i||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),i)return new Promise((a,c)=>{l.addEventListener("load",a),l.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e()).catch(n=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n})};let p=null,g={},m={};function A(s,e){Object.assign(g,s),p=e&&document.getElementById(e)||document.body.appendChild(document.createElement("div")),customElements.define("kram-main",y),customElements.define("kram-toc",v),customElements.define("kram-scene",b)}function $(s,e,o,r){const t=N(s,e,r);if(o&&t){const{pending:n=[]}=m[o]||{};m[o]={name:e,module:s,render:t},console.log(`[kram-11ty] '${o}' scenes rendered from`,e,t),n.map(i=>i(t))}}function I(s){return new Promise((e,o)=>{const r=m[s];r&&r.render?e(r.render):r&&r.pending?r.pending.push(e):m[s]={pending:[e]}})}function N(s,e,o){let r=(t,n)=>{console.log("Cannot render scene; module not mounted:",e)};try{o?r=o(s,p,g):typeof(s&&s.mount)=="function"?r=s.mount(p,g):r=()=>null,console.log("Module mounted:",e,r)}catch(t){console.log("Warning: module not mounted",e,t)}return r}const u=class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(u.html_template.cloneNode(!0))}};d(u,"html_template",k`<article>
    <header>
      <h1><slot name="title">Untitled Workbook</slot></h1>
      <nav><slot name="nav"><a href="#">Contents</a></slot></nav>
    </header>
    <main><slot></slot></main>
  </article>
  <style>
    article {
      display: contents;
    }
    header { display: contents; }
    h1 {   
      font-family: var(--font-display);
      color: var(--color-accent);
      margin: 0;
      grid-area: hd;
      align-self: baseline; }
    ::slotted([slot="title"]) { margin: 0; }
    nav { 
      grid-column: nav;
      grid-row: nav/span 2;
      align-self: baseline;
    }
    nav a {
      font-family: var(--font-display);
      color: var(--color-accent);
    }
    main { 
      display: contents; 
    }
  </style>
  `);let y=u;const h=class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(h.html_template.cloneNode(!0)),this.clickHandler=e=>{this.scrollToId(e.target.dataset.idref)}}connectedCallback(){this.shadowRoot.querySelector("#list").addEventListener("click",this.clickHandler)}scrollToId(e){if(console.log("Clicked on ",e),e){const o=document.getElementById(e);o&&o.scrollIntoView(!0)}}};d(h,"html_template",k`<details>
    <summary><slot name="summary">Contents</slot></summary>
    <slot id="list"></slot>
  </details>
  <style>
  details { position: relative; z-index: 10; }
  summary { text-align: right; }
  #list { cursor: pointer; }
  `);let v=h;const f=class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(f.html_template.cloneNode(!0))}connectedCallback(){const e=this.getAttribute("norender"),o=this.getAttribute("language"),r=this.getAttribute("scene");if(this.setAttribute("id",`scene-${r}`),this.shadowRoot.querySelector("#link").setAttribute("href",`#scene-${r}`),this.style.setProperty("--scene-number",`"${r}"`),typeof e!="string"){const t=document.createElement("figure"),n=document.createElement("div");t.setAttribute("slot","rendering"),this.appendChild(t),I(o).then(i=>{i(parseInt(r),n),t.appendChild(n)})}else this.style.setProperty("--scene-display-mode","none")}scrollIntoView(e){this.shadowRoot.querySelector("header").scrollIntoView(e)}};d(f,"html_template",k`<section>
    <header>
      <slot name="title"><h1></h1></slot>
      <a id="link" href="#">/</a>
      <slot name="rendering">
        <figure id="rendering">
          Nothing rendered (yet).
        </figure>
      </slot>
      <slot name="scenecode">No code for this scene.</slot>
    </header>
    <main>
      <slot>Discussion</slot>
    </main>
  </section><style>
    :host { 
      --scene-number: "##";
      --scene-template: 
        ". title title title number . "
        ". scene scene scene scene . "
        ". .     code  code  code  .";
      display: contents;
    }
    section {
      display: contents;
    }
    header {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: var(--page-grid-template);
      grid-template-columns: subgrid;
      grid-template-areas: var(--scene-template);
      align-items: baseline;
      column-gap: var(--spacing-medium);
      margin-block: var(--spacing-large);
      background: var(--color-background-accent);
    }
    ::slotted([slot="title"]),
    slot[name="title"] > h1 { 
      grid-area: title;
      margin-top: var(--spacing-medium);
      font-size: var(--font-size-large);
      font-weight: 300;
    }
    #link {
      grid-area: number;
      margin-top: var(--spacing-medium);
      font-size: var(--font-size-large);
      text-align: right;
      text-decoration: none;
    }
    #link::before {
      display: inline-block;
      content: var(--scene-number);
      text-decoration: inherit;
    }
    slot[name="scenecode"],
    slot[name="rendering"] {
      visibility: hidden;
    }
    ::slotted([slot="scenecode"]) { 
      visibility: visible;
      grid-area: code;
    }
    ::slotted(figure[slot="rendering"]) {
      visibility: visible;
      display: flex;
      aspect-ratio: 4;
      margin: 0;
      padding-inline: var(--scene-padding-inline);
      flex-direction: column;
      align-items: start;
      justify-content: space-around;
      grid-area: scene;
      background: var(--scene-background);
      border-radius: var(--scene-border-radius);
      font-family: var(--scene-font);
      color: var(--scene-text-color);
    }
    ::slotted(h1), ::slotted(h2), ::slotted(h3), h1, h2, h3, a {
      font-family: var(--font-display);
      color: var(--color-accent);      
      font-weight: 300;
    }
    main { 
      display: contents;
    }
  </style>`);let b=f;function k(s,...e){const o=s.flatMap((t,n)=>n?[e[n-1],t]:[t]);let r=document.createElement("template");return r.innerHTML=o,r.content}export{R as _,A as i,$ as r};
