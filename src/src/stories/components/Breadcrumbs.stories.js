import DBreadcrumbs from '@/components/DBreadcrumbs.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Breadcrumbs",
  component: DBreadcrumbs,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DBreadcrumbs },
  props: Object.keys(argTypes),
  template: '<d-breadcrumbs v-bind="$props"></d-breadcrumbs>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {  
  items: [{text:"page 1", href:"#"}, {text:"page 2",  href:"#"}, {text:"page 3"}] 
};
