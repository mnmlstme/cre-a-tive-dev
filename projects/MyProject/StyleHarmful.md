---
title: "`style` Considered Harmful"
platform: react-redux
imports:
model:
  btnText: Button
---

# `style` Considered Harmful

It's long been considered that using inline CSS (i.e., the `style` property) in HTML is poor practice. Here are just two discussion threads:

- [Stack Overflow: What's so bad about in-line CSS?](https://stackoverflow.com/questions/2612483/whats-so-bad-about-in-line-css)
- [Quora: Is it really a bad practice to use inline styles in HTML?](https://www.quora.com/Is-it-really-a-bad-practice-to-use-inline-styles-in-HTML)

What's less clear is whether it remains a poor practice in today's world of client-side rendering and CSS-in-JS. Do the arguments against using `style` still hold true for React components?

Most arguments against using inline CSS revolve around two observations:

1. Inline CSS is not DRY (Don't Repeat Yourself).
2. Inline CSS mixes the separate concerns of presentation and content or interaction.

With CSS-in-JS, issue #1 may no longer be an issue. Tools like `styled-components` allow you to define CSS classes and share them with other components. Inline styles are no longer needed.

Issue #2 is still a concern, even with CSS-in-JS. The JS for styling is usually kept in the same file as the content (HTML/JSX) or the interaction (also JS). If a developer wants to only change the styling of a component, they usually have to go to the component's JSX and find the relevant style declarations. This, like inline CSS, mixes the concerns of presentation and content/interaction.

That's not to say it isn't possible to keep the concerns separate using CSS-in-JS. But it takes more discipline. Imagine a system where all style declarations are maintained in separate `*.css.js` files, which `export` JS constants for all the "classes". At this point, however, one may as well write straight CSS and use [postcss-modules](https://www.npmjs.com/package/postcss-modules) to enable the classes to be `import`ed as JS.

---

## HTML `style` vs React `style`

What is the difference between the `style` attribute in HTML and defining a React component to accept a `style` property? In HTML, the impact of every possible value of the `style` property is documented and standardized. Standards change slowly, and such changes are always backward-compatible. So if an app developer adds a `style` to an HTML element, they can be sure it will continue to do the same thing for a long time. As long as they don't change something else in the application code, the presentation will never change.

But the same cannot be said of a `style` property on a React component. This is because the impact of the `style` on the component is not documented and no guarantee can be made that it will have the same effect in future versions of the component. As a result, if an app developer adds a `style` to a React element, they cannot be sure this code will continue to work in the future. Any time the React component (which is in a library they don't control) changes, there is the possibility the presentation will change, *even if they never change the application code*.

---

## A Simple Example: `Button`

```jsx
<p>
  Here is our original <V1.Button>{btnText}</V1.Button>.
</p>
```

To show just how likely this is to happen, let's take at a simple implementation of a button, apply a `style` inline, and then look at other ways `<Button>` could be defined that would change the way the `style` property impacts the presentation.

Here is the original `<Button>` code:

```jsx
const UnstyledButton = (args) => (
  // NOTE: NOT recommended to pass `style` prop
  <button className={args.className} style={args.style}>
    {args.children}
  </button>
);

const V1 = {
  Button: (args) => (
    <UnstyledButton className={css.button_v1} {...args}>
      {args.children}
    </UnstyledButton>
  ),
};
```

```css
.button_v1 {
  display: inline-block;
  padding: 0 16px;
  line-height: 22px;
  border: 2px solid;
  border-radius: 4px;
}
```

---

## Inline `style` on `Button`

```jsx
<p>
  Here is our original <V1.Button>{btnText}</V1.Button> and inline-modified{" "}
  <V1.Button
    style={{
      border: "4px solid red",
      padding: "0 14px",
      lineHeight: "18px",
    }}
  >
    {btnText}
  </V1.Button>
  .
</p>
```

Now let's try adding an inline style. Let's say we want the outline to be 4px thick, but we don't want the overall size of the button to change.

Inspecting the CSS, we see that the padding is currently `0` vertically and `16px` horizontally.
We can't subtract the extra `2px` from `0`, so we also need to change `line-height` from `22px` to `18px`.We will also make the border red.

---

## Revised `Button` in library

```jsx
<p>
  Here is our updated <V2.Button>{btnText}</V2.Button> and modified{" "}
  <V2.Button
    style={{
      border: "4px solid red",
      padding: "0 14px",
      lineHeight: "18px",
    }}
  >
    {btnText}
  </V2.Button>
  .
</p>
```

Now let's say the `Button` component is reimplemented. To simplify the calculations for padding, the library maintainers have decided to use generated content (the `::after` pseudo-element) to place the border on top of the button so it does not interact with the padding.

Here is the updated CSS for Button:

```jsx
const V2 = {
  Button: (args) => (
    <UnstyledButton className={css.button_v2} {...args}>
      {args.children}
    </UnstyledButton>
  ),
};
```

```css
.button_v2 {
  display: inline-block;
  position: relative;
  padding: 4px 16px;
  line-height: 18px;
  border: none;
  border-radius: 4px;
}

.button_v2::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 2px solid;
  border-radius: inherit;
}
```

As a result, there is no visible change to the Button in the library version, but the modified version now has two borders: the outer red one from the override, as well as the inner black one from the updated library.

Notice that the application code did not change, other than the reference to the newer version of the library. So the issue may not be found by the QA team which is focusing on new or modified parts of the application. And when the problem is eventually discovered, the application developers will suspect the bug is in the library, since nothing changed in their code.

This is how opening up the `style` property can lead to unexpected results in application code, and maintenance effort for the library team.

---

## But isn't `className` just as bad?

Similar problems can arise when using `className` to override the styling of a component. The main reason why this is not as worrisome is that to override `className`, application developers need to create a CSS class. Whether they do it using a CSS file, `styled-components`, `tailwind`, etc, the CSS is part of a class or component _definition_, not a component _instance_.

There are also legitimate uses of `className` that cannot be distinguished from the problematic ones. Some common cases are

- Building up composites, where a component’s role in the composite is specified by applying a class, e.g. `modal-header`
- Laying out components within a grid or flex container
- Applying CSS animations to components

---

## Use CSS custom properties, not inline `style`

```jsx
<p>
  Here is our updated <V3.Button>{btnText}</V3.Button> and modified{" "}
  <V3.Button
    style={{
      // Here we only set custom properties
      "--button-border-thickness": "4px",
      "--button-border-color": "red",
    }}
  >
    {btnText}
  </V3.Button>
  .
</p>
```

Depending on the component, there may be some CSS properties that need to be modified by the consuming application. This often happens when the application wants to control the placement or layout of a component.

Inline styles can also be useful for allowing parameterized styles, where the component’s CSS references CSS custom properties (also known as CSS variables). `styled-components` uses this approach to do dynamic styling.

It is tempting to say that since there are legitimate use cases for setting CSS properties inline, we need to allow consuming applications to set `style`. In fact, in HTML, that is the only way to code these use cases. But luckily, React gives us other options.

First, let’s look at solutions that are CSS-only. Can a CSS class indicate which properties can be set on individual elements? Although there is no public/private access control in CSS, CSS custom properties are one mechanism which CSS provides for defining an interface to a class. Calling these CSS variables reminds us that they can change, often on a per-instance basis.

Since the common practice is to define CSS variables and then compute standard CSS properties from the custom ones, it is reasonably safe to override CSS variables.

Let’s go back to the `Button` example, and see how we might use CSS variables to make a forward-compatible interface that allows modifying the thickness and color of the border. For now, let’s work in CSS only, and not modify the React component. We will still need to set the `style` property, but only for setting CSS variables.

```jsx
const V3 = {
  Button: (args) => (
    <UnstyledButton className={css.button_v3} {...args}>
      {args.children}
    </UnstyledButton>
  ),
};
```

```css
:root {
  --button-border-thickness: 2px;
  --button-border-color: currentColor;
}

.button_v3 {
  display: inline-block;
  position: relative;
  padding: 4px 16px;
  line-height: 18px;
  border: none;
  border-radius: 4px;
}

.button_v3::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: solid;
  border-width: var(--button-border-thickness);
  border-color: var(--button-border-color);
  border-radius: inherit;
}
```

Note that the intent of the application code is also much clearer, and doesn’t need to reference `padding` or `line-height`.

Another advantage is that CSS variables are inherited. Since the variables are declared in `:root`, their values can be modified at any level of the DOM. So if we apply the `style` to the `p`, every button inside would be affected.

---

## Using CSS Variables with React

```jsx
<p>
  Here is our standard <V4.Button>{btnText}</V4.Button> and customized{" "}
  <V4.Button
    customize={{
      "border-thickness": "4px",
      "border-color": "red",
    }}
  >
    {btnText}
  </V4.Button>
  .
</p>
```

While CSS variables give us a way to allow safe modification of component properties, we still need to pass them through the `style` property, which allows all CSS properties to be modified. While we could filter the `style` prop before passing it down, this might be confusing to app developers.

We could add properties to `Button` for every CSS variable which we introduce in the definition. These properties would also be type-checked. However, this could potentially be a large number of properties which could conflict with the names of other properties. It would also be difficult to maintain such a wide interface.

Alternatively, we will pass all the customizations as one property, which we’ll call `customize`. This has some distinct advantages:

- In application code, it is very clear where customization is occurring because all components will use the same property name `customize` for this purpose.
- We can write a generic function to convert the `customize` property to a `style` property.
- Type-checking is possible, but not required. The `customize` property can be declared as `any`.
- App developers can discover customization points by inspecting the CSS and looking for the `var` references.
- New customization points are easy to add by modifiyng only the CSS.

Here is an example of a `Button` component that provides customization points for the border color and thickness:

```jsx
const customizeStyle = (comp, params = {}) =>
  Object.fromEntries(
    Object.entries(params).map(([prop, value]) => [`--${comp}-${prop}`, value])
  );

const CustomButton = (args = {}) => (
  <button
    className={args.className}
    style={customizeStyle("button", args.customize)}
  >
    {args.children}
  </button>
);

const V4 = {
  Button: (args) => (
    <CustomButton className={css.button_v3} {...args}>
      {args.children}
    </CustomButton>
  ),
};
```

## Conclusion

Setting an inline `style` on a component can lead to unexpected results and increases the cost of support for a component library. Even in plain HTML, the practice is frowned upon, but until recently there were no good alternatives. CSS custom properties (or ”variables”) have rapidly become a best practice to abstract out of a CSS definition those properties that are expected to be variable. We can leverage CSS variables to provide a stable method of allowing for a wide range of customizations with minimal overhead for library maintainers. For extra safety, type-checking can be added later, once all the required customizations have been determined.
