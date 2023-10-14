<template>
  <div class="search-parent">
    <router-link
      :to="'/model/' + index"
      class="search-item"
      v-for="(item, index) in categories"
      :key="index"
    >
      <div class="search-item-img">
        <img :src="item.image" :alt="item.name" />
      </div>
      <div class="search-texts">
        <p class="search-item-title">{{ item.name }}</p>
        <p class="search-item-description">{{ item.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style>
.search-item {
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;
 
  text-decoration:none;
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
</style>
