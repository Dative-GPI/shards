import DTile from '@/components/DTile.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Tile",
  component: DTile
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DTile },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: [] }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    }
  },
  computed: {
    oProps(){
      const {value, ...others} = this.$props;
      return others
    }
  },
  mounted() {
    this.valueClone = this.value;
  },
  template: 
    `
    <d-tile v-model="valueClone" v-bind="oProps">

      <template #status>
        <div style="height: 80px; background-color: whitesmoke;" />
      </template>

      <template #footer>
        <div style="height: 90px; background-color: whitesmoke;"/> 
      </template>
    </d-tile>
    `
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  selectable: false,
  value: false,
  width: 300,
  height: 230,
  imgSrc: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
};

