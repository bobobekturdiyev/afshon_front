<template>
  <main></main>
</template>
 
    <script>
// It is just transparent blue color on AR
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';

import loadVideo from "../helpers/loader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import axios from "axios";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import THREE, {
  VideoTexture,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshLambertMaterial,
  AmbientLight,
  TextureLoader, CircleGeometry, BoxGeometry, DoubleSide, Vector2, Raycaster,
} from "three";

export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      name: "Bobobek",
      surname: "Turdiyev",

      // Positioning
      blockPosition: "top", // left, right, top, bottom

      // Video Config
      videoWidth: 1920,
      videoHeight: 1080,
      startSecond: 0,
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      //videoUrl: null,

      targetUrl: "/assets/prog.mind",

      // Text Config
      textColor: "#FFFFFF",
      textBackColor: "#0088CC",
      isPlaying: true,
      isAnimated: true,
      animationSpeed: 10,
      image:
        "https://yt3.ggpht.com/lVFl4ptL6RoA_2yhG2Zjx9Z7SYcxmLXeIUx7YIVD8WrURgS6XCn0B3o-DoZL5cmmP5qPD5svIQ=s900-c-k-c0x00ffffff-no-rj",
      shape: "cube", // sphere, cube, rectangle, circle
      links: [
        {
          name: "instagram",
          image: "/assets/images/instagram_1.png",
          url: "https://instagram.com/programmer.uz",
          color: "#DD2A7B",
        },
        {
          name: "telegram",
          image: "/assets/images/telegram.png",
          url: "https://t.me/programmer_uz",
          color: "#0088CC",
        },
        {
          name: "web",
          image: "/assets/images/web.png",
          url: "https://www.bobobek.com/",
          color: "#6CC1E3",
        },
       
        {
          name: "instagram",
          image: "/assets/images/instagram_1.png",
          url: "https://instagram.com/programmer.uz",
          color: "#DD2A7B",
        },
        {
          name: "telegram",
          image: "/assets/images/telegram.png",
          url: "https://t.me/programmer_uz",
          color: "#0088CC",
        },
        {
          name: "instagram",
          image: "/assets/images/instagram_1.png",
          url: "https://instagram.com/programmer.uz",
          color: "#DD2A7B",
        },
        {
          name: "telegram",
          image: "/assets/images/telegram.png",
          url: "https://t.me/programmer_uz",
          color: "#0088CC",
        },
        {
          name: "instagram",
          image: "/assets/images/instagram_1.png",
          url: "https://instagram.com/programmer.uz",
          color: "#DD2A7B",
        },
        {
          name: "telegram",
          image: "/assets/images/telegram.png",
          url: "https://t.me/programmer_uz",
          color: "#0088CC",
        },
        {
          name: "instagram",
          image: "/assets/images/instagram_1.png",
          url: "https://instagram.com/programmer.uz",
          color: "#DD2A7B",
        },
        {
          name: "telegram",
          image: "/assets/images/telegram.png",
          url: "https://t.me/programmer_uz",
          color: "#0088CC",
        },
      ],
    };
  },
  methods: {

    
    async getData() {

//       const headers = {
//   'Content-Type': 'application/json',
//   "Access-Control-Allow-Origin": "*",
//   "Maymunak123": "maymunjon",
// }
//
//
//       console.log("start");
//       let response = await axios.get(
//         "https://api.3ar.uz/api/v1/product/business_card/1",
//         {
//           timeout: 10000,
//         },
//         {
//           headers: headers,
//         }
//       );
//       console.log(response);

      // let details = response.data;
      // let data = details.product;
      // console.log("data", details);

      // if (data.status == "inactive") {
      //   this.$route.push({ name: "home" });
      // }
      // this.name = data.u_name;
      // this.surname = data.surname;
      // this.blockPosition = data.block_position;
      // this.videoUrl = data.video_url cors error
      // this.videoWidth = data.video_width;
      //this.videoHeight = data.video_height;
      // this.textColor = data.text_color;
      // this.textBackColor = data.text_back_color;
      // this.isAnimated = data.is_animating == 1;
      // this.animationSpeed = data.animation_speed;
      // this.isPlaying = data.autoplay;
      // this.videoUrl = data.video_url;
     // this.image = data.card_image;
      //this.links = this.getLinks(details.product_links);
      // this.shape = details.product_links[0].shape;
      //this.targetUrl = data.target_url
     // this.videoUrl = 'https://api.3ar.uz/uploads/video/05.10.2022/1664974042_sample-10s.mp4';

      await this.showAR();

    },
    getLinks(data) {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        console.log(array);
        array.push(data[i]);
      }
      return array;
    },
    linkClick(link) {
      console.log(link.name);
      window.open(link.url);
    },
    videoClick(video) {
      console.log("video");
      if (this.isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    async showAR() {
      console.log("video starting to load");


      const video = await loadVideo(this.videoUrl);
      console.log("end...", video);

      let ratio = video.videoHeight / video.videoWidth;

      function createMaterial(texture, color = "#FFFFFF") {
        let socialLoader = new TextureLoader();

        let material = new MeshLambertMaterial({
          map: socialLoader.load(texture),
          side: DoubleSide,
        });
        material.color.set(color);
        return material;
      }

      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: this.targetUrl,
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      const videoTexture = new VideoTexture(video);
      // videoTexture.crossOrigin = "anonymous";

      const geometry = new PlaneGeometry(1, ratio);
      const material = new MeshBasicMaterial({ map: videoTexture });
      const plane = new Mesh(geometry, material);
      plane.name = "video";
      plane.scale.set(1, 1, 1);
      plane.click = () => this.videoClick(video);
      anchor.group.add(plane);

      const loader = new FontLoader();

      var nameMaterialFront = new MeshLambertMaterial({
        color: this.textColor,
      });

      var nameMaterialBack = new MeshLambertMaterial({
        color: this.textBackColor,
      });

      var socialSize = 0.15; // links size

      let profileImagePosition = { x: 0, y: 0, z: 0 };
      let namePosition = { x: 0, y: 0, z: 0 };
      let surNamePosition = { x: 0, y: 0, z: 0 };
      let linksPosition = { x: 0, y: 0, z: 0 };

      switch (this.blockPosition) {
        case "right": {
          profileImagePosition = { x: 0.7, y: ratio - 0.45, z: 0 };
          namePosition = { x: 0.9, y: ratio - 0.43, z: 0 };
          surNamePosition = { x: 0.9, y: ratio - 0.53, z: 0 };
          linksPosition = { x: ratio + socialSize / 2, y: -socialSize, z: 0 };
          break;
        }
        case "top": {
          profileImagePosition = {
            x: -0.5 + socialSize,
            y: ratio + socialSize / 2,
            z: 0,
          };
          namePosition = { x: -socialSize, y: ratio + socialSize / 2, z: 0 };
          surNamePosition = {
            x: -socialSize,
            y: ratio + socialSize / 2 - 0.1,
            z: 0,
          };
          linksPosition = {
            x: -(0.5 - socialSize / 2),
            y: ratio / 2 + socialSize / 2 + 0.01,
            z: 0,
          };
          break;
        }
        case "bottom": {
          profileImagePosition = {
            x: -0.5 + socialSize,
            y: -ratio / 2 - socialSize - 0.02,
            z: 0,
          };
          namePosition = { x: -socialSize, y: -ratio + socialSize, z: 0 };
          surNamePosition = {
            x: -socialSize,
            y: -ratio + socialSize - 0.1,
            z: 0,
          };
          linksPosition = {
            x: -(0.5 - socialSize / 2),
            y: -ratio - socialSize,
            z: 0,
          };
          console.log("ratio", ratio);
          break;
        }
        case "left": {
          profileImagePosition = { x: -0.7, y: ratio - 0.45, z: 0 };
          namePosition = { x: -0.9, y: ratio - 0.43, z: 0 };
          surNamePosition = { x: -0.9, y: ratio - 0.53, z: 0 };
          //linksPosition = {x: -ratio - ((socialSize + 0.2) * this.links.length) - socialSize/2, y: -socialSize, z: 0};
          let iks =
            -0.5 + socialSize / 2 - (socialSize + 0.05) * this.links.length;
          linksPosition = { x: iks, y: -socialSize, z: 0 };
          console.log("left", iks);
          break;
        }
      }

      var name = this.name;
      var surname = this.surname;
      var blockPosition = this.blockPosition;
      loader.load("/assets/fonts/open_sans_bold.json", function (font) {
        const properties = {
          font: font,
          size: 6,
          height: 2,
        };

        var geometry = new TextGeometry(name, properties);

        let mesh = new Mesh(geometry, [
          nameMaterialFront,
          nameMaterialBack,
        ]);

        if (blockPosition === "left") {
          let box3 = new THREE.Box3().setFromObject(mesh);
          let size = new THREE.Vector3();
          namePosition.x = -0.65 - socialSize * 2 - box3.getSize(size).x / 100;
        }

        mesh.position.set(namePosition.x, namePosition.y, namePosition.z);
        mesh.scale.multiplyScalar(0.01);

        // ADD the surname

        var geometrySurname = new TextGeometry(surname, properties);

        let meshSurname = new Mesh(geometrySurname, [
          nameMaterialFront,
          nameMaterialBack,
        ]);

        if (blockPosition === "left") {
          let boxSurname = new THREE.Box3().setFromObject(meshSurname);
          let sizeSurname = new THREE.Vector3();
          surNamePosition.x =
            -0.65 - socialSize * 2 - boxSurname.getSize(sizeSurname).x / 100;
        }
        meshSurname.position.set(
          surNamePosition.x,
          surNamePosition.y,
          surNamePosition.z
        );
        meshSurname.scale.multiplyScalar(0.01);

        anchor.group.add(mesh);
        anchor.group.add(meshSurname);
      });

      // Adding the light
      const light = new AmbientLight(0xffffff);
      scene.add(light);

      // Adding the image

      let imageLoader = new TextureLoader();
      imageLoader.crossOrigin = '';
      var materialImage = new MeshLambertMaterial({
        map: imageLoader.load(this.image),
      });

      var imageGeometry = new CircleGeometry(0.15, 32);
      var meshImage = new Mesh(imageGeometry, materialImage);
      meshImage.position.set(
        profileImagePosition.x,
        profileImagePosition.y,
        profileImagePosition.z
      );
      meshImage.name = "user-image";
      meshImage.click = () => this.imageClick();
      anchor.group.add(meshImage);

      var socialGeometry;

      switch (this.shape) {
        case "sphere": {
          socialGeometry = new RoundedBoxGeometry(
            socialSize,
            socialSize,
            socialSize,
            6,
            2
          );
          break;
        }
        case "rectangle": {
          socialGeometry = new THREE.PlaneGeometry(socialSize, socialSize);
          break;
        }
        case "cube": {
          socialSize *= 0.8;
          socialGeometry = new BoxGeometry(
            socialSize,
            socialSize,
            socialSize
          );
          break;
        }
        case "circle": {
          socialGeometry = new THREE.CircleGeometry(socialSize / 2, 32);
          break;
        }
      }

      let linkPosition = linksPosition.x;

      var meshes = [];
      for (let i = 0; i < this.links.length; i++) {
        let link = this.links[i];
        let linkImage =
          "/assets/images/" + link.name.toLowerCase() + ".png";
        console.log("l, color", linkImage);
        let materialElement = createMaterial(linkImage, link.color);
        let meshElement = new Mesh(socialGeometry, materialElement);
        meshElement.position.set(
          linkPosition,
          linksPosition.y,
          linksPosition.z
        );
        meshElement.name = link.name;
        meshElement.click = () => this.linkClick(link);
        meshes.push(meshElement);
        anchor.group.add(meshElement);
        linkPosition += 0.2;
      }
      // set the plane to the anchor group

      anchor.onTargetFound = () => {
        video.play();
      };

      anchor.onTargetLost = () => {
        video.pause();
      };

      video.addEventListener("play", () => {
        //video.currentTime = this.startSecond; // video starts at 6th second
      });

      var mouse = new Vector2();
      const raycaster = new Raycaster();

      document.body.addEventListener("click", (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -1 * (e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          let o = intersects[0].object;
          if (o.click) o.click();
        }
      });

      // we have to start mindar engine

      await mindarThree.start();

      // update the every frame
      const speed = this.animationSpeed;
      let counter = 0.5;
      renderer.setAnimationLoop(() => {
        let condition;
        switch (blockPosition) {
          case "right": {
            condition = counter < profileImagePosition.x;
            counter += 0.001;
            break;
          }
        }

        if (condition) {
          meshImage.position.set(counter, profileImagePosition.y, -0.05);
        } else {
          meshImage.position.set(
            profileImagePosition.x,
            profileImagePosition.y,
            profileImagePosition.z
          );
        }

        if (this.isAnimated && this.isPlaying) {
          meshes.forEach(function (mesh) {
            let animationSpeed = 0.01 * speed;
            mesh.rotation.y += animationSpeed;
          });
        }
        renderer.render(scene, camera);
      });
    },
  },
  computed: {
    position() {
      return 0 - this.videoHeight / this.videoWidth;
    },
  },
};
</script>
    <style scoped>
h1 {
  color: white;
  position: relative;
  text-align: left;
}
</style>