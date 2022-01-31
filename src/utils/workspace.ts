const PUBLIC_WORKSPACE = "public";
const DEFAULT_WORKSPACE = PUBLIC_WORKSPACE;

const settingsRaw = localStorage.getItem("settings");

let workspace = DEFAULT_WORKSPACE;

if (settingsRaw) {
  const settings = JSON.parse(settingsRaw);
  if (settings.workspace) {
    workspace = settings.workspace;
  }
}

export const getWorkspace = () => workspace;
export const getWorkspacePrefix = () => {
  return createWorkspacePrefix(getWorkspace());
};

export const createWorkspacePrefix = (workspace: string) => {
  if (workspace === PUBLIC_WORKSPACE || workspace === "") {
    return "";
  }

  return `workspaces/${workspace}/`;
};
