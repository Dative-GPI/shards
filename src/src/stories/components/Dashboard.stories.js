import DDashboard from '@/components/dashboard/DDashboard.vue';
import DBaseWidget from "@/components/dashboard/DBaseWidget.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Dashboard',
  component: DDashboard
};

let widgetsClone = [];
let configureClone = 0;

const Template = (args, { argTypes }) => ({
  components: { DDashboard, DBaseWidget },
  data: () => ({ widgetsClone, configureClone }),
  props: Object.keys(argTypes),
  template: `
  <d-dashboard
    :style="{ height: '95vh !important' }"
    :widgets.sync="widgetsClone"
    :configure="configureClone"
    :editing="editing"
    :width="width"
    :height="height"
    :dragOffsetX="10"
    :dragOffsetY="10"
  >
    <template #widget="{ item, dragStart, drag, dragEnd, dragEnter }">
      <d-base-widget
        :clickable="false"
        :configurable="true"
        :editing="true"
        :item="item"
        :meta="item.meta"
        :style="{ backgroundColor: 'white', border: '2px solid red' }"
        @dragstart="(event) => dragStart(item, event)"
        @drag="(event) => drag(event)"
        @dragend="(event) => dragEnd()"
        @dragenter="(event) => dragEnter()"
        @configure="configureClone++"
      >
        <template #widget>
          item {{ item }}
        </template>
      </d-base-widget>
    </template>
    <template #mock="{ item }">
      <d-base-widget
        :clickable="false"
        :configurable="item.configurable"
        :mock="true"
        :item="item"
        :meta="item.meta"
        :style="{ backgroundColor: 'white', border: '2px solid blue' }"
      >
        <template #widget>
        item {{ item }}
        </template>
      </d-base-widget>
    </template>
    <template #templates="{ dragStart, drag, dragEnd }">
      <v-row no-gutters class="mt-5 px-2">
        <d-search-input v-model="search" />
      </v-row>
      <v-row no-gutters class="mt-5 px-2">
        <v-container
          fluid
          class="ma-0 pa-0"
          :style="{ flexGrow: '1 !important', overflowY: 'scroll', scrollbarWidth: 'none' }"
        >
          <d-base-widget
            v-for="template in templates"
            :key="template.id"
            :clickable="false"
            :configurable="template.configurable"
            :template="true"
            :item="template"
            :meta="{}"
            @dragstart="(event) => dragStart(template, event)"
            @drag="(event) => drag(event)"
            @dragend="(event) => dragEnd()"
          >
            <template #widget>
              item {{ template }}
            </template>
          </d-base-widget>
        </v-container>
      </v-row>
    </template>
    <template #properties>
      <v-row no-gutters class="mt-5 px-2">
        <d-text-field
          :label="'Label*'"
          v-model="label"
        />
      </v-row>
    </template>
  </d-dashboard>`,
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
  width: 16,
  height: 9,
  label: "My dashboard",
  search: ""
};