let { mount } = require('@vue/test-utils');
let RhymeHighlight = require('../../src/rhyme-highlight.vue').default;



describe('RhymeHighlight.vue', () => {
  it('renders props.msg when passed', () => {
    
    const component = mount(RhymeHighlight, {
      propsData: {
        content: 'poop loop',
      },
    });

    //component.text = () => "the fat cat sat on the mat!!";

    //let thing = document.createElement()
   // component.$refs = { myInput: component.find('#myInput') };
    //component.$refs.myInput.trigger('input');


    expect(wrapper.text()).toContain('poop loop');


//    console.log(component.html());
    
 //   component.trigger('input');
  })
})
