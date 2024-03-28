<script setup lang="ts">
  import adjectivesJson from '../adjectives.json';
  interface Adjective {
    wack: string;
    good: string;
  }

  const adjectives: Adjective[] = adjectivesJson.wordpairs;

  function getRandomWordPair(): Adjective {
    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
  }

  // todo: select a random pair every 2s until user focuses on field
  const selectedAdjective = ref<Adjective>({ wack: '', good: '' });

  // Defer selection of random pair until the component is mounted to avoid hydration mismatch
  onMounted(() => {
    selectedAdjective.value = getRandomWordPair();
  });
</script>

<template>
  <div class="sehr text-6xl mt-16 py-2">
    Sehr
  </div>
  <div class="adjektiv text-6xl py-2 flex">
    <input type="text" v-bind:placeholder="selectedAdjective.wack" class="max-w-64">
    <div class="cursor"></div>
  </div>
  <div class="improvement text-6xl py-2">
    = <br>
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