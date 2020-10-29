<script>

let mark = require('mark.js');
let rangy = require('rangy-selectionsaverestore');
let randomColor = require('randomcolor');
let jss = require('jss').default;
import useRhymeMarker from './use-rhyme-highlight';

let useRhymeHighlighter = useRhymeMarker(mark, rangy, randomColor, jss);

export default {
  name: 'RhymeHighlight',
  setup() {
    return useRhymeMarker(mark, rangy, randomColor, jss)
  }
};

export { useRhymeHighlighter };
</script>

<template>
  <div ref="myInput" class="rhyme-highlight" contenteditable="true" @input="updateHighlights">
     At a loss, the fat cat sat on the mat, like a boss.
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