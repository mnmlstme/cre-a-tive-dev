---
title: React-Figma Demo
platform: react-native
imports:
  - from: react-native
    expose:
      - StyleSheet
      - Text
      - View
model:
  name: Figma
---

# Hello, Figma

```jsx
<Text className="hi">Hello, {name}</Text>
```

This workbook demonstrates how we can use React to build
components and frames in Figma. The focus is on using React
as the **Single Source of Truth** for a design system,
including components, styles, and design tokens.

We will build React components in this workbook and then
use [react-figma](https://github.com/react-figma/react-figma)
to inject them into a Figma file as components.
This will allow us to prove out the component APIs and ensure the
Figma components are completely specified.

---

# A Simple `Tag` Component

```jsx
<View style={tagStyles.root}>
  <Text style={tagStyles.content}>Tag Text</Text>
</View>
```

Whenever we say "component", it may be unclear whether we're talking
about a [React component](https://reactjs.org/docs/react-component.html) or a
[Figma component](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma).
This can cause a good deal of confusion and miscommunication between Design and Engineering
teams.

Here we're taking a more abstract and implementation-dependent approach. We are not developing
production-ready React components. We are developing a _specification_ or _prototype_
for each of the components.

The choice of React for this representation is somewhat arbitrary.
We need a way to describe a design which can have multiple implementations on various platforms,
in such a way that abstracts out the platform dependencies and focuses on what's common between them.
React is flexible enough, and there is tooling available to render to the web, native iOS/Android, as well as
Figma (through `react-figma`).

```jsx
const tagStyles = StyleSheet.create({
  root: {
    backgroundColor: "#423248",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  content: {
    color: "white",
    fontFamily: 'Verdana, Futura, "Trebuchet MS", sans-serif',
  },
});
```
