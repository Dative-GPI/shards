import DAutocompleteChipSet from '@/components/DAutocompleteChipSet.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/AutocompleteChipSet',
  component: DAutocompleteChipSet,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DAutocompleteChipSet },
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
  template: '<d-autocomplete-chip-set v-model="valueClone" v-bind="oProps"/>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  items: [
    { id: "1", label: "Achilles" },
    { id: "2", label: "Persée" },
    { id: "3", label: "Thésée" },
    { id: "4", label: "Hérakles" },
    { id: "5", label: "Ulysse" }
  ],
  value: [{ id: "1", label: "Achilles" }],
  itemKey: "id",
  itemLabel: "label",
  editable: true,
  outlined: false
};