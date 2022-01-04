import DSimpleCheckbox from '@/components/DSimpleCheckbox.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Checkbox',
  component: DSimpleCheckbox,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSimpleCheckbox },
  props: Object.keys(argTypes),
  template: '<d-simple-checkbox v-bind="$props"></d-switch>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});