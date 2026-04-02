import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Trophy,
  User,
  BookOpen,
  TrendingUp,
  Camera,
  Award,
  Zap,
} from "lucide-react";

const navGroups = [
  {
    label: "Core",
    items: [
      { icon: LayoutDashboard, label: "Nexus Dashboard", path: "/dashboard" },
      { icon: User, label: "Player Stats", path: "/profile" },
      { icon: TrendingUp, label: "Progress", path: "/progress" },
    ],
  },
  {
    label: "Training",
    items: [
      { icon: Camera, label: "Live Studio", path: "/workout" },
      { icon: BookOpen, label: "Workout Library", path: "/library" },
    ],
  },
  {
    label: "Fuel",
    items: [
      { icon: UtensilsCrossed, label: "Nutrition Lab", path: "/nutrition" },
    ],
  },
  {
    label: "Social",
    items: [
      { icon: Trophy, label: "The Arena", path: "/arena" },
      { icon: Award, label: "The Vault", path: "/vault" },
    ],
  },
];

export function DesktopSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col glass-strong border-r border-primary/10 z-40">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-border/50">
        <Zap className="w-7 h-7 text-primary" />
        <span className="font-display text-lg tracking-widest text-primary neon-text-blue">
          NEXUSFIT
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-display tracking-[0.2em] uppercase text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map(({ icon: Icon, label, path }) => {
                const active = pathname.startsWith(path);
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-primary/10 text-primary neon-glow-blue hud-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
