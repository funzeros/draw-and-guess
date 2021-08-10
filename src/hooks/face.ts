import { faceList } from "../const";

const useFace = () => {
  function randomFace() {
    return faceList[Math.floor(Math.random() * faceList.length)];
  }
  function randomFaceByArr(arr: string[]) {
    const face = randomFace();
    if (arr.includes(face)) return randomFaceByArr(arr);
    return face;
  }
  return {
    randomFace,
    randomFaceByArr,
  };
};

export default useFace;
