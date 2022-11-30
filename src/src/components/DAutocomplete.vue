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
  >
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>

    <template #no-data>
      <slot name="no-data">
        <v-list-item dense>
          <v-list-item-content dense>
            <v-list-item-title>
              {{ noDataText }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </slot>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DAutocomplete extends Vue {
  @Prop({ required: false, default: () => [], type: Array })
  items!: any[];

  @Prop({ required: false, default: false, type: Boolean })
  outlined!: boolean;

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: () => true, type: Function })
  filter!: (item: any) => boolean;

  @Prop({ required: false, default: "No data available", type: String })
  noDataText!: string;
}
</script>
