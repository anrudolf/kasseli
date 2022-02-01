const PUBLIC_WORKSPACE = "public";

export const createWorkspacePrefix = (workspace: string) => {
  if (workspace === PUBLIC_WORKSPACE || workspace === "") {
    return "";
  }

  return `workspaces/${workspace}/`;
};
