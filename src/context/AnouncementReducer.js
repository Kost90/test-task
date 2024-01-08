export const ANNOUNCE_ACTION_TYPES = {
  addAnnounce: "ADD_ANNOUNCE",
};

export const AnnounceReducer = (announcement, action) => {
  switch (action.type) {
    case ANNOUNCE_ACTION_TYPES.addAnnounce: {
      return [
        ...announcement,
        {
          id: action.payload.id,
          img: action.payload.img,
          geo: action.payload.geo,
        },
      ];
    }
    default: {
      throw new Error(`Unknown action type ${action.type}`);
    }
  }
};
