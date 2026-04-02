import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Zap, Flame, Shield, Wind, Target, TrendingUp, Calendar, Clock } from "lucide-react";

const stats = [
  { label: "Strength", value: 72, icon: Shield, color: "text-primary" },
  { label: "Agility", value: 58, icon: Wind, color: "text-accent" },
  { label: "Endurance", value: 85, icon: Flame, color: "text-neon-purple" },
  { label: "Accuracy", value: 91, icon: Target, color: "text-primary" },
];

const recentWorkouts = [
  { name: "Upper Body Assault", time: "45 min", cal: 420, date: "Today" },
  { name: "HIIT Circuit Alpha", time: "32 min", cal: 380, date: "Yesterday" },
  { name: "Leg Day Protocol", time: "55 min", cal: 510, date: "2 days ago" },
];

function StatBar({ label, value, icon: Icon, color }: typeof stats[0]) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-display tracking-widest uppercase">{label}</span>
          <span className="text-xs font-display text-muted-foreground">{value}/100</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-neon" />
            <span className="text-xs font-display tracking-widest text-accent neon-text-green">SYSTEMS ONLINE</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl tracking-widest">NEXUS DASHBOARD</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Player Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 glass rounded-2xl p-6 hud-border"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-lg tracking-widest mb-1">PLAYER STATS</h2>
                <p className="text-sm text-muted-foreground">Level 24 • Intermediate</p>
              </div>
              <div className="glass rounded-lg px-3 py-1.5 hud-border">
                <span className="text-xs font-display tracking-widest text-primary">XP 2,450 / 3,000</span>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mb-6">
              <div className="h-3 rounded-full bg-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-neon-purple animate-glow-pulse"
                />
              </div>
            </div>

            <div className="space-y-4">
              {stats.map((s, i) => (
                <StatBar key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 hud-border flex flex-col items-center justify-center text-center"
          >
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center mb-4 animate-glow-pulse">
              <Zap className="w-12 h-12 text-primary animate-float" />
            </div>
            <h3 className="font-display tracking-widest text-sm mb-1">3D AVATAR</h3>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </motion.div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Flame, label: "Streak", value: "12 Days", accent: true },
            { icon: TrendingUp, label: "This Week", value: "4 Sessions" },
            { icon: Calendar, label: "Total", value: "186 Workouts" },
            { icon: Clock, label: "Avg Duration", value: "42 min" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass rounded-xl p-4 hud-border"
            >
              <item.icon className={`w-5 h-5 mb-2 ${item.accent ? "text-accent" : "text-primary"}`} />
              <div className="text-lg font-display tracking-wider">{item.value}</div>
              <div className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Workouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 hud-border"
        >
          <h3 className="font-display text-sm tracking-widest mb-4">RECENT MISSIONS</h3>
          <div className="space-y-3">
            {recentWorkouts.map(w => (
              <div key={w.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div>
                  <div className="text-sm font-medium">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.date} • {w.time}</div>
                </div>
                <div className="text-sm font-display text-accent">{w.cal} cal</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
