<template>
  <div class="search-parent models">
    <router-link
      class="search-item"
      v-for="item in data"
      :to="'/model/' + item.id"
      :key="item.id"
    >
      <div class="search-item-img">
        <img :src="item.image" :alt="item.name" />
      </div>
      <div class="search-texts">
        <p class="search-item-title">{{ item.name }}</p>
        <p class="search-item-description">{{ item.excerpt }}</p>
      </div>
    </router-link>
  </div>
</template>


<script>
import ApiRequest from "@/helpers/request"
export default {
  name: "SearchList",
  data() {
    return {
      categories: [
        {
          name: "Anatomiya",
          image: "/assets/icons/ear.svg",
          description: "description text",
        },
        {
          name: "Zoologiya",
          image: "/assets/icons/ear.svg",

          description: "description text",
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

          description: "description text",
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

          description: "description text",
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

          description: "description text",
        },
      ],
      data: [],
    };
  },
  methods: {
    getData() {
      ApiRequest.get("file-by-subject/" + this.$route.params.id).then((res) => {
        this.data = res.data.data;
      });
    },
    },
    mounted() {
    this.getData()
  }
};
</script>

<style>

.search-parent {
  max-width: 612px;
  margin: 100px auto;
}
.search-item {
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;

  text-decoration: none;
  cursor: pointer;
}
.search-item:hover {
  background: var(--border-bg);
}
.search-texts {
  margin-left: 12px;
}
.search-item-title {
  color: var(--white, #fefefe);
  font-family: Outfit, sans-serif;
  text-decoration: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.search-item-description {
  color: var(--grey, #7c7c7c);
  font-family: Outfit, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  line-height: normal;
}
.search-item-img img {
  height: 40px;
  width: 40px;
}
</style>
