import deleteFile from "../../firebase/deleteFile";

const deleteImages = async (images, productId) => {
  if (images.length > 0) {
    const promises = images.map((imgURL) => {
      return deleteFile(imgURL);
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
};

export default deleteImages;
