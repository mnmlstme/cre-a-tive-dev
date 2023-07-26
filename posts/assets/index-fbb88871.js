import { I as Im, c as createRoot, R as React } from './react-is.production.min-82ffd0b0.js';

const Redux = require("redux");
function Program(css) {
  return ({ name }) => ({});
}
const mapStateToProps = (state) => ({
  name: state.get("name")
});
function mount(mountpoint, initial) {
  const init = Im.Map(initial);
  const store = Redux.createStore(update);
  const props = Object.assign(
    mapStateToProps(store.getState()),
    { dispatch: store.dispatch }
  );
  typeof CssModule !== "undefined" ? CssModule.locals : {};
  const krumbs = Program()(props);
  return (n, container) => {
    const root = createRoot(container);
    root.render(React.createElement(krumbs[n - 1]), container);
  };
  function update(state = init, action = {}) {
    let value = state.get("value");
    switch (action.type) {
      case "Increment":
        console.log("increment", state);
        return state.set("value", value + 1);
      case "Decrement":
        console.log("decrement", state);
        return state.set("value", value - 1);
      default:
        return state;
    }
  }
}

export { Program, mount };
