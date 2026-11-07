// Stable anchor id for a role card, e.g. /experience/#it-project-manager-data-analyst
export const roleId = (role: string) =>
  role.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
