import DSearchInput from '@/components/DSearchInput.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Search Input',
  component: DSearchInput,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSearchInput },
  props: Object.keys(argTypes),
  template: '<d-search-input v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: "Search",
};