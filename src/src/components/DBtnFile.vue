<template>
  <div>
    <d-btn
      v-bind="$attrs"
      v-on="$listeners"
      class="d-btn-file grey-3 white-2--text"
      @click="onClick"
    >
      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </d-btn>
    <form>
      <input
        v-show="false"
        type="file"
        ref="input"
        :accept="accept"
        @input="onInput"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DBtnFile extends Vue {
  @Ref("input")
  input!: HTMLInputElement;

  @Prop({ required: false, default: "" })
  accept!: string;

  @Prop({ required: false, default: true })
  readFile!: boolean;

  onClick(): void {
    this.input.click();
  }

  onInput(): void {
    const file = this.input.files && this.input.files[0];

    if (!file) {
      return;
    }

    if (!this.readFile) {
      this.$emit("input", file);
      this.clear();
      return;
    }
    
    const reader = new FileReader();
    reader.addEventListener("load", (fileEv) => {
      this.$emit("input", fileEv.target && fileEv.target.result);
      this.clear();
    });
    reader.readAsDataURL(file);
  }

  clear(): void {
    this.input.form && this.input.form.reset();
  }
}
</script>