<template>
  <div>
    <BVFormSelect
      v-bind="attrs"
      v-on="listeners"
      v-if="attrs.multiple === undefined"
    >
      <!-- Default Slot -->
      <slot v-bind="attrs" v-on="listeners"></slot>

      <!-- Named Slots -->
      <template v-for="(slot, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>

      <!-- Scoped Slots -->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-for="(slot, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </BVFormSelect>
    <!-- If multiple is defined, use b-form-checkbox-group instead with scroll -->
    <b-form-checkbox-group
      v-else
      v-model="selected"
      class="border rounded p-2 overflow-auto"
      :style="`height: ${attrs.size * 2}rem;`"
      stacked
      v-bind="attrs"
      :options="attrs.options"
      @change="selectOption"
    >
      <template #first>
        <b-button
          :indeterminate="indeterminate"
          @click="toggleAll"
          variant="link"
        >
          {{ allSelected ? "Deseleccionar todos" : "Seleccionar todos" }}
        </b-button>
      </template>
    </b-form-checkbox-group>
  </div>
</template>

<script>
import { BFormSelect } from 'bootstrap-vue';

export default {
  components: {
    BVFormSelect: BFormSelect,
  },
  // name: "b-form-select",
  inheritAttrs: false,
  data() {
    return {
      selected:
        this.$attrs.value && this.$attrs.value instanceof Array
          ? this.$attrs.value
          : [],
      selectUnselect: false,
    };
  },
  computed: {
    attrs() {
      // All attributes except for class and style, which are handled differently
      const { class: _, style: __, ...rest } = this.$attrs;
      return rest;
    },
    listeners() {
      // eslint-disable-next-line vue/no-deprecated-dollar-listeners-api
      return this.$listeners;
    },
    allSelected() {
      return this.selected.length === this.attrs.options.length;
    },
    indeterminate() {
      return this.selected.length > 0 && !this.allSelected;
    },
  },
  methods: {
    selectOption() {
      // Emit the change event with the selected options
      this.$emit('input', this.selected);
      this.$emit('change', this.selected);
    },
    toggleAll() {
      const valueField = this.attrs.valueField || 'value';
      if (!this.allSelected) {
        this.selected = this.attrs.options.map((o) => (typeof o === 'object' ? o[valueField] : o));
      } else {
        this.selected = [];
      }
      this.selectOption();
    },
  },
  watch: {
    '$attrs.value': function updateSelectedValue() {
      if (this.$attrs.value && this.$attrs.value instanceof Array) {
        this.selected = this.$attrs.value;
      }
    },
  },
};
</script>
