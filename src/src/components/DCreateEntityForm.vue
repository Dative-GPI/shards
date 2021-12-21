<template>
  <v-container fluid class="ma-0 py-1 px-5">
    <d-title class="mb-5" :label="formTitle" />
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <v-row no-gutters class="d-form-validate">
      <d-btn
        class="green-1 grey-3--text"
        :disabled="disableCreate"
        @click="$emit('create')"
      >
        {{ validateText }}
      </d-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class CreateDeviceForm extends Vue {
  @Prop({ required: true })
  formTitle!: string;

  @Prop({ required: false, default: 'Validate' })
  validateText!: string;

  @Prop({ required: true })
  disableCreate!: () => boolean;
}
</script>