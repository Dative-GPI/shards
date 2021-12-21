<template>
  <v-dialog v-model="value" max-width="400">
    <v-card>
      <v-card-title>
        <d-title :label="message" />
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <d-btn text @click="$emit('click:first')">
          {{ firstLabel }}
        </d-btn>
        <d-btn text @click="$emit('click:second')">
          {{ secondLabel }}
        </d-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DTwoOptionsDialog extends Vue {
  @Prop({ required: true })
  value!: boolean;

  @Prop({ required: true })
  message!: string;

  @Prop({ required: true })
  firstLabel!: string;

  @Prop({ required: true })
  secondLabel!: string;
}
</script>