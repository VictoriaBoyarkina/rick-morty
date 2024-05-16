<template>
  <div class="card">
    <img :src="card.image" alt="character" />
    <div class="card-info">
      <h2 class="card-h2">{{ card.name }}</h2>
      <div class="status">
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 24 24"
          :fill="card.status === 'Dead' ? 'red' : 'green'"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="none" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            :fill="color"
          />
        </svg>
        <h3 class="card-h3">{{ card.status }} - {{ card.species }}</h3>
      </div>
      <p class="card-p">Last known location:</p>
      <h4 class="card-h4">{{ card.location.name }}</h4>
      <p class="card-p">First seen in:</p>
      <h4 class="card-h4">{{ card.origin.name }}</h4>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
const props = defineProps(["card"]);

const color = ref("yellow");

onMounted(() => {
  if (props.card.status === "Dead") {
    color.value = "red";
  } else if (props.card.status === "Alive") {
    color.value = "green";
  }
});
</script>

<style lang="css" scoped>
.card {
  display: flex;
  background-color: rgb(60, 62, 68);
  width: 600px;
  height: 220px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.status {
  display: flex;
  align-items: center;
}
svg {
  margin-right: 10px;
}
.card-info {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
}
.card-h2 {
  font-family: "DenkOne-Regular";
  font-size: 1.5rem;
  color: white;
}
.card-h3 {
  color: white;
  font-size: 16px;
}
.card-p {
  margin-top: 15px;
  color: rgb(158, 158, 158);
  font-size: 16px;
}
.card-h4 {
  color: rgb(245, 245, 245);
}

@media (max-width: 650px) {
  .card {
    flex-direction: column;
    height: auto;
  }
  img {
    height: 300px;
  }
}
</style>
