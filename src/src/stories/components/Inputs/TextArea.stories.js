import DTextarea from '@/components/DTextarea.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Text Area',
  component: DTextarea,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DTextarea },
  props: Object.keys(argTypes),
  template: '<d-textarea v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  label: "Text area",
  value: "Blablalb",
  editable: true,
  outlined: false
};