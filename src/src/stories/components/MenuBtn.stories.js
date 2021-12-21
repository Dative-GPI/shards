import DMenuBtn from '@/components/DMenuBtn.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Menu Button",
  component: DMenuBtn,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DMenuBtn },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: [] }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    }
  },
  computed: {
    oProps() {
      const { value, ...others } = this.$props;
      return others
    }
  },
  mounted() {
    this.valueClone = this.value;
  },
  template: '<d-menu-btn v-model="valueClone" v-bind="oProps" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: [
    { id: "S", index: 0, text: "Select", hidden: false },
    { id: "T", index: 1, text: "Toto", hidden: false },
    { id: "H", index: 2, text: "Hello", hidden: false },
    { id: "W", index: 3, text: "World", hidden: false },
    { id: "Z", index: 3, text: "World", hidden: false },
    { id: "X", index: 3, text: "World", hidden: false },
    { id: "z", index: 3, text: "World", hidden: false },
    { id: "a", index: 3, text: "World", hidden: false },
    { id: "b", index: 3, text: "World", hidden: false }
  ],
  itemText: "text",
  itemValue: "id",
  showAllText: 'Show All',
  label: "Colonnes",
  searchLabel: "Rechercher",
  responsive: true,
  searchable: true
};
