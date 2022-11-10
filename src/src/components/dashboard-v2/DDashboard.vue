<template>
  <div style="position: relative;" class="h-100 w-100" @dragend="dragend">

    <div ref="grid" class="d-dashboard-grid" :class="{ editable }" v-resize="onResize" :style="{
      'background-size': `${backgroundSize}px ${backgroundSize}px`,
      width: `${backgroundSize * realColumns}px `,
      height: `${toPixelPosition(height)}px`,
      '--nr': height,
      '--nc': realColumns,
      '--b': `${spacing}px` 
    }" @dragover.prevent="dragOver" @drop.stop="drop">

      <template v-if="editable">
        <div class="d-dashboard-placeholder" v-show="dragging" :style="{
          top: `${toPixelPosition(placeholderTop)}px`,
          left: `${toPixelPosition(placeholderLeft)}px`,
          width: `${toPixelSize(placeholderWidth)}px`,
          height: `${toPixelSize(placeholderHeight)}px`
        }">
          <slot name="widget-placeholder"></slot>

        </div>

        <div class="d-dashboard-dragover" ref="dragover" v-show="dragging && draggedType == 'template'" :style="{
          width: `${toPixelSize(dragoverWidth)}px`,
          height: `${toPixelSize(dragoverHeight)}px`,
          top: `${-10000}px`,
          left: `${-10000}px`,
        }">
          <slot name="widget-template-dragover" v-bind="{ templateId: draggedId }"></slot>
        </div>
      </template>


      <div class="d-dashboard-widget" v-for="widget in widgets" :class="{ hidden: dragging && widget.id == draggedId }"
        :key="widget.id" :draggable="editable" @dragstart="dragstartWidget(widget, $event)"
        :style="widgetPosition(widget)">
        <slot name="widget" v-bind="{ item: widget, configure: () => configure(widget) }" />
      </div>
    </div>


    <v-navigation-drawer v-if="editable" :value="true" right stateless fixed hide-overlay :width="drawerWidth">
      <div class="ma-1">
        <d-tabs v-model="tabs" :fixed-tabs="true" height="50" :showArrows="false">
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
          <d-tab :key="2" :disabled="!configuredWidget">
            <slot name="tab-widget-configuration-title">
              <span>
                Widget configuration
              </span>
            </slot>
          </d-tab>
        </d-tabs>

        <d-tabs-items :value="tabs" class="ma-4">
          <d-tab-item :value="0">
            <slot name="tab-dashboard-properties" v-bind="{ computeLayout }">
              <d-btn @click="computeLayout">Compute Layout</d-btn>
            </slot>
          </d-tab-item>
          <d-tab-item :value="1">
            <slot name="tab-widget-templates">
              <d-search-input v-model="search" />
              <v-list two-line>
                <v-list-item v-for="item in filtredWidgetTemplates" :key="item.id" :draggable="editable"
                  @dragstart="dragstartTemplate(item, $event)" @dragend="dragend" @click="append(item)">
                  <slot name="widget-template"
                    v-bind="{ item, dragstart: ev => dragstartTemplate(item, ev), append: () => append(item) }">
                    <v-list-item-avatar>
                      <v-icon x-large v-text="item.icon"></v-icon>
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
            <slot name="configuration" v-bind="{ widgetId: configuredWidget }" />
          </d-tab-item>
        </d-tabs-items>
      </div>
    </v-navigation-drawer>
  </div>
</template>
  
<script lang="ts">
import _ from "lodash"
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(x, b))
}

function createMatrix(m: number, n: number) : (Widget|null)[][] {
  let matrix = []
  for (let i = 0; i < m; i++) {
    let tmp = []
    for (let j = 0; j < n; j++) {
      tmp.push(null);
    }
    matrix.push(tmp);
  }
  return matrix;
}

@Component({
  inheritAttrs: false,
})
export default class DDashboardV2 extends Vue {
  tabs: number = 0;

  search = "";

  @Prop({ required: false, default: false })
  editable!: boolean;
  
  @Prop({ required: false, default: false, type: Boolean })
  autoColumn!: boolean;

  @Prop({ required: false, default: 6 })
  columns!: number;

  @Prop({ required: false, default: 3 })
  minColumns!: number;

  @Prop({ required: false, default: 3 })
  minColumnStep!: number;

  @Prop({required: false, default: 140})
  minColumnSize!: number;

  @Prop({ required: false, default: -1 })
  maxColumns!: number;

  @Prop({ required: false, default: () => [] })
  widgetTemplates!: WidgetTemplate[];

  @Prop({ required: false, default: () => [] })
  widgets!: Widget[];

  @Prop({ required: false, default: 500 })
  drawerWidth!: number;

  @Prop({ required: false, default: 16 })
  spacing!: number;

  @Prop({required: false, default: 6})
  minRows!: number;

  backgroundSize = 0;
  backgroundPosition = 0;
  cellSize = 0;

