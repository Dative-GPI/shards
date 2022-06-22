<template>
  <d-autocomplete v-bind="$attrs" v-on="$listeners" :items="items" :no-filter="true" :search-input.sync="search">
    <template #item="{ item }">
      <d-icon :size="24" style="width: 30px" class="mr-2">{{ item }}</d-icon> <span>{{ item.replace("mdi-", "")
      }}</span>
    </template>
    <template v-slot:selection="data">
      <d-icon :size="24" style="width: 30px" class="mr-2">{{ data.item }}</d-icon> <span>{{ data.item.replace("mdi-",
          "")
      }}</span>
    </template>
    <template #prepend-inner>
      <d-icon v-if="$attrs.value" :size="24" style="width: 30px" class="mr-4">{{ $attrs.value }}</d-icon>
    </template>
  </d-autocomplete>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import { IconsMeta } from "../icons-meta";

@Component({
  inheritAttrs: false,
})
export default class DIconAutocomplete extends Vue {
  search = "";

  items: string[] = [];

  searchIcons(search: string) {
    search = search.toLowerCase().replace(" ", "_");
    this.items = IconsMeta.filter(i =>
      i.name.includes(search)
      || i.tags.some(t => t.includes(search))
      || i.aliases.some(a => a.includes(search)))
      .map(i => `mdi-${i.name}`)
    
    console.log([... new Set(IconsMeta.flatMap(i => i.tags))])
  }

  reset() {
    this.items = [];
  }

  @Watch("search")
  onSearchChanged() {
    if (this.search && this.search.length) {
      this.searchIcons(this.search);
    }
    else {
      this.reset();
    }
  }
}
</script>