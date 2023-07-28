---
title: Better Word Wrap for the Web
platform: web-standard
---

```html
<word-wrap width="25">
  We hold these truths to be self-evident, that all people are created equal,
  that they are endowed by their Creator with certain unalienable Rights, that
  among these are Life, Liberty and the pursuit of Happiness.
</word-wrap>
```

The word wrap problem is to optimize the line breaks in a paragraph of text, such that
_ breaks occur only between words
_ no line is longer than a given width, and \* minimize the raggedness of the right edge according to some cost function.
Following Knuth's algorithm in TeX, we will build a custom element that improves on the browser's built-in greedy algorithm by applying dynamic programming.

First some simplifying assumptions:

1. monospace font
2. no hyphenation
3. all lines equal length
4. last line not justified

Because we use a monospace font, we don't need to ask the browser for the width of each word. We can also use `<pre>` to display the result.

We will give each line break a cost of <math>s<sup>2</sup></math> where <math>s</math>
is the number of spaces left at the end of the line before the break.

```js
function lineBreakCost(words, maxWidth, costFn) {
  const slack = maxWidth - lineWidth(words);

  return costFn(slack);
}

function lineWidth(words) {
  return (
    words.length -
    1 +
    words.map((w) => w.length).reduce((acc, curr) => acc + curr, 0)
  );
}

function itemizedCosts(lines, maxWidth, costFn) {
  const costs = lines.map((words, i) =>
    i === lines.length - 1 ? 0 : lineBreakCost(words, maxWidth, costFn)
  );
  const totalCost = costs.reduce((a, b) => a + b);
  const makeItem = (cost) => {
    let li = document.createElement("li");
    li.textContent = cost;
    return li;
  };

  return costs.concat([totalCost]).map(makeItem);
}
```

---

## The Greedy algorithm

```html
<h2>The Greedy Algorithm</h2>
<word-wrap algo="greedy" width="25">
  We hold these truths to be self-evident, that all people are created equal,
  that they are endowed by their Creator with certain unalienable Rights, that
  among these are Life, Liberty and the pursuit of Happiness.
</word-wrap>
```

```js
function wordWrapGreedy(words, maxWidth) {
  let lines = [];
  let remainingWidth = maxWidth;

  for (const w of words) {
    if (lines.length && w.length + 1 <= remainingWidth) {
      // keep word on same line
      lines[lines.length - 1].push(w);
      remainingWidth = remainingWidth - w.length - 1;
    } else {
      // start new line with word
      lines.push([w]);
      remainingWidth = maxWidth - w.length;
    }
  }

  return logSolution("greedy", lines);
}
```

```js
function logSolution(algo, lines, ...args) {
  console.log(`=> ${algo} Subproblem[${args.join(",")}] solved: `, lines);
  return lines;
}
```

---

## The (Brute Force) Recursive algorithm

```html
<h2>The Recursive (Brute Force) Algorithm</h2>
<word-wrap algo="brute" width="25">
  We hold these truths to be self-evident, that all people are created equal.
</word-wrap>
```

In the brute force algorithm, we do an exhaustive search for the lowest-cost solution.
Whenever we have the option to break or not, we recurse to two subproblems:

1. Break the line, and start the next line with the current word
2. Insert the word on the current line, and move to the next word.

After computing the costs on each subproblem, compare them and compare the cost of each,
after accounting for the cost of the line break in choice 1.

```js
function wordWrapBrute(words, maxWidth, costFn) {
  return wordWrapRecursive().lines;

  function wordWrapRecursive(
    wordIndex = 0,
    remainingWidth = maxWidth,
    currentLine = []
  ) {
    const currentWord = words[wordIndex];

    if (wordIndex === words.length - 1) {
      // Base case for last word; fit it if you can
      if (currentWord.length + 1 <= remainingWidth) {
        // it fits, don't count cost of last line
        return {
          cost: 0,
          lines: logSolution(
            "brute",
            [currentLine.concat([currentWord])],
            wordIndex,
            remainingWidth
          ),
        };
      } else {
        // it doesn't fit, count cost of broken line
        return {
          cost: costFn(remainingWidth),
          lines: logSolution(
            "brute",
            [currentLine, [currentWord]],
            wordIndex,
            remainingWidth
          ),
        };
      }
    }

    // Option 1: start new line with word
    const withBreak = wordWrapRecursive(
      wordIndex + 1,
      maxWidth - currentWord.length,
      [currentWord]
    );
    const costOfBreak = costFn(remainingWidth);

    if (currentWord.length + 1 <= remainingWidth) {
      // Current word will fit; we have a choice
      // Option 2: keep word on this line
      const withoutBreak = wordWrapRecursive(
        wordIndex + 1,
        remainingWidth - currentWord.length - 1,
        currentLine.concat([currentWord])
      );

      if (withoutBreak.cost <= withBreak.cost + costOfBreak) {
        return withoutBreak;
      }
    }

    return {
      cost: withBreak.cost + costOfBreak,
      lines: logSolution(
        "brute",
        [currentLine].concat(withBreak.lines),
        wordIndex,
        remainingWidth
      ),
    };
  }
}
```

