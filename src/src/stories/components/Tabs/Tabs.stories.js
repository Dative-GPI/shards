import DTabs from '@/components/DTabs.vue';
import DTab from '@/components/DTab.vue';
import DTabsItems from "@/components/DTabsItems.vue";
import DTabItem from "@/components/DTabItem.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Tabs/SimpleTabs',
  component: DTabs,
  subcomponents: { DTab, DTabsItems, DTabItem }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DTabs, DTab, DTabsItems, DTabItem },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: 0 }),
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
    <div>
      <d-tabs v-model="valueClone">
        <d-tab :error="true">
          Tab avec erreur
        </d-tab>
        <d-tab>
          Tab sans erreur
        </d-tab>
        <d-tab>
          Actif
        </d-tab>
        <d-tab>
          Inactif
        </d-tab>
        <d-tab>
          1
        </d-tab>
        <d-tab>
          2
        </d-tab>
        <d-tab>
          3
        </d-tab>
        <d-tab>
          4
        </d-tab>
        <d-tab>
          5
        </d-tab>
        <d-tab>
          6
        </d-tab>
      </d-tabs>

      <d-tabs-items v-model="valueClone">
        <d-tab-item>Texte 1</d-tab-item>
        <d-tab-item>Texte 2</d-tab-item>
        <d-tab-item>Texte 3</d-tab-item>
        <d-tab-item>Texte 4</d-tab-item>
        <d-tab-item>Texte 5</d-tab-item>
        <d-tab-item>Texte 6</d-tab-item>
        <d-tab-item>Texte 7</d-tab-item>
        <d-tab-item>Texte 8</d-tab-item>
        <d-tab-item>Texte 9</d-tab-item>
        <d-tab-item>Texte 10</d-tab-item>
      </d-tabs-items>
    </div>
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  value: 0,
};