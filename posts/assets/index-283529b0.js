import { i as init, _ as __vitePreload, r as register } from './runtime-8c3b144e.js';

init({});
__vitePreload(() => import('./scenes-149eb9fc.js').then(n => n.t),true?[]:void 0)
          .then((mod) => register(mod, "undefined", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            for ( let def = body.firstElementChild; def; def=body.firstElementChild ) {
              container.appendChild(def); }
          }));
__vitePreload(() => import('./scenes-149eb9fc.js').then(n => n.s),true?[]:void 0)
          .then((mod) => register(mod, "undefined", "html", (resource, container) => {
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
__vitePreload(() => import('./module-da4e054b.js'),true?[]:void 0)
          .then((mod) => register(mod, "Kram_81736e8a_word-wrap", "js", function(resource, container, initial) {
      if ( typeof (resource && resource.mount) === 'function' ) {
        return resource.mount(container, initial)
      }}));
