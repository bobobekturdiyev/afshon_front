<template>
  <div class="search-parent">
    <div class="search-item" v-for="item in categories" :key="item">
      <div class="search-item-img">
        <img :src="item.image" :alt="item.name" />
      </div>
      <div class="search-texts">
        
          <p class="search-item-title">{{ item.name }}</p>
          <p class="search-item-description">{{ item.description }}</p>
      </div>
    </div>
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
          description: "description text"
        },
        {
          name: "Zoologiya",
          image: "/assets/icons/ear.svg",

            description: "description text"
          
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

            description: "description text"
          
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

            description: "description text"
          
        },
        {
          name: "Astronomiya",
          image: "/assets/icons/ear.svg",

            description: "description text"
          
        },
      ],
    };
  },
};
</script>

<style>
.search-item {
    display: flex;
    padding:  12px 16px;
}
.search-texts {
    margin-left: 12px;
}

.search-item-description {
    color: var(--grey, #7C7C7C);
font-family: Outfit , sans-serif;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
</style>
