<template>
  <v-navigation-drawer app right temporary v-on="$listeners" v-bind="$attrs" class="pa-2">
    <div class="d-drawer-header">
      <slot name="header">
        <div class="d-flex align-start justify-start mb-5">
          <d-btn icon @click="$emit('input', false)">
            <v-icon large>
              mdi-chevron-right
            </v-icon>
          </d-btn>
          <slot name="title-outer">
            <d-title class="ml-2">
              <slot name="title">
                {{ title }}
              </slot>
            </d-title>
          </slot>
        </div>
      </slot>
    </div>

    <div
      ref="body"
      class="d-scrollbar-mock"
      :style="`max-height: calc(100% - ${footerHeight}px);`"
    >
      <slot></slot>
    </div>

    <v-footer ref="footer" absolute v-if="$scopedSlots['actions']" color="white-1">
      <slot name="actions"></slot>
    </v-footer>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DRightDrawer extends Vue {
  @Prop({ required: false, default: "" })
  title!: string;

  footerHeight: number = 0;

  mounted(): void {
    if ((this.$refs.footer as Vue) != null) {
      this.footerHeight += (this.$refs.footer as Vue).$el.clientHeight;
    }
    if ((this.$refs.body as HTMLElement) != null) {
      this.footerHeight += (this.$refs.body as HTMLElement).getBoundingClientRect().top - 8;
    }
  }
}
</script>

<style scoped>
.d-drawer-header {
  background-color: var(--v-white-1-base);
  position: sticky;
  display: flex;
  top: 0;
}
</style>