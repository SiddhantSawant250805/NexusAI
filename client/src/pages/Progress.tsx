import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Award, Target, Zap, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", strength: 65, endurance: 40, agility: 55 },
  { name: "Tue", strength: 68, endurance: 45, agility: 58 },
  { name: "Wed", strength: 75, endurance: 52, agility: 62 },
  { name: "Thu", strength: 72, endurance: 58, agility: 65 },
  { name: "Fri", strength: 80, endurance: 65, agility: 70 },
  { name: "Sat", strength: 85, endurance: 75, agility: 75 },
  { name: "Sun", strength: 90, endurance: 82, agility: 80 },
];

const achievements = [
  { id: 1, title: "Iron Synthesis", desc: "Completed 10 strength protocols", icon: Zap, date: "2 days ago" },
  { id: 2, title: "Neural Link", desc: "Maintained 95%+ form for 5 sessions", icon: Target, date: "Yesterday" },
  { id: 3, title: "Quantum Pulse", desc: "Burned 5000 kcal in a single cycle", icon: Activity, date: "Just now" },
];

export default function Progress() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">Analytics_Engine // Bio_Data_Visualizer</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl tracking-[-0.02em] font-black uppercase">
            Progress_<span className="text-secondary neon-text-green">Telemetry</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 holographic-card rounded-2xl p-8 hud-border min-h-[450px] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display text-sm tracking-[0.2em] uppercase">Performance_Growth</h3>
                <p className="text-[10px] text-muted-foreground font-body">Cross-metric progression via Neural Link</p>
              </div>
              <div className="flex gap-2">
                {["7D", "30D", "ALL"].map(t => (
                  <button key={t} className={`px-3 py-1 rounded text-[8px] font-display tracking-widest border transition-all ${
                    t === "7D" ? "bg-primary/20 text-primary border-primary/40" : "bg-card border-border/50 text-muted-foreground hover:text-foreground"
                  }`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEndurance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.2)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    fontFamily="Space Grotesk" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    fontFamily="Space Grotesk" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontFamily: "Space Grotesk", fontSize: "10px" }}
                    itemStyle={{ color: "hsl(var(--primary))" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="strength" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorStrength)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="endurance" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorEndurance)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex justify-around border-t border-border/30 pt-6">
              {[
                { label: "Avg_Intensity", val: "84%", icon: Zap },
                { label: "Total_Output", val: "1250T", icon: TrendingUp },
                { label: "Consistency", val: "94/100", icon: Calendar },
              ].map(s => (
                <div key={s.label} className="text-center group">
                  <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-2" />
                  <div className="text-lg font-display text-foreground">{s.val}</div>
                  <div className="text-[8px] font-display tracking-widest text-muted-foreground uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements & Milestones */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="holographic-card rounded-2xl p-8 hud-border"
            >
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm tracking-[0.2em] uppercase">Neural_Milestones</h3>
              </div>
              <div className="space-y-6">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/5 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/10 transition-colors shrink-0">
                      <a.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 border-b border-border/30 pb-4 group-last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[10px] font-display tracking-widest uppercase text-foreground">{a.title.replace(" ", "_")}</h4>
                        <span className="text-[8px] font-display text-muted-foreground">{a.date}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-body leading-tight group-hover:text-foreground transition-colors">{a.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 font-display tracking-[0.2em] text-[10px] border-secondary/20 text-secondary hover:bg-secondary/5 py-6">
                VIEW_ALL_PROTOCOLS
              </Button>
            </motion.div>

            {/* Weekly Volume Pulse */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="holographic-card rounded-2xl p-8 hud-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-display text-sm tracking-[0.2em] uppercase">Volume_Distribution</h3>
              </div>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar dataKey="strength" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.6} />
                    <Bar dataKey="agility" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between text-[8px] font-display tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> STRENGTH</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> AGILITY</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
