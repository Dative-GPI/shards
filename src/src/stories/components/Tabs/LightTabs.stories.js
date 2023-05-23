import DLightTabs from "@/components/DLightTabs.vue";
import DTabs from "@/components/DTabs.vue";
import DTab from "@/components/DTab.vue";
import DTabsItems from "@/components/DTabsItems.vue";
import DTabItem from "@/components/DTabItem.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Tabs/LightTabs",
  component: DLightTabs,
  subcomponents: { DTabs, DTab, DTabsItems, DTabItem },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DLightTabs, DTabs, DTab, DTabsItems, DTabItem },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: 0, tabsClone: [] }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    },
    tabs(newVal) {
      this.tabsClone = [...newVal];
    }
  },
  computed: {
    oProps() {
      const { value, ...others } = this.$props;
      return others;
    },
  },
  methods: {
    addItem() {
      this.tabs.push({ label: "item " + (this.tabs.length + 1), error: this.tabs.length % 2 == 0 });
    },
    removeItem(index) {
      this.tabs.splice(index, 1);
    },
  },
  mounted() {
    this.valueClone = this.value;
    this.tabsClone = [];
  },
  template: `
    <div>
      <d-light-tabs 
        v-model="valueClone" 
        v-bind="oProps"
        :tabs="tabs"
        :editable="editable"
        @add:item="addItem" 
        @remove:item="removeItem"
      >
        <template #items>
          <d-tab-item v-for="(item, index) in tabs" :key="'item ' + index">
           item {{index + 1}} selected
          </d-tab-item>
        </template>
      </d-light-tabs>
    </div>
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  maxItems: 5,
  minItems: 0,
  tabs: [],
  editable: true,
  tabsBarClasses: "mb-5"
};
