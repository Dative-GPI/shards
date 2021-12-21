import DToggle from '@/components/DToggle.vue';
import { Icons } from "@/icons"

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Toggle",
  component: DToggle,
  argTypes: {
    icon: {
      options: Object.keys(Icons).map(i => `$${i}`),
      control: {
        type: "select"
      }
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DToggle },
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
  template: `
  <d-toggle v-model="valueClone" v-bind="oProps">
  </d-toggle>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: true,
  activeColor: 'white-1',
  idleColor: "grey-3",
  activeBackground: "blue-3",
  idleBackground: "blue-4",
  width: 150,
  height: 100,
  icon: "$planning",
  text: "Planning"
};