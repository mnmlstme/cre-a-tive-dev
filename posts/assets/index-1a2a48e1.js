import { i as init, _ as __vitePreload, r as register } from './runtime-5be9f52a.js';

init({});
  
__vitePreload(() => import('./templates-4ed993c7.js'),true?[]:void 0)
          .then((mod) => register(mod, "templates.html", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            for ( let def = body.firstElementChild; def; def=body.firstElementChild ) {
              container.appendChild(def); }
          }));
__vitePreload(() => import('./scenes-4ed993c7.js'),true?[]:void 0)
          .then((mod) => register(mod, "scenes.html", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            const scenes = Object.fromEntries(
              Array.prototype.map.call(body.children, (node) => [
              node && node.dataset.scene, node ])
              .filter(([num]) => Boolean(num)));
            return function render (n, container) {
              const scene = scenes[n];
              if( scene ) {
                for( let child = scene.firstElementChild; child; child = scene.firstElementChild ) {
                  if ( child.tagName === 'SCRIPT' ) {
                    const text = child.firstChild;
                    scene.removeChild(child);
                    child = document.createElement('script');
                    child.appendChild(text);
                  } 
                  container.appendChild(child); 
                }
              } 
            }
          }));
__vitePreload(() => Promise.resolve({}),true?["assets/styles-bee8a168.css"]:void 0)
          .then((mod) => register(mod, "styles.css", "css", (resource, container) => {
          let sheet = document.createElement("style");
          sheet.innerHTML = resource.default;
          container.appendChild(sheet);
        }));
__vitePreload(() => import('./module-966c0c4f.js'),true?[]:void 0)
          .then((mod) => register(mod, "Kram_e2bdb492_WebComponents", "js", null));
