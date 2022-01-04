import DSwitch from '@/components/DSwitch.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Switch',
  component: DSwitch,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSwitch },
  props: Object.keys(argTypes),
  template: '<d-switch v-bind="$props"></d-switch>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});