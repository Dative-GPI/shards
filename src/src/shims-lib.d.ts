import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $color: (colorKey: string) => string;
    }
}