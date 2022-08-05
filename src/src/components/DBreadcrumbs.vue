<template>
  <v-breadcrumbs :items="items" v-bind="$attrs" v-on="$listeners" class="pa-0 ma-0">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item v-bind="item" class="blue-2--text">
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
}
</script>