<template>
  <d-bottom-bar :background-color="backgroundColor">
    <v-row no-gutters>
      <slot name="left">
        <slot name="left-prepend"></slot>
        <slot name="left-actions">
          <d-btn v-if="removable" class="red-4 mr-8" @click="$emit('remove')">
            <d-icon :left="responsive && !$vuetify.breakpoint.mobile">mdi-trash-can-outline</d-icon>
            <div v-if="!responsive || !$vuetify.breakpoint.mobile">{{ removeText }}</div>
          </d-btn>
        </slot>
        <slot name="left-append"></slot>
      </slot>

      <v-spacer />

      <slot name="right">
        <slot name="right-prepend"></slot>
        <slot name="right-actions">
          <d-btn class="grey-3--border d-border-inset grey-3--text mx-4" @click="$emit('edit')">
            <d-icon :left="responsive && !$vuetify.breakpoint.mobile">mdi-cancel</d-icon>
            <div v-if="!responsive || !$vuetify.breakpoint.mobile">{{ cancelText }}</div>
          </d-btn>
          <d-btn :disabled="!saveable" class="green-1 grey-3--text" @click="$emit('save')">
            <d-icon :left="responsive && !$vuetify.breakpoint.mobile">mdi-content-save-outline</d-icon>
            <div v-if="!responsive || !$vuetify.breakpoint.mobile">{{ saveText }}</div>
          </d-btn>
        </slot>
        <slot name="right-append"></slot>
      </slot>
    </v-row>
  </d-bottom-bar>
</template>
 
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DValidationBar extends Vue {
  @Prop({ required: false, default: true })
  responsive!: boolean;

  @Prop({ required: false, default: true })
  removable!: boolean;

  @Prop({ required: false, default: true })
  saveable!: boolean;

  @Prop({ required: false, default: "Save" })
  saveText!: string;

  @Prop({ required: false, default: "Cancel" })
  cancelText!: string;

  @Prop({ required: false, default: "Remove" })
  removeText!: string;

  @Prop({ required: false, default: "white" })
  backgroundColor!: string;
}
</script>