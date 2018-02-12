<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return 'icon' + ` ${this.className ? this.className : ''}`;
    }
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  margin-right: 0.2em;
  fill: currentColor;
  overflow: hidden;
}
</style>
