import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { TrendingUp, Activity, BarChart3, Calendar } from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 92 },
  { day: "Wed", value: 78 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 0 },
];

const muscleGroups = [
  { name: "Chest", intensity: 85, color: "bg-primary" },
  { name: "Back", intensity: 72, color: "bg-primary" },
  { name: "Shoulders", intensity: 60, color: "bg-accent" },
  { name: "Arms", intensity: 90, color: "bg-primary" },
  { name: "Core", intensity: 55, color: "bg-accent" },
  { name: "Legs", intensity: 78, color: "bg-neon-purple" },
  { name: "Glutes", intensity: 45, color: "bg-neon-purple" },
];

export default function Progress() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl tracking-widest mb-1">PROGRESS & ANALYTICS</h1>
          <p className="text-sm text-muted-foreground">Performance intelligence dashboard</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Avg Accuracy", value: "93.2%", trend: "+2.1%" },
            { icon: BarChart3, label: "Total Volume", value: "48,200 kg", trend: "+8%" },
            { icon: TrendingUp, label: "PR Count", value: "7", trend: "+3" },
            { icon: Calendar, label: "Consistency", value: "86%", trend: "+5%" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass rounded-xl p-4 hud-border"
            >
              <item.icon className="w-5 h-5 text-primary mb-2" />
              <div className="text-lg font-display">{item.value}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">{item.label}</span>
                <span className="text-[10px] text-accent">{item.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Accuracy Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 hud-border"
        >
          <h3 className="font-display text-sm tracking-widest mb-6">FORM ACCURACY — THIS WEEK</h3>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${d.value}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                  className={`w-full rounded-t-md ${d.value > 0 ? "bg-gradient-to-t from-primary/50 to-primary" : "bg-border"}`}
                />
                <span className="text-[10px] font-display tracking-widest text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Muscle Group Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 hud-border"
        >
          <h3 className="font-display text-sm tracking-widest mb-6">MUSCLE GROUP HEATMAP</h3>
          <div className="space-y-3">
            {muscleGroups.map((mg, i) => (
              <div key={mg.name} className="flex items-center gap-4">
                <span className="w-20 text-xs font-display tracking-widest text-muted-foreground">{mg.name}</span>
                <div className="flex-1 h-6 rounded-md bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mg.intensity}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                    className={`h-full rounded-md ${mg.color}`}
                    style={{ opacity: 0.3 + (mg.intensity / 100) * 0.7 }}
                  />
                </div>
                <span className="text-xs font-display w-10 text-right">{mg.intensity}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
