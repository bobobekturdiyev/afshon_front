function createMaterial(texture, color = "#FFFFFF") {
    let socialLoader = new THREE.TextureLoader();

    let material = new THREE.MeshLambertMaterial({
      map: socialLoader.load(texture),
      side: THREE.DoubleSide,
    });
    material.color.set(color);
    return material;
}

export default createMaterial;