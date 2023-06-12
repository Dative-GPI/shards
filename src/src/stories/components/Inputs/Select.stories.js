import DSelect from '@/components/DSelect.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Select',
  component: DSelect,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSelect },
  props: Object.keys(argTypes),
  template: '<d-select item-text="value" item-value="key" v-bind="$props"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { 
  items: [
    { key: "S", value: "Select" }, 
    { key: "T", value: "Toto" }, 
    { key: "H", value: "Hello" }, 
    { key: "W", value: "World" }
  ],
  value: "S",
  label: "Test",
  editable: true,
  outlined: false
};

export const Clearable = Template.bind({});
Clearable.args = { 
  items: [
    { key: "S", value: "Select" }, 
    { key: "T", value: "Toto" }, 
    { key: "H", value: "Hello" }, 
    { key: "W", value: "World" }
  ],
  value: null,
  label: "Test",
  editable: true,
  clearable: true,
  outlined: false
};

export const ClearableOutlined = Template.bind({});
ClearableOutlined.args = { 
  items: [
    { key: "S", value: "Select" }, 
    { key: "T", value: "Toto" }, 
    { key: "H", value: "Hello" }, 
    { key: "W", value: "World" }
  ],
  value: null,
  label: "Test",
  editable: true,
  clearable: true,
  outlined: true
};