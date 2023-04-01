<template>
  <tr>
    <td class="form__table-cell form__table-cell--pr15px">
      <label class="nowrap" :for="controlId">{{label}}</label>
    </td>
    <td class="form__table-cell form__table-cell--wide">
      <input
          class="input"
          :name="inputName"
          :id="controlId"
          :aria-describedby="descriptionId"
          :value="controlValue"
          @input="onInput"
      >
      <div class="control-error" v-if="errors.length">
        <div v-for="error of errors">
          <div>{{ error.$message }}</div>
        </div>
      </div>
    </td>
  </tr>
  <tr v-if="description">
    <td class="form__table-cell"></td>
    <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
      <small class="control-description" :id="descriptionId" v-html="description"></small>
    </td>
  </tr>
</template>

<script>
export default {
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
      required: false
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
    onInput(event) {
      this.$emit('update:controlValue', event.target.value)
    }
  }
}
</script>