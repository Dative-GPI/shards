<template>
  <d-dashboard
    :style="{ height: '95vh !important' }"
    :editing="editing"
    :mockZIndex="mockZIndex"
    :drawerMinWidth="drawerMinWidth"
    :templatesTabLabel="templatesTabLabel"
    :propertiesTabLabel="propertiesTabLabel"
    :configurationTabLabel="configurationTabLabel"
    :dragOffsetX="dragOffsetX"
    :dragOffsetY="dragOffsetY"

    :width="width"
    :height="height"
    :widgets="widgets"
    :configure="configure"
    @update:widgets="onWidgetsUpdate"
  >
    <template #widget="{ item, dragStart, drag, dragEnd, dragEnter }">
      <d-base-widget
        :clickable="false"
        :configurable="true"
        :editing="true"
        :item="item"
        :meta="item.meta"
        :width="getItemWidth(item)"
        :height="getItemHeight(item)"
        :style="{ backgroundColor: 'white', border: '2px solid red' }"
        @dragstart="(event) => dragStart(item, event)"
        @drag="(event) => drag(event)"
        @dragend="(event) => dragEnd()"
        @dragenter="(event) => dragEnter()"
        @configure="onConfigure(item)"
        @remove="onRemove(item)"
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
        :width="getItemWidth(item)"
        :height="getItemHeight(item)"
        :style="{ backgroundColor: 'white', border: '2px solid blue' }"
      >
        <template #widget>
          <v-row no-gutters class="mt-6">
            {{ item }}
          </v-row>
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
        <v-col cols="6">
          <d-text-field
            min="8"
            type="number"
            class="mr-2"
            :label="'Width*'"
            v-model="width"
          />
        </v-col>
        <v-col cols="6">
          <d-text-field
            min="4"
            type="number"
            class="mr-2"
            :label="'Height*'"
            v-model="height"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-5 px-2">
        <d-text-field
          class="mr-2"
          :label="'Label*'"
          v-model="label"
        />
      </v-row>
    </template>
    <template #configuration>
      <v-row v-if="configure" no-gutters class="mt-5 px-2">
        <v-col cols="6">
          <d-text-field
            type="number"
            class="mr-2"
            :label="'Width*'"
            :value="parseInt(configuringWidget.meta.width)"
            @input="(event) => onWidthChange(event)"
          />
        </v-col>
        <v-col cols="6">
          <d-text-field
            type="number"
            class="mr-2"
            :label="'Height*'"
            :value="parseInt(configuringWidget.meta.height)"
            @input="(event) => onHeightChange(event)"
          />
        </v-col>
      </v-row>
    </template>
  </d-dashboard>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";

import { instanceOfWidget, Widget, WidgetTemplate } from "../../models";

import DDashboard from "../../components/dashboard/DDashboard.vue";
import { GetOutOfMyWay } from "../../components/dashboard/helper";

@Component({
  components: { DDashboard }
})
export default class DashboardExample extends Vue {
  @Prop({ required: true })
  templates!: WidgetTemplate[];

  @Prop({ required: true })
  editing!: boolean;

  @Prop({ required: true })
  mockZIndex!: number;

  @Prop({ required: true })
  drawerMinWidth!: string;

  @Prop({ required: true  })
  templatesTabLabel!: string;

  @Prop({ required: true  })
  propertiesTabLabel!: string;

  @Prop({ required: true  })
  configurationTabLabel!: string;

  @Prop({ required: true })
  dragOffsetX!: number;

  @Prop({ required: true })
  dragOffsetY!: number;

  search: string = "";
  label: string = "My dashboard";
  width: number = 16;
  height: number = 9;
  widgets: Widget[] = [];
  configure: number = 0;
  configuringWidget: Widget | null = null;

  getItemWidth(item: Widget | WidgetTemplate): number | null {
    if (instanceOfWidget(item)) {
      return item.meta.width != null ? parseInt(item.meta.width) : null;
    }
    else {
      return null;
    }
  }

  getItemHeight(item: Widget | WidgetTemplate): number | null {
    if (instanceOfWidget(item)) {
      return item.meta.height != null ? parseInt(item.meta.height) : null;
    }
    else {
      return null;
    }
  }

  onWidgetsUpdate(item: Widget[]): void {
    this.widgets = _.cloneDeep(item);
  }

  onConfigure(item: Widget): void {
    this.configure++;
    this.configuringWidget = item;
  }

  onRemove(item: Widget): void {
    this.widgets = this.widgets.filter(w => w.id !== item.id);
    if (this.configuringWidget != null && this.configuringWidget.id === item.id) {
      this.configure = 0;
      this.configuringWidget = null;
    }
  }

  onWidthChange(value: number): void {
    if (this.configuringWidget != null) {
      let widgets = _.cloneDeep(this.widgets);
      widgets.filter(w => w.id === this.configuringWidget!.id)[0]!.meta!.width = value.toString();
      widgets = GetOutOfMyWay(widgets.filter(w => w.id === this.configuringWidget!.id)[0], widgets);
      this.widgets = widgets;
    }
  }

  onHeightChange(value: number): void {
    if (this.configuringWidget != null) {
      let widgets = _.cloneDeep(this.widgets);
      widgets.filter(w => w.id === this.configuringWidget!.id)[0]!.meta!.height = value.toString();
      widgets = GetOutOfMyWay(widgets.filter(w => w.id === this.configuringWidget!.id)[0], widgets);
      this.widgets = widgets;
    }
  }
}
</script>