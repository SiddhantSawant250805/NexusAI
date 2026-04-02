import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { UtensilsCrossed, Camera, ChevronLeft, ChevronRight, Flame, Droplets, Zap as Lightning } from "lucide-react";
import { Button } from "@/components/ui/button";

const meals = [
  { name: "Grilled Salmon Bowl", cal: 520, protein: 42, carbs: 38, fat: 22, tags: ["High Protein", "Omega-3"] },
  { name: "Chicken Quinoa Power", cal: 480, protein: 45, carbs: 42, fat: 15, tags: ["Lean", "Meal Prep"] },
  { name: "Vegan Buddha Bowl", cal: 410, protein: 18, carbs: 55, fat: 16, tags: ["Plant-Based", "Fiber Rich"] },
  { name: "Steak & Sweet Potato", cal: 620, protein: 48, carbs: 45, fat: 28, tags: ["Bulking", "Iron Rich"] },
  { name: "Greek Yogurt Parfait", cal: 320, protein: 28, carbs: 35, fat: 10, tags: ["Snack", "Probiotics"] },
];

export default function Nutrition() {
  const [current, setCurrent] = useState(0);

  const nextCard = () => setCurrent(i => (i + 1) % meals.length);
  const prevCard = () => setCurrent(i => (i - 1 + meals.length) % meals.length);

  const meal = meals[current];

  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl tracking-widest mb-1">NUTRITION LAB</h1>
          <p className="text-sm text-muted-foreground">AI-optimized meal protocols</p>
        </motion.div>

        {/* Meal Card Stack */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-sm h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 glass rounded-2xl hud-border p-6 flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-display tracking-widest text-muted-foreground">
                      MEAL {current + 1} OF {meals.length}
                    </span>
                  </div>

                  <h2 className="font-display text-xl tracking-widest mb-4">{meal.name}</h2>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center glass rounded-lg p-3">
                      <Flame className="w-4 h-4 text-accent mx-auto mb-1" />
                      <div className="text-lg font-display">{meal.cal}</div>
                      <div className="text-[9px] font-display tracking-widest text-muted-foreground">KCAL</div>
                    </div>
                    <div className="text-center glass rounded-lg p-3">
                      <Lightning className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-lg font-display">{meal.protein}g</div>
                      <div className="text-[9px] font-display tracking-widest text-muted-foreground">PROTEIN</div>
                    </div>
                    <div className="text-center glass rounded-lg p-3">
                      <Droplets className="w-4 h-4 text-neon-purple mx-auto mb-1" />
                      <div className="text-lg font-display">{meal.carbs}g</div>
                      <div className="text-[9px] font-display tracking-widest text-muted-foreground">CARBS</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-display tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={prevCard} className="flex-1 font-display tracking-widest text-xs border-border/50 py-4">
                    <ChevronLeft className="w-4 h-4 mr-1" /> SKIP
                  </Button>
                  <Button onClick={nextCard} className="flex-1 font-display tracking-widest text-xs bg-accent text-accent-foreground hover:bg-accent/90 neon-glow-green py-4">
                    ADD <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fridge Scanner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 hud-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-primary" />
            <h3 className="font-display text-sm tracking-widest">FRIDGE SCANNER</h3>
          </div>
          <div className="aspect-video rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-display tracking-wider">Tap to scan your ingredients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
