<template>
  <v-container fluid class="pa-0 ma-0 dashboard" ref="dashboard">
    <div ref="fakeDragImage" />
    <div ref="realDragImage" class="realDragImage" :style="{ zIndex: mockZIndex.toString() }">
      <slot
        name="mock"
        v-if="dragging != null"
        :item="dragging"
      />
    </div>
    <v-row no-gutters>
      <v-col class="dashboard-grid">
        <slot
          name="widget"
          v-for="widget in widgets"
          :item="widget"
          :editing="editing"
          :dragStart="dragStart"
          :drag="drag"
          :dragEnd="dragEnd"
          :dragEnter="dragEnter"
        />
        <v-container v-if="editing" fluid class="pa-0 ma-0">
          <v-row no-gutters v-for="(_, y) in height" :key="y">
            <v-row no-gutters v-for="(_, x) in width" :key="x"
              @dragenter.prevent="dragEnter(x, y)"
              @dragover.prevent
              @drop.stop="drop(x, y)"
            >
              <slot name="case" :x="x" :y="y" :hovered="hovered(x, y)">
                <d-dashboard-case :x="x" :y="y" :hovered="hovered(x, y)" />
              </slot>
            </v-row>
          </v-row>
        </v-container>
      </v-col>
      <v-col v-if="editing" :style="{ maxWidth: drawerMinWidth }" @dragenter.stop="dragLeave()">
        <v-container fluid class="ma-0 pa-0 mt-2 px-2 dashboard-drawer">
          <d-tabs v-model="tabs">
            <d-tab :key="0">
              <span class="text-h6"> {{ templatesTabLabel }} </span>
            </d-tab>
            <d-tab :key="1">
              <span class="text-h6"> {{ propertiesTabLabel }} </span>
            </d-tab>
            <d-tab :key="2" :disabled="!configure">
              <span class="text-h6"> {{ configurationTabLabel }} </span>
            </d-tab>
          </d-tabs>
          <d-tabs-items :value="tabs">
            <d-tab-item :value="0">
              <slot name="templates" :dragStart="dragStart" :drag="drag" :dragEnd="dragEnd" />
            </d-tab-item>
            <d-tab-item :value="1">
              <slot name="properties" />
            </d-tab-item>
            <d-tab-item :value="2">
              <slot name="configuration" />
            </d-tab-item>
          </d-tabs-items>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { instanceOfWidget, Widget, WidgetTemplate } from "../../models";
import { GetOutOfMyWay, GuardTypeWidget, GuardTypeWidgetTemplate } from "./helper";

import DDashboardCase from "./DDashboardCase.vue";

@Component({
  components: { DDashboardCase }
})
export default class DDashboard extends Vue {
  @Prop({ required: true })
  widgets!: Widget[];

  @Prop({ required: false, default: false })
  editing!: boolean;

  @Prop({ required: false, default: 0 })
  width!: number;

  @Prop({ required: false, default: 0 })
  height!: number;

  @Prop({ required: false, default: 3 })
  mockZIndex!: number;

  @Prop({ required: false, default: "min(40vw, 450px) !important" })
  drawerMinWidth!: string;

  @Prop({ required: false, default: 0 })
  configure!: number;

  @Prop({ required: false, default: "Widgets" })
  templatesTabLabel!: string;

  @Prop({ required: false, default: "Properties" })
  propertiesTabLabel!: string;

  @Prop({ required: false, default: "Widget configuration" })
  configurationTabLabel!: string;

  @Prop({ required: false, default: 0 })
  dragOffsetX!: number;

  @Prop({ required: false, default: 0 })
  dragOffsetY!: number;

  @Watch("configure")
  onConfigureChange(): void {
    if (this.configure > 0) {
      this.tabs = 2;
    }
    else {
      this.tabs = 0;
    }
  }

  tabs: number = 0;

  dragging: WidgetTemplate | Widget | null = null;
  draggingPosition: { x: number; y: number } = { x: -1, y: -1 };

  get draggingTemplate(): boolean {
    return GuardTypeWidgetTemplate(this.dragging);
  }

  hovered(x: number, y: number): boolean {
    if (this.dragging) {
      return x >= (this.draggingPosition.x) &&
             y >= (this.draggingPosition.y) &&
             x < (this.draggingPosition.x + this.dragging.width) &&
             y < (this.draggingPosition.y + this.dragging.height);
    }
    return false;
  }

  dragStart(item: Widget | WidgetTemplate, event: DragEvent): void {
    (this.$refs.dashboard! as Element).append((this.$refs.realDragImage as Element));
    event.dataTransfer!.setDragImage((this.$refs.fakeDragImage as Element), 0, 0);

    (this.$refs.realDragImage! as HTMLElement).style.left = (event.pageX + this.dragOffsetX).toString() + 'px';
    (this.$refs.realDragImage! as HTMLElement).style.top = (event.pageY + this.dragOffsetY).toString() + 'px';

    this.draggingPosition = { x: this.width + 1, y: this.height + 1 };
    this.dragging = item;
    
    if (instanceOfWidget(item)) {
      this.dragging.width = item.meta.width != null ? parseInt(item.meta.width) : item.width;
      this.dragging.height = item.meta.height != null ? parseInt(item.meta.height) : item.height;
    }
  }

  drag(event: DragEvent): void {
    if (event.pageX !== 0) {
      (this.$refs.realDragImage! as HTMLElement).style.left = `${event.pageX + this.dragOffsetX}px`;
    }
    if (event.pageY !== 0) {
      (this.$refs.realDragImage! as HTMLElement).style.top = `${event.pageY + this.dragOffsetY}px`;
    }
  }

  dragEnd(): void {
    this.draggingPosition = { x: this.width + 1, y: this.height + 1 };
    this.dragging = null;
  }

  dragEnter(x: number, y: number): void {
      this.draggingPosition = { x, y };
  }

  dragLeave(): void {
    this.draggingPosition = { x: this.width + 1, y: this.height + 1 };
  }

  drop(x: number, y: number): void {
    let widgets = _.cloneDeep(this.widgets);

    if (this.dragging != null) {
      let widget: Widget | null = null;

      if (GuardTypeWidget(this.dragging)) {
        widget = widgets.filter(w => w.id === this.dragging!.id)[0];

        widget.x = x;
        widget.y = y;
      }
      else if (GuardTypeWidgetTemplate(this.dragging)) {
        widget = {
          id: "" + Math.random(),
          templateId: this.dragging.id,
          code: this.dragging.code,
          width: this.dragging.width,
          height: this.dragging.height,
          x: x,
          y: y,
          meta: {}
        };
        widgets.push(widget);
      }

      if (widget != null) {
        widgets = GetOutOfMyWay(widget, widgets);
      }
      this.$emit("update:widgets", widgets);
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100% !important;
  position: relative;
  overflow-y: hidden;
}

.dashboard-grid {
  position: relative;
  overflow: scroll;
}

.realDragImage {
  position: absolute;
}
</style>