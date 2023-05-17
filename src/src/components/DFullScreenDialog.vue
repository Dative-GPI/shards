<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-title>
        <d-title class="text-h4">
          <slot name="title">
            {{ title }}
          </slot>
        </d-title>
      </v-card-title>
      <v-card-text
        style="max-height: calc(100vh - 196px)"
        class="d-scrollbar-mock"
      >
        <slot> </slot>
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-spacer />
          <d-btn-cancel
            text
            class="mr-2"
            :icon="leftIcon"
            @click="$emit('click:left')"
          >
            <slot name="left">
              {{ left }}
            </slot>
          </d-btn-cancel>
          <d-btn-save
            text
            :icon="rightIcon"
            @click="$emit('click:right')"
          >
            <slot name="right">
              {{ right }}
            </slot>
          </d-btn-save>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DFullScreenDialog extends Vue {
  @Prop({ required: false, default: "calc(100vw - 100px)" })
  maxWidth!: string;

  @Prop({ required: false, default: "", type: String })
  title!: string;

  @Prop({ required: false, default: "", type: String })
  left!: string;

  @Prop({ required: false, default: "mdi-close", type: String })
  leftIcon!: string | undefined;

  @Prop({ required: false, default: "", type: String })
  right!: string;

  @Prop({ required: false, default: () => undefined, type: String })
  rightIcon!: string | undefined;
}
</script>

<style scoped>
::v-deep .v-dialog:not(.v-dialog--fullscreen) {
    max-height: calc(100vh - 100px) !important;
}
</style>