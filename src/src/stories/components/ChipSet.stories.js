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
  inputLabel: "Add New",
};

const Template2 = (args, { argTypes }) => ({
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
      <template #input>  
        <d-autocomplete :items="items" @input="valueClone.push($event)" return-object item-text="label" />
      </template>
    </d-chip-set>`,
});

//👇 Each story then reuses that template
export const Objects = Template2.bind({});
Objects.args = {
  value: [{ label: "ChipSet", value: 5 }, { label: "Toto", value: 4 }, { label: "Hello", value: 7 }, { label: "World", value: 6 }],
  items: [{ label: "Coucou", value: 1 }, { label: "Hello", value: 2 }],
  editable: true,
  itemText: "label",
  inputLabel: "Add New"
};

