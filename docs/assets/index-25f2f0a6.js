import { i as init, _ as __vitePreload, r as register } from './runtime-8c3b144e.js';

init({"name":"Figma"});
__vitePreload(() => import('./index-fbb88871.js'),true?["assets/index-fbb88871.js","assets/react-is.production.min-82ffd0b0.js"]:void 0)
          .then((mod) => register(mod, "undefined", "jsx", function(resource, container, initial) {
      if ( typeof (resource && resource.mount) === 'function' ) {
        return resource.mount(container, initial)
      }}));
