<template>
    <d-btn
        :width="responsiveWidth"
        :height="responsiveHeight"
        :color="backgroundColor"
        class="d-toggle"
        :class="`${textColor}--text clickable`"
        @click="$emit('input', !value)"
    >
        <slot v-bind="{  textColor, backgroundColor  }">
            <div class="pa-3" :style="`max-width: ${width}px`">
                <div>
                    <v-icon :size="responsiveHeight/2">{{ icon }}</v-icon>
                </div>
                <div v-if="text && (!responsive || !$vuetify.breakpoint.mobile)" class="text-truncate mt-2">{{ text }}</div>
            </div>
        </slot>
    </d-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DToggle extends Vue {
    @Prop({ required: true })
    value!: boolean;

    @Prop({required: false, default: true})
    responsive!: boolean;

    @Prop({ required: false, default: "$planning" })
    icon!: string;

    @Prop({ required: false, default: "Planning" })
    text!: string;

    @Prop({ required: false, default: "white-1" })
    activeColor!: string;

    @Prop({ required: false, default: "grey-3" })
    idleColor!: string;

    @Prop({ required: false, default: "blue-3" })
    activeBackground!: string;

    @Prop({ required: false, default: "blue-4" })
    idleBackground!: string;

    @Prop({ required: false, default: 150, type: Number })
    width!: number;

    @Prop({ required: false, default: 100, type: Number })
    height!: number;

    get textColor() {
        return this.value ? this.activeColor : this.idleColor;
    }

    get backgroundColor() {
        return this.value ? this.activeBackground : this.idleBackground;
    }

    get responsiveWidth() {
        if(this.responsive && this.$vuetify.breakpoint.mobile) {
            return 75;
        }
        return this.width;
    }

    get responsiveHeight() {
        if(this.responsive && this.$vuetify.breakpoint.mobile) {
            return 50;
        }
        return this.height;
    }
}
</script>