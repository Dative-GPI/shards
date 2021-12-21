<template>
  <svg
    v-bind="$attrs"
    viewBox="0 0 173 175"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
    class="d-circle"
  >
    <path
      d="M128.054 164.737L128.053 164.737C96.3557 183.588 54.2442 171.216 29.0928 149.487L29.088 149.483C3.91471 128.015 -4.08155 97.4127 4.06877 66.7463C12.3998 35.8232 37.0356 4.95171 72.6492 1.35996C90.4945 -0.439792 111.199 4.58626 129.062 14.7253C146.925 24.864 161.832 40.0488 168.218 58.4555C174.607 76.9448 172.521 98.8092 164.817 118.451C157.113 138.096 143.845 155.375 128.054 164.737Z"
      stroke-width="2"
      :stroke="color"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DCircle extends Vue {
  @Prop({ required: false, default: 'white' })
  color!: string;

  @Prop({ required: false, default: 'white' })
  fill!: string;
}
</script>