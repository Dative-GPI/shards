<template>
  <div class="ma-0 pa-0">
    <d-btn color="grey-3 white--text" @click="drawer = !drawer">
      <d-icon>
        mdi-plus
      </d-icon>
      <span v-if="$vuetify.breakpoint.smAndUp" class="ml-2">
        {{ createLabel }}
      </span>
    </d-btn>
    <d-right-drawer class="pa-1" v-model="drawer" width="min(85vw, 600px)">
      <d-create-entity-form
        @create="$emit('create')"
        :disable-create="disableCreate"
        :form-title="formTitle"
      >
        <slot></slot>
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </d-create-entity-form>
    </d-right-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DCreateEntityBtn extends Vue {
  @Prop({ required: true })
  createLabel!: string;

  @Prop({ required: true })
  formTitle!: string;

  @Prop({ required: true })
  disableCreate!: () => boolean;

  drawer = false;
}
</script>