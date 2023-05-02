<template>
  <div class="alerts-holder">
    <transition-group name="alert" tag="div" mode="out-in">
      <app-alert v-for="alert in alerts"
        :alert="alert"
        @on-close="onCloseAlert(alert)"
        :key="alert.id"
      >
      </app-alert>
    </transition-group>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AppAlert from './AppAlert.vue'

export default {
  name: "AppAlerts",
  computed: {
    ...mapGetters('alerts', ['alerts'])
  },
  methods: {
    ...mapActions('alerts', ['alertRemove']),
    onCloseAlert(alert) {
      this.alertRemove(alert);
    }
  },
  components: { AppAlert }
}
</script>

<style lang="scss">
  .alerts-holder {
    position: fixed;
    top: 80px;
    right: 20px;
    width: 300px;
    z-index: 700;
  }

  .alert {
    position: relative;
    margin-bottom: 10px;
    display: inline-block;
    width: 100%;
    transition: all 1s ease;

    &-enter-active,
    &-leave-active {
      position: relative;
    }

    &-enter-from,
    &-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &--text-small {
      font-size: 13px;
    }

    &--has-close {
      padding-right: 35px;
    }

    &__close {
      position: absolute;
      top: 7px;
      right: 7px;
      user-select: none;
      display: block;
      width: 25px;
      height: 25px;
      line-height: 15px;
      padding: 0;
      border: 1px solid #B5B7B8;
      background: #e9eaea;
      color: #B5B7B8;
      font-weight: bold;
    }
    a {
      color: inherit;
      opacity: 0.5;
    }

    &--primary {
      .alert__close {
        border: 1px solid #3E8096;
        background: #98c6d5;
        color: #3E8096;
      }
    }

    &--success {
      .alert__close {
        border: 1px solid #92C57A;
        background: #cce4c1;
        color: #92C57A;
      }
    }

    &--error {
      .alert__close {
        border: 1px solid #ea4c3a;
        background: #f4a096;
        color: #ea4c3a;
      }
    }
  }
</style>