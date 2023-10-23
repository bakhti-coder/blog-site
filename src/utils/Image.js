import { ENDPOINTIMG } from "../constants";

const getUserImage = (photo) => {
  return `${ENDPOINTIMG}${photo}`;
};

export default getUserImage;
