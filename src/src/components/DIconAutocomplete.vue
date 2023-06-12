<template>
  <v-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    dense
    no-filter
    item-text="label"
    item-value="code"
    :items="items"
    :search-input.sync="search"
    :menu-props="{ offsetY: true }"
    :value="value"
  >
    <template #item="{ item }">
      <d-icon :size="iconSize" class="mr-2">
        {{ item.code }}
      </d-icon>
      <span class="text-body-1 ml-2">
        {{ item.label }}
      </span>
    </template>
    <template #append>
      <d-icon :size="iconSize" :style="{ paddingTop: '2px' }">
        {{ value }}
      </d-icon>
    </template>
  </v-autocomplete>
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

  items: {label: string, code: string}[] = [];

  searchIcons(search: string) {
    search = this.sanitize(search);
    const mdiIcons = Icons
      .filter((i) => this.sanitize(i.n).includes(search) || i.t.some((t) => this.sanitize(t).includes(search)))
      .map(i => ({ label: this.sanitize(i.n), code: `mdi-${i.n}` }));

    const shardIcons = Object.keys(this.$vuetify.icons.values)
      .filter(i => this.sanitize(i).includes(search))
      .map(i => ({ label: this.sanitize(i), code: `$${i}` }));

    this.items = mdiIcons.concat(shardIcons).sort((a,b) => a.label.localeCompare(b.label));
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
