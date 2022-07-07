<template>
  <d-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    :value="selectedItem"
    @change="selectItem"
    :search-input.sync="search"
  >
    <template #no-data>
      <v-list-item @click="selectItem(search)">
        <v-list-item-content>
          {{ onInputText }}
          {{ search }}
        </v-list-item-content>
      </v-list-item>
    </template>
  </d-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DInputAutocomplete extends Vue {
  // Properties

  @Prop({ required: true })
  value!: string;

  @Prop({ required: false, default: "New entry :" })
  onInputText!: string;

  // Data

  search = "";

  // Computed Properties

  get selectedItem() {
    return this.value;
  }

  // Methods

  selectItem(ev: string) {
    this.$emit("input", ev);
  }
}
</script>
