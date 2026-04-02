import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Award, Star, Zap, Shield, Target, Lock, Crown, Gem, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

const collectibles = [
  { id: 1, name: "Iron_Synthesizer", rarity: "LEGENDARY", icon: Trophy, color: "text-secondary", glow: "shadow-[0_0_20px_hsl(var(--accent)/0.4)]" },
  { id: 2, name: "Neural_Link_Master", rarity: "EPIC", icon: Zap, color: "text-primary", glow: "shadow-[0_0_15px_hsl(var(--primary)/0.3)]" },
  { id: 3, name: "Endurance_Matrix", rarity: "RARE", icon: Shield, color: "text-blue-400", glow: "shadow-[0_0_10px_rgba(0,100,255,0.2)]" },
  { id: 4, name: "Precision_Strike", rarity: "UNCOMMON", icon: Target, color: "text-primary/60", glow: "none" },
  { id: 5, name: "Caloric_Warden", rarity: "COMMON", icon: Star, color: "text-muted-foreground", glow: "none" },
  { id: 6, name: "Elite_Operator", rarity: "MYTHIC", icon: Crown, color: "text-purple-500", glow: "shadow-[0_0_25px_rgba(180,0,255,0.4)]" },
];

export default function Vault() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Gem className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">Asset_Inventory // Personal_Vault</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl tracking-[-0.02em] font-black uppercase">
            Personal_<span className="text-primary neon-text-blue">Vault</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Collection Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {collectibles.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`holographic-card rounded-2xl p-8 hud-border group cursor-pointer relative overflow-hidden transition-all hover:scale-[1.02] ${c.glow}`}
              >
                {/* Rarity BG glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-[0.05] pointer-events-none ${c.color.replace("text", "bg")}`} />
                
                <div className="relative z-10 text-center">
                  <div className={`w-24 h-24 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto mb-6 relative group-hover:border-primary/30 transition-colors ${c.color}`}>
                    <c.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    {/* Animated orbit for higher rarities */}
                    {["LEGENDARY", "MYTHIC"].includes(c.rarity) && (
                      <div className="absolute inset-0 border border-dashed border-current/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    )}
                  </div>
                  <div className={`text-[8px] font-display tracking-[0.4em] mb-2 uppercase ${c.color}`}>{c.rarity}</div>
                  <h3 className="font-display text-xs tracking-[0.2em] uppercase text-foreground mb-4">{c.name}</h3>
                  <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5 + i * 0.1 }} className={`h-full ${c.color.replace("text", "bg")}`} />
                  </div>
                  <div className="text-[10px] font-display text-muted-foreground tracking-widest uppercase">SYNERGY_UNLOCKED</div>
                </div>
              </motion.div>
            ))}
            
            {/* Locked Badge */}
            <div className="holographic-card rounded-2xl p-8 hud-border opacity-50 grayscale flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-[8px] font-display tracking-[0.4em] mb-2 uppercase text-muted-foreground">UNKNOWN_RARITY</div>
              <h3 className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">LOCKED_PROTOCOL</h3>
              <p className="mt-4 text-[8px] font-display tracking-widest text-muted-foreground">COMPLETE_CYCLE_02_TO_DECRYPT</p>
            </div>
          </div>

          {/* Side Module: Vault Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="holographic-card rounded-2xl p-8 hud-border"
            >
              <h3 className="font-display text-[10px] tracking-[0.3em] uppercase mb-8 text-primary">Archive_Summary</h3>
              <div className="space-y-6">
                {[
                  { label: "Total_Collectibles", val: "14 / 50" },
                  { label: "Mythic_Yield", val: "02 / 05" },
                  { label: "Sync_Efficiency", val: "94.8%" },
                  { label: "Vault_Clearance", val: "LVL_4" },
                ].map(s => (
                  <div key={s.label} className="border-b border-border/30 pb-4 group cursor-pointer">
                    <div className="text-[7px] font-display tracking-widest text-muted-foreground uppercase group-hover:text-primary transition-colors mb-1">{s.label}</div>
                    <div className="text-xl font-display tracking-wider text-foreground">{s.val}</div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 py-8 font-display tracking-[0.3em] text-[10px]">
                EXPORT_PDF_CERT
              </Button>
            </motion.div>

            {/* Recent Acquisitions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="holographic-card rounded-2xl p-8 hud-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <Medal className="w-4 h-4 text-accent" />
                <h3 className="font-display text-[10px] tracking-[0.3em] uppercase">Session_Loot</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Alpha_Badge", time: "2m ago" },
                  { name: "Beta_Link", time: "1h ago" },
                ].map(l => (
                  <div key={l.name} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group hover:border-primary/30 transition-colors">
                    <span className="text-[10px] font-display text-foreground group-hover:text-primary">{l.name.toUpperCase()}</span>
                    <span className="text-[8px] font-display text-muted-foreground">{l.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
