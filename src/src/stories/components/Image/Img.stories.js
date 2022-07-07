import DImg from '@/components/DImg.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Image/Image",
  component: DImg,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DImg },
  props: Object.keys(argTypes),
  data: () => ({ 
    valueClone: "", 
    srcClone: "" 
  }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    },
    src(newSrc) {
      this.srcClone = newSrc;
    }
  },
  computed: {
    oProps() {
      const { value, src, ...others } = this.$props;
      return others;
    },
  },
  mounted() {
    this.valueClone = this.value;
    this.srcClone = this.src;
  },
  template: `
    <d-img 
      v-bind="oProps" 
      :src="srcClone" 
      v-model="valueClone" 
      @remove="valueClone = null; srcClone = null;"
    />
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 100,
  value: "",
  src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
};