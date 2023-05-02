<template>
  <div class="alert alert--text-small" :class="['alert--' + alert.type, {'alert--has-close': alert.closable}]" :key="alert.id">
    <button class="alert__close" v-if="alert.closable" @click="onClickClose(alert)">&times;</button>
    <div v-html="alert.text"></div>
  </div>
</template>

<script lang="ts">
import {Alert} from "@/typings";
import {PropType, defineComponent} from "vue";

export default defineComponent({
  name: "AppAlert",
  props: {
    alert: {
      type: Object as PropType<Alert>,
      required: true
    }
  },
  emits: ['onClose'],
  methods: {
    onClickClose(alert : Alert) {
      this.$emit('onClose', alert)
    },
  },
})
</script>
