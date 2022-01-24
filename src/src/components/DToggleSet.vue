<template>
	<v-row no-gutters>
		<div v-for="(item) in items" :key="item[itemValue]">
			<d-toggle
				v-bind="$attrs"
				class="mr-3 mb-3"
				:class="innerClass"
				:text="item[itemText]"
				:icon="item[itemIcon]"
				:value="value === item[itemValue]"
				@input="onInput(item)"
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

	@Prop({ required: false, default: false })
	mandatory!: boolean;

	@Prop({ required: true })
	value!: string;

	@Prop({ required: true })
	items!: any[];

	onInput(item: any): void {
		if (this.value === item[this.itemValue]) {
			if (!this.mandatory) {
				this.$emit('input', null)
			}
		}
		else {
			this.$emit('input', item[this.itemValue]);
		}
	}
}
</script>