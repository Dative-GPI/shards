<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :max-width="$vuetify.breakpoint.mobile ? 307 : 550"
  >
    <v-card>
      <v-card-title>
        <d-title class="text-h4">
          <slot name="title">
            {{ title }}
          </slot>
        </d-title>
      </v-card-title>
      <v-card-text>
        <d-text>
          <slot name="text">
            {{ text }}
          </slot>
        </d-text>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-spacer />
          <d-btn
            :outlined="true"
            class="white-1 grey-3--text d-btn-cancel"
            text
            :icon="leftIcon"
            @click="$emit('click:left')"
          >
            <slot name="left">
              {{ left }}
            </slot>
          </d-btn>
          <d-btn
            :icon="rightIcon"
            class="grey-3 white-2--text"
            text
            @click="$emit('click:right')"
          >
            <slot name="right">
              {{ right }}
            </slot>
          </d-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DSimpleDialog extends Vue {
  @Prop({ required: false, default: "", type: String })
  title!: string;

  @Prop({ required: false, default: "", type: String })
  text!: string;

  @Prop({ required: false, default: "", type: String })
  left!: string;

  @Prop({ required: false, default: "mdi-close", type: String })
  leftIcon!: string | undefined;

  @Prop({ required: false, default: "", type: String })
  right!: string;

  @Prop({ required: false, default: () => undefined, type: String })
  rightIcon!: string | undefined;
}
</script>