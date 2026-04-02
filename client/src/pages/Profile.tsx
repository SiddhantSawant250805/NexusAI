import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Shield, Wind, Flame, Target, Heart, Zap, TrendingUp } from "lucide-react";

const attributes = [
  { label: "Strength", value: 72, max: 100, icon: Shield, color: "from-primary to-blue-400" },
  { label: "Agility", value: 58, max: 100, icon: Wind, color: "from-accent to-green-400" },
  { label: "Endurance", value: 85, max: 100, icon: Flame, color: "from-orange-500 to-red-400" },
  { label: "Accuracy", value: 91, max: 100, icon: Target, color: "from-primary to-purple-400" },
  { label: "Recovery", value: 67, max: 100, icon: Heart, color: "from-pink-500 to-red-400" },
  { label: "Power", value: 78, max: 100, icon: Zap, color: "from-yellow-400 to-accent" },
];

const milestones = [
  { title: "First 100 Reps", achieved: true },
  { title: "Perfect Form Streak (10)", achieved: true },
  { title: "1000 Calories Burned", achieved: true },
  { title: "30-Day Streak", achieved: false },
  { title: "Elite Accuracy", achieved: false },
];

export default function Profile() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl tracking-widest mb-1">PLAYER STATS</h1>
          <p className="text-sm text-muted-foreground">Your Fitness DNA Profile</p>
        </motion.div>

        {/* Player Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 hud-border flex items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full border-2 border-primary/50 flex items-center justify-center animate-glow-pulse">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl tracking-widest">AGENT NEXUS</h2>
            <p className="text-sm text-muted-foreground">Level 24 • Intermediate • 186 Missions</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">MUSCLE BUILD</span>
              <span className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">FULL GYM</span>
            </div>
          </div>
        </motion.div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {attributes.map((attr, i) => (
            <motion.div
              key={attr.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass rounded-xl p-5 hud-border text-center"
            >
              <attr.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-display mb-1">{attr.value}</div>
              <div className="text-[10px] font-display tracking-widest text-muted-foreground uppercase mb-3">{attr.label}</div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attr.value}%` }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${attr.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 hud-border"
        >
          <h3 className="font-display text-sm tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> MILESTONES
          </h3>
          <div className="space-y-3">
            {milestones.map(m => (
              <div key={m.title} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${m.achieved ? "bg-accent neon-glow-green" : "bg-border"}`} />
                <span className={`text-sm ${m.achieved ? "text-foreground" : "text-muted-foreground"}`}>{m.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
