import { ENDPOINTIMG } from "../constants";

const getUserImage = (photo) => {
  return `${ENDPOINTIMG}${photo}`;
};

const getImage = (photo) => {
  return `${ENDPOINTIMG}${photo?._id}.${photo?.name?.split(".")[1]}`;
};

export default { getUserImage, getImage };
