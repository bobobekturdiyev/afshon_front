<template>
    <div class="categories-parent">
        <div class="categories-item"   v-for="item in categories" :key="item">
       
       
       <div class="categories-item-img">

           <img :src="item.image" :alt="item.name">
       </div>
                <p class="categories-item-title">{{ item.name }}</p>
        
        </div>
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            categories: [
                {
                    
                    name: "Anatomiya",
                    image: "/assets/icons/heart.svg"
                },
                {
                    
                    name: "Zoologiya",
                    image: "/assets/icons/heart.svg"
                },
                {
                    
                    name: "Astronomiya",
                    image: "/assets/icons/heart.svg"
                }
            ]
        }
    },

}
</script>

<style>

</style>