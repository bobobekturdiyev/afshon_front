<template>
  <div class="model-view" v-for="(element, index) in item" :key="index">
    <!-- <model-viewer
        :src="modelUrl"
        :alt="element.name"
        camera-controls
        autoplay
        class="viewer"
      ></model-viewer>
   -->

    <!-- <div class="viewer" :id="'container_' + index" ref="viewerContainer"></div> -->
  </div>
</template>

<script>
import ApiRequest from "@/helpers/request";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  data() {
    return {
      item: [],
      modelUrl: "/bola.glb",
    };
  },
  methods: {
    getSubject() {
      ApiRequest.get("file-by-subject/" + this.$route.params.id).then((res) => {
        this.item = res.data.data;
        this.getModel();
        // this.$nextTick(() => {
        //   this.item.forEach((element, index) => {
        //     if (element) {
        //       // const url = this.getFilenameFromURL(element.url)
        //       // ApiRequest.get('file/' + url).then((res) => {

        //       //   const container = document.getElementById('container_' + index);
        //       //   this.loadModel(res.data.data, container);
        //       // })
        //     }
        //   });

        // });
      });
    },
    getModel() {
      this.item.forEach((item) => {
        const url = this.getFilenameFromURL(item.url);
        ApiRequest.get("file/" + url).then((res) => {
          console.log(res);
          // this.modelUrl = res.data;
        });
      });
    },
    loadModel(url, container) {
      if (container && container instanceof HTMLElement) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          container.offsetWidth / container.offsetHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        const loader = new GLTFLoader(); // Use GLTFLoader from Three.js
        console.log(url);
        loader.load(url, (gltf) => {
          const model = gltf.scene;
          scene.add(model);

          camera.position.z = 5;

          const animate = () => {
            requestAnimationFrame(animate);
            model.rotation.x += 0.005;
            model.rotation.y += 0.005;
            renderer.render(scene, camera);
          };

          animate();
        });
      }
    },
    getFilenameFromURL(url) {
      const startIndex = url.lastIndexOf("/") + 1;
      return url.substring(startIndex);
    },
  },
  mounted() {
    this.getSubject();
  },
};
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
