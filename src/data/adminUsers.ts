// Admin accounts (mock). Shared by the Users page and the Activity log.

export type UserRole = "admin" | "editor";
export type UserStatus = "active" | "invited" | "suspended";

export type AdminUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  /** Club the person represents, if any (e.g. a club secretary) */
  club?: string;
  /** ISO date-time; empty for people who haven't signed in yet */
  lastActive: string;
  /** ISO date */
  addedAt: string;
};

export const roleLabels: Record<UserRole, string> = { admin: "Admin", editor: "Editor" };

export const statusLabels: Record<UserStatus, string> = { active: "Active", invited: "Invite pending", suspended: "Suspended" };

/** What each role can do, in plain language. Used for the role guide and the invite form. */
export const roleDetails: Record<UserRole, { summary: string; can: string[] }> = {
  admin: {
    summary: "Everything, including deleting and managing users",
    can: ["Fixtures and results", "Clubs and leagues", "News", "Activity log", "Deleting", "Users and roles"],
  },
  editor: {
    summary: "Everything except users and deleting",
    can: ["Fixtures and results", "Clubs and leagues", "News", "Activity log"],
  },
};

/** Every permission that appears in the role guide, in order */
export const allPermissions = ["Fixtures and results", "Clubs and leagues", "News", "Activity log", "Deleting", "Users and roles"];

/** Only admins can see or manage users */
export const canManageUsers = (role: UserRole) => role === "admin";

/** Only admins can delete clubs, leagues, fixtures and news */
export const canDelete = (role: UserRole) => role === "admin";

/** Badge colours per role and status (same everywhere in the admin) */
export const roleBadge: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-800",
  editor: "bg-[var(--md-primary-container)]/60 text-[var(--md-on-primary-container)]",
};

export const statusBadge: Record<UserStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  invited: "bg-amber-100 text-amber-800",
  suspended: "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)]",
};

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "John Smith", username: "john.smith", email: "john.smith@nefl.ie", role: "admin", status: "active", lastActive: "2025-10-28T16:42:00", addedAt: "2023-01-15" },
  { id: "u2", name: "Rachel Green", username: "rachel.green", email: "rachel.green@nefl.ie", role: "admin", status: "active", lastActive: "2025-10-26T02:15:00", addedAt: "2023-02-01" },
  { id: "u3", name: "Sarah Johnson", username: "sarah.johnson", email: "sarah.johnson@nefl.ie", role: "editor", status: "active", lastActive: "2025-10-28T14:05:00", addedAt: "2023-03-10" },
  { id: "u4", name: "Lisa Anderson", username: "lisa.anderson", email: "lisa.anderson@nefl.ie", role: "editor", status: "active", lastActive: "2025-10-26T18:02:00", addedAt: "2023-08-22" },
  { id: "u5", name: "Mike Wilson", username: "mike.wilson", email: "mike.wilson@nefl.ie", role: "editor", status: "active", lastActive: "2025-10-28T11:20:00", addedAt: "2024-01-05" },
  { id: "u6", name: "Emma Davis", username: "emma.davis", email: "emma.davis@nefl.ie", role: "editor", status: "active", lastActive: "2025-10-27T19:10:00", addedAt: "2024-02-14" },
  { id: "u7", name: "Tom Wilson", username: "tom.wilson", email: "tom.wilson@nefl.ie", role: "editor", status: "active", lastActive: "2025-10-24T09:30:00", addedAt: "2024-06-01" },
  { id: "u8", name: "David Brown", username: "david.brown", email: "secretary@parkvillafc.ie", role: "editor", status: "active", club: "Parkvilla FC", lastActive: "2025-10-20T20:12:00", addedAt: "2024-09-03" },
  { id: "u9", name: "Aoife Byrne", username: "aoife.byrne", email: "aoife@bellurganutd.ie", role: "editor", status: "invited", club: "Bellurgan United", lastActive: "", addedAt: "2025-10-27" },
  { id: "u10", name: "Ciarán Murphy", username: "ciaran.murphy", email: "ciaran.murphy@nefl.ie", role: "editor", status: "invited", lastActive: "", addedAt: "2025-10-25" },
  { id: "u11", name: "Paul Kelly", username: "paul.kelly", email: "paul.kelly@nefl.ie", role: "editor", status: "suspended", lastActive: "2025-06-02T10:00:00", addedAt: "2023-11-12" },
];

/** The signed-in person (mock until real sign-in exists). Only admins can manage users. */
export const currentUserId = "u1";
export const currentUser = adminUsers.find((u) => u.id === currentUserId)!;

/** Admin areas this person can see (Users is admin-only) */
export const canSeeSection = (section: { adminOnly?: boolean }, role: UserRole = currentUser.role) =>
  !section.adminOnly || canManageUsers(role);
