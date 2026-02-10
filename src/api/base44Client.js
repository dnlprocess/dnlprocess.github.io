// Lightweight stub for `base44` used by the app.
// This removes the runtime dependency on @base44/sdk while preserving
// the minimal interface the pages expect. Methods return promises so
// existing `useQuery` calls continue to work and render empty results.

export const base44 = {
  entities: {
    Project: {
      list: async (_order, _limit) => [],
      filter: async (_query, _order, _limit) => [],
    },
    Photo: {
      list: async (_order, _limit) => [],
      filter: async (_query, _order, _limit) => [],
    },
    BlogPost: {
      list: async (_order, _limit) => [],
      filter: async (_query, _order, _limit) => [],
    },
    SiteSettings: {
      list: async (_order, _limit) => [],
      filter: async (_query, _order, _limit) => [],
    },
  },
  auth: {
    me: async () => null,
    logout: (_redirectUrl) => {},
    redirectToLogin: (_redirectUrl) => {},
  },
};
