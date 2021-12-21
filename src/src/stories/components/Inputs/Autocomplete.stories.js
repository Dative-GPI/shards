import DAutocomplete from '@/components/DAutocomplete.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Autocomplete',
  component: DAutocomplete,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DAutocomplete },
  props: Object.keys(argTypes),
  template: '<d-autocomplete item-text="value" item-value="key" v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { 
  items: [
    { key: "T", value: "Toto" }, 
    { key: "U", value: "UYhu" }, 
    { key: "H", value: "Hello" }, 
    { key: "W", value: "World" }
  ],
  value: "T",
  label: "Autocomplete",
  editable: true,
  outlined: false
};