  dragging = false;
  draggedType: "widget" | "template" | null = null;
  draggedId = ""
  draggedWidth = 0;
  draggedHeight = 0;

  placeholderTop = 0;
  placeholderLeft = 0;
  placeholderWidth = 0;
  placeholderHeight = 0;

  dragoverTop = 0;
  dragoverLeft = 0;
  dragoverWidth = 300;
  dragoverHeight = 100;

  draggingOffsetY = 0;
  draggingOffsetYmin = 0;
  movedWidgets: string[] = [];

  mouseOffsetX = 0;
  mouseOffsetY = 0;

  sortedWidgets: Widget[] = []

  configuredWidget: string | null = null
  computedColumns = 0;

  get realColumns(){
    if(this.autoColumn){
      return this.computedColumns;
    }
    return this.columns;
  }

  get filtredWidgetTemplates() {
    if (!this.search) return this.widgetTemplates;
    return this.widgetTemplates.filter(w => (w.label && w.label.toLowerCase().includes(this.search.toLowerCase()))
      || (w.description && w.description.toLowerCase().includes(this.search.toLowerCase())))
  }

  get notDraggedWidgets() {
    if (this.dragging && this.draggedType == "widget") {
      return this.widgets.filter(w => w.id != this.draggedId);
    }
    return this.widgets;
  }

  get height() {
    return Math.max(Math.max(...this.widgets.map(w => w.y + w.height))+ (this.editable ? 3 : 0), this.minRows)
  }

  mounted() {
    this.onResize();
    this.loadWidgets();
  }

  append(item: WidgetTemplate) {
    let maxY = Math.max(...this.widgets.map(w => w.y + w.height))
    this.$emit("add", { templateId: item.id, x: 0, y: maxY + 1 })
  }

  toPixelPosition(position: number) {
    return position * (this.cellSize + this.spacing);
  }

  toPixelSize(size: number) {
    return size * this.cellSize + (size - 1) * this.spacing;
  }

  dragstartWidget(item: Widget, ev: DragEvent) {

    this.draggedType = "widget";
    this.draggedWidth = item.width;
    this.draggedHeight = item.height;

    this.dragoverWidth = item.width;
    this.dragoverHeight = item.height;

    this.placeholderTop = item.y;
    this.placeholderLeft = item.x;
    this.placeholderWidth = item.width;
    this.placeholderHeight = item.height;

    this.mouseOffsetX = Math.min(ev.offsetX, this.toPixelSize(this.dragoverWidth));
    this.mouseOffsetY = Math.min(ev.offsetY, this.toPixelSize(this.dragoverHeight));

    setTimeout(() => {
      this.dragging = true;
      this.draggedId = item.id;
    }, 100);
  }

  dragstartTemplate(item: WidgetTemplate, ev: DragEvent) {
    this.dragging = true;
    this.draggedType = "template";
    this.draggedId = item.id;
    this.draggedWidth = item.defaultWidth;
    this.draggedHeight = item.defaultHeight;

    this.dragoverWidth = item.defaultWidth;
    this.dragoverHeight = item.defaultHeight;

    this.placeholderWidth = item.defaultWidth;
    this.placeholderHeight = item.defaultHeight;

    this.mouseOffsetX = Math.min(ev.offsetX, this.toPixelSize(this.dragoverWidth));
    this.mouseOffsetY = Math.min(ev.offsetY, this.toPixelSize(this.dragoverHeight));

    ev.dataTransfer!.setDragImage(this.$refs.dragover as Element, this.mouseOffsetX, this.mouseOffsetY);

    this.dragOver(ev);
  }

  dragOver(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()
    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    // this.dragoverLeft = x;
    // this.dragoverTop = y;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns - this.draggedWidth);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);

    this.computeMovedWidgetsThrottled(xRounded, yRounded, this.dragoverWidth, this.dragoverHeight, this.draggedId);

    this.placeholderTop = yRounded;
    this.placeholderLeft = xRounded;
  }

