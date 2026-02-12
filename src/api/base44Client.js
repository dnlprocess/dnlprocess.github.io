// Lightweight stub for `base44` used by the app.
// This removes the runtime dependency on @base44/sdk while preserving
// the minimal interface the pages expect. Methods return promises so
// existing `useQuery` calls continue to work and render empty results.

export const base44 = {
  entities: {
    Project: {
      list: async (_order, _limit) =>
        fetch('/content/Project.json').then((r) => r.json()).catch(() => []),
      filter: async (query) => {
        const all = await fetch('/content/Project.json').then((r) => r.json()).catch(() => []);
        if (!query) return all;
        return all.filter((p) => {
          if (query.slug) return p.slug === query.slug || p.slug === query.slug.toLowerCase();
          return true;
        });
      },
    },
    Photo: {
      list: async (_order, _limit) =>
        fetch('/content/Photo.json').then((r) => r.json()).catch(() => []),
      filter: async (query) => {
        const all = await fetch('/content/Photo.json').then((r) => r.json()).catch(() => []);
        if (!query) return all;
        return all.filter((p) => {
          if (query.project) return p.project && p.project.toLowerCase() === query.project.toLowerCase();
          return true;
        });
      },
    },
    BlogPost: {
      list: async (_order, _limit) =>
        fetch('/content/Writing.json').then((r) => r.json()).catch(() => []),
      filter: async (query) => {
        const all = await fetch('/content/Writing.json').then((r) => r.json()).catch(() => []);
        if (!query) return all;
        return all.filter((p) => {
          if (query.slug) return p.slug === query.slug || p.slug === query.slug.toLowerCase();
          return true;
        });
      },
    },
    SiteSettings: {
      list: async (_order, _limit) =>
        fetch('/content/SiteSettings.json').then((r) => r.json()).catch(() => []),
      filter: async (query) => {
        const all = await fetch('/content/SiteSettings.json').then((r) => r.json()).catch(() => []);
        if (!query) return all;
        return all.filter((p) => true);
      },
    },
  },
  auth: {
    me: async () => null,
    logout: (_redirectUrl) => {},
    redirectToLogin: (_redirectUrl) => {},
  },
};
