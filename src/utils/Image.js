import { ENDPOINTIMG } from "../constants";

const getImage = (photo) => {
  return `${ENDPOINTIMG}${photo}`;
};

export default getImage;
