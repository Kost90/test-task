import { SINGLANN_ACTION_TYPES } from "./types";

export const SingleAnnReducer = (singlann, action) => {
  switch (action.type) {
    case SINGLANN_ACTION_TYPES.addSinglAnn: {
      return [
        {
          id: action.payload.id,
          img: action.payload.img,
        },
      ];
    }
    default: {
      throw new Error(`Unknown action type ${action.type}`);
    }
  }
};
