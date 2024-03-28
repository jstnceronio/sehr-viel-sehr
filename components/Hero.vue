<script setup lang="ts">
  import adjectivesJson from '../adjectives.json';
  interface Adjective {
    wack: string;
    good: string;
  }

  const adjectives: Adjective[] = adjectivesJson.wordpairs;
  var updated = false;

  function getRandomWordPair(): Adjective {
    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
  }

  // todo: select a random pair every 2s until user focuses on field
  const selectedAdjective = ref<Adjective>({ wack: '', good: '' });

  // Defer selection of random pair until the component is mounted to avoid hydration mismatch
  onMounted(() => {
    selectedAdjective.value = getRandomWordPair();
    const target = document.querySelector('.enter-adj');
    if (target) {
      target.addEventListener('input', function() {
        this.style.width = this.value.length + 'ch';
      });
    }
  });

  onUpdated(() => {
    if (!updated) {
      const target = document.querySelector('.enter-adj');
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      if (target) {
        target.dispatchEvent(event);
        updated = true;
      }
    }
  });


</script>

<template>
  <div class="sehr text-6xl mt-16 py-2">
    Sehr
  </div>
  <div class="adjektiv text-6xl py-2 flex">
    <div class="input-wrapper w-min">
      <input type="text" :value="selectedAdjective.wack" class="enter-adj min-w-8 focus:outline-0 caret-transparent">
    </div>
    <div class="cursor"></div>
  </div>
  <div class="improvement text-6xl py-2">
    = <br>
    <span class="underline decoration-amber-300"></span>
    {{ selectedAdjective.good }}
  </div>
</template>

<style scoped>
  input {
    width: fit-content;
  }
  .cursor {
    display: inline-block;
    background-color: currentColor;
    margin-top: 16px;
    width: 2px;
    height: 0.75em;
    animation: blink-animation 1s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
</style>