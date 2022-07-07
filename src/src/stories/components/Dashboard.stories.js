import DashboardExample from './DashboardExample.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Dashboard',
  component: DashboardExample
};

let widgetsClone = [];
let configureClone = 0;

const Template = (args, { argTypes }) => ({
  components: { DashboardExample },
  props: Object.keys(argTypes),
  template: `
    <dashboard-example
      :templates="templates"
      :editing="editing"
      :mockZIndex="mockZIndex"
      :drawerMinWidth="drawerMinWidth"
      :templatesTabLabel="templatesTabLabel"
      :propertiesTabLabel="propertiesTabLabel"
      :configurationTabLabel="configurationTabLabel"
      :dragOffsetX="dragOffsetX"
      :dragOffsetY="dragOffsetY"
    />
  `,
});

export const Default = Template.bind({});

Default.args = {
  templates: [{
    id: "6ab68192-9d23-45a0-8741-76140f17ad0f",
    configurable: false,
    code: "templates.first",
    label: "First template",
    description: "I do hope to write a description one day",
    icon: "mdi-fire",
    width: 3,
    height: 2
  }, {
    id: "573d1616-3232-472f-939f-bebfa05fa7e1",
    configurable: false,
    code: "templates.second",
    label: "Second template",
    description: "I do hope to write another, purer description one day",
    icon: "mdi-fire-truck",
    width: 3,
    height: 2
  }],
  editing: true,
  mockZIndex: 3,
  drawerMinWidth: "min(40vw, 450px) !important",
  templatesTabLabel: "Widgets",
  propertiesTabLabel: "Properties",
  configurationTabLabel: "Widget configuration",
  dragOffsetX: 10,
  dragOffsetY: 10,
};