import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ChevronRight, Activity, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Activity, title: "Computer Vision", desc: "Real-time form tracking with AI skeletal overlays" },
  { icon: Brain, title: "Adaptive AI", desc: "Workouts that evolve with your performance DNA" },
  { icon: Shield, title: "Gamified Progress", desc: "RPG-style leveling, leaderboards & achievements" },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-mesh relative overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
        <div className="w-full h-px bg-primary animate-scan-line" />
      </div>
      <div className="absolute inset-0 parallax-grid opacity-[0.3] pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Zap className="w-8 h-8 text-primary group-hover:neon-text-blue transition-all" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform" />
          </div>
          <span className="font-display text-xl tracking-[0.3em] text-primary neon-text-blue uppercase">Nexus_Fit</span>
        </div>
        <div className="flex gap-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="font-display tracking-[0.2em] text-[10px] text-muted-foreground hover:text-primary hover:bg-primary/5">
              ACCESS_LOGIN
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button size="sm" className="font-display tracking-[0.2em] text-[10px] bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue px-6">
              ENLIST_RECRUIT
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 md:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl relative"
        >
          {/* Decorative HUD brackets */}
          <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-3 bg-accent/5 backdrop-blur-md border border-accent/20 rounded-full px-5 py-2 mb-10 scanning-effect">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(100,255,100,0.8)]" />
            <span className="text-[10px] font-display tracking-[0.3em] uppercase text-accent neon-text-green">
              SYSTEM_STATUS: BIO_SYNC_ACTIVE
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-8xl font-black tracking-[-0.02em] leading-[0.9] mb-8 uppercase">
            <span className="text-foreground/90">Transcend_Your</span>
            <br />
            <span className="text-primary neon-text-blue inline-block mt-2">Limits_OS</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-body">
            Molecular-precision computer vision fused with adaptive bio-feedback.
            Initialize your performance evolution with the Nexus Performance OS.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Link to="/lab">
              <Button size="lg" className="font-display tracking-[0.2em] text-xs bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue px-10 py-8 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  INITIALIZE_LAB <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="font-display tracking-[0.2em] text-xs border-primary/20 text-primary hover:bg-primary/10 px-10 py-8 backdrop-blur-sm">
                VIEW_TELEMETRY
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tactical HUD Overlays - Using absolute positioning within section */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[5%]"
          >
            <div className="holographic-card p-4 w-48 hud-border pointer-events-auto">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[8px] font-display tracking-widest text-primary/60">BIO_SIGNAL</div>
                <Activity className="w-3 h-3 text-primary animate-pulse" />
              </div>
              <div className="text-3xl font-display text-primary mb-1">142</div>
              <div className="text-[10px] font-display text-muted-foreground">BPM_INTENSITY</div>
              <div className="mt-3 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["20%", "80%", "40%", "90%"] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" 
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 right-[5%]"
          >
            <div className="holographic-card p-4 w-48 hud-border pointer-events-auto">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[8px] font-display tracking-widest text-accent/60">SYNAPSE_LOAD</div>
                <Brain className="w-3 h-3 text-accent" />
              </div>
              <div className="text-3xl font-display text-accent mb-1">94.8%</div>
              <div className="text-[10px] font-display text-muted-foreground">AI_SYNERGY</div>
              <svg className="w-full h-8 mt-2" viewBox="0 0 100 20">
                <motion.path
                  d="M0 10 Q 25 5, 50 10 T 100 10"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  animate={{ d: ["M0 10 Q 25 5, 50 10 T 100 10", "M0 10 Q 25 15, 50 10 T 100 10", "M0 10 Q 25 5, 50 10 T 100 10"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="relative z-10 px-6 md:px-12 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="holographic-card group p-8 hud-border hover:border-primary/40 transition-all cursor-crosshair"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-primary/20">
                <f.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-display text-base tracking-[0.2em] uppercase text-foreground mb-4">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body group-hover:text-foreground transition-colors">
                {f.desc}
              </p>
              <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-display tracking-widest text-primary/40">MODULE_0{i+1}</span>
                <Shield className="w-4 h-4 text-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
