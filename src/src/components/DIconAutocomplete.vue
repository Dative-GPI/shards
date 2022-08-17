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
      <d-icon :size="iconSize" style="width: 30px" class="mr-2">
        {{ item }}
      </d-icon>
      <span>{{ sanitize(item) }}</span>
    </template>
    <template #selection="{ item }">
      <d-icon :size="iconSize" style="width: 30px" class="mr-2">
        {{ item }}
      </d-icon>
      <span>{{ sanitize(item) }}</span>
    </template>
    <template #prepend-inner>
      <d-icon :size="iconSize" v-if="$attrs.value" style="width: 30px" class="mr-4">
        {{ $attrs.value }}
      </d-icon>
    </template>
  </d-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Icons } from "../icons-meta";

@Component({
  inheritAttrs: false,
})
export default class DIconAutocomplete extends Vue {
  @Prop({ required: false })
  value!: string;

  @Prop({ required: false, default: 20 })
  iconSize!: number;

  search: string = "";

  items: string[] = [];

  searchIcons(search: string) {
    search = this.sanitize(search);
    this.items = Icons.filter(
      (i) =>
        this.sanitize(i.n).includes(search) ||
        i.t.some((t) => this.sanitize(t).includes(search))
    ).map((i) => `mdi-${i.n}`)
    .concat(
      Object.keys(this.$vuetify.icons.values)
      .map(i => `$${i}`).filter(
        i => this.sanitize(i).includes(search)
      )
    ).sort((a,b) => this.sanitize(a).localeCompare(this.sanitize(b)));
  }

  sanitize(icon: string){
    return icon.replace("mdi-", "")
            .replace(" ", "-")
            .replace("$", "")
            .replace(/([A-Z])/, (a) => "-" + a)
            .toLowerCase()
            .trim()
  }

  mounted() {
    if (this.value) {
      this.searchIcons(this.value);
    }
  }

  reset() {
    this.items = [];
  }

  @Watch("value")
  onValueChanged() {
    if (this.value) {
      this.searchIcons(this.value)
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
