<template>
  <div class="d-switch-grid">
    <v-row no-gutter class="px-3 pb-1" v-if="!hideHeader">
      <slot name="header">
        <slot name="header-prepend"></slot>
        <slot
          name="header-search"
          v-bind="{ search, onSearchChanged }"
          v-if="searchable"
        >
          <d-search-input
            :value="search"
            @input="onSearchChanged"
            class="mt-3"
          />
        </slot>

        <div class="ml-3 mt-3">
          <d-btn-edit
            icon="mdi-checkbox-blank-circle-outline"
            @click="toggleAll(false)"
            v-if="selectAllBtns && editable && !search"
          >
            {{ unselectAllLabel }}
          </d-btn-edit>
          <d-btn-edit
            class="ml-3"
            icon="mdi-checkbox-marked-circle"
            @click="toggleAll(true)"
            v-if="selectAllBtns && editable && !search"
          >
            {{ selectAllLabel }}
          </d-btn-edit>
        </div>

        <slot name="header-append"> </slot>
      </slot>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="category in searchedCategories"
        :key="category.id"
      >
        <div class="d-switch-grid-category">
          <slot :name="`category-header.${category.id}`">
            <div class="text-h5">{{ category.label }}</div>
            <div></div>
            <div
              v-if="selectByCategoryBtns && editable && !search"
              class="mb-4"
            >
              <slot :name="`category-header-actions.${category.id}`">
                <d-btn-edit
                  icon="mdi-checkbox-blank-circle-outline"
                  @click="toggleCategory(category.id, false)"
                >
                  {{ unselectLabel }}
                </d-btn-edit>
                <d-btn-edit
                  class="ml-3"
                  icon="mdi-checkbox-marked-circle"
                  @click="toggleCategory(category.id, true)"
                >
                  {{ selectLabel }}
                </d-btn-edit>
              </slot>
            </div>
          </slot>
        </div>

        <div class="d-switch-grid-options">
          <template v-for="opt in category.options">
            <div class="text-body-1" :key="opt.id + '.label'">
              <slot :name="`switch-option.${opt.id}`">{{ opt.label }}</slot>
            </div>
            <div :key="opt.id + '.switch'">
              <d-switch
                :editable="editable"
                :value="isSelected(opt.id)"
                @input="toggleOption(opt.id, $event)"
              />
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DSwitchGrid extends Vue {
  // Properties

  @Prop({ required: true })
  value!: string[];

  @Prop({ required: true, default: [] })
  categories!: {
    id: string;
    label: string;
    options: { id: string; label: string }[];
  }[];

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  selectAllBtns!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  selectByCategoryBtns!: boolean;

  @Prop({ required: false, default: true, type: Boolean })
  searchable!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  hideHeader!: boolean;

  @Prop({ required: false, default: "Unselect all", type: String })
  unselectAllLabel!: string;

  @Prop({ required: false, default: "Select all", type: String })
  selectAllLabel!: string;

  @Prop({ required: false, default: "Unselect", type: String })
  unselectLabel!: string;

  @Prop({ required: false, default: "Select", type: String })
  selectLabel!: string;

  // Data

  search = "";

  // Computed Properties

  get searchedCategories() {
    const searchToLower = this.search.toLowerCase();

    let categoriesWithFilteredOptions = this.categories.map((c) => ({
      id: c.id,
      label: c.label,
      options: c.label.toLowerCase().includes(searchToLower)
        ? c.options
        : c.options.filter(
            (o) =>
              o.id.toLowerCase().includes(searchToLower) ||
              o.label.toLowerCase().includes(searchToLower)
          ),
    }));

    return categoriesWithFilteredOptions.filter((c) => c.options.length > 0);
  }

  // Methods

  onSearchChanged(ev: string) {
    this.search = ev;
  }

  isSelected(id: string) {
    return this.value.some((el) => el == id);
  }

  toggleOption(id: string, add: boolean) {
    let newValue = [];

    if (add) newValue = [...this.value, id];
    else newValue = this.value.filter((el) => el != id);

    this.$emit("input", newValue);
  }

  toggleCategory(categoryId: string, value: boolean) {
    const category = this.categories.find((c) => c.id == categoryId);
    if (!category) return;

    const options = category.options.map((o) => o.id);
    let newValue = [];

    if (value) newValue = [...this.value, ...options];
    else newValue = this.value.filter((el) => !options.includes(el));

    this.$emit("input", newValue);
  }

  toggleAll(value: boolean) {
    let newValue: string[] = [];

    if (value) {
      for (const category of this.categories) {
        newValue = [...newValue, ...category.options.map((o) => o.id)];
      }
    }

    this.$emit("input", newValue);
  }
}
</script>
