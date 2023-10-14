<template>
  <div class="categories-parent">
    <router-link
      :to="'/model/' + index"
      class="categories-item"
      v-for="(item, index) in categories"
      :key="index"
    >
      <div class="categories-item-img">
        <img :src="item.image" :alt="item.name" />
      </div>
      <p class="categories-item-title">{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "Anatomiya",
          image: "/assets/icons/heart.svg",
        },
        {
          name: "Zoologiya",
          image: "/assets/icons/heart.svg",
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/heart.svg",
        },
      ],
    };
  },
};
</script>

<style></style>
