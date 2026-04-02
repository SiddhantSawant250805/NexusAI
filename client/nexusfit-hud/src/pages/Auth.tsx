import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth() {
  const [params] = useSearchParams();
  const [isSignup, setIsSignup] = useState(params.get("mode") === "signup");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/lab");
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-10">
          <Zap className="w-8 h-8 text-primary" />
          <span className="font-display text-xl tracking-widest text-primary neon-text-blue">NEXUSFIT</span>
        </Link>

        <div className="glass rounded-2xl p-8 hud-border">
          <h2 className="font-display text-xl tracking-widest text-center mb-1">
            {isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {isSignup ? "Begin your transformation" : "Resume your mission"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Callsign"
                  className="pl-10 bg-input border-border/50 focus:border-primary focus:neon-glow-blue transition-shadow font-body"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10 bg-input border-border/50 focus:border-primary focus:neon-glow-blue transition-shadow font-body"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-input border-border/50 focus:border-primary focus:neon-glow-blue transition-shadow font-body"
              />
            </div>

            <Button
              type="submit"
              className="w-full font-display tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue py-5 group"
            >
              {isSignup ? "INITIALIZE" : "ENTER"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignup ? "Already enlisted?" : "New recruit?"}{" "}
              <span className="text-primary font-medium">
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
