<template>
  <section class="product-left">
    <div class="product-left__img" :class="{ showMainMobImg: product.images.length === 1 }">
      <img v-lazy="mainImg" :alt="product.name" @click="handleShowProductImgs" />

      <div class="product-left__share" :class="{ active: shareDesktopLink }" @click="shareShowDesktop">
        <a class="product-left__share-link">
          <ShareSvg class="product-left__share-img" />
        </a>
      </div>

      <div :class="{ active: shareDesktop }" class="product-share">
        <div class="product-share__copy" @click="handleCopyURL">
          <CopyShareSvg class="product-share__copy-icon" />
          <span class="product-share__copy-text">Коп. ссылку</span>
        </div>
        <a
          :href="`https://t.me/share/url?url=${locationHref}&text=${product.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`"
          target="_blank"
        >
          <div class="product-share__social">
            <TelegramDesktopSvg class="product-share__social-icon" />
          </div>
        </a>
        <a
          :href="`https://api.whatsapp.com/send?text=${product.name} - оптом от завода. По низким ценам с доставкой | VALE.SU`"
          target="_blank"
        >
          <div class="product-share__social">
            <WhatsappDesktopSvg class="product-share__social-icon" />
          </div>
        </a>
        <div class="product-share__close" @click="shareHideDesktop">
          <CloseShareDesktopSvg class="product-share__close-icon" />
        </div>
      </div>
    </div>

    <div @click="handleShowProductImgsSwiper">
      <AppSwiper
        v-if="product.images.length > 1"
        :swiper-config="swiperConfig"
        :images="product.images"
        :click-handler="handleSetMainImg"
      />
    </div>

    <div class="product-left__share" :class="{ active: shareDesktopLink }" @click="shareShowDesktop">
      <a class="product-left__share-link">
        <ShareSvg class="product-left__share-img" />
      </a>
    </div>

    <div :class="{ active: shareDesktop }" class="product-share product-share__two">
      <div class="product-share__copy">
        <CopyShareSvg class="product-share__copy-icon" />
        <span class="product-share__copy-text">Коп. ссылку</span>
      </div>
      <div class="product-share__social">
        <TelegramDesktopSvg class="product-share__social-icon" />
      </div>
      <div class="product-share__social">
        <WhatsappDesktopSvg class="product-share__social-icon" />
      </div>
      <div class="product-share__close" @click="shareHideDesktop">
        <CloseShareDesktopSvg class="product-share__close-icon" />
      </div>
    </div>

    <AppLightBox
      ref="lightbox"
      :media="product.images"
      :company="company"
      :start-at="indexImg"
      :show-caption="true"
      :show-light-box="false"
    />
  </section>
</template>

<script>
  import AppSwiper from '@/components/UI/AppSwiper.vue'
  import AppLightBox from '@/components/UI/AppLightBox/index.vue'

  import ShareSvg from '@/assets/img/icons/svg/share.svg?inline'
  import CopyShareSvg from '@/assets/img/icons/svg/copy-share.svg?inline'
  import TelegramDesktopSvg from '@/assets/img/icons/svg/telegram-desktop.svg?inline'
  import WhatsappDesktopSvg from '@/assets/img/icons/svg/whatsapp-desktop.svg?inline'
  import CloseShareDesktopSvg from '@/assets/img/icons/svg/close-share-desktop.svg?inline'

  export default {
    name: 'ProductImages',
    components: {
      AppSwiper,
      AppLightBox,
      ShareSvg,
      CopyShareSvg,
      TelegramDesktopSvg,
      WhatsappDesktopSvg,
      CloseShareDesktopSvg,
    },
    props: {
      product: {
        type: Object,
        default: () => {},
      },
      company: {
        type: Object,
        default: () => {},
      },
      swiperConfig: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        indexImg: 0,
        shareDesktop: false,
        shareDesktopLink: true,
        locationHref: '',
        showLightBox: false,
      }
    },
    computed: {
      mainImg() {
        return this.product?.images?.[this.indexImg]?.url
      },
    },
    mounted() {
      this.locationHref = window.location.href
    },
    methods: {
      /**
       * Get image index in Swiper and set new main image
       * @param {number} index image index in swiper
       */
      handleSetMainImg(index) {
        this.indexImg = index
      },

      shareShowDesktop() {
        this.shareDesktop = true
        this.shareDesktopLink = false
      },

      shareHideDesktop() {
        this.shareDesktop = false
        this.shareDesktopLink = true
      },

      handleCopyURL() {
        navigator.clipboard.writeText(window.location.href)
        this.$notify({
          title: '',
          message: 'Ссылка на товар успешно скопирована',
          type: 'success',
        })
        this.shareHideDesktop()
      },

      handleShowProductImgs() {
        this.$refs.lightbox.showImage(this.indexImg)
      },

      handleShowProductImgsSwiper() {
        if (window.innerWidth < 871) {
          this.$refs.lightbox.showImage(this.indexImg)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .showMainMobImg {
    @media (max-width: 870px) {
      display: flex !important;
      height: 390px;
      max-width: 100vw;
      width: 100%;
      margin-bottom: 0;
    }
  }
</style>
