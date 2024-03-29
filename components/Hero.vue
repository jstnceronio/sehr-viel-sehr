<script setup lang="ts">
  import adjectivesJson from '../adjectives.json';
  interface Adjective {
    wack: string;
    good: string;
  }

  const adjectives: Adjective[] = adjectivesJson.wordpairs;
  let updated = false;

  function getRandomWordPair(): Adjective {
    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
  }

  const selectedAdjective = ref<Adjective>({ wack: '', good: '' });

  let inputValue = '';

  // Defer selection of random pair until the component is mounted to avoid hydration mismatch
  onMounted(() => {
    selectedAdjective.value = getRandomWordPair();
    inputValue = selectedAdjective.value.wack;
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

  function handleEnter() {
    let foundAlternative = findWordPair(inputValue);
    if (foundAlternative) {
      selectedAdjective.value.good = foundAlternative;
    } else {
      selectedAdjective.value.good = "Kein Eintrag";
    }
  }

  function findWordPair(searchWord: string): string | null {
    for (const pair of adjectives) {
      if (pair.wack === searchWord) {
        return pair.good;
      }
    }
    // If the searchWord is not found in any pair
    return null;
  }

</script>

<template>
  <div class="hero-wrapper text-6xl md:text-8xl lg:text-center">
    <div class="sehr mt-16 py-2">
      Sehr
    </div>
    <div class="adjective py-2 flex lg:justify-center">
      <div class="input-wrapper w-min">
        <input type="text" v-model="inputValue" @keyup.enter="handleEnter" class="enter-adj min-w-8 focus:outline-0 caret-transparent text-gray-400">
      </div>
      <div class="cursor"></div>
    </div>
    <div class="improvement py-2">
      = <br>
      <span class="underline decoration-blue-700 break-all">{{ selectedAdjective.good }}</span>
    </div>
    <div class="mt-16 text-sm md:text-xl">
      Geben Sie ein überstrapaziertes Adjektiv ein, um eine stärkere Alternative zu finden.
    </div>
  </div>
</template>

<style scoped>
  input {
    width: fit-content;
  }
  .cursor {
    display: inline-block;
    background-color: currentColor;
    margin-top: 8px;
    width: 2px;
    height: 1em;
    animation: blink-animation 1s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
</style>