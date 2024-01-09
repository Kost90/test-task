import LocalStorageAPI from "../../api/API/LocalStorageAPI";

export const AnnounceDetailsLoader = ({ params: id }) => {
  const result = LocalStorageAPI.getSinglData({ id });
  return result;
};
