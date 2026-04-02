import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Zap, Flame, Shield, Wind, Target, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Strength", value: 72, icon: Shield, color: "text-primary" },
  { label: "Agility", value: 58, icon: Wind, color: "text-accent" },
  { label: "Endurance", value: 85, icon: Flame, color: "text-orange-500" },
  { label: "Accuracy", value: 91, icon: Target, color: "text-primary" },
];

const recentWorkouts = [
  { name: "Upper Body Assault", time: "45 min", cal: 420, date: "Today" },
  { name: "HIIT Circuit Alpha", time: "32 min", cal: 380, date: "Yesterday" },
  { name: "Leg Day Protocol", time: "55 min", cal: 510, date: "2 days ago" },
];

function StatBar({ label, value, icon: Icon, color }: typeof stats[0]) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-8 h-8 rounded-lg bg-card/50 flex items-center justify-center border border-border/50 group-hover:border-primary/40 transition-colors`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] font-display tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
          <span className="text-[10px] font-display text-primary">{value}%</span>
        </div>
        <div className="h-1 rounded-full bg-primary/5 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className={`h-full rounded-full bg-gradient-to-r from-primary/40 to-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]`}
          />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_hsl(var(--accent))]" />
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full animate-ping" />
              </div>
              <span className="text-[10px] font-display tracking-[0.3em] text-accent neon-text-green uppercase">Systems_Online // Core_Protocol_V3.4</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl tracking-[-0.02em] font-black uppercase">
              Nexus_<span className="text-primary neon-text-blue">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-display tracking-widest text-muted-foreground bg-card/30 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> SYNC: OK</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full" /> AI_DNA: STABLE</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 holographic-card rounded-2xl p-8 hud-border"
          >
            <div className="flex items-start justify-between mb-10">
              <div>
                <h2 className="font-display text-xl tracking-[0.2em] mb-2 uppercase">Subject: Agent_Nexus</h2>
                <p className="text-xs text-muted-foreground font-body">Rank: Elite Operator | Level 24 | Clearance Level 4</p>
              </div>
              <div className="bg-primary/10 rounded-xl px-4 py-3 border border-primary/20 text-center min-w-[100px]">
                <div className="text-[10px] font-display tracking-widest text-primary/60 mb-1">XP_TOKEN</div>
                <div className="text-xl font-display text-primary">2,450</div>
              </div>
            </div>

            {/* XP Bar Evolution */}
            <div className="mb-10 relative">
              <div className="flex justify-between text-[8px] font-display tracking-widest mb-2 text-muted-foreground">
                <span>LVL 24</span>
                <span className="text-primary">82% TO LVL 25</span>
                <span>LVL 25</span>
              </div>
              <div className="h-4 rounded-full bg-primary/5 p-1 border border-primary/10 overflow-hidden group">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-glow-pulse relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
              {stats.map((s, i) => (
                <StatBar key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Avatar / HUD Diagnostics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="holographic-card rounded-2xl p-8 hud-border flex flex-col items-center justify-center text-center relative overflow-hidden group"
          >
            {/* Spinning decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity">
              <div className="w-64 h-64 border-2 border-primary rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-48 h-48 border border-dashed border-accent rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <div className="relative">
              <div className="w-40 h-40 rounded-full border border-primary/20 flex items-center justify-center mb-6 relative z-10 bg-primary/5 backdrop-blur-sm">
                <Zap className="w-16 h-16 text-primary animate-float neon-text-blue" />
                {/* HUD Targeting brackets around icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
              </div>
            </div>
            
            <h3 className="font-display tracking-[0.3em] text-xs mb-2 uppercase text-foreground">Biometric_Avatar</h3>
            <p className="text-[10px] text-muted-foreground font-body max-w-[200px]">Neural link initializing... 3D projection offline.</p>
            <Button variant="ghost" size="sm" className="mt-6 text-[8px] font-display tracking-widest text-primary hover:bg-primary/5 border border-primary/10">
              REBOOT_LINK
            </Button>
          </motion.div>
        </div>

        {/* Tactical Modules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Flame, label: "Streak_Count", value: "12_Days", accent: true },
            { icon: TrendingUp, label: "Neural_Cycles", value: "4_Sessions" },
            { icon: Calendar, label: "Total_Missions", value: "186_Units" },
            { icon: Clock, label: "Uptime_Avg", value: "42_Mins" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="holographic-card rounded-xl p-6 hud-border group hover:border-primary/40 transition-all"
            >
              <div className={`p-2 rounded-lg inline-block mb-4 ${item.accent ? "bg-accent/10 border border-accent/20" : "bg-primary/10 border border-primary/20"}`}>
                <item.icon className={`w-5 h-5 ${item.accent ? "text-accent" : "text-primary"}`} />
              </div>
              <div className="text-xl font-display tracking-wider mb-1">{item.value}</div>
              <div className="text-[9px] font-display tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary transition-colors">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="holographic-card rounded-2xl p-8 hud-border"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-sm tracking-[0.3em] uppercase">Tactical_Mission_Logs</h3>
            <span className="text-[10px] font-display text-muted-foreground tracking-widest">ACCESSING_ENCRYPTED_DATA...</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentWorkouts.map((w, i) => (
              <div key={w.name} className="flex flex-col p-5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-xs font-display tracking-widest text-primary/60 mb-2">OP_ID: 0{i+1}</div>
                  <div className="text-sm font-display tracking-widest mb-3 group-hover:text-primary transition-colors">{w.name.toUpperCase()}</div>
                  <div className="flex justify-between items-end mt-auto">
                    <div className="text-[10px] text-muted-foreground font-body">{w.date} // {w.time}</div>
                    <div className="text-xs font-display text-accent neon-text-green">{w.cal} KCAL</div>
                  </div>
                </div>
                {/* Background "Scan" line effect for card on hover */}
                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
