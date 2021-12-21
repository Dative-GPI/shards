<template>
	<v-row no-gutters>
		<div v-for="(item) in items" :key="item[itemValue]">
			<d-toggle
				v-bind="$attrs"
				:class="innerClass"
				class="mr-3 mb-3"
				:value="value === item[itemValue]"
				@input="$emit('input', value === item[itemValue] ? null : item[itemValue])"
				:text="item[itemText]"
				:icon="item[itemIcon]"
			>
				<template #default="props">
					<slot v-bind="{ ...props, item }" />
				</template>
			</d-toggle>
		</div>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DToggleSet extends Vue {
	@Prop({ required: false })
	innerClass!: string;

	@Prop({ required: false, default: "icon" })
	itemIcon!: string;

	@Prop({ required: false, default: "text" })
	itemText!: string;

	@Prop({ required: false, default: "value" })
	itemValue!: string;

	@Prop({ required: true })
	value!: string;

	@Prop({ required: true })
	items!: any[];
}
</script>