<template>
  <svg viewBox="0 0 120 120" version="1.1">
    <g id="circle" class="g-circles g-circles--v3">
      <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
      <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
      <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
      <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
      <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
      <circle id="7" cx="60" cy="110" r="10"></circle>
      <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
      <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
      <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
      <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
      <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
      <circle id="1" cx="60" cy="10" r="10"></circle>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'tree-load-svg'
}
</script>
<style scoped>
svg {
  height: 14px;
  width: 14px;
  overflow: visible;
  line-height: 14px;
}
circle {
  fill: dodgerblue;
  fill-opacity: 0;
  -webkit-animation: opacity 1.2s linear infinite;
  animation: opacity 1.2s linear infinite;
}
circle:nth-child(12n + 1) {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
circle:nth-child(12n + 2) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
circle:nth-child(12n + 3) {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
circle:nth-child(12n + 4) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
circle:nth-child(12n + 5) {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
circle:nth-child(12n + 6) {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
circle:nth-child(12n + 7) {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
circle:nth-child(12n + 8) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
circle:nth-child(12n + 9) {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
circle:nth-child(12n + 10) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
circle:nth-child(12n + 11) {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
circle:nth-child(12n + 12) {
  -webkit-animation-delay: -1.2s;
  animation-delay: -1.2s;
}

.g-circles--v2 circle {
  fill-opacity: 0;
  stroke-opacity: 0;
  stroke-width: 1;
  stroke: yellowgreen;
  -webkit-animation-name: opacity-stroke, colors, colors-stroke, transform-2;
  animation-name: opacity-stroke, colors, colors-stroke, transform-2;
}

.g-circles--v3 circle {
  fill-opacity: 1;
  -webkit-animation-name: opacity, colors;
  animation-name: opacity, colors;
}

.g-circles--v4 circle {
  fill-opacity: 1;
  fill: orange;
  -webkit-transform-origin: 60px 60px;
  -ms-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
  -webkit-animation-name: opacity, colors-3, transform;
  animation-name: opacity, colors-3, transform;
}

@-webkit-keyframes opacity {
  3% {
    fill-opacity: 1;
  }

  75% {
    fill-opacity: 0;
  }
}

@keyframes opacity {
  3% {
    fill-opacity: 1;
  }

  75% {
    fill-opacity: 0;
  }
}
@-webkit-keyframes opacity-stroke {
  10% {
    stroke-opacity: 1;
  }

  85% {
    stroke-opacity: 0;
  }
}
@keyframes opacity-stroke {
  10% {
    stroke-opacity: 1;
  }

  85% {
    stroke-opacity: 0;
  }
}
@-webkit-keyframes colors {
  0% {
    fill: yellowgreen;
  }

  10% {
    fill: gold;
  }

  75% {
    fill: crimson;
  }
}
@keyframes colors {
  0% {
    fill: yellowgreen;
  }

  10% {
    fill: gold;
  }

  75% {
    fill: crimson;
  }
}
@-webkit-keyframes colors-stroke {
  0% {
    stroke: yellowgreen;
  }

  10% {
    stroke: gold;
  }

  75% {
    stroke: crimson;
  }
}
@keyframes colors-stroke {
  0% {
    stroke: yellowgreen;
  }

  10% {
    stroke: gold;
  }

  75% {
    stroke: crimson;
  }
}
@-webkit-keyframes colors-2 {
  0% {
    fill: yellow;
  }

  50% {
    fill: red;
  }

  65% {
    fill: orangered;
  }

  95% {
    fill: gold;
  }
}
@keyframes colors-2 {
  0% {
    fill: yellow;
  }

  50% {
    fill: red;
  }

  65% {
    fill: orangered;
  }

  95% {
    fill: gold;
  }
}
@-webkit-keyframes colors-3 {
  0% {
    fill: yellowgreen;
  }

  50% {
    fill: turquoise;
  }

  65% {
    fill: yellow;
  }

  95% {
    fill: orange;
  }
}
@keyframes colors-3 {
  0% {
    fill: yellowgreen;
  }

  50% {
    fill: turquoise;
  }

  65% {
    fill: yellow;
  }

  95% {
    fill: orange;
  }
}
@-webkit-keyframes transform {
  10% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
}
@keyframes transform {
  10% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
}
@-webkit-keyframes transform-2 {
  40% {
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
  }

  60% {
    stroke-width: 20;
  }
}
@keyframes transform-2 {
  40% {
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
  }

  60% {
    stroke-width: 20;
  }
}
</style>


