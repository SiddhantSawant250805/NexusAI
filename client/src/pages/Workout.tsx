import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Camera, Activity, Timer, Zap, AlertTriangle, CheckCircle, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const landmarks = [
  { x: 50, y: 15 }, { x: 42, y: 30 }, { x: 58, y: 30 }, { x: 35, y: 50 },
  { x: 65, y: 50 }, { x: 50, y: 55 }, { x: 42, y: 70 }, { x: 58, y: 70 },
  { x: 38, y: 90 }, { x: 62, y: 90 },
];

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5], [5, 6], [5, 7], [6, 8], [7, 9],
];

export default function Workout() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header with Live Status */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse shadow-[0_0_10px_hsl(var(--destructive))]" />
                <div className="absolute inset-0 bg-destructive/20 blur-md rounded-full animate-ping" />
              </div>
              <span className="text-[10px] font-display tracking-[0.3em] text-destructive uppercase">Optical_Protocol: ACTIVE // Session_Log: 4A-92</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl tracking-[-0.02em] font-black uppercase">
              Workout_<span className="text-primary neon-text-blue">Studio</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-card/40 backdrop-blur-md px-5 py-3 rounded-xl border border-border/50 text-center">
              <div className="text-[8px] font-display tracking-widest text-muted-foreground uppercase mb-1">FPS</div>
              <div className="text-lg font-display text-primary">60.0</div>
            </div>
            <div className="bg-card/40 backdrop-blur-md px-5 py-3 rounded-xl border border-border/50 text-center">
              <div className="text-[8px] font-display tracking-widest text-muted-foreground uppercase mb-1">LATENCY</div>
              <div className="text-lg font-display text-accent">14MS</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Camera Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-3 h-full relative"
          >
            <div className="holographic-card rounded-3xl hud-border overflow-hidden relative aspect-video shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Simulated camera feed with noise effect */}
              <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-primary/10 animate-pulse" />
                </div>
              </div>

              {/* Advanced Skeletal overlay */}
              <svg className="absolute inset-0 w-full h-full p-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {connections.map(([a, b], i) => (
                  <motion.line
                    key={i}
                    x1={landmarks[a].x} y1={landmarks[a].y}
                    x2={landmarks[b].x} y2={landmarks[b].y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 + i * 0.05 }}
                  />
                ))}
                {landmarks.map((p, i) => (
                  <motion.g key={i}>
                    <motion.circle
                      cx={p.x} cy={p.y} r="2"
                      fill="hsl(var(--accent))"
                      fillOpacity="0.1"
                      animate={{ r: [2, 3, 2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                      cx={p.x} cy={p.y} r="0.8"
                      fill="hsl(var(--accent))"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      className="shadow-[0_0_10px_hsl(var(--accent))]"
                    />
                  </motion.g>
                ))}
              </svg>

              {/* HUD Elements */}
              <div className="absolute top-8 left-8 space-y-4">
                <div className="glass-strong rounded-xl px-5 py-3 hud-border">
                  <div className="text-[8px] font-display tracking-[0.3em] text-primary/60 mb-1 uppercase">Exercise_Profile</div>
                  <div className="text-sm font-display tracking-widest text-foreground uppercase">Barbell_Squat // Protocol_Alpha</div>
                </div>
                <div className="glass-strong rounded-xl px-5 py-3 border-accent/20">
                  <div className="text-[8px] font-display tracking-[0.3em] text-accent/60 mb-1 uppercase">Acquisition_Confidence</div>
                  <div className="text-xl font-display text-accent neon-text-green">99.8%</div>
                </div>
              </div>

              {/* Central Counter HUD */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-6 h-24">
                <div className="h-full w-px bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="glass-strong rounded-2xl px-12 py-6 border-primary/30 relative group mb-2">
                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <motion.div 
                        key="reps"
                        initial={{ scale: 1.2, color: "#fff" }}
                        animate={{ scale: 1, color: "hsl(var(--primary))" }}
                        className="text-6xl font-display font-black leading-none"
                      >
                        12
                      </motion.div>
                      <div className="text-[8px] font-display tracking-[0.4em] text-muted-foreground mt-2">REPS_COUNT</div>
                    </div>
                    <div className="text-center opacity-40">
                      <div className="text-3xl font-display font-black leading-none">15</div>
                      <div className="text-[8px] font-display tracking-[0.4em] text-muted-foreground mt-2">GOAL_UNIT</div>
                    </div>
                  </div>
                  {/* Background progress fill */}
                  <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full rounded-b-2xl overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary neon-glow-blue" 
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="h-full w-px bg-gradient-to-t from-primary/50 to-transparent" />
              </div>
            </div>

            {/* Live Telemetry Bar */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {[
                { label: "Stability", val: 88, color: "bg-primary" },
                { label: "Eccentric", val: 92, color: "bg-primary" },
                { label: "Explosive", val: 78, color: "bg-accent" },
                { label: "Depth", val: 95, color: "bg-accent" },
              ].map(t => (
                <div key={t.label} className="holographic-card rounded-xl p-4 border-border/40">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-display tracking-widest text-muted-foreground uppercase">{t.label}</span>
                    <span className="text-[10px] font-display text-foreground">{t.val}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${t.val}%` }} className={`h-full ${t.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Session Timer */}
            <div className="holographic-card rounded-2xl p-6 hud-border text-center overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Timer className="w-5 h-5 text-primary mx-auto mb-4 relative z-10" />
              <div className="text-5xl font-display font-black tracking-widest text-foreground relative z-10 neon-text-blue">12:45</div>
              <div className="text-[10px] font-display tracking-[0.4em] text-muted-foreground mt-2 relative z-10">ELAPSED_RUNTIME</div>
            </div>

            {/* Kinetic Energy Meter */}
            <div className="holographic-card rounded-2xl p-6 hud-border">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h4 className="text-[10px] font-display tracking-[0.3em] uppercase">Kinetic_Power</h4>
              </div>
              <div className="relative w-40 h-40 mx-auto">
                {/* SVG Radial Gauge */}
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary)/0.1)" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.15 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="shadow-[0_0_10px_hsl(var(--primary))]"
                  />
                  <motion.circle
                    cx="50" cy="50" r="32" fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={201}
                    initial={{ strokeDashoffset: 201 }}
                    animate={{ strokeDashoffset: 201 * 0.3 }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-black text-foreground">845</span>
                  <span className="text-[8px] font-display tracking-widest text-muted-foreground">WATTS</span>
                </div>
              </div>
            </div>

            {/* Neural Feedback Loop */}
            <div className="holographic-card rounded-2xl p-6 hud-border space-y-4">
              <h4 className="text-[10px] font-display tracking-[0.3em] text-muted-foreground mb-4 uppercase">Neural_Feedback_Stream</h4>
              {[
                { label: "Depth_Optimal", status: "STABLE", icon: CheckCircle, color: "text-accent" },
                { label: "Knee_Alignment", status: "OPTIMAL", icon: CheckCircle, color: "text-accent" },
                { label: "Torso_Stability", status: "SKEW_DETECTED", icon: AlertTriangle, color: "text-yellow-500" },
              ].map((f, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  key={f.label} 
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <f.icon className={`w-3.5 h-3.5 ${f.color}`} />
                    <span className="text-[10px] font-display tracking-wider uppercase">{f.label}</span>
                  </div>
                  <span className={`text-[8px] font-display p-1 rounded ${f.color} bg-white/5`}>{f.status}</span>
                </motion.div>
              ))}
            </div>

            <Button className="w-full font-display tracking-[0.3em] text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90 py-8 relative group overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.2)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                TERMINATE_PROTOCOL <Zap className="w-3 h-3" />
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
