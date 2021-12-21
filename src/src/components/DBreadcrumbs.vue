<template>
  <v-breadcrumbs :items="extendedItems" v-bind="$attrs" v-on="$listeners" class="pa-0 ma-0">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item v-bind="item" class="text--blue-2">
        {{ item.text ? item.text : item.defaultLabel }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBreadcrumbs extends Vue {  
  @Prop({ required: true })
  items!: any[];

  get extendedItems(): { codeLabel: string; defaultLabel: string }[] {
    return this.items.concat({ codeLabel: "", defaultLabel: "" });
  }
}
</script>