<template>
  <div class="services" v-if="isNotEmptyServices">
    <div class="services__zz row row--30px row--small-phone-15px row--mt60px">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="(s, key) in services">
        <router-link class="services__item" :to="'/catalog/' + key">
          <div class="services__img-holder" data-aos="fade-left">
            <div class="services__img-inner">
              <picture class="services__pict">
                <img class="services__img" :src="s.img" alt='s.title'>
              </picture>
            </div>
          </div>
          <div class="services__text-holder">
            <div class="services__text">{{ s.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    services: {
      type: Object
    }
  },
  setup(props) {
    const services = props.services
    console.log('123', props)
    const isNotEmptyServices = !!Object.keys(services).length

    return {
      services,
      isNotEmptyServices
    }
  }
}
</script>