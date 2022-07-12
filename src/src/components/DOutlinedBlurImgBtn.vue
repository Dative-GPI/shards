<template>
  <div class="d-outlined-blur-img-btn">
    <d-outlined-blur-img v-bind="$attrs">
      <slot name="actions">
        <slot name="edit">
          <d-btn
            :class="{ hidden: !editable }"
            class="d-img-btn-edit grey-3 white-2--text"
            @click="$emit('edit')"
          >
            <v-icon v-text="editIcon" />
          </d-btn>
        </slot>

        <v-hover
          v-slot="{ hover }"
          :class="{ hidden: editable }"
          class="d-img-btn-hover"
        >
          <slot name="hover" :hover="hover">
            <div>
              <d-btn
                :class="{ hidden: editable || !hover }"
                class="grey-3 white-2--text"
                @click="$emit('click')"
              >
                <v-icon v-text="hoverIcon" />
              </d-btn>
            </div>
          </slot>
        </v-hover>
      </slot>

      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </d-outlined-blur-img>

    <slot name="remove">
      <d-btn-remove
        class="d-img-btn-remove"
        :class="{ hidden: !editable }"
        @click="$emit('remove')"
      />
    </slot>

    <slot name="icons" :icons="additionalIcons">
      <div class="d-img-btn-icons">
        <template v-for="(aIcon, index) in additionalIcons">
          <slot name="icon" :icon="aIcon" :index="index">
            <d-btn
              class="grey-3 darken-2 white-2--text"
              @click="$emit('click:icon', index)"
              :icon="aIcon"
            />
          </slot>
        </template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DOutlinedBlurImgBtn extends Vue {
  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: false, default: "mdi-magnify" })
  hoverIcon!: string;

  @Prop({ required: false, default: "mdi-pencil" })
  editIcon!: string;

  @Prop({ required: false, default: () => [] })
  additionalIcons!: string[];
}
</script>

<style scoped>
.d-outlined-blur-img-btn {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.d-img-btn-edit,
.d-img-btn-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100% !important;
  transition: opacity 0.3s, visibility 0.3s;
  opacity: 0.7;
}

.d-img-btn-hover * {
  width: 100%;
  height: 100% !important;
}

.d-img-btn-remove {
  position: absolute;
  right: 0;
  top: min(15px, 5%);
  transition: opacity 0.3s, visibility 0.3s;
}

.d-img-btn-icons {
  position: absolute;
  bottom: min(15px, 5%);
  right: 0;
  display: flex;
  flex-flow: column-reverse wrap-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px 4px;

  height: 50%;
}
</style>
