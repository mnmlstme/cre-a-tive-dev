import { i as init, _ as __vitePreload, r as register } from './runtime-5be9f52a.js';

init({"count":999,"tenth":0.1,"hello":"Hello, world"});
  
__vitePreload(() => import('./Main-31d566dc.js'),true?[]:void 0)
          .then((mod) => register(mod, "MyProject.ElmIntro.Main", "elm", null));
__vitePreload(() => import('./styles-17e14c20.js'),true?[]:void 0)
          .then((mod) => register(mod, "Styles", "css", null));
