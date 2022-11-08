<template>
  <div style="position: relative;">

    <div class="d-dashboard-grid">

      <div class="d-dashboard-widget" v-for="widget in widgets" :key="widget.id">
        
      </div>


    </div>

    {{ autoWidth }}

    <v-navigation-drawer :value="true" right stateless absolute hide-overlay width="500">
      <div class="ma-1">
        <d-tabs v-model="tabs" :fixed-tabs="true" height="50" :showArrows="false">
          <d-tab :key="0">
            <slot name="tab-dashboard-properties-title">
              <span>
                Dashboard properties
              </span>
            </slot>
          </d-tab>
          <d-tab :key="1">
            <slot name="tab-widget-templates-title">
              <span>
                Widgets
              </span>
            </slot>
          </d-tab>
          <d-tab :key="2" :disabled="!configure">
            <slot name="tab-widget-configuration-title">
              <span>
                Widget configuration
              </span>
            </slot>
          </d-tab>
        </d-tabs>

        <d-tabs-items :value="tabs" class="ma-4">
          <d-tab-item :value="0">
            <slot name="tab-dashboard-properties"> </slot>
          </d-tab-item>
          <d-tab-item :value="1">
            <slot name="tab-widget-templates">
              <d-search-input v-model="search" />
              <v-list two-line>
                <v-list-item v-for="item in filtredWidgetTemplates" :key="item.id" @dragstart="dragstart" @dragend="dragend"
                  @click="dragstart">
                  <slot name="widget-template" v-bind="{ item }">
                    <v-list-item-avatar>
                      <v-icon x-large v-text="item.icon"></v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="item.label"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                  </slot>
                </v-list-item>
              </v-list>
            </slot>
          </d-tab-item>
          <d-tab-item :value="2">
            <slot name="configuration" />
          </d-tab-item>
        </d-tabs-items>
      </div>
    </v-navigation-drawer>
  </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DDashboardV2 extends Vue {
  tabs: number = 0;

  search = "";

  @Prop({required: false, default: 24})
  maxWidth!: number;

  @Prop({ required: false, default: () => [] })
  widgetTemplates!: WidgetTemplate[];

  @Prop({required: false, default: () => []})
  widgets!: Widget[];

  get configure() {
    return false;
  }

  get autoWidth(){
    if(this.$vuetify.breakpoint.smAndDown){
      return 6;
    }
    else if(this.$vuetify.breakpoint.mdAndDown) {
      return 9;
    }
    else if(this.$vuetify.breakpoint.lgAndDown) {
      return 12;
    }
    else if(this.$vuetify.breakpoint.xl) {
      return this.maxWidth
    }
  }

  get filtredWidgetTemplates() {
    if (!this.search) return this.widgetTemplates;
    return this.widgetTemplates.filter(w => (w.label && w.label.toLowerCase().includes(this.search.toLowerCase()))
      || (w.description && w.description.toLowerCase().includes(this.search.toLowerCase())))
  }

  dragstart() {

  }

  dragend() {

  }
}

interface WidgetTemplate {
  id: string,
  code: string,
  label: string,
  description: string,
  icon: string,
  width: number,
  height: number,
}

interface Widget {
  id: string;
  templateId: string
  code: string;
  width: number;
  height: number;
  x: number;
  y: number;
  meta: { [key: string]: string };
}
</script>