import { WowUpAddonReleaseRepresentation, WowUpAddonRepresentation } from "./addon-representations";

export interface WowUpGetAddonResponse {
  addon: WowUpAddonRepresentation;
}

export interface WowUpGetAddonReleaseResponse {
  release: WowUpAddonReleaseRepresentation;
}

export interface WowUpGetAddonResponse {
  addon: WowUpAddonRepresentation;
}

export interface WowUpGetAddonsResponse {
  addons: WowUpAddonRepresentation[];
  count: number;
}

export interface GetFeaturedAddonsResponse {
  addons: WowUpAddonRepresentation[];
  recent: WowUpAddonRepresentation[];
  count: number;
  recentCount: number;
}

export interface WowUpSearchAddonsResponse {
  addons: WowUpAddonRepresentation[];
  count: number;
}
