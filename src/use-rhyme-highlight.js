let uniqid = require('uniqid');
let rhymeDetector = require('rhyme-detector');
let { onMounted, ref } = require('vue');

export default function(marker, ranger, colourer, styler) 
{ 
  const myInput = ref(null);
  let rhymeMarker;
  const colorsSeed = uniqid();

  let updateHighlights = function() {
      let rhymeGroups = rhymeDetector(myInput.value.innerText);

      let colors = colourer({ luminosity: 'light', count: rhymeGroups.length, seed: colorsSeed });

      let rhymeStyles = {};
      
      colors.forEach((color, i) => {
        rhymeStyles[`rhyme-group-${i}`] = { 'background-color': color };
      });

      const sheet = styler.createStyleSheet(rhymeStyles)
      sheet.attach();

      let savedSel = ranger.saveSelection();

      rhymeMarker.unmark({
        done: () => {
          rhymeGroups.forEach((group, i) =>
             rhymeMarker.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes[`rhyme-group-${i}`] }));
         
         ranger.restoreSelection(savedSel, true);
        }
      });
  };
 
  let mounted = onMounted(() => 
  {
      rhymeMarker = new marker(myInput.value);
      updateHighlights(); 
  });
  
  return { mounted, myInput, updateHighlights }
}
