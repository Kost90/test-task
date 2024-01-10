import { ANNOUNCE_ACTION_TYPES } from "./types";

export const AnnounceReducer = (announcement, action) => {
  switch (action.type) {
    case ANNOUNCE_ACTION_TYPES.addAnnounce: {
      return [
        ...announcement,
        {
          id: action.payload.id,
          img: action.payload.img,
          geo: action.payload.geo,
          bbox:action.payload.bbox,
        },
      ];
    }
    case ANNOUNCE_ACTION_TYPES.changeAnnounce:{
      return action.payload;
    }
    default: {
      throw new Error(`Unknown action type ${action.type}`);
    }
  }
};
