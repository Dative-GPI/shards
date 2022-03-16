<template>
  <v-row no-gutters v-if="template"
    draggable
    @dragstart="(event) => $emit('dragstart', event)"
    @drag="(event) => $emit('drag', event)"
    @dragend="(event) => $emit('dragend', event)"
  >
    <slot name="template">
      <v-row no-gutters class="pa-2 d-dashboard-template">
        <v-col justify="center" align="center" :style="{ maxWidth: '60px !important' }">
          <d-icon size="50"> {{ item.icon }} </d-icon>
        </v-col>
        <v-col>
          <v-row no-gutters>
            <span class="text-h6"> {{ item.label }} </span>
          </v-row>
          <v-row no-gutters>
            <span class="text-body-1">  {{ item.description }} </span>
          </v-row>
        </v-col>
      </v-row>
    </slot>
  </v-row>
  <v-row no-gutters v-else-if="mock" :style="style">
    <slot name="mock"></slot>
  </v-row>
  <v-row no-gutters v-else
    :draggable="editing"
    :style="style"
    @click="click"
    @dragstart="dragStart"
    @drag="drag"
    @dragend="dragEnd"
    @dragenter.stop="(event) => $emit('dragenter', event)"
  >
    <slot name="widget" :editing="editing"></slot>
    <slot name="editing" :editing="editing">
      <v-row v-if="editing" no-gutters class="pa-0 ma-0 d-dashboard-widget-editing">
        <d-btn-drawer icon="$cog" v-if="configurable" @click="$emit('configure')" />
        <d-btn-remove @click="$emit('remove')" class="ml-3" />
      </v-row>
    </slot>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Widget, WidgetTemplate } from "../../models";

@Component({})
export default class DBaseWidget extends Vue {
  @Prop({ required: true })
  item!: Widget | WidgetTemplate;

  @Prop({ required: false, default: false })
  template!: boolean;

  @Prop({ required: false, default: false })
  mock!: boolean;

  @Prop({ required: false, default: false })
  editing!: boolean;

  @Prop({ required: false, default: false })
  clickable!: boolean;
  
  @Prop({ required: false, default: false })
  configurable!: boolean;

  @Prop({ required: false, default: 120 })
  caseSize!: number;

  @Prop({ required: false, default: 20 })
  caseMargin!: number;

  @Prop({ required: false, default: 2 })
  zIndex!: number;

  get style(): { [key: string]: string } {
    let style: { [key: string]: string } = {
      width: `${this.item.width * this.caseSize - this.caseMargin}px`,
      height: `${this.item.height * this.caseSize - this.caseMargin}px`
    };

    if (!this.mock && !this.template) {
      style = {
        ...style,
        zIndex: this.zIndex.toString(),
        position: 'absolute',
        top: `${(this.item as Widget).y * this.caseSize}px`,
        left: `${(this.item as Widget).x * this.caseSize}px`,
        cursor: this.editing ? 'move' : this.clickable ? 'pointer' : ''
      }
    }

    return style;
  }

  click(event: MouseEvent): void {
    if (this.clickable) {
      this.$emit("click", event);
    }
  }

  dragStart(event: DragEvent): void {
    if (this.editing) {
      this.$emit('dragstart', event);
      window.requestAnimationFrame(function() {
        (event.target! as HTMLElement).style.visibility = "hidden";
      });
    }
  }

  drag(event: DragEvent): void {
    if (this.editing) {
      this.$emit("drag", event);
    }
  }

  dragEnd(event: DragEvent): void {
    if (this.editing) {
      this.$emit('dragend', event);
      window.requestAnimationFrame(function() {
        (event.target! as HTMLElement).style.visibility = "visible";
      });
    }
  }
}
</script>

<style scoped>
.d-dashboard-template {
  cursor: move;
  min-height: 80px;
}

.d-dashboard-template:hover {
  background-color: var(--v-alert-grey-background-base);
}

.d-dashboard-widget-editing {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>