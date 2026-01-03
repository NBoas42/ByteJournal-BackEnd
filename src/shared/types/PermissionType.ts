export const PERMISSIONS_TYPES = ["ADMIN", "USER"] as const;
export type PermissionType = typeof PERMISSIONS_TYPES[number];