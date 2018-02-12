<!-- 加载动画... -->
<template lang="html">
  <div class="loader">
    <div class="loader-inner line-scale">
      <div v-for="i in 5"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style  lang="css">
  .loaded {
    transition: opacity .25s linear;
    opacity: 1; }
  .loader {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    max-width: 25%;
    height: 200px;
    align-items: center;
    justify-content: center; }
@-webkit-keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }

  50% {
    -webkit-transform: scaley(0.4);
            transform: scaley(0.4); }

  100% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }
@keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }

  50% {
    -webkit-transform: scaley(0.4);
            transform: scaley(0.4); }

  100% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }

.line-scale > div:nth-child(1) {
  -webkit-animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
          animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08); }
.line-scale > div:nth-child(2) {
  -webkit-animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
          animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08); }
.line-scale > div:nth-child(3) {
  -webkit-animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
          animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08); }
.line-scale > div:nth-child(4) {
  -webkit-animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
          animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08); }
.line-scale > div:nth-child(5) {
  -webkit-animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
          animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08); }
.line-scale > div {
  background-color: #58c1f8;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  display: inline-block; }
</style>
