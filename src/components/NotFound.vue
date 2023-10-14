<template>
  <div class="notfound-section">
    <img src="../assets/icons/notfound.svg" alt="" />

    <p class="not_found_title">Didn't find your item</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notfound-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 322px;
}

.not_found_title {
  color: var(--grey, #7c7c7c);
  font-family: Outfit;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 18px;
}
</style>
