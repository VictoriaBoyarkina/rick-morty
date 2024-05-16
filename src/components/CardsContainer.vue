<template>
  <form @submit.prevent="submitHandler">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Filter by name"
      v-model="name"
    />
    <select name="status" id="status" v-model="status">
      <option disabled value="">Filter by status</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <button class="btn" type="submit">Apply</button>
  </form>
  <AppLoader v-if="loading" />
  <div v-else-if="cards.length">
    <div class="cards-container">
      <CharacterCard v-for="card in cards" :key="card.id" :card="card" />
    </div>
    <div class="pages-container">
      <vue-awesome-paginate
        :total-items="totalItems || 800"
        :items-per-page="20"
        :max-pages-shown="3"
        v-model="currentPage"
        :on-click="onClickHandler"
      />
    </div>
  </div>
  <p v-else class="error">{{ error }}</p>
</template>

<script setup>
import AppLoader from "./AppLoader.vue";
import CharacterCard from "./CharacterCard.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Fetch cards
const loading = ref(true);
const cards = ref([]);
const totalItems = ref(null);
const name = ref("");
const status = ref("");
const options = ref(["Dead", "Alive", "unknown", "All"]);
const error = ref("");

async function fetchCards() {
  try {
    if (name.value && status.value && status.value !== "All") {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage.value}&status=${status.value}&name=${name.value}`
      );
      await new Promise((res) => setTimeout(res, 500));
      cards.value = data.results;
      console.log(data.results);
      totalItems.value = +data.info.count;
    } else if (name.value && (!status.value || status.value === "All")) {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage.value}&name=${name.value}`
      );
      await new Promise((res) => setTimeout(res, 500));
      cards.value = data.results;
      totalItems.value = +data.info.count;
    } else if (!name.value && status.value && status.value !== "All") {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage.value}&status=${status.value}`
      );
      await new Promise((res) => setTimeout(res, 500));
      cards.value = data.results;
      totalItems.value = +data.info.count;
    } else {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage.value}`
      );
      await new Promise((res) => setTimeout(res, 500));
      cards.value = data.results;
      totalItems.value = +data.info.count;
    }
  } catch (e) {
    if (e.response.request.status === 404) {
      cards.value = [];
      error.value = "No results";
    } else {
      error.value = "Something went wrong.";
    }
  }
}

onMounted(async () => {
  await fetchCards();
  loading.value = false;
});

// Manage pagination
const currentPage = ref(1);

const onClickHandler = () => {
  console.log();
};

// Watch current page and fetch cards
watch(currentPage, async () => {
  loading.value = true;
  await fetchCards();
  loading.value = false;
});

// Apply filters
async function submitHandler() {
  loading.value = true;
  await fetchCards();
  loading.value = false;
}
</script>

<style lang="css">
.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.pages-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: orange;
  border: 1px solid orange;
  color: white;
}
.active-page:hover {
  background-color: orange;
}

form {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
  gap: 20px;
}

#name,
#status {
  width: 200px;
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: 2px solid rgb(255, 152, 0);
  background: #fff;
  color: rgb(51, 51, 51);
  transition: all 0.1s ease 0s;
}

.btn:hover {
  background: rgb(255, 152, 0);
  color: white;
}

.error {
  color: white;
  text-align: center;
}

@media (max-width: 650px) {
  form {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .btn {
    width: 200px;
  }
}
</style>
