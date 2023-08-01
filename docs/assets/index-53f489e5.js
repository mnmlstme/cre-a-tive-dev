import { i as init, r as register } from './runtime-b82be6bf.js';

init({});
import('./templates.html-6297fbba.js')
          .then((mod) => register(mod, "templates.html.js", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            for ( let def = body.firstElementChild; def; def=body.firstElementChild ) {
              container.appendChild(def); }
          }));
import('./scenes.html-2c4abae9.js')
          .then((mod) => register(mod, "scenes.html.js", "html", (resource, container) => {
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
import('./styles.css-113fb7df.js')
          .then((mod) => register(mod, "styles.css.js", "css", (resource, container) => {
          let sheet = document.createElement("style");
          sheet.innerHTML = resource.default;
          container.appendChild(sheet);
        }));
import('./module-966c0c4f.js')
          .then((mod) => register(mod, "Kram_e2bdb492_WebComponents", "js", null));
