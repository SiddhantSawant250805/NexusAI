import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Sword, Target, Zap, Shield, Flame, User, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  codename: string;
  level: number;
  syncPoints: number;
  streak: number;
  totalMissions: number;
  attributes: {
    strength: number;
    agility: number;
    endurance: number;
  };
  isCurrentUser: boolean;
}

function RankCard({ player, index }: { player: LeaderboardEntry, index: number }) {
  const isTop1 = player.rank === 1;
  const stats = [
    player.attributes.strength,
    player.attributes.agility,
    player.attributes.endurance
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`holographic-card rounded-xl p-5 mb-4 group cursor-pointer border relative overflow-hidden transition-all ${
        player.isCurrentUser ? "border-primary/40 bg-primary/10 neon-glow-blue" : "border-border/50 hover:bg-white/5"
      }`}
    >
      {isTop1 && (
        <div className="absolute inset-0 bg-secondary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 pointer-events-none opacity-50" />
      )}
      
      <div className="relative z-10 flex items-center gap-6">
        <div className="w-12 text-center">
          <div className={`font-display text-2xl font-black ${isTop1 ? "text-secondary neon-text-green animate-[glitch_2s_infinite]" : "text-foreground/40"}`}>
            {player.rank < 10 ? `0${player.rank}` : player.rank}
          </div>
          <div className="flex justify-center mt-1">
            <ChevronUp className="w-3 h-3 text-accent" />
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center relative overflow-hidden group-hover:border-primary/40 transition-colors">
            {isTop1 ? <Trophy className="w-6 h-6 text-secondary animate-bounce" /> : <User className="w-6 h-6 text-muted-foreground" />}
            {player.isCurrentUser && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-display tracking-[0.2em] text-xs uppercase ${player.isCurrentUser ? "text-primary neon-text-blue" : "text-foreground"}`}>
                {player.codename}
              </span>
              {player.isCurrentUser && <span className="text-[7px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/20">YOU</span>}
            </div>
            <div className="text-[8px] font-display tracking-widest text-muted-foreground uppercase">LEVEL_{player.level} // CLASS_OPERATOR</div>
          </div>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <div className="grid grid-cols-3 gap-3 w-32">
            {stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full ${isTop1 ? "bg-secondary" : "bg-primary"}`} style={{ width: `${s}%` }} />
                </div>
                <div className="text-[6px] font-display text-muted-foreground text-center">{s}%</div>
              </div>
            ))}
          </div>
          <div className="text-right min-w-[100px]">
            <div className="text-sm font-display tracking-wider text-foreground">{player.syncPoints.toLocaleString()}</div>
            <div className="text-[8px] font-display tracking-[0.3em] text-muted-foreground uppercase">SYNC_POINTS</div>
          </div>
        </div>

        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
            <Target className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Arena() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeStats, setActiveStats] = useState({ operators: 0 });
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const [lbRes, lobbyRes] = await Promise.all([
          api.get('/arena/leaderboard'),
          api.get('/arena/active-lobbies')
        ]);

        if (lbRes.data.success) {
          setLeaderboard(lbRes.data.leaderboard);
        }
        if (lobbyRes.data.success) {
          setActiveStats({ operators: lobbyRes.data.activeOperators });
        }
      } catch (err) {
        console.error("Arena sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArenaData();
  }, []);

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header content with animated background elements */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-border/50 p-8 md:p-16 mb-12 group">
          <div className="absolute inset-0 parallax-grid opacity-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] animate-pulse" />
          
          <div className="relative z-10 text-center space-y-6">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-xl border border-primary/20 rounded-full px-6 py-2 mb-4 scanning-effect">
                <Sword className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-display tracking-[0.4em] uppercase text-primary">Global_Conflict_Active</span>
              </div>
              <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight leading-none">
                The_<span className="text-secondary neon-text-green">Arena</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed uppercase">
                Connect your bio-link to the global nexus. Compete with top-tier operators and claim your position in the elite hierarchy.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 font-display tracking-[0.3em] text-[10px] group relative overflow-hidden neon-glow-blue shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                <span className="relative z-10 uppercase">Initialize_Matchmaking</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="border-accent/20 text-accent hover:bg-accent/10 px-12 py-8 font-display tracking-[0.3em] text-[10px] backdrop-blur-sm uppercase">
                Join_Clan_Protocol
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Leaderboard Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="font-display text-sm tracking-[0.3em] uppercase flex items-center gap-3">
                <Trophy className="w-4 h-4 text-primary" /> Sector_Rankings
              </h3>
              <div className="text-[8px] font-display tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" /> {loading ? "Syncing_Neural_Net..." : "Live_Syncing..."}
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-[10px] font-display tracking-[0.4em] text-muted-foreground uppercase animate-pulse">Downloading_Sector_Data...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {leaderboard.map((p, i) => (
                    <RankCard key={p.userId} player={p} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {!loading && (
              <div className="text-center pt-4">
                <Button variant="ghost" className="text-[10px] font-display tracking-[0.5em] text-muted-foreground hover:text-primary transition-colors uppercase">
                  Load_Next_Sector_Ranks // 05-10
                </Button>
              </div>
            )}
          </div>

          {/* Side Module: Combat Readiness */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="holographic-card rounded-2xl p-8 hud-border"
            >
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-5 h-5 text-accent" />
                <h3 className="font-display text-[10px] tracking-[0.3em] uppercase">Combat_Readiness</h3>
              </div>
              
              <div className="space-y-10">
                {[
                  { label: "Strength_Index", val: profile?.attributes.strength || 0, color: "bg-primary" },
                  { label: "Agility_Index", val: profile?.attributes.agility || 0, color: "bg-accent" },
                  { label: "Endurance_Matrix", val: profile?.attributes.endurance || 0, color: "bg-primary" },
                ].map(r => (
                  <div key={r.label} className="group cursor-crosshair">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[8px] font-display tracking-widest text-muted-foreground group-hover:text-foreground transition-colors uppercase">{r.label}</span>
                      <span className="text-[10px] font-display text-primary">{r.val}/100</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${r.val}%` }} 
                        className={`h-full ${r.color} relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-5 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <div className="text-[8px] font-display tracking-[0.3em] text-primary/60 mb-2 uppercase">Current_Mission_Streak</div>
                <div className="text-3xl font-display text-primary flex items-center justify-center gap-3">
                  <Flame className="w-5 h-5 text-accent animate-bounce" />
                  {profile?.streak || 0}_CYCLES
                </div>
              </div>
            </motion.div>

            {/* Quick Matchmaking Status */}
            <div className="holographic-card rounded-2xl p-8 hud-border text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-6 uppercase">Active_Lobbies</div>
              <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 4], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-accent rounded-full"
                  />
                ))}
              </div>
              <div className="text-xs font-display tracking-widest text-foreground uppercase">
                {activeStats.operators}_OPERATORS_READY
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
