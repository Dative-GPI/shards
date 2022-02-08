import DSwitchGrid from '@/components/DSwitchGrid.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/SwitchGrid",
  component: DSwitchGrid,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSwitchGrid },
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
    `<d-switch-grid
      v-model="valueClone" v-bind="oProps"
    >
    </d-switch-grid>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      id: "plats",
      label: "Plats",
      options: [
        {
          id: "steak-frites",
          label: "Steak Frites",
        },
        {
          id: "caviar",
          label: "Caviar",
        },
        {
          id: "pates-carbo",
          label: "Pates Carbo",
        },
      ],
    },
    {
      id: "boissons",
      label: "Boissons",
      options: [
        {
          id: "soda",
          label: "Soda",
        },
        {
          id: "jus-de-fruit",
          label: "Jus de Fruits",
        },
        {
          id: "eau",
          label: "Eau",
        },
      ],
    },
  ],
  value: [],
  editable: false,
  selectAllBtns: true,
  selectByCategoryBtns: false,
  searchable: true,
  hideHeader: false,
};

