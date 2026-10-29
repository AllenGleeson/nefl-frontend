// Mock admin activity log (newest first). Replace with real data once there is a backend.

export type ActivityType = "fixture" | "result" | "club" | "news" | "user" | "general";

import { adminUsers, roleLabels, type AdminUser, type UserRole } from "./adminUsers";

export { roleLabels };
export type { UserRole };

export type ActivityUser = Pick<AdminUser, "name" | "username" | "role">;

export type AdminActivity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  /** Who made the change */
  user: ActivityUser;
  /** ISO date-time */
  at: string;
};

export const activityTypeLabels: Record<ActivityType, string> = {
  fixture: "Fixtures",
  result: "Results",
  club: "Clubs",
  news: "News",
  user: "Users",
  general: "System",
};

// People from the shared admin accounts list
const byUsername = (username: string): ActivityUser => {
  const u = adminUsers.find((x) => x.username === username)!;
  return { name: u.name, username: u.username, role: u.role };
};
const users = {
  johnSmith: byUsername("john.smith"),
  rachelGreen: byUsername("rachel.green"),
  sarahJohnson: byUsername("sarah.johnson"),
  lisaAnderson: byUsername("lisa.anderson"),
  mikeWilson: byUsername("mike.wilson"),
  emmaDavis: byUsername("emma.davis"),
};

export const adminActivity: AdminActivity[] = [
  { id: "a20", type: "fixture", title: "New fixture added", description: "Parkvilla FC v Duleek AFC scheduled for Saturday 1 November", user: users.johnSmith, at: "2025-10-28T16:42:00" },
  { id: "a19", type: "club", title: "Club information updated", description: "Updated ground and contact details for Rock Celtic FC", user: users.sarahJohnson, at: "2025-10-28T14:05:00" },
  { id: "a18", type: "result", title: "Match result recorded", description: "Walshestown FC 4–2 Athboy Celtic FC (Division 1)", user: users.mikeWilson, at: "2025-10-28T11:20:00" },
  { id: "a17", type: "news", title: "News article published", description: "\"Trim Celtic go top after derby win\"", user: users.emmaDavis, at: "2025-10-27T19:10:00" },
  { id: "a16", type: "user", title: "New user invited", description: "Club secretary account created for Bellurgan United", user: users.johnSmith, at: "2025-10-27T15:33:00" },
  { id: "a15", type: "result", title: "Match result recorded", description: "Quay Celtic FC 2–0 Bellurgan United (Premier Division)", user: users.mikeWilson, at: "2025-10-27T12:48:00" },
  { id: "a14", type: "fixture", title: "Fixture rescheduled", description: "Kentstown Rovers FC v Rock Celtic FC moved to Sunday 2 November", user: users.lisaAnderson, at: "2025-10-26T18:02:00" },
  { id: "a13", type: "general", title: "System maintenance completed", description: "Database optimisation and security updates applied", user: users.rachelGreen, at: "2025-10-26T02:15:00" },
  { id: "a12", type: "club", title: "Formation updated", description: "Parkvilla FC set their default formation to 4-4-2", user: users.sarahJohnson, at: "2025-10-25T13:27:00" },
  { id: "a11", type: "news", title: "News article updated", description: "Corrected kick-off time in \"Confirmed fixtures\"", user: users.emmaDavis, at: "2025-10-25T10:40:00" },
  { id: "a10", type: "result", title: "Match result recorded", description: "Trim Celtic AFC 1–1 Johnstown FC (Division 1)", user: users.mikeWilson, at: "2025-10-24T21:55:00" },
  { id: "a09", type: "user", title: "Role changed", description: "Tom Wilson given the Editor role", user: users.johnSmith, at: "2025-10-24T09:12:00" },
  { id: "a08", type: "fixture", title: "Fixtures published", description: "Matchweek 10 fixtures published for all men's divisions", user: users.lisaAnderson, at: "2025-10-23T17:30:00" },
  { id: "a07", type: "club", title: "Club added", description: "Sporting BJD FC added to Superior Racking & Shelving Division 4", user: users.johnSmith, at: "2025-10-22T14:18:00" },
  { id: "a06", type: "news", title: "News article published", description: "\"Watch: Walshestown FC v Athboy Celtic highlights\"", user: users.emmaDavis, at: "2025-10-21T20:05:00" },
  { id: "a05", type: "result", title: "Match result recorded", description: "Monaghan United FC 2–1 Monaghan Town FC (Division 3)", user: users.mikeWilson, at: "2025-10-20T16:44:00" },
  { id: "a04", type: "general", title: "Backup completed", description: "Weekly backup of league data completed", user: users.rachelGreen, at: "2025-10-19T03:00:00" },
  { id: "a03", type: "user", title: "User deactivated", description: "Inactive referee account deactivated", user: users.johnSmith, at: "2025-10-18T11:37:00" },
  { id: "a02", type: "fixture", title: "New fixture added", description: "BJD Celtic v Enfield Celtic FC scheduled (Division 2)", user: users.lisaAnderson, at: "2025-10-17T15:21:00" },
  { id: "a01", type: "club", title: "Club information updated", description: "New crest uploaded for Duleek AFC", user: users.sarahJohnson, at: "2025-10-16T12:09:00" },
];