---

## The Memoized (DP) Algorithm

```html
<h2>Dynamic Programming — Memoized Recursive</h2>
<word-wrap algo="memo" width="25">
  We hold these truths to be self-evident, that all people are created equal,
  that they are endowed by their Creator with certain unalienable Rights, that
  among these are Life, Liberty and the pursuit of Happiness.
</word-wrap>
```

Since the brute force algorithm demonstrates both Optimal Substructure and
Overlapping Subproblems, we can use dynamic programming techniques to optimize it

```js
function wordWrapMemo(words, maxWidth, costFn) {
  let cache = words.map(() => []);
  const makeMemo = (i, k, value) =>
    logSolution("memo", (cache[i][k] = value), i, k);
  const fromMemo = (i, k) => cache[i][k];

  return wordWrapRecursive().lines;

  function wordWrapRecursive(
    wordIndex = 0,
    remainingWidth = maxWidth,
    currentLine = []
  ) {
    const memoized = fromMemo(wordIndex, remainingWidth);

    if (memoized) {
      return memoized;
    }

    const currentWord = words[wordIndex];

    if (wordIndex === words.length - 1) {
      // Base case for last word; fit it if you can
      if (currentWord.length + 1 <= remainingWidth) {
        // it fits, don't count cost of last line
        return makeMemo(wordIndex, remainingWidth, {
          cost: 0,
          lines: [currentLine.concat([currentWord])],
        });
      } else {
        // it doesn't fit, count cost of broken line
        return makeMemo(wordIndex, remainingWidth, {
          cost: costFn(remainingWidth),
          lines: [currentLine, [currentWord]],
        });
      }
    }

    // Option 1: start new line with word
    const withBreak = wordWrapRecursive(
      wordIndex + 1,
      maxWidth - currentWord.length,
      [currentWord]
    );
    const costOfBreak = costFn(remainingWidth);

    if (currentWord.length + 1 <= remainingWidth) {
      // Current word will fit; we have a choice
      // Option 2: keep word on this line
      const withoutBreak = wordWrapRecursive(
        wordIndex + 1,
        remainingWidth - currentWord.length - 1,
        currentLine.concat([currentWord])
      );

      if (withoutBreak.cost <= withBreak.cost + costOfBreak) {
        return makeMemo(wordIndex, remainingWidth, withoutBreak);
      }
    }

    return makeMemo(wordIndex, remainingWidth, {
      cost: withBreak.cost + costOfBreak,
      lines: [currentLine].concat(withBreak.lines),
    });
  }
}
```

---

## The Tabulation (DP) Algorithm

```html
<h2>Dynamic Programming — Tabulation</h2>
<word-wrap algo="tab" width="25">
  We hold these truths to be self-evident, that all people are created equal,
  that they are endowed by their Creator with certain unalienable Rights, that
  among these are Life, Liberty and the pursuit of Happiness.
</word-wrap>
```

The memoized algorithm is fairly natural to express because it can be derived
directly from the recursive solution.
However, in some cases, an alternative formulation called the tabulation method
can be considered a "better fit" for the application requirements.

In our recursive word wrap algorithm,
the base case--where the recursion bottoms out--was the _last word_ of the paragraph.
But think about the word processing use case for a moment.
People enter a paragraph of text starting with the first word, not the last word.
If we are writing a WYSIWYG word processor--or even a text editor with word wrap--
we want to reprocess the current paragraph every time a new word--even a new character--
is entered.

With our previous memoized algorithm, adding a word at the end of an paragraph
which has already been processed, invalidates all cached subproblem results.
The algorithm cannot be applied _incrementally_, and as more words are added,
the time required grows.
In fact the total time spent to process all revisions of the paragraph bumps the
time complexity from O(N^2) to O(N^3).

To solve this, we can reformulate the problem so that its base case is the _first word_
of the paragraph, and each subproblem consists of adding a word at the end.
This way, all the work we do solving smaller subproblems is still valid and
can be used when solving the next larger subproblem.

We start by pre-computing--and extending as words are added--a sparse matrix
<math>lc<sub>i, j</sub></math> which maintains the cost of a line containing words <math>i</math>
through <math>j</math>. This matrix is sparse because <math>i ≤ j</math> and we can
also exclude any combinations of <math>(i, j)</math> where the words would not fit on one line.

```js
function computeLineCosts(words, maxWidth, costFn) {
  let lc = [];

  for (let i = 0; i < words.length; i++) {
    lc[i] = [];
    for (let j = i; j < words.length; j++) {
      const isLastLine = j === words.length - 1;
      const k = maxWidth - lineWidth(words.slice(i, j + 1));
      if (k < 0) {
        // no more words will fit on the line
        break;
      }
      lc[i][j] = isLastLine ? 0 : costFn(k);
    }
  }

  console.log("computeLineCosts: lc=", lc);
  return lc;
}
```

