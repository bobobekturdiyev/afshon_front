
const loadVideo = (path) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      
      video.loop = true;
      video.controls = true;
      video.setAttribute('crossOrigin', 'anonymous')
      video.src = path;

      video.addEventListener('loadeddata', () => {
      console.log("resolving element>>>")

        resolve(video);

      console.log("resolved!!!!")

      });
      
    });
};

export default loadVideo;