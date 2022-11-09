<template>
  <section class="product-left">
    <div class="product-left__img" :class="{ showMainMobImg: product.images.length === 1 }">
      <img v-lazy="mainImg" :alt="product.name" />

      <div :class="{ active: shareDesktopLink }" @click="shareShowDesktop" class="product-left__share">
        <a class="product-left__share-link">
          <ShareSvg class="product-left__share-img" />
        </a>
      </div>

      <div :class="{ active: shareDesktop }" class="product-share">
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
        <div @click="shareHideDesktop" class="product-share__close">
          <CloseShareDesktopSvg class="product-share__close-icon" />
        </div>
      </div>
    </div>

    <AppSwiper
      v-if="product.images.length > 1"
      :swiper-config="swiperConfig"
      :images="product.images"
      :click-handler="handleSetMainImg"
    />

    <div :class="{ active: shareDesktopLink }" @click="shareShowDesktop" class="product-left__share">
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
      <div @click="shareHideDesktop" class="product-share__close">
        <CloseShareDesktopSvg class="product-share__close-icon" />
      </div>
    </div>
  </section>
</template>

<script>
  import AppSwiper from '../UI/AppSwiper.vue'
  import ShareSvg from '@/assets/img/icons/svg/share.svg?inline'
  import CopyShareSvg from '@/assets/img/icons/svg/copy-share.svg?inline'
  import TelegramDesktopSvg from '@/assets/img/icons/svg/telegram-desktop.svg?inline'
  import WhatsappDesktopSvg from '@/assets/img/icons/svg/whatsapp-desktop.svg?inline'
  import CloseShareDesktopSvg from '@/assets/img/icons/svg/close-share-desktop.svg?inline'

  export default {
    name: 'ProductImages',
    components: {
      AppSwiper,
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
      }
    },
    computed: {
      mainImg() {
        return this.product?.images?.[this.indexImg]?.url
      },
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
