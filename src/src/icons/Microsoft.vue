<template>
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="21" height="21" :fill="`url(#${patternId})`" />
    <defs>
      <pattern :id="patternId" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use :xlink:href="`#${imageId}`" transform="scale(0.047619)"/>
      </pattern>
      <image :id="imageId" width="21" height="21" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAVklEQVQ4EWNgoBX4FKD0nxAG2V2/i+E/IQx3IyEDQfKjho6G6UAnKXiCpSpjyfv/DIQwAwPD/50M/wlhhLsIGQiSHzWUUHiC5EfDFBoCNElSiNClCgsA6SEhUt3q3hcAAAAASUVORK5CYII="/>
    </defs>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Microsoft extends Vue {
  patternId: string = "" + Math.random(); // formerly pattern0
  
  imageId: string = "" + Math.random(); // formerly image0_1285:239180
}
</script>