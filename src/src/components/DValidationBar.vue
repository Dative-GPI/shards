<template>
  <d-bottom-bar :background-color="backgroundColor">
    <v-row no-gutters>
      <slot name="left">
        <slot name="left-prepend"></slot>
        <slot name="left-actions">
          <d-btn-remove
            v-if="removable"
            :responsive="responsive"
            @click="$emit('remove')"
            :loading="removing"
            :icon="removeIcon"
          >
            <slot name="remove">{{ removeText }}</slot>
          </d-btn-remove>
        </slot>
        <slot name="left-append"></slot>
      </slot>

      <v-spacer />

      <slot name="right">
        <slot name="right-prepend"></slot>
        <slot name="right-actions">
          <d-btn-cancel
            @click="$emit('cancel')"
            :responsive="responsive"
            :icon="cancelIcon"
          >
            <slot name="cancel">{{ cancelText }}</slot>
          </d-btn-cancel>
          <d-btn-save
            class="ml-3"
            :disabled="!saveable"
            @click="$emit('save')"
            :responsive="responsive"
            :loading="saving"
            :icon="saveIcon"
          >
            <slot name="save">{{ saveText }}</slot>
          </d-btn-save>
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

  @Prop({ required: false, default: false })
  saving!: boolean;

  @Prop({ required: false, default: false })
  removing!: boolean;

  @Prop({ required: false, default: "Save" })
  saveText!: string;

  @Prop({ required: false, default: "mdi-content-save-outline" })
  saveIcon!: string;

  @Prop({ required: false, default: "Cancel" })
  cancelText!: string;

  @Prop({ required: false, default: "mdi-cancel" })
  cancelIcon!: string;

  @Prop({ required: false, default: "Remove" })
  removeText!: string;

  @Prop({ required: false, default: "mdi-delete" })
  removeIcon!: string;

  @Prop({ required: false, default: "white" })
  backgroundColor!: string;
}
</script>