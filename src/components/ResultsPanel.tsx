import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ResultsPanelProps {
  agentFit: number;
  businessValue: number;
  feasibility: number;
  finalScore: number;
  recommendation: string;
  useCaseName: string;
}

function getRecommendationStyle(rec: string) {
  switch (rec) {
    case "Build immediately":
      return { bg: "bg-score-build", text: "text-accent-foreground" };
    case "Pilot / MVP":
      return { bg: "bg-score-pilot", text: "text-primary-foreground" };
    case "Re-scope":
      return { bg: "bg-score-rescope", text: "text-foreground" };
    default:
      return { bg: "bg-score-drop", text: "text-destructive-foreground" };
  }
}

const ScoreBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const pct = ((value - 1) / 4) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const ResultsPanel = ({ agentFit, businessValue, feasibility, finalScore, recommendation, useCaseName }: ResultsPanelProps) => {
  const style = getRecommendationStyle(recommendation);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-elevated overflow-hidden">
        <div className="bg-hero p-6 text-center">
          <p className="text-sm text-primary-foreground/70 mb-1">Final Score</p>
          <p className="text-xs text-primary-foreground/55 max-w-sm mx-auto mb-2">
            Weighted blend of three pillars—business outcomes are weighted highest, then how well an agent fits, then delivery risk.
          </p>
          <motion.div
            className="font-mono text-5xl font-bold text-primary-foreground"
            key={finalScore}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {finalScore.toFixed(1)}
          </motion.div>
          {useCaseName && (
            <p className="mt-2 text-sm text-primary-foreground/60 truncate">{useCaseName}</p>
          )}
        </div>

        <CardContent className="p-6 space-y-5">
          <div className="flex justify-center">
            <span className={`inline-block rounded-full px-5 py-2 text-sm font-semibold ${style.bg} ${style.text}`}>
              👉 {recommendation}
            </span>
          </div>

          <div className="space-y-3">
            <ScoreBar label="Business Value (40%)" value={businessValue} delay={0} />
            <ScoreBar label="Agent Fit (35%)" value={agentFit} delay={0.1} />
            <ScoreBar label="Feasibility (25%)" value={feasibility} delay={0.2} />
          </div>

          <div className="rounded-lg bg-muted p-3">
            <p className="font-mono text-xs text-muted-foreground text-center">
              (0.4 × {businessValue.toFixed(1)}) + (0.35 × {agentFit.toFixed(1)}) + (0.25 × {feasibility.toFixed(1)}) = {finalScore.toFixed(1)}
            </p>
          </div>

          <Collapsible className="group text-left">
            <CollapsibleTrigger className="flex w-full items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground py-1">
              How to read this score
              <ChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-border/60">
              <p>
                Each slider is 1–5. We average scores within Agent Fit, Business Value, and Feasibility, then combine:{" "}
                <strong>40%</strong> business value, <strong>35%</strong> agent fit, <strong>25%</strong> feasibility—so a strong business case can lift the total even if execution is harder.
              </p>
              <p className="italic">Rule of thumb: high value + strong agent fit + reasonable feasibility → prioritize building or piloting.</p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsPanel;
