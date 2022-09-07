import DSlider from '@/components/DSlider.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Slider',
  component: DSlider,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DSlider },
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
  template: '<d-slider v-model="valueClone" v-bind="oProps" class="mt-8"></d-slider>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: false,
  editable: true,
  showValue: true,
  min: 0,
  max: 100,
  step: 10,
  thumbLabel: true
}