import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { BookOpen, Clock, Zap, Dumbbell, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const workouts = [
  { name: "Upper Body Assault", duration: "45 min", difficulty: "Hard", equipment: ["Barbell", "Dumbbells"], muscles: ["Chest", "Shoulders", "Triceps"] },
  { name: "HIIT Inferno", duration: "30 min", difficulty: "Extreme", equipment: ["Bodyweight", "Kettlebell"], muscles: ["Full Body"] },
  { name: "Leg Day Protocol", duration: "55 min", difficulty: "Hard", equipment: ["Squat Rack", "Leg Press"], muscles: ["Quads", "Hamstrings", "Glutes"] },
  { name: "Core Destroyer", duration: "25 min", difficulty: "Medium", equipment: ["Bodyweight", "Ab Wheel"], muscles: ["Core", "Obliques"] },
  { name: "Pull Power", duration: "40 min", difficulty: "Hard", equipment: ["Pull-up Bar", "Cable Machine"], muscles: ["Back", "Biceps"] },
  { name: "Mobility Flow", duration: "20 min", difficulty: "Easy", equipment: ["Bodyweight", "Band"], muscles: ["Full Body"] },
];

const difficultyColor: Record<string, string> = {
  Easy: "text-accent border-accent/30 bg-accent/10",
  Medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Hard: "text-primary border-primary/30 bg-primary/10",
  Extreme: "text-destructive border-destructive/30 bg-destructive/10",
};

export default function Library() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-widest mb-1">WORKOUT LIBRARY</h1>
            <p className="text-sm text-muted-foreground">AI-generated protocols</p>
          </div>
          <Button variant="outline" size="sm" className="font-display tracking-widest text-xs border-border/50">
            <Filter className="w-3.5 h-3.5 mr-2" /> FILTER
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass rounded-xl p-5 hud-border hover:border-primary/40 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className={`text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full border ${difficultyColor[w.difficulty]}`}>
                  {w.difficulty.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display text-sm tracking-widest mb-2 group-hover:text-primary transition-colors">{w.name}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{w.duration}</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{w.muscles.join(", ")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {w.equipment.map(e => (
                  <span key={e} className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
