<template>
  <div class="d-dashboard" @dragend="dragend">
    <div
      class="d-dashboard-container"
      :class="editable ? 'editable': ''"
      :style="editable ? `margin-right: ${drawerWidth}px` : ''"
    >
      <div
        ref="grid"
        class="d-dashboard-grid"
        :class="{ editable }"
        :style="{
          'background-size': `${backgroundSize}px ${backgroundSize}px`,
          width: `${backgroundSize * realColumns}px `,
          height: `${toPixelPosition(height)}px`,
          '--nr': height,
          '--nc': realColumns,
          '--b': `${spacing}px`
        }"
        v-resize="onResize"
        @dragover.prevent="dragOver"
        @drop.stop="drop"
      >
        <template v-if="(editable && !shallow)">
          <div
            class="d-dashboard-placeholder" v-show="dragging || resizing"
            :style="{
              top: `${toPixelPosition(placeholderTop)}px`,
              left: `${toPixelPosition(placeholderLeft)}px`,
              width: `${toPixelSize(placeholderWidth)}px`,
              height: `${toPixelSize(placeholderHeight)}px`
            }"
          >
            <slot
              name="widget-placeholder"
              v-bind="{
                width: toPixelSize(placeholderWidth),
                height: toPixelSize(placeholderHeight)
              }"
            />
          </div>
        </template>

        <div
          v-for="widget in widgets"
          class="d-dashboard-widget"
          :key="widget.id"
          :draggable="(editable && !shallow)"
          :style="widgetPosition(widget)"
          :class="{ hidden: deferredDragover && widget.id == draggedId && draggedType === 'widget', active: widget.id == configuredWidget }"
          @dragstart="dragstartWidget(widget, $event)"
        >
          <d-icon
            v-if="(editable && !shallow)"
            size="20"
            class="clickable"
            style="position: absolute; right: 4px; bottom: 4px"
            :draggable="(editable && !shallow)"
            @dragstart.stop="dragstartResize(widget, $event)"
          >
            mdi-resize-bottom-right
          </d-icon>
          <v-lazy
            :options="{ threshold: .1 }"
            :width="toPixelSize(widget.width)"
            :height="toPixelSize(widget.height)"
          >
            <slot
              name="widget"
              v-bind="{
                item: widget,
                width: toPixelSize(widget.width),
                height: toPixelSize(widget.height),
                configure: () => configure(widget)
              }"
            />
          </v-lazy>
        </div>


        <template v-if="(editable && !shallow)">
          <div
            v-show="deferredDragover"
            class="d-dashboard-dragover"
            ref="dragover"
          >
            <slot
              name="widget-dragover"
              v-bind="{
                draggedId: draggedId,
                draggedType: draggedType,
              }"
            />
          </div>
        </template>
      </div>
    </div>

    <v-navigation-drawer
      v-if="editable"
      right
      absolute
      stateless
      hide-overlay
      :width="drawerWidth"
      :value="true"
    >
      <d-tabs v-model="tabs" v-bind="tabsProps" class="mb-5">
        <d-tab :key="0" v-if="!shallow">
          <slot name="tab-widget-templates-title">
            <span>
              Widgets
            </span>
          </slot>
        </d-tab>
        <d-tab :key="1" v-if="!shallow" :disabled="!configuredWidget">
          <slot name="tab-widget-configuration-title">
            <span>
              Widget configuration
            </span>
          </slot>
        </d-tab>
        <d-tab :key="2">
          <slot name="tab-dashboard-properties-title">
            <span>
              Dashboard properties
            </span>
          </slot>
        </d-tab>
      </d-tabs>
      <d-fading-container height="calc(100% - 50px)" class="px-2">
        <d-tabs-items :value="tabs">
          <d-tab-item :key="0" v-if="!shallow" eager>
              <slot name="tab-widget-templates">
                <d-search-input v-model="search" />
                <v-list two-line>
                  <v-list-item
                    v-for="item in filtredWidgetTemplates"
                    :key="item.id"
                    :draggable="editable"
                    @dragstart="dragstartTemplate(item, $event)"
                    @dragend="dragend"
                    @click="append(item)"
                  >
                    <slot
                      name="widget-template"
                      v-bind="{ item, dragstart: ev => dragstartTemplate(item, ev), append: () => append(item) }"
                    >
                      <v-list-item-avatar>
                        <v-icon x-large>
                          {{ item.icon }}
                        </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.label }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </slot>
                  </v-list-item>
                </v-list>
              </slot>
          </d-tab-item>
          <d-tab-item :key="1" v-if="!shallow" eager>
            <slot name="configuration" v-bind="{ widgetId: configuredWidget }" />
          </d-tab-item>
          <d-tab-item :key="2" eager>
            <slot name="tab-dashboard-properties" v-bind="{ computeLayout }">
              <d-btn @click="computeLayout">Compute Layout</d-btn>
            </slot>
          </d-tab-item>
        </d-tabs-items>
      </d-fading-container>
    </v-navigation-drawer>
  </div>
