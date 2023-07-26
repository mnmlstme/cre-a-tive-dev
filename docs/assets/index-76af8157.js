import { i as init, _ as __vitePreload, r as register } from './runtime-8c3b144e.js';

init({"count":999,"tenth":0.1,"hello":"Hello, world"});
__vitePreload(() => import('./Main-31d566dc.js'),true?[]:void 0)
          .then((mod) => register(mod, "MyProject.ElmIntro.Main", "elm", function(resource, mountpoint, initial){
        let { Elm } = resource;
        let safety = mountpoint.appendChild(document.createElement('div'));
        let elmNode = safety.appendChild(document.createElement('div'));
        let app =
          Elm.MyProject.ElmIntro.Main.init({ node: elmNode, flags: initial });
        return (n, container) => {
          console.log('Elm rendering scene ', n);
          app.ports.kram_render.send(n-1); /* render the scene */
          let toolbox = safety.lastElementChild;
          if ( toolbox &&
            toolbox.style &&
            toolbox.style.position === 'fixed') {
            /* make it absolute instead of fixed */
            console.log('Adjusting position of Elm debug tools');
            toolbox.style.position = 'absolute';
          }
          container.appendChild(safety); /* move it into the scene */
        }
      }));
__vitePreload(() => import('./styles-89b22184.js'),true?[]:void 0)
          .then((mod) => register(mod, "Styles", "css", function(resource, container, initial) {
      if ( typeof (resource && resource.mount) === 'function' ) {
        return resource.mount(container, initial)
      }}));
