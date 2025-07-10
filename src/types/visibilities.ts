export const visibilities = {
  all: "All",
  active: "Active",
  archived: "Archived",
} as const;

export type VisibilityKey = keyof typeof visibilities;

export type VisibilityType = (typeof visibilities)[keyof typeof visibilities];
