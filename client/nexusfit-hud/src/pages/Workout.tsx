import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Camera, Activity, Timer, Zap, AlertTriangle, CheckCircle } from "lucide-react";
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
      <div className="p-6 md:p-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-display tracking-widest text-destructive">LIVE SESSION</span>
          </div>
          <h1 className="font-display text-2xl tracking-widest">WORKOUT STUDIO</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Camera Viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass rounded-2xl hud-border overflow-hidden relative aspect-video"
          >
            {/* Simulated camera feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background flex items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground/30" />
            </div>

            {/* Skeletal overlay */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={landmarks[a].x} y1={landmarks[a].y}
                  x2={landmarks[b].x} y2={landmarks[b].y}
                  stroke="hsl(192, 100%, 50%)"
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                />
              ))}
              {landmarks.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x} cy={p.y} r="1.2"
                  fill="hsl(100, 100%, 55%)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                />
              ))}
            </svg>

            {/* HUD Overlays */}
            <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2 hud-border">
              <div className="text-[10px] font-display tracking-widest text-muted-foreground">EXERCISE</div>
              <div className="text-sm font-display text-primary">BARBELL SQUAT</div>
            </div>

            <div className="absolute top-4 right-4 glass rounded-lg px-3 py-2 hud-border">
              <div className="text-[10px] font-display tracking-widest text-muted-foreground">FORM</div>
              <div className="text-lg font-display text-accent neon-text-green">97%</div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-3 hud-border">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-display text-primary neon-text-blue">8</div>
                  <div className="text-[8px] font-display tracking-widest text-muted-foreground">REPS</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-display text-foreground">12</div>
                  <div className="text-[8px] font-display tracking-widest text-muted-foreground">TARGET</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Timer */}
            <div className="glass rounded-xl p-5 hud-border text-center">
              <Timer className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-3xl font-display tracking-widest text-primary neon-text-blue">12:45</div>
              <div className="text-[10px] font-display tracking-widest text-muted-foreground mt-1">ELAPSED</div>
            </div>

            {/* Form Gauge */}
            <div className="glass rounded-xl p-5 hud-border">
              <h4 className="text-[10px] font-display tracking-widest text-muted-foreground mb-3">FORM ACCURACY</h4>
              <div className="relative w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(240, 15%, 18%)" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="hsl(100, 100%, 55%)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.03 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-display text-accent">97%</span>
                </div>
              </div>
            </div>

            {/* Form Feedback */}
            <div className="glass rounded-xl p-4 hud-border space-y-2">
              <h4 className="text-[10px] font-display tracking-widest text-muted-foreground mb-2">LIVE FEEDBACK</h4>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                <span>Depth: Excellent</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                <span>Knee tracking: Good</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
                <span>Back angle: Watch form</span>
              </div>
            </div>

            <Button className="w-full font-display tracking-widest text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 py-5">
              END SESSION
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
