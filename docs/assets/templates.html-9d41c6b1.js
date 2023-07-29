const t=`<html>
          <body>
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

          </body>
        </html>`;export{t as default};
