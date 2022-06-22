import DIconAutocomplete from '@/components/DIconAutocomplete.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/IconAutocomplete",
  component: DIconAutocomplete,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DIconAutocomplete },
  props: Object.keys(argTypes),
  template: '<d-icon-autocomplete v-bind="$props">{{icon}}</d-icon-autocomplete>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
