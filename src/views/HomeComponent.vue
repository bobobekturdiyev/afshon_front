<template>
  <div class="home-parent">
    <div class="search-section">
      <div class="search-section-mail">
        <div class="search-section-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.5 14H14.71L14.43 13.73C15.055 13.004 15.5117 12.1488 15.7676 11.2256C16.0234 10.3025 16.0721 9.33416 15.91 8.39001C15.44 5.61001 13.12 3.39001 10.32 3.05001C9.33562 2.92547 8.33579 3.02778 7.39703 3.34909C6.45827 3.67041 5.60545 4.20222 4.90384 4.90384C4.20222 5.60545 3.67041 6.45827 3.34909 7.39703C3.02778 8.33579 2.92547 9.33562 3.05001 10.32C3.39001 13.12 5.61001 15.44 8.39001 15.91C9.33416 16.0721 10.3025 16.0234 11.2256 15.7676C12.1488 15.5117 13.004 15.055 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.50001 14C7.01 14 5.00001 11.99 5.00001 9.50001C5.00001 7.01 7.01 5.00001 9.50001 5.00001C11.99 5.00001 14 7.01 14 9.50001C14 11.99 11.99 14 9.50001 14Z"
              fill="#FEFEFE"
            />
          </svg>
          <input
            type="text"
            class="search-input"
            placeholder="Search here..."
            v-model="search"
            @keyup="searchCategory"
          />
        </div>
        <div class="search-section-btn">
          <img src="../assets/icons/qr.png" alt="">
        </div>
      </div>
      
        <NotFound v-if="notFound" />
        <SearchList v-else-if="search.length >= 1" />
      <ProductCategories v-else />
    </div>
  </div>
</template>

<script>
import ProductCategories from "@/components/ProductCategories.vue";
import NotFound from '@/components/NotFound.vue';
import SearchList from '@/components/SearchList.vue';
export default {
  components: { ProductCategories, NotFound, SearchList },
  name: "Home",
  data() {
    return {
      search: '',
      notFound :  false,
    }
  },
  methods: {
    searchCategory() {
      if (this.search.length >= 4) {
          this.notFound =  true
      } else {
          this.notFound  =  false
        }
    } 
  },
};
</script>

<style scoped></style>
