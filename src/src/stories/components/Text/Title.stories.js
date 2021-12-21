import Title from '@/components/DTitle.vue';

export default { 
  component: Title,
  title: 'Components/Text/Title',
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { Title },
  props: Object.keys(argTypes),
  template: '<d-title v-bind="$props" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  label: 'Title' 
};