import { CalendarDays, History, LayoutDashboard, Newspaper, Shield, Trophy, Users } from "lucide-react";

// Admin areas, used by the sidebar and the dashboard quick actions.
// adminOnly areas are hidden from editors.
export const adminSections = [
  { href: "/management", label: "Dashboard", icon: LayoutDashboard, description: "Overview and quick actions" },
  { href: "/management/fixtures", label: "Fixtures", icon: CalendarDays, description: "Create, edit and score matches" },
  { href: "/management/clubs", label: "Clubs", icon: Shield, description: "Club details, leagues and formations" },
  { href: "/management/leagues", label: "Leagues", icon: Trophy, description: "Leagues and standings" },
  { href: "/management/news", label: "News", icon: Newspaper, description: "Articles and announcements" },
  { href: "/management/users", label: "Users", icon: Users, description: "Accounts, roles and permissions", adminOnly: true },
  { href: "/management/activity", label: "Activity", icon: History, description: "A log of every change in the admin" },
];
