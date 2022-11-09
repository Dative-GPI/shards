<template>
  <div style="position: relative;">

    <template v-if="editable">
      <div ref="grid"
        class="d-dashboard-grid"
        style="height: 100%"
        v-resize="onResize"
        :style="{
          'background-size': `${backgroundSize}px ${backgroundSize}px`,
          'background-position': `-${backgroundSize / 2}px -${backgroundSize / 2}px`,
          width: `calc(100% - ${drawerWidth}px)`
        }"
        @dragenter.prevent="dragEnter"
        @dragover.prevent="dragOver"
        @drop.stop="drop">

        <div class="d-dashboard-placeholder"
          v-show="hovered"
          :style="{
            top: `${placeholderTop}px`,
            left: `${placeholderLeft}px`,
            width: `${placeholderWidth}px`,
            height: `${placeholderHeight}px`
          }">

        </div>

        <div class="d-dashboard-dragover"
          ref="dragover"
          v-show="hovered"
          :style="{
            width: `${dragoverWidth}px`,
            height: `${dragoverHeight}px`
          }">
          Coucou
        </div>


      </div>
    </template>

    <div class="d-dashboard-widget"
      v-for="widget in widgets"
      :key="widget.id"
      :style="widgetPosition(widget)">
      <slot name="widget"
        v-bind="{ item: widget }" />
    </div>

    <v-navigation-drawer :value="true"
      right
      stateless
      absolute
      hide-overlay
      :width="drawerWidth">
      <div class="ma-1">
        <d-tabs v-model="tabs"
          :fixed-tabs="true"
          height="50"
          :showArrows="false">
          <d-tab :key="0">
            <slot name="tab-dashboard-properties-title">
              <span>
                Dashboard properties
              </span>
            </slot>
          </d-tab>
          <d-tab :key="1">
            <slot name="tab-widget-templates-title">
              <span>
                Widgets
              </span>
            </slot>
          </d-tab>
          <d-tab :key="2"
            :disabled="!configure">
            <slot name="tab-widget-configuration-title">
              <span>
                Widget configuration
              </span>
            </slot>
          </d-tab>
        </d-tabs>

        <d-tabs-items :value="tabs"
          class="ma-4">
          <d-tab-item :value="0">
            <slot name="tab-dashboard-properties"> </slot>
          </d-tab-item>
          <d-tab-item :value="1">
            <slot name="tab-widget-templates">
              <d-search-input v-model="search" />
              <v-list two-line>
                <v-list-item v-for="item in filtredWidgetTemplates"
                  :key="item.id"
                  draggable="true"
                  @dragstart="dragstart(item, $event)"
                  @dragend="dragend"
                  @click="append(item)">
                  <slot name="widget-template"
                    v-bind="{ item, dragstart: ev => dragstart(item, ev), append: () => append(item) }">
                    <v-list-item-avatar>
                      <v-icon x-large
                        v-text="item.icon"></v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="item.label"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                  </slot>
                </v-list-item>
              </v-list>
            </slot>
          </d-tab-item>
          <d-tab-item :value="2">
            <slot name="configuration" />
          </d-tab-item>
        </d-tabs-items>
      </div>
    </v-navigation-drawer>
  </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DDashboardV2 extends Vue {
  tabs: number = 0;

  search = "";

  @Prop({ required: false, default: false })
  editable!: boolean;

  @Prop({ required: false, default: 6 })
  columns!: number;

  @Prop({ required: false, default: () => [] })
  widgetTemplates!: WidgetTemplate[];

  @Prop({ required: false, default: () => [] })
  widgets!: Widget[];

  @Prop({ required: false, default: 500 })
  drawerWidth!: number;

  backgroundSize = 0;
  backgroundPosition = 0;

  hovered = false;

  placeholderTop = 0;
  placeholderLeft = 0;
  placeholderWidth = 0;
  placeholderHeight = 0;

  dragoverTop = 0;
  dragoverLeft = 0;
  dragoverWidth = 300;
  dragoverHeight = 100;

  get configure() {
    return false;
  }

  get filtredWidgetTemplates() {
    if (!this.search) return this.widgetTemplates;
    return this.widgetTemplates.filter(w => (w.label && w.label.toLowerCase().includes(this.search.toLowerCase()))
      || (w.description && w.description.toLowerCase().includes(this.search.toLowerCase())))
  }

  mounted() {
    this.onResize();
  }

  append(item: WidgetTemplate) {

  }

  dragstart(item: WidgetTemplate, ev: DragEvent) {
    console.log("drag start", item, ev);
    this.hovered = true;
    ev.dataTransfer!.setDragImage(this.$refs.dragover as Element, ev.offsetX, ev.offsetY);
  }

  dragEnter(ev: DragEvent) {
    console.log("drag enter", ev);
  }

  dragOver(ev: DragEvent) {
    console.log("drag over", ev);
  }

  drop(ev: DragEvent) {
    console.log("drop", ev);
    this.hovered = false;
  }

  dragend() {

  }

  widgetPosition(item: Widget){
    return {
      top: '0%',
      left: '0%',
      width: '0%',
      height: '0%'
    }
  }

  onResize() {
    this.backgroundSize = Math.floor((this.$el.clientWidth - this.drawerWidth) / this.columns);
    this.backgroundPosition = - Math.floor(this.backgroundSize / 2);
  }

  @Watch("columns")
  onColumnsChanged = this.onResize;
}

interface WidgetTemplate {
  id: string,
  code: string,
  label: string,
  description: string,
  icon: string,
  minWidth: number,
  maxWidth: number
  minHeight: number,
  maxHeight: number
}

interface Widget {
  id: string;
  templateId: string
  code: string;
  width: number;
  height: number;
  x: number;
  y: number;
  meta: { [key: string]: string };
}
</script>