import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(VueAwesomePaginate).mount("#app");
