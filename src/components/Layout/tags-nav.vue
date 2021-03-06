<template>
  <div class="tags-nav">
    <div class="btn-con left-btn">
      <a-button icon="left" size="small" @click="setScroll(240)"/>
    </div>
    <div class="btn-con right-btn">
      <a-button icon="right" size="small" @click="setScroll(-240)"/>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
      <div class="scroll-body" ref="scrollBody" :style="{left: `${tagBodyLeft}px`}">
        <transition-group name="tagList-moving-animation">
          <a-tag
            v-for="(item,index) in list"
            :key="`tag-nav-${index}`"
            ref="tagsPageOpened"
            :name="item.name"
            :data-route-item="item"
            @close.stop="handleClose(item)"
            @click.native.stop="handleClick(item)"
            :closable="item.name !== 'home'"
            :color="isCurrentTag(item) ? 'blue' : null"
          >
            {{showTitleInside(item)}}
          </a-tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import {routeEqual} from '@/libs/util.js'
export default {
  name: 'TagsNav',
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      outerPadding: 4,
    }
  },
  mounted() {
    setTimeout(() => this.getTagElementByName(this.$route), 200)
  },
  computed: {
    currentRouteObj() {
      const {name, params, query, path} = this.value
      return {name, params, query, path}
    },
  },
  methods: {
    handleScroll(e) {
      const {type} = e
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.setScroll(delta)
    },
    setScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleClose(route) {
      const res = this.list.filter(item => !routeEqual(route, item))
      this.$emit('on-close', res, undefined, route)
    },
    handleClick(item) {
      if (this.isCurrentTag(item)) return
      this.$emit('select', item)
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item)
    },
    showTitleInside(item) {
      return (item.meta && item.meta.title) || item.name
    },
    getTagElementByName (route) {
      this.$nextTick(() => {
        const refsTag = this.$refs.tagsPageOpened
        refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            const tag = refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
  },
  watch: {
    $route(to) {
      this.getTagElementByName(to)
    },
  }
}
</script>

<style>
  .tags-nav .ant-tag {
    display: inline-block !important;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    user-select: none;
  }
</style>
<style scoped>
.tags-nav {
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
}
.scroll-outer {
  position: absolute;
  left: 30px;
  right: 61px;
  top: 0;
  bottom: 0;
  box-shadow: 0 0 3px 2px rgba(100,100,100,.1) inset;
}
.scroll-body {
  height: calc(100% - 1px);
  display: inline-block;
  padding: 0 4px;
  position: absolute;
  overflow: visible;
  white-space: nowrap;
  transition: left .3s ease;
}
.btn-con {
  position: absolute;
  top: 1px;
  background: #fff;
  z-index: 10;
  height: calc(100% - 1px);
}
.btn-con button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: none;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}
.btn-con.left-btn {
  left: 0;
}
.btn-con.right-btn{
  right: 0
}
</style>
