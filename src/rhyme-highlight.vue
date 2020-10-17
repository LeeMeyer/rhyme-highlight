<script>
let mark = require('mark.js');
let rangy = require('rangy-selectionsaverestore');
let randomColor = require('randomcolor');
let jss = require('jss').default;
let findRhymes = require('rhyme-detector');
let uniqid = require('uniqid');

export default {
  name: 'RhymeHighlight',
    props: {
    content: {
      default: '',
      type: String,
    },
  },
  mounted() {
   this.markInstance = new mark(this.$refs.myInput);
   this.updateHighlights();
   this.colorsSeed = uniqid();
  },
  methods: {
    
  text() {
    return this.$refs.myInput.innerText
  },
    updateHighlights() 
    {
      console.log(this.$el.innerText);

      let rhymeGroups = findRhymes(this.text() || '');

      let colors = randomColor({
        luminosity: 'light',
        count: rhymeGroups.length,
        seed: this.colorsSeed
      });

      let rhymeStyles = {};
      
      colors.forEach((color, index) => {
        rhymeStyles[`rhyme-group-${index}`] = { 'background-color': color };
      });

      const sheet = jss.createStyleSheet(rhymeStyles)
      sheet.attach();

      let savedSel = rangy.saveSelection();

      this.markInstance.unmark({
        done: () => {
          rhymeGroups.forEach((group, i) =>
             this.markInstance.mark(group.join(' '), 
             { 
               accuracy: {
                value: "exactly",
                limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"]
              },
               className: sheet.classes[`rhyme-group-${i}`], 
               
             }));
         
         rangy.restoreSelection(savedSel, true);
        }
      });
    }
  }
};
</script>

<template>
  <div id="myInput" ref="myInput" class="rhyme-highlight" contenteditable="true" @input="updateHighlights">
     At a loss, the fat chat sat on the mat, like a boss.
  </div>
</template>

<style>
  .rhyme-highlight {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    padding: 25px;
  }
</style>