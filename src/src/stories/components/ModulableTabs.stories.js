import DModulableTabs from "@/components/DModulableTabs.vue";
import DTabs from "@/components/DTabs.vue";
import DTab from "@/components/DTab.vue";
import DTabsItems from "@/components/DTabsItems.vue";
import DTabItem from "@/components/DTabItem.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/ModulableTabs",
  component: DModulableTabs,
  subcomponents: { DTabs, DTab, DTabsItems, DTabItem },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DModulableTabs, DTabs, DTab, DTabsItems, DTabItem },
  props: Object.keys(argTypes),
  data: () => ({ valueClone: 0, listClone: [] }),
  watch: {
    value(newVal) {
      this.valueClone = newVal;
    },
    list(newVal) {
      this.listClone = [...newVal];
    },
  },
  computed: {
    oProps() {
      const { value, ...others } = this.$props;
      return others;
    },
  },
  methods: {
    addItem() {
      this.list.push(this.list.length);
    },
    removeItem() {
      this.list.splice(this.valueClone-this.prependItems, 1);
    },
  },
  mounted() {
    this.valueClone = this.value;
    this.listClone = [];
  },
  template: `
    <div>
      <d-modulable-tabs 
        v-model="valueClone" 
        v-bind="oProps"
        :items-length="list.length"
        @add:item="addItem" 
        @remove:item="removeItem">
        <template #prepend>
          <d-tab>
            Before list
          </d-tab>
        </template>
        <template #append>
          <d-tab>
            After list
          </d-tab>
        </template>
        <template #items>
          <v-tab-item>
          Before list selected !
          </v-tab-item>
          <v-tab-item v-for="item in listClone" :key="item">
           item {{item}} selected
          </v-tab-item>
          <v-tab-item>
          After list selected !
          </v-tab-item>
        </template>
      </d-modulable-tabs>
    </div>
  `,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  maxItems: 10,
  minItems: 1,
  prependItems:1,
  list: [],
  itemsLabel: "item"
};
