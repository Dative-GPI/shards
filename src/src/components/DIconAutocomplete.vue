<template>
  <d-autocomplete
    :value="value"
    @change="$emit('input', $event)"
    v-bind="$attrs"
    v-on="$listeners"
    :items="items"
    :no-filter="true"
    :search-input.sync="search"
  >
    <template #item="{ item }">
      <d-icon :size="24" style="width: 30px" class="mr-2">{{ item }}</d-icon>
      <span>{{ item.replace("mdi-", "") }}</span>
    </template>
    <template #selection="{ item }">
      <d-icon :size="24" style="width: 30px" class="mr-2">{{
        item
      }}</d-icon>
      <span>{{ item.replace("mdi-", "") }}</span>
    </template>
    <template #prepend-inner>
      <d-icon v-if="$attrs.value" :size="24" style="width: 30px" class="mr-4">{{
        $attrs.value
      }}</d-icon>
    </template>
  </d-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { IconsMeta } from "../icons-meta";

@Component({
  inheritAttrs: false,
})
export default class DIconAutocomplete extends Vue {
  @Prop({ required: false })
  value!: string;

  search = "";

  items: string[] = [];

  searchIcons(search: string) {
    search = search.toLowerCase().replace(" ", "_");
    this.items = IconsMeta.filter(
      (i) =>
        i.name.includes(search) ||
        i.tags.some((t) => t.includes(search)) ||
        i.aliases.some((a) => a.includes(search))
    ).map((i) => `mdi-${i.name}`);
  }

  mounted() {
    if (this.value) {
      this.searchIcons(this.value.replace("mdi-", ""));
    }
  }

  reset() {
    this.items = [];
  }

  @Watch("value")
  onValueChanged() {
    if (this.value) {
      this.searchIcons(this.value.replace("mdi-", ""));
    }
  }

  @Watch("search")
  onSearchChanged() {
    if (this.search && this.search.length) {
      this.searchIcons(this.search);
    }
  }
}
</script>
