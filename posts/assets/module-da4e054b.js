// module Kram_81736e8a_word-wrap (ES6)
          
          console.log('Loading module "Kram_81736e8a_word-wrap"');
          function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 1
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

// JS Definition from scene 2
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

// JS Definition from scene 2
function logSolution(algo, lines, ...args) {
  console.log(`=> ${algo} Subproblem[${args.join(",")}] solved: `, lines);
  return lines;
}

// JS Definition from scene 3
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

// JS Definition from scene 4
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

// JS Definition from scene 5
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

// JS Definition from scene 5
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

// JS Definition from scene 6
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
    const text = (this.textContent || input.textContent).trim();
    console.log("Text input:", text);
    const words = text.split(/\s+/);
    console.log("Words:", words);
    const fn = WordWrapElement.algorithms[algo] || wordWrapTabular;
    const maxWidth = width ? parseInt(width) : 40;
    const costFn = (k) => k * k;
    const lines = fn(words, maxWidth, costFn);
    const costs = itemizedCosts(lines, maxWidth, costFn);

    if (width) {
      this.style.setProperty("--width-to-wrap", width);
    }

    output.textContent = lines.map((list) => list.join(" ")).join("\n");

    costing.replaceChildren(...costs);
  }

  static algorithms = {
    greedy: wordWrapGreedy,
    brute: wordWrapBrute,
    memo: wordWrapMemo,
    tab: wordWrapTabular,
  };
}

customElements.define("word-wrap", WordWrapElement);

            return ({
              
            })
          }
          function mount (mountpoint, initial) {
            let Store = {
              root: Object.assign({}, initial),
            };
            const connectStore = (path = ["root"]) => {
              let root = Store;
              path.forEach((key) => root = root[key]);
              return ({
                root,
                get: (key) => root[key],
                set: (key, value) => root[key] = value,
                keys: () => Object.keys(root),
              })};
            const program = Program({connectStore});
            return (n, container) => {
              program[n-1].call(container);
            }
          }

export { Program, mount };
