import { WorkspaceInvite, WorkspaceRole } from "@/types";

export const PUBLIC_WORKSPACE = "public";

export const createWorkspacePrefix = (workspace: string) => {
  if (workspace === PUBLIC_WORKSPACE || workspace === "") {
    return "";
  }

  return `workspaces/${workspace}/`;
};

export const items = [
  { text: "User", value: WorkspaceRole.User },
  { text: "Admin", value: WorkspaceRole.Admin },
  { text: "Owner", value: WorkspaceRole.Owner },
];

export const getRole = (invite: WorkspaceInvite) => {
  const found = items.find((item) => (item.value = invite.role));
  if (!found) {
    return "???";
  }
  return found.text;
};

export const getLink = (invite: WorkspaceInvite) => {
  return `${window.location}/workspaces/${invite.workspace}/invite/${invite.id}`;
};
