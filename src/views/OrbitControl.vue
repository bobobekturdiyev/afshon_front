<template>
  <div ref="modelContainer"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default {
  mounted() {
    this.initScene();
    this.loadModel();
    this.animate(); // Start the render loop
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.modelContainer.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    loadModel() {
      console.log("Loading model...");
      const loader = new GLTFLoader();
      loader.load('/sofa.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        this.scene.add(model);

        // Set the camera's target to the model's position
        const box = new THREE.Box3().setFromObject(model);
        const target = box.getCenter(new THREE.Vector3());
        this.controls.target.copy(target);
      });
      console.log('loaded')
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update(); // Update controls
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
#model-container {
  width: 100%;
  height: 100vh;
}
</style>
