<template>
  <div class="categories-parent">
   
    <router-link
      :to="'/subject/' + item.id"
      class="categories-item"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="categories-item-img">
        <img :src="item.image" :alt="item.title" />
      </div>
      <p class="categories-item-title">{{ item.title }}</p>
    </router-link>
  </div>
</template>

<script>
import ApiRequest from '@/helpers/request'
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
      data:[]
    };
    },
    methods: {
        getData() {
            ApiRequest.get('subject').then((res) => {
               
                this.data = res.data.data
            })
    }
    },
    mounted() {
    this.getData()
  },
};
</script>

<style></style>
