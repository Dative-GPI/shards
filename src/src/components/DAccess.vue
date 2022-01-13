<template>
    <d-icon
        v-bind="$attrs"
        v-on="$listeners"
        class="d-access"
        :color="value != Access.None ? 'alert-green' : 'alert-red'"
        :style="value == Access.Partial ? 'transform: rotate(-90deg);' : ''"
    >
        <template v-if="value == Access.None">mdi-cancel</template>
        <template v-else-if="value == Access.Partial">mdi-circle-half-full</template>
        <template v-else-if="value == Access.Full">mdi-check-circle</template>
    </d-icon>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    inheritAttrs: false,
    data: () => ({ Access })
})
export default class DAccess extends Vue {
    @Prop({ required: true })
    value!: Access;
}

enum Access {
    None = 0,
    Partial = 1,
    Full = 2
}

</script>