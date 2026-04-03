import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { BookOpen, Clock, Zap, Dumbbell, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const difficultyColor: Record<string, string> = {
  Easy: "text-accent border-accent/30 bg-accent/10",
  Medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Hard: "text-primary border-primary/30 bg-primary/10",
  Extreme: "text-destructive border-destructive/30 bg-destructive/10",
};

export default function Library() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/templates');
        if (response.data.success) {
          setTemplates(response.data.templates);
        }
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-widest mb-1 uppercase">Workout Library</h1>
            <p className="text-sm text-muted-foreground uppercase">AI-generated protocols</p>
          </div>
          <Button variant="outline" size="sm" className="font-display tracking-widest text-xs border-border/50">
            <Filter className="w-3.5 h-3.5 mr-2" /> FILTER
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-display tracking-widest text-muted-foreground uppercase animate-pulse">Accessing_Encrypted_Protocols...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {templates.map((w, i) => (
                <motion.div
                  key={w._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-5 hud-border hover:border-primary/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className={`text-[10px] font-display tracking-widest px-2 py-0.5 rounded-full border ${difficultyColor[w.difficulty] || difficultyColor.Hard}`}>
                      {w.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-sm tracking-widest mb-2 group-hover:text-primary transition-colors uppercase">{w.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1 uppercase"><Clock className="w-3 h-3" />{w.duration}</span>
                    <span className="flex items-center gap-1 uppercase"><Zap className="w-3 h-3" />{w.muscles.join(", ")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {w.equipment.map((e: string) => (
                      <span key={e} className="text-[10px] font-display tracking-widest px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                        {e}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
