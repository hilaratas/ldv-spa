<template>
  <tr>
    <td class="form__table-cell form__table-cell--pr15px">
      <label class="nowrap" :for="controlId" v-html="label"></label>
    </td>
    <td class="form__table-cell form__table-cell--wide">
      <input
          class="input"
          :type="inputType"
          :name="inputName"
          :id="controlId"
          :aria-describedby="descriptionId"
          :value="controlValue"
          @input="onInput"
      >
      <div class="control-error-holder">
        <div class="control-error" v-if="errors.length">
          <div v-for="error of errors">
            <div>{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div v-if="description" style="padding-bottom: 10px">
        <small class="control-description" :id="descriptionId" v-html="description"></small>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import INPUT_TYPES from '@/config/input-types'
export default defineComponent({
  name: "NewsInputRow",
  emits: ['update:controlValue'],
  props: {
    formName: {
      type: String,
      required: false
    },
    inputName: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    errors: {
      type: Array,
      required: false
    },
    controlValue: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text',
      validate: (value: string) => INPUT_TYPES.includes(value)
    }
  },
  computed: {
    controlId() {
      const hash = (Math.random()*100000).toFixed()
      return this.formName ?
          `${this.formName}_${this.inputName}_${hash}` :
          `${this.inputName}_${hash}`
    },
    descriptionId() {
      return this.controlId + '_disc'
    }
  },
  methods: {
    // todo: указать тип
    onInput(event : any) {
      this.$emit('update:controlValue', event.target.value)
    }
  }
})
</script>