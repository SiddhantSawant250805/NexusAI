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
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="w-full h-px bg-primary animate-scan-line" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <Zap className="w-7 h-7 text-primary" />
          <span className="font-display text-lg tracking-widest text-primary neon-text-blue">NEXUSFIT</span>
        </div>
        <div className="flex gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="font-display tracking-wider text-xs text-muted-foreground hover:text-primary">
              LOGIN
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button size="sm" className="font-display tracking-wider text-xs bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue">
              ENLIST
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 md:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-neon" />
            <span className="text-xs font-display tracking-widest uppercase text-accent neon-text-green">
              AI-Powered • Real-Time CV
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            <span className="text-foreground">THE FUTURE OF</span>
            <br />
            <span className="text-primary neon-text-blue">AI COACHING</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Military-grade computer vision meets adaptive AI training.
            Every rep tracked. Every form corrected. Every limit destroyed.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/lab">
              <Button size="lg" className="font-display tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue px-8 py-6 group">
                ENTER THE LAB
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="font-display tracking-widest text-sm border-primary/30 text-primary hover:bg-primary/10 px-8 py-6">
                VIEW DEMO
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating HUD elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-1/4 left-8 hidden lg:block"
        >
          <div className="glass rounded-lg p-3 hud-border animate-float">
            <div className="text-[10px] font-display tracking-widest text-muted-foreground mb-1">FORM ACCURACY</div>
            <div className="text-2xl font-display text-accent neon-text-green">97.3%</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-1/3 right-8 hidden lg:block"
        >
          <div className="glass rounded-lg p-3 hud-border animate-float" style={{ animationDelay: "1s" }}>
            <div className="text-[10px] font-display tracking-widest text-muted-foreground mb-1">REPS COUNTED</div>
            <div className="text-2xl font-display text-primary neon-text-blue">12/15</div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 pb-32">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              className="glass rounded-xl p-6 hud-border hover:border-primary/50 transition-all group"
            >
              <f.icon className="w-8 h-8 text-primary mb-4 group-hover:neon-text-blue transition-all" />
              <h3 className="font-display text-sm tracking-widest uppercase text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
