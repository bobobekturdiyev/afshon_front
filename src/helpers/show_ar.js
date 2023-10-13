import createMaterial from './create_material';
import loadVideo from './loader';


const showAr = async (data)  =>{
  console.log("video starting to load");

  const video = await loadVideo(this.videoUrl);
  console.log("end...");

  let ratio = video.videoHeight / video.videoWidth;

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: this.targetUrl,
  });

  const { renderer, scene, camera } = mindarThree;
  const anchor = mindarThree.addAnchor(0);

  const videoTexture = new THREE.VideoTexture(video);

  const geometry = new THREE.PlaneGeometry(1, ratio);
  const material = new THREE.MeshBasicMaterial({ map: videoTexture });
  const plane = new THREE.Mesh(geometry, material);
  plane.name = "video";
  plane.scale.set(1, 1, 1);
  plane.click = () => this.videoClick(video);
  anchor.group.add(plane);

  const loader = new FontLoader();

  var nameMaterialFront = new THREE.MeshLambertMaterial({
    color: this.textColor,
  });

  var nameMaterialBack = new THREE.MeshLambertMaterial({
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
  loader.load("/src/assets/fonts/open_sans_bold.json", function (font) {
    const properties = {
      font: font,
      size: 6,
      height: 2,
    };

    var geometry = new TextGeometry(name, properties);

    let mesh = new THREE.Mesh(geometry, [
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

    let meshSurname = new THREE.Mesh(geometrySurname, [
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
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  // Adding the image

  let imageLoader = new THREE.TextureLoader();
  imageLoader.crossOrigin = '';
  var materialImage = new THREE.MeshLambertMaterial({
    map: imageLoader.load(this.image),
  });

  var imageGeometry = new THREE.CircleGeometry(0.15, 32);
  var meshImage = new THREE.Mesh(imageGeometry, materialImage);
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
      socialGeometry = new THREE.BoxGeometry(
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
      "/src/assets/images/" + link.name.toLowerCase() + ".png";
    console.log("l, color", linkImage);
    let materialElement = createMaterial(linkImage, link.color);
    let meshElement = new THREE.Mesh(socialGeometry, materialElement);
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

  var mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

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
};

export default showAr;