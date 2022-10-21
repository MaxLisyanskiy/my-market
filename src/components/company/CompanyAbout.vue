<template>
  <section id="About" class="company content-row active">
    <div class="banner-about">
      <a href="#" class="banner-about__link active">Описание</a>
      <a href="#" class="banner-about__link">Реквизиты</a>
    </div>

    <div class="company__wrapper">
      <div class="wrapper-sidebar sidebar" :class="{ fixed: !scrolled }">
        <ul class="sidebar-list">
          <li
            v-for="link in links"
            :key="link.name"
            class="sidebar-link"
            :class="{ active: activeLink === link.goTo }"
            @click="scrollTo(link.goTo)"
          >
            <a>{{ link.name }}</a>
          </li>
        </ul>
      </div>

      <div class="company-description">
        <div ref="description">
          <span class="company-description__title">Описание</span>

          <AppSwiper v-if="company.images.length > 1" :swiper-config="swiperConfig" :images="company.images" />

          <span class="company-description__text"> {{ company.description }} </span>
          <span class="company-description__read">Показать полностью</span>
        </div>

        <div ref="requisites" class="company-requisites">
          <h3 class="company-requisites__title">Реквизиты</h3>
          <div class="table">
            <div class="table-block">
              <div class="table-block__left">Lorem ipsum dolo</div>
              <div class="table-block__right">Lorem ipsum dolor, sit amet</div>
            </div>
            <div class="table-block">
              <div class="table-block__left">Lorem ipsum dolo</div>
              <div class="table-block__right">Lorem ipsum dolor, sit amet</div>
            </div>
            <div class="table-block">
              <div class="table-block__left">Lorem ipsum dolo</div>
              <div class="table-block__right">Lorem ipsum dolor, sit amet</div>
            </div>
            <div class="table-block">
              <div class="table-block__left">Lorem ipsum</div>
              <div class="table-block__right">Lorem ipsum dolor, sit amet</div>
            </div>
            <div class="table-block">
              <div class="table-block__left">Lorem ipsum dolo</div>
              <div class="table-block__right">Lorem ipsum dolor, sit amet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import AppSwiper from '~/components/UI/AppSwiper.vue'

  export default {
    name: 'CompanyAbout',
    components: { AppSwiper },
    props: {
      company: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
      scrolled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeLink: 'description',
        links: [
          { name: 'Описание', goTo: 'description' },
          { name: 'Реквизиты', goTo: 'requisites' },
        ],
      }
    },
    methods: {
      scrollTo(refName) {
        const element = this.$refs[refName]
        const top = element.offsetTop

        this.activeLink = refName

        const indent = !this.scrolled ? 107 : 90

        window.scrollTo(300, top - indent)
      },
    },
  }
</script>
