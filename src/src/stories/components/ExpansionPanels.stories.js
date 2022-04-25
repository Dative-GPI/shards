import DExpansionPanels from '@/components/DExpansionPanels.vue';
import DExpansionPanel from '@/components/DExpansionPanel.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/Expansion Panels",
  component: DExpansionPanels,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  components: { DExpansionPanels, DExpansionPanel },
  props: Object.keys(argTypes),
  template:
    `<d-expansion-panels  v-bind="$props">
      <d-expansion-panel>
        <template #panel-header>
          <v-expansion-panel-header>
            <div>{{header}}</div>
          </v-expansion-panel-header>
        </template>
        <template #panel-content>
          <v-expansion-panel-content>
            {{content}}
          </v-expansion-panel-content>
        </template>
      </d-expansion-panel>
    </d-expansion-panels>`,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  header: "Item",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
};