  drop(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()
    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns - this.draggedWidth);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);

    this.computeMovedWidgets(xRounded, yRounded, this.dragoverWidth, this.dragoverHeight, this.draggedId);

    for (let widget of this.notDraggedWidgets) {
      if (this.movedWidgets.includes(widget.id)) {
        this.$emit("update", { widgetId: widget.id, x: widget.x, y: widget.y + this.draggingOffsetY })
      }
    }

    switch (this.draggedType) {
      case "widget":
        this.$emit("update", { widgetId: this.draggedId, x: xRounded, y: yRounded })
        break
      case "template":
        this.$emit("add", { templateId: this.draggedId, x: xRounded, y: yRounded })
        break;
      default:
        break;
    }

    this.dragging = false;
  }

  dragend() {
    this.dragging = false;
    this.movedWidgets = [];
    this.draggingOffsetY = 0;
  }

  computeMovedWidgets(x: number, y: number, width: number, height: number, ignoreWidgetId: string) {
    let tmp: string[] = []
    this.draggingOffsetY = 0;

    let actualXmin = x;
    let actualXmax = x + width;
    let touched = false;

    for (let widget of this.sortedWidgets) {
      if (widget.id == ignoreWidgetId) continue;

      if (widget.y <= y + height) {
        touched = true;
      }
      if (touched && widget.y + widget.height > y && (widget.x < actualXmax && widget.x + widget.width > actualXmin)) {
        actualXmin = Math.min(actualXmin, widget.x)
        actualXmax = Math.max(actualXmax, widget.x + widget.width)
        this.draggingOffsetY = Math.max(this.draggingOffsetY, (y - widget.y) + height)
        tmp.push(widget.id);
      }
    }
    this.movedWidgets = tmp;
  }

  computeMovedWidgetsThrottled = _.throttle(this.computeMovedWidgets, 100);

  widgetPosition(item: Widget) {
    if (this.dragging && this.movedWidgets.includes(item.id))
      return {
        top: this.toPixelPosition(item.y + this.draggingOffsetY) + 'px',
        left: this.toPixelPosition(item.x) + 'px',
        width: this.toPixelSize(item.width) + 'px',
        height: this.toPixelSize(item.height) + 'px'
      }
    else
      return {
        top: this.toPixelPosition(item.y) + 'px',
        left: this.toPixelPosition(item.x) + 'px',
        width: this.toPixelSize(item.width) + 'px',
        height: this.toPixelSize(item.height) + 'px'
      }
  }

  onResize() {
    this.computeColumns();

    this.backgroundSize = Math.floor((this.$el.clientWidth - (this.editable ? this.drawerWidth : 0)) / this.realColumns);
    this.backgroundPosition = - Math.floor(this.backgroundSize / 2);
    this.cellSize = this.backgroundSize - this.spacing
  }

  computeColumns(){
    if(this.autoColumn){
      let nbSizecolumns = Math.max(this.minColumns, Math.floor(this.$el.clientWidth / this.minColumnSize));
      let nbStepColumns = Math.round(nbSizecolumns / this.minColumnStep) * this.minColumnStep;
      this.computedColumns = this.maxColumns == -1 ? nbStepColumns : Math.min(this.maxColumns, nbStepColumns);
      this.$emit("update:columns", this.realColumns);
    } 
  }

  loadWidgets() {
    this.sortedWidgets = _.sortBy(this.widgets, w => [w.y, w.x]);

    let xMax = Math.max(...this.widgets.map(w => w.x + w.width))
    let yMax = Math.max(...this.widgets.map(w => w.y + w.height))

    if (xMax > this.realColumns) {
      this.computeLayout();
      return;
    }

    // on créé une map du dashboard avec que des false

    let map = createMatrix(xMax, yMax);

    for (let widget of this.sortedWidgets) {
      for (let i = widget.x; i < widget.x + widget.width; i++) {
        for (let j = widget.y; j < widget.y + widget.height; j++) {
          // pour chaque widget on vient remplir la map avec des true là où le widget prend de la place
          let above = map[i][j];
          if (above) {
            // si il y a chevauchement, on calcule le décalage de tous les autres widgets vers le bas et on notifie le parent
            this.computeMovedWidgets(above.x, above.y, above.width, above.height, above.id);

            for (let movedWidget of this.sortedWidgets) {
              if (movedWidget.id != above.id && this.movedWidgets.includes(movedWidget.id)) {
                this.$emit("update", { widgetId: movedWidget.id, x: movedWidget.x, y: movedWidget.y + this.draggingOffsetY })
              }
            }

            // on return puisque les widgets seront mis à jour et donc cette méthode redéclenchée pour corriger la suite
            return;
          }
          else {
            map[i][j] = widget;
          }
        }
      }
    }
  }

  computeLayout() {
    let offsetX = 0;
    let offsetY = 0;
    let yMax = 0;

    let x = 0;
    let y = 0;

    for (let widget of this.sortedWidgets) {
      x = offsetX;
      y = offsetY;

      if (x + widget.width > this.realColumns) {
        x = 0;
        y = yMax
        offsetY = yMax
      }

      this.$emit("update", { widgetId: widget.id, x, y });

      offsetX = x + widget.width;
      yMax = Math.max(yMax, y + widget.height);
    }
  }


  configure(item: Widget) {
    this.configuredWidget = item.id;
    this.tabs = 2;
    this.$emit("configure", item.id);
  }

  @Watch("realColumns")
  @Watch("spacing")
  @Watch("editable")
  @Watch("autoColumn")
  onGridChanged = this.onResize;

  @Watch("realColumns")
  onColumnsChanged = this.computeLayout;

  @Watch("widgets", { deep: true })
  onWidgetsChanged = this.loadWidgets
}

interface WidgetTemplate {
  id: string,
  label: string,
  description: string,
  icon: string,
  defaultWidth: number;
  defaultHeight: number;
}

interface Widget {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
</script>