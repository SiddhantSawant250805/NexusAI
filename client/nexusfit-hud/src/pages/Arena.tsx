import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "ShadowStrike", xp: 28450, level: 42, streak: 45, icon: Crown },
  { rank: 2, name: "IronPhoenix", xp: 26200, level: 39, streak: 38 },
  { rank: 3, name: "NovaBeast", xp: 24800, level: 37, streak: 32 },
  { rank: 4, name: "Agent Nexus", xp: 22450, level: 24, streak: 12, isUser: true },
  { rank: 5, name: "VoltRunner", xp: 21900, level: 33, streak: 28 },
  { rank: 6, name: "CyberLift", xp: 20100, level: 31, streak: 22 },
  { rank: 7, name: "TitanForge", xp: 19500, level: 30, streak: 19 },
  { rank: 8, name: "ApexHunter", xp: 18200, level: 28, streak: 15 },
];

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-amber-600",
};

export default function Arena() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl tracking-widest mb-1">THE ARENA</h1>
          <p className="text-sm text-muted-foreground">Global performance rankings</p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-end justify-center gap-4 py-6"
        >
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
            const heights = ["h-24", "h-32", "h-20"];
            return (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full glass border border-primary/30 flex items-center justify-center">
                  {p.rank === 1 ? <Crown className="w-5 h-5 text-yellow-400" /> : <Medal className="w-5 h-5 text-muted-foreground" />}
                </div>
                <span className="text-xs font-display tracking-wider">{p.name}</span>
                <div className={`w-20 ${heights[i]} rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/5 border border-primary/20 border-b-0 flex items-center justify-center`}>
                  <span className={`text-2xl font-display ${rankColors[p.rank] || "text-foreground"}`}>#{p.rank}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl hud-border overflow-hidden"
        >
          {leaderboard.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.04 }}
              className={`flex items-center gap-4 px-5 py-4 border-b border-border/30 last:border-b-0 transition-colors ${
                p.isUser ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-secondary/50"
              }`}
            >
              <span className={`text-lg font-display w-8 ${rankColors[p.rank] || "text-muted-foreground"}`}>
                {p.rank}
              </span>
              <div className="flex-1">
                <span className={`text-sm font-medium ${p.isUser ? "text-primary" : ""}`}>{p.name}</span>
                <div className="text-[10px] text-muted-foreground font-display tracking-widest">
                  LVL {p.level} • {p.streak} DAY STREAK
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-display text-primary">{p.xp.toLocaleString()}</div>
                <div className="text-[10px] font-display tracking-widest text-muted-foreground">XP</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}
