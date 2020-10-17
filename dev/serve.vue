<script>
import Vue from 'vue';
import RhymeHighlight from '@/rhyme-highlight.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    RhymeHighlight
  }
});
</script>

<template>
  <div id="app">
    <rhyme-highlight />
  </div>
</template>
