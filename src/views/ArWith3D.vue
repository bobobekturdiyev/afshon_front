<template>
  <main>
    <router-link style="z-index: 9099 !important" to="/video">video</router-link>
    <!-- <h1>Programmer UZ</h1> -->
  </main>
</template>
<script>

import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';

// We should import the GLTFloader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import {HemisphereLight} from "three";
//import * as DRACODecoder from "three/examples/js/libs/draco/gltf/draco_decoder.js";

export default {
  mounted(){

// LATER transfer THIS function to the new path
    const loadModel = (path) => {
      return new Promise((resolve, reject) => {
        const draco = new DRACOLoader()
        draco.setDecoderPath('src/plugins/draco/');
        draco.setDecoderConfig({ type: 'js' });

        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);
        loader.crossOrigin = "";
        loader.load(path, (gltf) => {
          resolve(gltf);
        });
      });
    };

    document.addEventListener("DOMContentLoaded", async () => {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "/assets/prog.mind",
      });


      const { renderer, scene, camera } = mindarThree;

      // we need to add some lights to display 3d objects in scene
      const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // FOR MAKING MULTIPLE IMAGE TRACKING, JUST CALL THE ANCHOR AND INCREASE THE ANCHOR VALUE
      const anchor = mindarThree.addAnchor(0);

      const glb = await loadModel("/burger.glb");
      //scaling the object
      glb.scene.scale.set(0.2, 0.2, 0.2);

      // positioning the object
      glb.scene.position.set(0, 0, 0);
      glb.scene.rotation.x = 1.7;
      glb.scene.rotation.y = 3;

      //adding object into anchor group
      anchor.group.add(glb.scene);

      // we have to start mindar engine

      await mindarThree.start();

      // update the every frame
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);

      });
    });

  }
};
</script>
<style scoped>
h1 {
  color: white;
}
</style>
