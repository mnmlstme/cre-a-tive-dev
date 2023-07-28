import { i as init, _ as __vitePreload, r as register } from './runtime-822ccb0e.js';

init({"btnText":"Button"});
__vitePreload(() => import('./index-d660c092.js'),true?["./index-d660c092.js","./react-is.production.min-82ffd0b0.js"]:void 0,import.meta.url)
          .then((mod) => register(mod, "undefined", "jsx", function(resource, container, initial) {
      if ( typeof (resource && resource.mount) === 'function' ) {
        return resource.mount(container, initial)
      }}));
__vitePreload(() => import('./styles-17e14c20.js'),true?[]:void 0,import.meta.url)
          .then((mod) => register(mod, "undefined", "css", function(resource, container, initial) {
      if ( typeof (resource && resource.mount) === 'function' ) {
        return resource.mount(container, initial)
      }}));
