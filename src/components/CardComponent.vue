<script setup>

const props = defineProps({
  image: String,
  isMatched: Boolean,
  isFlipped: Boolean,
  index: Number,
  gridSize: Number,
  focusedIndex: Number
})

const emit = defineEmits(['flip'])

function handleClick () {
  emit("flip", props.index)
}
</script>

<template>
  <div
    class="card"
    :class="[
      { flipped: isFlipped, matched: isMatched },
      `card-${gridSize}`,
      focusedIndex === index ? 'hovered' : ''
      ]"
    @click="handleClick"

  >
    <div class="card-front">
      <img class="card-image" :src="image" :alt="`image-card${index}`" />
    </div>

    <div class="card-back" :class="focusedIndex === index ? 'hovered' : ''">
      <span class="emoji">🃏</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  border-radius: 12px;
  background: var(--white);

  &:hover:not(.flipped):not(.matched) {
    transform: scale(1.05);
  }
}

.card.hovered {
  transform: scale(1.05);
}

.card-6 {
  width: 12vw;
  height: 10vh;
}

.card-4 {
  width: 12vw;
  height: 16vh;
}


.card.flipped,
.card.matched {
  transform: rotateY(180deg);
  cursor: default;
}

.card-front,
.card-back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  transform: rotateY(180deg);
}

.card-back {
  background: var(--gradient-4);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--gradient-5);
  }
}

.card-back.hovered {
  background: var(--gradient-5);
}


.card.matched .card-back {
  visibility: hidden;
}

.card-image {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.emoji {
  font-size: 24px;
}

@media (max-width: 767px) {
  .card-6 {
    width: 14vw;
    height: 8vh;
  }

  .card-4 {
    width: 20vw;
    height: 11vh;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .card-6 {
    width: 14vw;
    height: 9vh;
  }

  .card-4 {
    width: 16vw;
    height: 12vh;
  }
}

@media (max-height: 600px) {
  .card-6 {
    height: 7vh;
  }

  .card-4 {
    height: 10vh;
  }
}
</style>
