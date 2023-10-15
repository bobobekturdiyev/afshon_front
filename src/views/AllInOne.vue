<template>
  <div class="home-parent">
    <div class="search-section">
      <div class="one-parent">
        <img class="home-logo" src="../assets/images/afshon.png" alt="" />

        <a
          href="https://github.com/bobobekturdiyev/afshon_mobile"
          target="_blank"
          class="home-links"
        >
          <div class="link-image">
            <img class="social-logo" src="../assets/images/gitsvg.svg" alt="" />
          </div>
          <div class="link-title">Repository for mobile</div>
        </a>

        <a
          href="https://github.com/bobobekturdiyev/afshon_back_end"
          target="_blank"
          class="home-links"
        >
          <div class="link-image">
            <img class="social-logo" src="../assets/images/gitsvg.svg" alt="" />
          </div>
          <div class="link-title">Repository for backend</div>
        </a>
        <a
          href="https://github.com/bobobekturdiyev/afshon_front/tree/dev"
          target="_blank"
          class="home-links"
        >
          <div class="link-image">
            <img class="social-logo" src="../assets/images/gitsvg.svg" alt="" />
          </div>
          <div class="link-title">Repository for frontend</div>
        </a>

        <div class="bottom-link">
          <router-link to="/contact" class="go-contact"> CONTACT</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.one-parent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.home-logo {
  height: 100px;
  width: 100px;
}
.social-logo {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
}
.home-links {
  border-radius: 16px;
  background: var(--bg-2, #1d1d20);
  padding: 12px;
  color: var(--white);
  text-decoration: none;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s linear;
  text-decoration: none;
  display: flex;
  /* padding: 12px 32px; */
  width: 370px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 32px;
}

.home-links:hover {
  background: var(--border-bg);
}

.link-title {
  color: var(--white);
  font-family: Outfit, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;

  margin-left: 30px;
}

.bottom-link {
  margin-top: 30px;
}
.bottom-link a {
  color: var(--white);
  font-family: Outfit, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
}
</style>
