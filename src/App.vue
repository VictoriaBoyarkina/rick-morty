<template>
  <FetchApi></FetchApi>
</template>

<script>
import FetchApi from './components/CardsContainer.vue';


export default {
  name: 'App',
  components: {
    FetchApi
  }
}
</script>

<style lang="css">
@font-face {
  font-family: 'DenkOne-Regular';
  src: url('./assets/fonts/DenkOne-Regular.ttf');
}

@font-face {
  font-family: 'Jost-VariableFont_wght';
  src: url('./assets/fonts/Jost-VariableFont_wght.ttf');
}

body {
  font-family: 'Jost-VariableFont_wght';
  background: rgb(39, 43, 51);
}

body, h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
</style>
