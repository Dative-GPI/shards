import DTooltip from '@/components/DTooltip.vue';
import { Icons } from "@/icons"

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Tooltip",
  component: DTooltip,
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
  components: { DTooltip },
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
  <div class="d-flex ma-10">
    <d-tooltip>
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on"> {{ text }} </span>
      </template>
      <template>
        <div class="d-flex align-center">
          <span class="mr-2"> {{ tooltip }} </span>
          <v-icon> mdi-pencil </v-icon>
        </div>
      </template>
    </d-tooltip>
  </div>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  text: "Planning",
  tooltip: "Planning tooltip"
};