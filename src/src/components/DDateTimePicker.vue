<template>
  <div class="d-date-time-picker">
    <v-menu
      ref="menu"
      :value="menuValue"
      @input="onMenuInput"
      :close-on-content-click="false"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <slot name="activator" :on="on" :attrs="attrs">
          <v-text-field
            v-model="formattedDateTime"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            :rules="$attrs.rules"
            v-bind="attrs"
            v-on="on"
          />
        </slot>
      </template>

      <v-fade-transition leave-absolute v-if="selectDate">
        <v-date-picker v-model="date" @change="saveDate">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="'date-' + name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="'date-' + name" v-bind="data"></slot>
          </template>
        </v-date-picker>
      </v-fade-transition>

      <v-fade-transition leave-absolute v-if="selectTime">
        <v-time-picker v-model="time" format="24hr" @change="saveTime">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="'time-' + name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="'time-' + name" v-bind="data"></slot>
          </template>
        </v-time-picker>
      </v-fade-transition>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { format, parse } from "date-fns";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class DDateTimePicker extends Vue {
  // Properties

  @Prop({ required: false, default: () => null })
  value!: Date | null;

  @Prop({ required: false, default: "Date et heure" })
  label!: string;

  @Ref("menu")
  menu: any;

  // Data

  DATE_FORMAT = "yyyy-MM-dd";
  TIME_FORMAT = "HH:mm";

  menuValue = false;
  selectDate = true;
  selectTime = false;

  date: string = "";
  time: string = "";

  // Computed Properties

  get dateTime() {
    return parse(
      `${this.date} ${this.time}`,
      `${this.DATE_FORMAT} ${this.TIME_FORMAT}`,
      new Date()
    );
  }

  get formattedDateTime() {
    try {
      return format(this.dateTime, "dd/MM/yyyy HH:mm XXX");
    } catch {
      return undefined;
    }
  }

  // Methods

  onMenuInput(menuValue: boolean) {
    this.menuValue = menuValue;
    this.date = "";
    this.time = "";
    
    if (this.menuValue) {
      this.selectDate = true;
      this.selectTime = false;
    }
  }

  saveDate(date: string) {
    this.date = date;
    this.selectDate = false;
    this.selectTime = true;
  }

  saveTime(time: string) {
    this.time = time;
    this.selectTime = false;
    this.menuValue = false;

    this.$emit("input", this.dateTime);
  }

  reset() {
    if (this.value == null) {
      this.date = "";
      this.time = "";
    } else {
      this.date = format(this.value, this.DATE_FORMAT);
      this.time = format(this.value, this.TIME_FORMAT);
    }
  }

  // Lifecycle

  @Watch("value")
  onValueChanged = this.reset;
}
</script>

<style scoped>
.d-date-time-picker {
  flex: 1 1 auto;
}
</style>
