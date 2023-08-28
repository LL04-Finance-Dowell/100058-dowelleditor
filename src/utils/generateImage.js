import html2canvas from "html2canvas";

const generateImage = async (divtoprint) => {
  return new Promise((resolve, reject) => {
    html2canvas(divtoprint, { scale: 3 }).then(function (canvas) {
      // Convert the canvas to an image
      const screenshot = canvas.toDataURL("image/png");
      resolve(screenshot);
    }).catch(error => {
      reject(error);
    });
  });
}

export default generateImage