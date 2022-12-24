<template>
  <div @click.stop="closeLightBox">
    <transition
      mode="out-in"
      name="vib-container-transition"
      @afterEnter="enableImageTransition"
      @beforeLeave="disableImageTransition"
    >
      <div v-if="media && media.length > 0" v-show="lightBoxShown" ref="container" class="vib-container">
        <!-- header -->
        <div class="vib-header">
          <button class="vib-header__arrow" type="button" :title="closeText">
            <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.4522 24.5435C14.1826 23.813 14.1826 22.5957 13.4522 21.8652L4.44348 12.8565L13.4522 3.84783C14.1826 3.11739 14.1826 2.02174 13.4522 1.29131C12.7217 0.560871 11.6261 0.560871 10.8957 1.29131L0.547826 11.6391C-0.182609 12.3696 -0.182609 13.4652 0.547826 14.1957L10.8957 24.5435C11.6261 25.1522 12.7217 25.1522 13.4522 24.5435Z"
                fill="#CCCCCC"
              />
            </svg>
          </button>

          <div class="vib-header__count">
            <slot name="footer" :current="select + 1" :total="media.length">
              {{ select + 1 }} / {{ media.length }}
            </slot>
          </div>
        </div>

        <div class="vib-content" @click.stop>
          <div class="vib-content_desk">
            <button
              v-if="media.length > 1"
              type="button"
              class="vib-arrow vib-arrow-left vib-hideable"
              :class="{ 'vib-hidden': controlsHidden }"
              :title="previousText"
              @click.stop="previousImage()"
              @mouseover="interfaceHovered = true"
              @mouseleave="interfaceHovered = false"
            >
              <slot name="previous">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.852174 0.81995C0.382609 1.33187 0.382609 2.18507 0.852174 2.69699L6.64348 9.01066L0.852174 15.3243C0.382609 15.8363 0.382609 16.6041 0.852174 17.1161C1.32174 17.628 2.02609 17.628 2.49565 17.1161L9.14783 9.86386C9.61739 9.35194 9.61739 8.58407 9.14783 8.07215L2.49565 0.81995C2.02609 0.39335 1.32174 0.39335 0.852174 0.81995Z"
                    fill="white"
                  />
                </svg>
              </slot>
            </button>
            <transition mode="out-in" :name="imageTransitionName">
              <img
                :key="currentMedia.url"
                :src="currentMedia.url"
                :srcset="currentMedia.srcset || ''"
                class="vib-image"
                :alt="currentMedia.caption"
              />
            </transition>
            <button
              v-if="media.length > 1"
              type="button"
              class="vib-arrow vib-arrow-right vib-hideable"
              :class="{ 'vib-hidden': controlsHidden }"
              :title="nextText"
              @click.stop="nextImage()"
              @mouseover="interfaceHovered = true"
              @mouseleave="interfaceHovered = false"
            >
              <slot name="next">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.852174 0.81995C0.382609 1.33187 0.382609 2.18507 0.852174 2.69699L6.64348 9.01066L0.852174 15.3243C0.382609 15.8363 0.382609 16.6041 0.852174 17.1161C1.32174 17.628 2.02609 17.628 2.49565 17.1161L9.14783 9.86386C9.61739 9.35194 9.61739 8.58406 9.14783 8.07215L2.49565 0.81995C2.02609 0.39335 1.32174 0.39335 0.852174 0.81995V0.81995Z"
                    fill="white"
                  />
                </svg>
              </slot>
            </button>
          </div>
          <swiper v-if="lightBoxShown" :media="media" :select="select" :click-handler="handleSetMainImg" />
        </div>

        <div
          v-if="showThumbs"
          class="vib-thumbnail-wrapper vib-hideable"
          :class="{ 'vib-hidden': controlsHidden }"
          @click.stop
          @mouseover="interfaceHovered = true"
          @mouseleave="interfaceHovered = false"
        >
          <div
            v-for="(image, index) in media"
            v-show="index >= thumbIndex.begin && index <= thumbIndex.end"
            :key="typeof image.thumb === 'string' ? `${image.thumb}${index}` : index"
            class="vib-thumbnail"
            :class="select === index ? 'vib-thumbnail-active' : ''"
            @click.stop="showImage(index)"
          >
            <img :src="image.url" :alt="image.name" />
          </div>
        </div>

        <div
          class="vib-footer vib-footer_desk vib-hideable"
          :class="{ 'vib-hidden': controlsHidden }"
          @mouseover="interfaceHovered = true"
          @mouseleave="interfaceHovered = false"
          @click.stop
        >
          <div class="vib-buttons">
            <div v-if="!showPhone" class="vib-buttons__btn vib-buttons__call" @click="() => (showPhone = true)">
              <BtnCallSvg class="btn-call__img" />
              <span class="product-call__text">Показать номер</span>
            </div>
            <a
              v-else-if="showPhone && company.phone"
              :href="`tel:${company.phone}`"
              class="vib-buttons__btn vib-buttons__call"
            >
              <BtnCallSvg class="btn-call__img" />
              <span class="product-call__text">{{ formattingPhone }}</span>
            </a>
            <div v-else class="vib-buttons__btn vib-buttons__call vib-buttons__call_notFound">
              <span class="product-call__text">Нет номера</span>
            </div>

            <a :href="`mailto:${company.email}`" class="vib-buttons__btn vib-buttons__chat">
              <BtnMessageSvg class="btn-chat__img" />
              <span class="product-chat__text">Написать</span>
            </a>
          </div>
        </div>

        <div class="vib-footer vib-footer_mob" @click.stop>
          <div class="vib-buttons">
            <a v-if="company.phone" :href="`tel:${company.phone}`" class="vib-buttons__btn vib-buttons__call">
              <span class="product-chat__text">Позвонить</span>
            </a>

            <div v-else class="vib-buttons__btn vib-buttons__call vib-buttons__call_notFound">
              <span class="product-call__text">Нет номера</span>
            </div>

            <a :href="`mailto:${company.email}`" class="vib-buttons__btn vib-buttons__chat">
              <span class="product-chat__text">Написать</span>
            </a>
          </div>
        </div>

        <button
          v-if="closable"
          type="button"
          :title="closeText"
          class="vib-close vib-hideable"
          :class="{ 'vib-hidden': controlsHidden }"
          @mouseover="interfaceHovered = true"
          @mouseleave="interfaceHovered = false"
        >
          <slot name="close">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.87422 7.50011L14.7149 1.65911C15.095 1.27918 15.095 0.664882 14.7149 0.28495C14.335 -0.0949832 13.7207 -0.0949832 13.3408 0.28495L7.49991 6.12595L1.65921 0.28495C1.27911 -0.0949832 0.665002 -0.0949832 0.285077 0.28495C-0.0950257 0.664882 -0.0950257 1.27918 0.285077 1.65911L6.12578 7.50011L0.285077 13.3411C-0.0950257 13.721 -0.0950257 14.3353 0.285077 14.7153C0.474417 14.9048 0.72337 15 0.972145 15C1.22092 15 1.4697 14.9048 1.65921 14.7153L7.49991 8.87428L13.3408 14.7153C13.5303 14.9048 13.7791 15 14.0279 15C14.2766 15 14.5254 14.9048 14.7149 14.7153C15.095 14.3353 15.095 13.721 14.7149 13.3411L8.87422 7.50011Z"
                fill="#F7F5F5"
                fill-opacity="0.6"
              />
            </svg>
          </slot>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
  import swiper from './swiper.vue'
  import BtnCallSvg from '@/assets/img/icons/svg/btn-call.svg?inline'
  import BtnMessageSvg from '@/assets/img/icons/svg/btn-message.svg?inline'

  export default {
    components: { swiper, BtnCallSvg, BtnMessageSvg },

    props: {
      media: {
        type: Array,
        required: true,
      },

      company: {
        type: Object,
        default: () => {},
      },

      disableScroll: {
        type: Boolean,
        default: true,
      },

      showLightBox: {
        type: Boolean,
        default: true,
      },

      closable: {
        type: Boolean,
        default: true,
      },

      startAt: {
        type: Number,
        default: 0,
      },

      nThumbs: {
        type: Number,
        default: 7,
      },

      showThumbs: {
        type: Boolean,
        default: true,
      },

      // Mode
      autoPlay: {
        type: Boolean,
        default: false,
      },

      autoPlayTime: {
        type: Number,
        default: 3000,
      },

      interfaceHideTime: {
        type: Number,
        default: 3000,
      },

      showCaption: {
        type: Boolean,
        default: false,
      },

      lengthToLoadMore: {
        type: Number,
        default: 0,
      },

      closeText: {
        type: String,
        default: 'Close (Esc)',
      },

      previousText: {
        type: String,
        default: 'Previous',
      },

      nextText: {
        type: String,
        default: 'Next',
      },
    },

    data() {
      return {
        select: this.startAt,
        lightBoxShown: this.showLightBox,
        controlsHidden: false,
        imageTransitionName: 'vib-image-no-transition',
        timer: null,
        interactionTimer: null,
        interfaceHovered: false,
        showPhone: false,
      }
    },

    computed: {
      currentMedia() {
        return this.media[this.select]
      },

      thumbIndex() {
        const halfDown = Math.floor(this.nThumbs / 2)

        if (this.select >= halfDown && this.select < this.media.length - halfDown)
          return {
            begin: this.select - halfDown + (1 - (this.nThumbs % 2)),
            end: this.select + halfDown,
          }

        if (this.select < halfDown)
          return {
            begin: 0,
            end: this.nThumbs - 1,
          }

        return {
          begin: this.media.length - this.nThumbs,
          end: this.media.length - 1,
        }
      },

      // imagesThumb() {
      //   return this.media.map(({ thumb, type }) => ({ thumb, type }))
      // },

      formattingPhone() {
        const pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g
        if (this.company.phone) {
          return this.company.phone.replace(pattern, '+7 ($2) $3-$4-$5')
        }
        return 'Нет номера'
      },
    },

    watch: {
      lightBoxShown(value) {
        if (document != null) {
          this.onToggleLightBox(value)
        }
      },

      select() {
        this.$emit('onImageChanged', this.select)

        if (this.select >= this.media.length - this.lengthToLoadMore - 1) this.$emit('onLoad')

        if (this.select === this.media.length - 1) this.$emit('onLastIndex')

        if (this.select === 0) this.$emit('onFirstIndex')

        if (this.select === this.startAt) this.$emit('onStartIndex')
      },
    },

    mounted() {
      if (this.autoPlay) {
        this.timer = setInterval(this.nextImage, this.autoPlayTime)
      }

      this.onToggleLightBox(this.lightBoxShown)

      if (this.$refs.container) {
        // const hammer = new Hammer(this.$refs.container)

        // hammer.on('swiperight', this.previousImage)
        // hammer.on('swipeleft', this.nextImage)

        this.$refs.container.addEventListener('mousedown', this.handleMouseActivity)
        this.$refs.container.addEventListener('mousemove', this.handleMouseActivity)
        this.$refs.container.addEventListener('touchmove', this.handleMouseActivity)
      }
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.addKeyEvent)

      if (this.autoPlay) {
        clearInterval(this.timer)
      }

      if (this.$refs.container) {
        this.$refs.container.removeEventListener('mousedown', this.handleMouseActivity)
        this.$refs.container.removeEventListener('mousemove', this.handleMouseActivity)
        this.$refs.container.removeEventListener('touchmove', this.handleMouseActivity)
      }
    },

    methods: {
      handleSetMainImg(index) {
        this.select = index
      },

      onLightBoxOpen() {
        this.$emit('onOpened')

        if (this.disableScroll) {
          document.querySelector('html').classList.add('no-scroll')
        }

        document.querySelector('body').classList.add('vib-open')
        document.addEventListener('keydown', this.addKeyEvent)

        if (this.$refs.video && this.$refs.video.autoplay) {
          this.$refs.video.play()
        }
      },

      onLightBoxClose() {
        this.$emit('onClosed')

        if (this.disableScroll) {
          document.querySelector('html').classList.remove('no-scroll')
        }

        document.querySelector('body').classList.remove('vib-open')
        document.removeEventListener('keydown', this.addKeyEvent)

        if (this.$refs.video) {
          this.$refs.video.pause()
          this.$refs.video.currentTime = '0'
        }
      },

      onToggleLightBox(value) {
        if (value) this.onLightBoxOpen()
        else this.onLightBoxClose()
      },

      showImage(index) {
        this.select = index
        this.controlsHidden = false
        this.lightBoxShown = true
      },

      addKeyEvent(event) {
        switch (event.keyCode) {
          case 37: // left arrow
            this.previousImage()
            break
          case 39: // right arrow
            this.nextImage()
            break
          case 27: // esc
            this.closeLightBox()
            break
        }
      },

      closeLightBox() {
        if (this.$refs.video) this.$refs.video.pause()
        if (!this.closable) return
        this.$set(this, 'lightBoxShown', false)
      },

      nextImage() {
        this.$set(this, 'select', (this.select + 1) % this.media.length)
      },

      previousImage() {
        this.$set(this, 'select', (this.select + this.media.length - 1) % this.media.length)
      },

      enableImageTransition() {
        this.handleMouseActivity()
        this.imageTransitionName = 'vib-image-transition'
      },

      disableImageTransition() {
        this.imageTransitionName = 'vib-image-no-transition'
      },

      handleMouseActivity() {
        clearTimeout(this.interactionTimer)

        if (this.controlsHidden) {
          this.controlsHidden = false
        }

        if (this.interfaceHovered) {
          this.stopInteractionTimer()
        } else {
          this.startInteractionTimer()
        }
      },

      startInteractionTimer() {
        this.interactionTimer = setTimeout(() => {
          this.controlsHidden = true
        }, this.interfaceHideTime)
      },

      stopInteractionTimer() {
        this.interactionTimer = null
      },
    },
  }
</script>

<style src="./style.scss" lang="scss"></style>
