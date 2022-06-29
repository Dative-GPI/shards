<template>
  <v-autocomplete
    class="d-autocomplete"
    v-bind="$attrs"
    v-on="$listeners"
    :items="items.filter(filter)"
    dense
    :class="{ nopadding: !editable && !outlined }"
    :menu-props="{ offsetY: true }"
    :outlined="outlined"
    :solo="!editable && !outlined"
    :flat="!editable && !outlined"
    :readonly="!editable"
    :append-icon="editable ? 'mdi-menu-down' : ''"
    height="28px"
    
    :value="selectedItem"
    @change="selectItem"
    :search-input.sync="search"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>

    <template #no-data>
      <v-list-item @click="selectItem(search)">
        <v-list-item-content>
          {{ onInputText }}
          {{ search }}
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-autocomplete>



  <!-- <d-autocomplete
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
  </d-autocomplete> -->
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



  @Prop({ required: false, default: () => [], type: Array })
  items!: any[];

  @Prop({ required: false, default: false, type: Boolean })
  outlined!: boolean;

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: () => true, type: Function })
  filter!: (item: any) => boolean;

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
