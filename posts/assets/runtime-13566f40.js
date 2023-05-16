true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
            fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
            fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const styles = '';

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
    // @ts-expect-error true will be replaced with boolean later
    if (!true || !deps || deps.length === 0) {
        return baseModule();
    }
    const links = document.getElementsByTagName('link');
    return Promise.all(deps.map((dep) => {
        // @ts-expect-error assetsURL is declared before preload.toString()
        dep = assetsURL(dep);
        if (dep in seen)
            return;
        seen[dep] = true;
        const isCss = dep.endsWith('.css');
        const cssSelector = isCss ? '[rel="stylesheet"]' : '';
        const isBaseRelative = !!importerUrl;
        // check if the file is already preloaded by SSR markup
        if (isBaseRelative) {
            // When isBaseRelative is true then we have `importerUrl` and `dep` is
            // already converted to an absolute URL by the `assetsURL` function
            for (let i = links.length - 1; i >= 0; i--) {
                const link = links[i];
                // The `links[i].href` is an absolute URL thanks to browser doing the work
                // for us. See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5
                if (link.href === dep && (!isCss || link.rel === 'stylesheet')) {
                    return;
                }
            }
        }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
        }
        const link = document.createElement('link');
        link.rel = isCss ? 'stylesheet' : scriptRel;
        if (!isCss) {
            link.as = 'script';
            link.crossOrigin = '';
        }
        link.href = dep;
        document.head.appendChild(link);
        if (isCss) {
            return new Promise((res, rej) => {
                link.addEventListener('load', res);
                link.addEventListener('error', () => rej(new Error(`Unable to preload CSS for ${dep}`)));
            });
        }
    })).then(() => baseModule());
};

let mountElement = null;
let state = {};
let registry = {};

function init(initialState, mountpoint) {
  Object.assign(state, initialState);
  mountElement =
    (mountpoint && document.getElementById(mountpoint)) ||
    document.body.appendChild(document.createElement("div"));
  customElements.define("kram-main", MainElement);
  customElements.define("kram-scene", SceneElement);
}

function register(module, name, language, bindFn) {
  const render = mount(module, name, bindFn);
  if (language && render) {
    const { pending = [] } = registry[language] || {};
    registry[language] = { name, module, render };
    console.log(`[kram-11ty] '${language}' scenes rendered from`, name, render);
    pending.map((resolve) => resolve(render));
  }
}

function whenCanRender(language) {
  return new Promise((resolve, reject) => {
    const reg = registry[language];
    if (reg && reg.render) {
      resolve(reg.render);
    } else if (reg && reg.pending) {
      reg.pending.push(resolve);
    } else {
      registry[language] = { pending: [resolve] };
    }
  });
}

function mount(mod, name, bindfn) {
  let render = (n, container) => {
    console.log("Cannot render scene; module not mounted:", name);
  };

  try {
    if (bindfn) {
      render = bindfn(mod, mountElement, state);
    } else if (typeof (mod && mod.mount) === "function") {
      render = mod.mount(mountElement, state);
    } else {
      render = () => null;
    }
    console.log("Module mounted:", name, render);
  } catch (err) {
    console.log("Warning: module not mounted", name, err);
  }

  return render;
}

class MainElement extends HTMLElement {}

class SceneElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      SceneElement.html_template.cloneNode(true)
    );
  }

  connectedCallback() {
    const scnum = this.getAttribute("scene");
    const lang = this.getAttribute("language");
    const slot = document.createElement("div");

    slot.setAttribute("slot", "rendering");
    this.appendChild(slot);

    whenCanRender(lang).then((render) => {
      console.log(`Rendering scene (${lang}):`, scnum);
      render(parseInt(scnum), slot);
    });
  }

  static html_template = template`<section>
    <figure id="rendering">
      <slot name="rendering">Nothing rendered (yet).</slot>
    </figure>
    <main>
      <slot>Discussion</slot>
    </main>
  </section><style>
    section {
      display: contents;
    }
    figure {
      grid-column: 2 / span 2;
      aspect-ratio: 16 / 9;
      width: max-content;
      height: auto;
    }
    main {
      display: contents;
    }
    ::slotted(p) {
      grid-column: 3 / span2;
    }
    ::slotted(h1) {
      grid-column: 2;
    }
    ::slotted(kram-code) {
      grid-column: 2 / span 2;
    }
  </style>`;
}

function template(strings, ...values) {
  const html = strings.flatMap((s, i) => (i ? [values[i - 1], s] : [s]));
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

export { __vitePreload as _, init as i, register as r };