With <math>lc</math> computed, we can now compute the solution with optimal cost <math>c<sub>j</sub></math>
for first <math>j</math> words for increasing values of <math>j</math>, using
only the <math>lc</math> values and previous values of <math>c<sub>j</sub></math>.

The idea is that when computing <math>c<sub>j</sub></math>, we need to decide
(optimally) how many words to place on the last line of a paragraph containing
<math>j</math> words.
We already know from <math>lc<sub>i, j</sub></math> the cost of
all possible lines ending with word <math>j</math>.
And we've already solved <math>c<sub>i</sub></math> for <math>i ≤ j</math>,
which we can use to optimally set the previous lines.

```js
function wordWrapTabular(words, maxWidth, costFn) {
  const lc = computeLineCosts(words, maxWidth, costFn);
  let solution = [];
  const cost = (n) => (n < 0 ? 0 : solution[n].cost);
  const lines = (n) => (n < 0 ? [] : solution[n].lines);

  // solve for paragraphs with j words, as j increases
  for (let j = 0; j < words.length; j++) {
    let options = [];
    // try all values of i for which lc[i][j] is defined
    for (let i = j; i >= 0 && lc[i][j] !== undefined; i--) {
      // cost of putting words i thru j on last line
      // plus the optimal cost for the first i-1 words
      options[j - i] = { i, cost: lc[i][j] + cost(i - 1) };
    }
    // select the minimum cost option
    const best = options.reduce((a, b) => (a.cost < b.cost ? a : b));
    const lastLine = words.slice(best.i, j + 1);
    // add the last line to the lines from the previous solution
    solution[j] = logSolution(
      "tab",
      {
        lines: lines(best.i - 1).concat([lastLine]),
        ...best,
      },
      j
    );
  }

  return solution[words.length - 1].lines;
}
```

---

## The testing framework

```html
<template id="word-wrap-template">
  <section>
    <h3>Input:</h3>
    <pre id="input"><slot> 
      Enter some particularly interesting text here.
    </slot></pre>
    <h3>Output:</h3>
    <pre id="output"></pre>
    <ul id="costing"></ul>
    <h3>Execution Time:</h3>
    <p id="timing">Running…</p>
  </section>
  <style>
    :host {
      --width-to-wrap: 40;
    }
    section {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      align-items: baseline;
      gap: 2rem;
    }
    h3 {
      grid-column-start: 1;
    }
    pre#input {
      grid-column-end: span 2;
      max-width: 80ch;
      white-space: normal;
    }
    pre#output {
      border: 1px dotted black;
      width: calc(var(--width-to-wrap) * 1ch);
      line-height: 1.5;
    }
    ul {
      list-style: none;
      padding: 0;
      text-align: right;
      width: fit-content;
    }
    li + li:not(:last-child)::before {
      content: "+ ";
      display: inline;
    }
    li:last-child {
      border-top: 1px solid;
      font-weight: bold;
    }
  </style>
</template>
```

```js
function perfRun(thunk) {
  const start = performance.now();
  let iterations = 1;
  const result = thunk();
  let time = performance.now() - start;

  if (time < 1) {
    iterations = 100;
  } else if (time < 10) {
    iterations = 10;
  }

  for (let i = 1; i < iterations; i++) {
    thunk();
  }

  time = performance.now() - start;

  return { result, avgTime: time / iterations, iterations };
}
```

```js
class WordWrapElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("word-wrap-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    const width = this.getAttribute("width");
    const algo = this.getAttribute("algo");
    const input = this.shadowRoot.getElementById("input");
    const output = this.shadowRoot.getElementById("output");
    const costing = this.shadowRoot.getElementById("costing");
    const timing = this.shadowRoot.getElementById("timing");
    const text = (this.textContent || input.textContent).trim();
    console.log("Text input:", text);
    const words = text.split(/\s+/);
    console.log("Words:", words);
    const fn = WordWrapElement.algorithms[algo] || wordWrapTabular;
    const maxWidth = width ? parseInt(width) : 40;
    const costFn = (k) => k * k;
    const run = perfRun(() => fn(words, maxWidth, costFn));
    const lines = run.result;
    const costs = itemizedCosts(lines, maxWidth, costFn);

    if (width) {
      this.style.setProperty("--width-to-wrap", width);
    }

    output.textContent = lines.map((list) => list.join(" ")).join("\n");
    costing.replaceChildren(...costs);
    timing.textContent =
      run.iterations > 1
        ? `${run.avgTime}ms (avg over ${run.iterations} runs)`
        : `${run.avgTime}ms`;
  }

  static algorithms = {
    greedy: wordWrapGreedy,
    brute: wordWrapBrute,
    memo: wordWrapMemo,
    tab: wordWrapTabular,
  };
}

customElements.define("word-wrap", WordWrapElement);
```
