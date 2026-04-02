import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Award, Lock, Star, Zap, Flame, Target, Shield } from "lucide-react";

const badges = [
  { name: "First Blood", desc: "Complete your first workout", icon: Zap, unlocked: true },
  { name: "Iron Will", desc: "7-day workout streak", icon: Shield, unlocked: true },
  { name: "Form Master", desc: "10 perfect form workouts", icon: Target, unlocked: true },
  { name: "Calorie Crusher", desc: "Burn 5,000 calories", icon: Flame, unlocked: true },
  { name: "Century Club", desc: "Complete 100 workouts", icon: Star, unlocked: true },
  { name: "Elite Operator", desc: "Reach Level 50", icon: Award, unlocked: false },
  { name: "Unstoppable", desc: "30-day streak", icon: Shield, unlocked: false },
  { name: "Legend", desc: "Top 10 on Arena", icon: Star, unlocked: false },
  { name: "Perfect Score", desc: "100% form accuracy", icon: Target, unlocked: false },
];

export default function Vault() {
  const unlocked = badges.filter(b => b.unlocked).length;

  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl tracking-widest mb-1">THE VAULT</h1>
          <p className="text-sm text-muted-foreground">{unlocked} of {badges.length} achievements unlocked</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className={`glass rounded-xl p-5 text-center transition-all ${
                badge.unlocked
                  ? "hud-border hover:border-primary/50"
                  : "border border-border/30 opacity-50"
              }`}
            >
              <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center ${
                badge.unlocked
                  ? "bg-primary/10 border border-primary/30 animate-glow-pulse"
                  : "bg-secondary border border-border/50"
              }`}>
                {badge.unlocked ? (
                  <badge.icon className="w-6 h-6 text-primary" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-display text-xs tracking-widest mb-1">{badge.name}</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
