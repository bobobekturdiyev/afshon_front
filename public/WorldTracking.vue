<template></template>

<script setup>
import * as THREE from "three";

import { ARButton } from "three/addons/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const initialize = async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
      -Math.PI / 2
    );
    const reticleMaterial = new THREE.MeshBasicMaterial();
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    let light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.body },
    });
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(arButton);

    const controller = renderer.xr.getController(0);
    scene.add(controller);
    controller.addEventListener("select", async () => {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync("/sofa.glb");
      const model = gltf.scene;
      model.position.setFromMatrixPosition(reticle.matrix);
      // model.scale.y = Math.random() * 2 + 1;
      model.scale.set(0.006, 0.006, 0.006);
      scene.add(model);

    });

    // controller.addEventListener("select", async () => {
    //   const loader = new GLTFLoader();
    //   const gltf = await loader.loadAsync("/sofa.glb");
    //   const model = gltf.scene;
    //   const position = new THREE.Vector3();
    //   position.setFromMatrixPosition(controller.matrixWorld);
    //   const scale = new THREE.Vector3(0.001, 0.001, 0.001);
    //   model.position.copy(position);
    //   model.scale.copy(scale);
    //   scene.add(model);
    //
    //   const moveSpeed = 0.01;
    //   const scaleSpeed = 0.1;
    //
    //   const controllerStartPosition = new THREE.Vector3().copy(controller.position);
    //   const initialModelPosition = new THREE.Vector3().copy(model.position);
    //   const initialModelScale = new THREE.Vector3().copy(model.scale);
    //
    //   controller.addEventListener("squeeze", () => {
    //     const currentPosition = new THREE.Vector3().copy(controller.position);
    //     const displacement = currentPosition.sub(controllerStartPosition);
    //     model.position.copy(initialModelPosition).add(displacement.multiplyScalar(moveSpeed));
    //   });
    //
    //   controller.addEventListener("thumbstick", (event) => {
    //     const scaleFactor = event.y * scaleSpeed;
    //     model.scale.copy(initialModelScale).multiplyScalar(1 + scaleFactor);
    //   });
    // });

    // controller.addEventListener("select", async () => {
    //   const loader = new GLTFLoader();
    //   const gltf = await loader.loadAsync("/sofa.glb");
    //   const model = gltf.scene;
    //   const position = new THREE.Vector3();
    //   position.setFromMatrixPosition(controller.matrixWorld);
    //   const scale = new THREE.Vector3(0.002, 0.002, 0.002);
    //   model.position.copy(position);
    //   model.scale.copy(scale);
    //   scene.add(model);
    // });




    // controller.addEventListener("select", async () => {
    //   const loader = new GLTFLoader();
    //   const gltf = await loader.loadAsync("/sofa.glb");
    //   const model = gltf.scene;
    //
    //   // Set the desired position of the model
    //   const position = new THREE.Vector3(0, 0, -1); // Adjust the position values as needed
    //   model.position.copy(position);
    //
    //   // Set the desired scale of the model
    //   const scale = new THREE.Vector3(0.002, 0.002, 0.002); // Adjust the scale values as needed
    //   model.scale.copy(scale);
    //
    //   scene.add(model);
    // });

    renderer.xr.addEventListener("sessionstart", async () => {
      const session = renderer.xr.getSession();
      const viewerReferenceSpace = await session.requestReferenceSpace(
        "viewer"
      );
      const histTestSource = await session.requestHitTestSource({
        space: viewerReferenceSpace,
      });
      renderer.setAnimationLoop((timestamp, frame) => {
        if (!frame) return;
        const hitTestResults = frame.getHitTestResults(histTestSource);
        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          const referenceSpace = renderer.xr.getReferenceSpace();
          const hitPose = hit.getPose(referenceSpace);
          reticle.visible = true;
          reticle.matrix.fromArray(hitPose.transform.matrix);
        } else {
          reticle.visible = true;
        }
        renderer.render(scene, camera);
      });
    });
    renderer.xr.addEventListener("sessionend", async () => {});
  };

  initialize();
});
</script>
