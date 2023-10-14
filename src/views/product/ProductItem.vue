<template>
        <div class="model-view"> 
            <model-viewer
      src="/sofa.glb"
      alt="A 3D Sofa Model"
      camera-controls
      autoplay
      class="viewer"
    ></model-viewer>
        </div>
</template>

<script>
export default {

}
</script>

<style>
.model-view {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.viewer {
  margin: 0 auto;
  width: 500px;
  height: 500px;
}
@media screen and (max-width: 567px) {
  .viewer {
    width: 50px;
    height: 350px;
  }
}
</style>