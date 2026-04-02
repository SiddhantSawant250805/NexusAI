import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Trophy,
  User,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Nexus", path: "/dashboard" },
  { icon: Dumbbell, label: "Workout", path: "/workout" },
  { icon: UtensilsCrossed, label: "Nutrition", path: "/nutrition" },
  { icon: Trophy, label: "Arena", path: "/arena" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-primary/20 md:hidden">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                active
                  ? "text-primary neon-text-blue"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-display tracking-wider uppercase">
                {label}
              </span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse-neon" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
