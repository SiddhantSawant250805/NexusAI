import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Award, Star, Zap, Shield, Target, Lock, Crown, Gem, Medal, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const iconMap: Record<string, any> = {
  Trophy, Award, Star, Zap, Shield, Target, Crown, Gem, Medal
};

const rarityColors: Record<string, string> = {
  LEGENDARY: "text-secondary",
  EPIC: "text-primary",
  RARE: "text-blue-400",
  UNCOMMON: "text-primary/60",
  COMMON: "text-muted-foreground",
  MYTHIC: "text-purple-500",
};

interface Collectible {
  _id: string;
  name: string;
  rarity: string;
  icon: string;
  synergy: string;
}

interface VaultSummary {
  totalCollectibles: number;
  mythicYield: number;
  legendaryYield: number;
  recentAcquisitions: { name: string; time: string }[];
}

export default function Vault() {
  const [items, setItems] = useState<Collectible[]>([]);
  const [summary, setSummary] = useState<VaultSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        const [itemsRes, summaryRes] = await Promise.all([
          api.get('/vault/collectibles'),
          api.get('/vault/summary')
        ]);

        if (itemsRes.data.success) {
          setItems(itemsRes.data.collectibles);
        }
        if (summaryRes.data.success) {
          setSummary(summaryRes.data.summary);
        }
      } catch (err) {
        console.error("Vault sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVaultData();
  }, []);

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

        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-display tracking-[0.4em] text-muted-foreground uppercase animate-pulse">Decrypting_Vault_Archives...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Collection Grid */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {items.map((c, i) => {
                  const Icon = iconMap[c.icon] || Award;
                  const color = rarityColors[c.rarity] || rarityColors.COMMON;
                  return (
                    <motion.div
                      key={c._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`holographic-card rounded-2xl p-8 hud-border group cursor-pointer relative overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-[0.05] pointer-events-none ${color.replace("text", "bg")}`} />
                      
                      <div className="relative z-10 text-center">
                        <div className={`w-24 h-24 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto mb-6 relative group-hover:border-primary/30 transition-colors ${color}`}>
                          <Icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                          {["LEGENDARY", "MYTHIC"].includes(c.rarity) && (
                            <div className="absolute inset-0 border border-dashed border-current/20 rounded-full animate-[spin_10s_linear_infinite]" />
                          )}
                        </div>
                        <div className={`text-[8px] font-display tracking-[0.4em] mb-2 uppercase ${color}`}>{c.rarity}</div>
                        <h3 className="font-display text-xs tracking-[0.2em] uppercase text-foreground mb-4">{c.name.replace("_", " ")}</h3>
                        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5">
                          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className={`h-full ${color.replace("text", "bg")}`} />
                        </div>
                        <div className="text-[10px] font-display text-muted-foreground tracking-widest uppercase">{c.synergy || "Synergy_Unlocked"}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {/* Locked Badge if collection is small */}
              {items.length < 6 && (
                <div className="holographic-card rounded-2xl p-8 hud-border opacity-50 grayscale flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-[8px] font-display tracking-[0.4em] mb-2 uppercase text-muted-foreground">UNKNOWN_RARITY</div>
                  <h3 className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">LOCKED_PROTOCOL</h3>
                  <p className="mt-4 text-[8px] font-display tracking-widest text-muted-foreground">COMPLETE_MISSIONS_TO_DECRYPT</p>
                </div>
              )}
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
                    { label: "Total_Collectibles", val: `${summary?.totalCollectibles || 0} / 50` },
                    { label: "Mythic_Yield", val: `${(summary?.mythicYield || 0).toString().padStart(2, '0')} / 05` },
                    { label: "Legendary_Yield", val: `${(summary?.legendaryYield || 0).toString().padStart(2, '0')}` },
                    { label: "Vault_Clearance", val: "LVL_SECURE" },
                  ].map(s => (
                    <div key={s.label} className="border-b border-white/5 pb-4 group cursor-pointer">
                      <div className="text-[7px] font-display tracking-widest text-muted-foreground uppercase group-hover:text-primary transition-colors mb-1">{s.label}</div>
                      <div className="text-xl font-display tracking-wider text-foreground uppercase">{s.val}</div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 py-8 font-display tracking-[0.3em] text-[10px] uppercase">
                  Export_PDF_Cert
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
                  {summary?.recentAcquisitions.map(l => (
                    <div key={l.name} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group hover:border-primary/30 transition-colors">
                      <span className="text-[10px] font-display text-foreground group-hover:text-primary uppercase">{l.name}</span>
                      <span className="text-[8px] font-display text-muted-foreground uppercase">{new Date(l.time).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {(!summary?.recentAcquisitions || summary.recentAcquisitions.length === 0) && (
                    <div className="text-center py-4">
                      <Info className="w-4 h-4 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-[8px] font-display tracking-widest text-muted-foreground uppercase">No_Recent_Archives</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