</template>
  
<script lang="ts">
import _ from "lodash"
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(x, b))
}

function createMatrix(m: number, n: number): (Widget | null)[][] {
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

  @Prop({ required: false, default: false })
  editable!: boolean;

  @Prop({ required: false, default: false })
  shallow!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  autoColumn!: boolean;

  @Prop({ required: false, default: 6 })
  columns!: number;

  @Prop({ required: false, default: 3 })
  minColumns!: number;

  @Prop({ required: false, default: 3 })
  minColumnStep!: number;

  @Prop({ required: false, default: 140 })
  minColumnSize!: number;

  @Prop({ required: false, default: -1 })
  maxColumns!: number;

  @Prop({ required: false, default: () => [] })
  widgetTemplates!: WidgetTemplate[];

  @Prop({ required: false, default: () => [] })
  widgets!: Widget[];

  @Prop({ required: false, default: () => null })
  configuredWidget!: string | null

  @Prop({ required: false, default: 500 })
  drawerWidth!: number;

  @Prop({ required: false, default: 16 })
  spacing!: number;

  @Prop({ required: false, default: 6 })
  minRows!: number;

  @Prop({ required: false, default: () => null })
  tabsProps!: Object;

  @Prop({ required: false, default: false, type: Boolean })
  half!: boolean

  tabs: number = 0;

  search = "";

  backgroundSize = 0;
  backgroundPosition = 0;
  cellSize = 0;

  get dragging() {
    return this.mode === "dragging";
  }

  set dragging(v: boolean) {
    this.mode = v ? "dragging" : "none";
    setTimeout(() => this.deferredDragover = v, 10);
  }

  get resizing() {
    return this.mode === "resizing";
  }

  set resizing(v: boolean) {
    this.mode = v ? "resizing" : "none";
    setTimeout(() => this.deferredDragover = v, 10);
  }

  mode: "none" | "dragging" | "resizing" = "none";

  deferredDragover = false;

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

  screenshot = false;

  draggingOffsetY = 0;
  draggingOffsetYmin = 0;
  movedWidgets: string[] = [];

  mouseOffsetX = 0;
  mouseOffsetY = 0;

  sortedWidgets: Widget[] = []
  widgetPositions: WidgetPositions = {};

  computedColumns = 0;

  get realColumns() {
    let result = this.columns;
    if (this.autoColumn) {
      result = this.computedColumns;
    }
    return Math.max(this.minColumns, this.half ? Math.floor(result / 2) : result);
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
    return Math.max(Math.max(...this.widgets.map(w => w.y + w.height)) + (this.editable ? 3 : 0), this.minRows)
  }

  mounted(): void {
    this.onResize();
    this.loadWidgets();

    if (this.shallow) {
      this.tabs = 2;
    }
  }

  append(item: WidgetTemplate) {
    let maxY = Math.max(...this.widgets.map(w => w.y + w.height), 0);
    this.addWidget(item.id, 0, maxY, item.defaultWidth, item.defaultHeight);
  }

  toPixelPosition(position: number) {
    return position * (this.cellSize + this.spacing);
  }

  toPixelSize(size: number) {
    return size * this.cellSize + (size - 1) * this.spacing;
  }

  basedragStart(width: number, height: number, x: number, y: number, ev: DragEvent) {
    this.draggedWidth = width;
    this.draggedHeight = height;

    this.dragoverLeft = x;
    this.dragoverTop = y;
    this.dragoverWidth = width;
    this.dragoverHeight = height;

    this.placeholderLeft = x;
    this.placeholderTop = y;
    this.placeholderWidth = width;
    this.placeholderHeight = height;

    this.mouseOffsetX = Math.min(ev.offsetX, this.toPixelSize(this.dragoverWidth));
    this.mouseOffsetY = Math.min(ev.offsetY, this.toPixelSize(this.dragoverHeight));

    // le bon gros hack, image invisible
    let img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    ev.dataTransfer!.setDragImage(img, 0, 0);
  }

  dragstartWidget(item: Widget, ev: DragEvent) {
    if (!this.editable || this.shallow) {
      ev.preventDefault();
      return;
    }

    this.dragging = true;
    this.draggedId = item.id;
    this.draggedType = "widget";

    this.configure(item);

    this.basedragStart(item.width, item.height, item.x, item.y, ev);

    this.dragOver(ev);
  }

  dragstartTemplate(item: WidgetTemplate, ev: DragEvent) {
    if (!this.editable || this.shallow) {
      ev.preventDefault();
      return;
    }

    this.dragging = true;
    this.draggedType = "template";
    this.draggedId = item.id;

    this.basedragStart(item.defaultWidth, item.defaultHeight, 0, 0, ev)

    this.dragOver(ev);
  }

  dragstartResize(widget: Widget, ev: DragEvent) {
    if (!this.editable || this.shallow) {
      ev.preventDefault();
      return;
    }
    
    this.resizing = true;
    this.draggedId = widget.id;
    this.draggedType = "widget";

    this.basedragStart(widget.width, widget.height, widget.x, widget.y, ev);

    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;

    this.dragOver(ev);
  }

  setDragOverPosition(x: number, y: number, width: number, height: number) {
    let dragover = this.$refs.dragover as HTMLElement;
    if (!dragover) return;
    dragover.style.top = `${y}px`;
    dragover.style.left = `${x}px`;
    dragover.style.width = `${width}px`;
    dragover.style.height = `${height}px`;
  }

  dragOver(ev: DragEvent) {
    switch (this.mode) {
      case "dragging":
        this.dragOverDragging(ev);
        break;
      case "resizing":
        this.dragOverResize(ev);
        break;
    }
  }

  dragOverDragging(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()
    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns - this.draggedWidth);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);
    this.computeMovedWidgetsThrottled(xRounded, yRounded, this.dragoverWidth, this.dragoverHeight, this.draggedId);

    this.placeholderTop = yRounded;
    this.placeholderLeft = xRounded;

    this.setDragOverPosition(x, y, this.dragoverWidth * this.backgroundSize, this.dragoverHeight * this.backgroundSize);
  }

  dragOverResize(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()

    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);

    let widthRounded = Math.max(1, xRounded - this.dragoverLeft)
    let heightRounded = Math.max(1, yRounded - this.dragoverTop)

    this.computeMovedWidgetsThrottled(this.dragoverLeft, this.dragoverTop, widthRounded, heightRounded, this.draggedId);

    this.placeholderWidth = widthRounded;
    this.placeholderHeight = heightRounded;

    let dragoverWidth = Math.max(this.backgroundSize, x - this.dragoverLeft * this.backgroundSize)
    let dragoverHeight = Math.max(this.backgroundSize, y - this.dragoverTop * this.backgroundSize)

    this.setDragOverPosition(this.dragoverLeft * this.backgroundSize, this.dragoverTop * this.backgroundSize, dragoverWidth, dragoverHeight);
  }

  drop(ev: DragEvent) {
    switch (this.mode) {
      case "dragging":
        this.dropDragging(ev);
        break;
      case "resizing":
        this.dropResizing(ev);
        break;
      default:
        console.error("Unknown mode", this.mode);
    }
  }

  dropDragging(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()
    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns - this.draggedWidth);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);

    this.computeMovedWidgets(xRounded, yRounded, this.dragoverWidth, this.dragoverHeight, this.draggedId);

    for (let widget of this.notDraggedWidgets) {
      if (this.movedWidgets.includes(widget.id)) {
        this.updateWidget(widget.id, widget.x, widget.y + this.draggingOffsetY, widget.width, widget.height);
      }
    }

    switch (this.draggedType) {
      case "widget":
        this.updateWidget(this.draggedId, xRounded, yRounded, this.dragoverWidth, this.dragoverHeight)
        break
      case "template":
        this.addWidget(this.draggedId, xRounded, yRounded, this.dragoverWidth, this.dragoverHeight)
        break;
      default:
        break;
    }

    this.dragging = false;
  }

  dropResizing(ev: DragEvent) {
    let rect = (this.$refs.grid as HTMLElement).getBoundingClientRect()

    let x = ev.clientX - rect.left - this.mouseOffsetX;
    let y = ev.clientY - rect.top - this.mouseOffsetY;

    let xRounded = clamp(Math.round(x / this.backgroundSize), 0, this.realColumns);
    let yRounded = Math.max(Math.round(y / this.backgroundSize), 0);

    let widthRounded = Math.max(1, xRounded - this.dragoverLeft)
    let heightRounded = Math.max(1, yRounded - this.dragoverTop)

    this.computeMovedWidgets(this.dragoverLeft, this.dragoverTop, widthRounded, heightRounded, this.draggedId);

    for (let widget of this.notDraggedWidgets) {
      if (this.movedWidgets.includes(widget.id)) {
        this.updateWidget(widget.id, widget.x, widget.y + this.draggingOffsetY, widget.width, widget.height)
      }
    }

    this.updateWidget(this.draggedId, this.dragoverLeft, this.dragoverTop, widthRounded, heightRounded);

    this.resizing = false;
  }

  dragend() {
    this.dragging = false;
    this.resizing = false;
    this.movedWidgets = [];
    this.draggingOffsetY = 0;
  }

  computeMovedWidgets(x: number, y: number, width: number, height: number, ignoreWidgetId: string) {
    let tmp: string[] = []
    this.draggingOffsetY = 0;

    let actualXmin = x;
    let actualXmax = x + width;

    for (let widget of this.sortedWidgets) {
      if (widget.id == ignoreWidgetId) continue;

      if ((widget.y + widget.height > y) && (widget.x < actualXmax && widget.x + widget.width > actualXmin)) {
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
    let x = item.x;
    let y = item.y;
    let width = item.width;
    let height = item.height;

    if (!this.editable || this.shallow) {
      let position = this.widgetPositions[item.id];

      if (position) {
        x = position.x;
        y = position.y;
      }
    }

    if ((this.dragging || this.resizing) && this.movedWidgets.includes(item.id))
      y += this.draggingOffsetY

    return {
      top: this.toPixelPosition(y) + 'px',
      left: this.toPixelPosition(x) + 'px',
      width: this.toPixelSize(width) + 'px',
      height: this.toPixelSize(height) + 'px'
    }
  }

  onResize() {
    this.computeColumns();

    this.backgroundSize = Math.floor(this.$el.clientWidth / this.realColumns);
    this.backgroundPosition = - Math.floor(this.backgroundSize / 2);

    if (this.half) {
      this.backgroundSize /= 2
      this.backgroundPosition /= 2
    }

    this.cellSize = this.backgroundSize - this.spacing
  }

  computeColumns() {
    if (this.autoColumn) {
      let nbSizecolumns = Math.max(this.minColumns, Math.floor(this.$el.clientWidth / this.minColumnSize));
      let nbStepColumns = Math.round(nbSizecolumns / this.minColumnStep) * this.minColumnStep;
      this.computedColumns = this.maxColumns == -1 ? nbStepColumns : Math.min(this.maxColumns, nbStepColumns);
      this.$emit("update:columns", this.realColumns);
    }
  }

  loadWidgets() {
    this.sortedWidgets = _.sortBy(this.widgets, ['y', 'x']);

    let xMax = Math.max(...this.widgets.map(w => w.x + w.width))
    let yMax = Math.max(...this.widgets.map(w => w.y + w.height))

    let maxWidth = Math.max(...this.widgets.map(w => w.width))

    if (maxWidth > this.realColumns) {
      console.warn("Widget are too large for this dashboards");
      // TODO : soit on notifie le parent que le widget doit changer de taille
      // soit le parent est assez intelligent pour donner des widgets qui ont au max le nombre de colonne
      return
    }

    this.computeLayout();

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
                this.updateWidget(movedWidget.id, movedWidget.x, movedWidget.y + this.draggingOffsetY, movedWidget.width, movedWidget.height)
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

    let xMax = Math.max(...this.widgets.map(w => w.x + w.width))
    if (xMax <= this.realColumns) {
      this.widgetPositions = {};
      return;
    }

    let newLayout: WidgetPositions = {};

    for (let widget of this.sortedWidgets) {
      x = offsetX;
      y = offsetY;

      if (x + widget.width > this.realColumns) {
        x = 0;
        y = yMax
        offsetY = yMax
      }

      if (this.editable && !this.shallow)
        this.updateWidget(widget.id, x, y, widget.width, widget.height);
      else
        newLayout[widget.id] = { x, y };

      offsetX = x + widget.width;
      yMax = Math.max(yMax, y + widget.height);
    }

    this.widgetPositions = newLayout;
  }

  addWidget(templateId: string, x: number, y: number, width: number, height: number)
  {
    this.$emit("add", { templateId, x, y, width, height })
  }

  updateWidget(widgetId: string, x: number, y: number, width: number, height: number) {
    this.$emit("update", { widgetId, x, y, width, height });
  }

  configure(item: Widget) {
    this.$emit("update:configured-widget", item.id);
  }

  @Watch("realColumns")
  @Watch("spacing")
  @Watch("autoColumn")
  onGridChanged = this.onResize;

  @Watch("widgets", { deep: true })
  @Watch("editable")
  @Watch("realColumns")
  onWidgetsChanged = this.loadWidgets

  @Watch("configuredWidget")
  onConfiguredWidgetChanged() {
    this.tabs = 1;
  }
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

interface WidgetPositions {
  [key: string]: {
    x: number,
    y: number,
  }
}
</script>

<style scoped>
.d-dashboard {
  position: relative;
}

.d-dashboard-container {
  overflow-y: hidden;
  overflow-x: hidden;
}

.d-dashboard-container.editable {
  overflow-y: auto !important;
  overflow-x: auto !important;
  height: 100%;
}

.d-dashboard-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.d-dashboard-container::-webkit-scrollbar-track {
  background-color: #00000000;
}

.d-dashboard-container::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #00000000;
}

.d-dashboard-container:hover::-webkit-scrollbar-thumb {
  background-color: #00000022;
}

.d-dashboard-grid {
  position: relative;
}

.d-dashboard-grid.editable {
  background: 
    conic-gradient(from 90deg at var(--b) var(--b),
    var(--v-alert-grey-background-base) 90deg,#0000 0) calc(-1*var(--b)) calc(-1*var(--b))/
      calc(100%/var(--nc)) calc(100%/var(--nr));
}

.d-dashboard-widget {
  position: absolute;
  background-color: white;
}

.d-dashboard-placeholder {
  position: absolute;
  background-color: var(--v-alert-grey-background-darken2);
}

.d-dashboard-dragover {
  position: absolute;
  background-color: white;
}
</style>
