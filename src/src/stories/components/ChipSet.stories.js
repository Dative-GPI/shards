import DChipSet from '@/components/DChipSet.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/ChipSet",
  component: DChipSet
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DChipSet },
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
  template:
    `<d-chip-set v-model="valueClone" v-bind="oProps">
    </d-chip-set>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: ["ChipSet", "Toto", "Hello", "World"],
  editable: true,
  inputLabel: "Add New"
};

//👇 Each story then reuses that template
export const Objects = Template.bind({});
Objects.args = {
  value: [{ label: "ChipSet" }, { label: "Toto" }, { label: "Hello" }, { label: "World" }],
  editable: true,
  itemText: "label",
  inputLabel: "Add New"
};

