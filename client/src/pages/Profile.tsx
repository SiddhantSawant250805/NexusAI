import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Shield, Wind, Flame, Target, Heart, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user, profile } = useAuth();

  const attributeConfigs = [
    { key: "strength", label: "Strength", icon: Shield, color: "from-primary to-blue-400" },
    { key: "agility", label: "Agility", icon: Wind, color: "from-accent to-green-400" },
    { key: "endurance", label: "Endurance", icon: Wind, color: "from-orange-500 to-red-400" }, // Wind as endurance fallback
    { key: "accuracy", label: "Accuracy", icon: Target, color: "from-primary to-purple-400" },
    { key: "recovery", label: "Recovery", icon: Heart, color: "from-pink-500 to-red-400" },
    { key: "power", label: "Power", icon: Zap, color: "from-yellow-400 to-accent" },
  ];

  const milestones = [
    { title: "First 100 Reps", achieved: (profile?.totalMissions || 0) > 5 },
    { title: "Perfect Form Streak (10)", achieved: true },
    { title: "1000 Calories Burned", achieved: (profile?.xp || 0) > 1000 },
    { title: "30-Day Streak", achieved: (profile?.streak || 0) >= 30 },
    { title: "Elite Accuracy", achieved: (profile?.attributes?.accuracy || 0) > 90 },
  ];

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
            <h2 className="font-display text-xl tracking-widest uppercase">
              {user?.codename || "AGENT_NEXUS"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Level {profile?.level || 1} • {profile?.experience || "Recruit"} • {profile?.totalMissions || 0} Missions
            </p>
            <div className="flex gap-2 mt-2">
              {profile?.goals?.map(goal => (
                <span key={goal} className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase">
                  {goal}
                </span>
              ))}
              {(!profile?.goals || profile.goals.length === 0) && (
                <span className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full bg-muted/20 text-muted-foreground border border-muted/30">
                  NO_ACTIVE_GOALS
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {attributeConfigs.map((attr, i) => {
            const value = (profile?.attributes as any)?.[attr.key] || 0;
            return (
              <motion.div
                key={attr.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="glass rounded-xl p-5 hud-border text-center"
              >
                <attr.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-display mb-1">{value}</div>
                <div className="text-[10px] font-display tracking-widest text-muted-foreground uppercase mb-3">{attr.label}</div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${attr.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
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
