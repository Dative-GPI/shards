import SubTitle from '@/components/DSubTitle.vue';

export default { 
  component: SubTitle,
  title: 'Components/Text/SubTitle'
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { SubTitle },
  props: Object.keys(argTypes),
  template: '<d-sub-title v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  label: 'SubTitle' 
};