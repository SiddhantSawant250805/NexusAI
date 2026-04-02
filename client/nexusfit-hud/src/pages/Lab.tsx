import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Zap, Target, Dumbbell, Apple, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StepProps {
  onNext: () => void;
  onPrev: () => void;
}

const goals = ["Build Muscle", "Lose Fat", "Increase Endurance", "Get Stronger", "Improve Flexibility", "Athletic Performance"];
const equipment = ["Full Gym", "Dumbbells Only", "Bodyweight", "Resistance Bands", "Kettlebells", "Home Gym"];
const allergies = ["None", "Gluten", "Dairy", "Nuts", "Shellfish", "Soy", "Eggs"];
const experience = ["Beginner", "Intermediate", "Advanced", "Elite"];

function StepBiometrics({ onNext }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Ruler className="w-6 h-6 text-primary" />
        <h3 className="font-display text-lg tracking-widest">BIOMETRICS</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-display tracking-widest text-muted-foreground mb-2 block">HEIGHT (CM)</label>
          <Input defaultValue="178" className="bg-input border-border/50 focus:border-primary font-body" />
        </div>
        <div>
          <label className="text-xs font-display tracking-widest text-muted-foreground mb-2 block">WEIGHT (KG)</label>
          <Input defaultValue="82" className="bg-input border-border/50 focus:border-primary font-body" />
        </div>
        <div>
          <label className="text-xs font-display tracking-widest text-muted-foreground mb-2 block">AGE</label>
          <Input defaultValue="28" className="bg-input border-border/50 focus:border-primary font-body" />
        </div>
        <div>
          <label className="text-xs font-display tracking-widest text-muted-foreground mb-2 block">BODY FAT %</label>
          <Input defaultValue="18" className="bg-input border-border/50 focus:border-primary font-body" />
        </div>
      </div>
      <Button onClick={onNext} className="w-full font-display tracking-widest text-sm bg-primary text-primary-foreground py-5 group">
        NEXT <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

function StepSelection({ onNext, onPrev, title, icon: Icon, items }: StepProps & { title: string; icon: any; items: string[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (item: string) => setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="font-display text-lg tracking-widest">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map(item => (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selected.includes(item)
                ? "bg-primary/20 text-primary border border-primary/50 neon-glow-blue"
                : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 font-display tracking-widest text-sm border-border/50 py-5">
          <ChevronLeft className="w-4 h-4 mr-2" /> BACK
        </Button>
        <Button onClick={onNext} className="flex-1 font-display tracking-widest text-sm bg-primary text-primary-foreground py-5 group">
          NEXT <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

function StepExperience({ onNext, onPrev }: StepProps) {
  const [selected, setSelected] = useState("");
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-primary" />
        <h3 className="font-display text-lg tracking-widest">EXPERIENCE LEVEL</h3>
      </div>
      <div className="space-y-3">
        {experience.map(level => (
          <button
            key={level}
            onClick={() => setSelected(level)}
            className={`w-full p-4 rounded-lg text-left text-sm font-medium transition-all ${
              selected === level
                ? "bg-primary/20 text-primary border border-primary/50 neon-glow-blue"
                : "glass border border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1 font-display tracking-widest text-sm border-border/50 py-5">
          <ChevronLeft className="w-4 h-4 mr-2" /> BACK
        </Button>
        <Button onClick={onNext} className="flex-1 font-display tracking-widest text-sm bg-primary text-primary-foreground py-5 group">
          COMPLETE <Zap className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function Lab() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const totalSteps = 5;

  const next = () => {
    if (step >= totalSteps - 1) {
      navigate("/dashboard");
    } else {
      setStep(s => s + 1);
    }
  };
  const prev = () => setStep(s => Math.max(0, s - 1));

  const steps = [
    <StepBiometrics onNext={next} onPrev={prev} />,
    <StepSelection onNext={next} onPrev={prev} title="MISSION GOALS" icon={Target} items={goals} />,
    <StepSelection onNext={next} onPrev={prev} title="EQUIPMENT" icon={Dumbbell} items={equipment} />,
    <StepSelection onNext={next} onPrev={prev} title="ALLERGIES" icon={Apple} items={allergies} />,
    <StepExperience onNext={next} onPrev={prev} />,
  ];

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl tracking-widest text-primary neon-text-blue mb-2">THE LAB</h2>
          <p className="text-sm text-muted-foreground">Calibrating your Fitness DNA</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? "bg-primary neon-glow-blue" : "bg-border"
              }`}
            />
          ))}
        </div>

        <div className="glass rounded-2xl p-8 hud-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 font-display tracking-widest">
          STEP {step + 1} OF {totalSteps}
        </p>
      </div>
    </div>
  );
}
