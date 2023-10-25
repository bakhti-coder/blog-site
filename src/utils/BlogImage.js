import { ENDPOINTIMG } from "../constants";

export const getBlogImage = (photo) => {
  return `${ENDPOINTIMG}${photo?._id}.${photo?.name?.split(".")[1]}`;
};
