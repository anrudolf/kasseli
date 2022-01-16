const PUBLIC_WORKSPACE = "";
const DEFAULT_WORKSPACE = PUBLIC_WORKSPACE;

const settingsRaw = localStorage.getItem("settings");

let workspace = DEFAULT_WORKSPACE;

if (settingsRaw) {
  const settings = JSON.parse(settingsRaw);
  if (settings.workspace) {
    workspace = settings.workspace;
  }
}

export default workspace;
