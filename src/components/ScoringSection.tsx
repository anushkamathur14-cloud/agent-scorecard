import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScoreCriteriaSlider from "./ScoreCriteriaSlider";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface CriteriaConfig {
  key: string;
  label: string;
  description: { low: string; mid: string; high: string };
}

interface ScoringSectionProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  criteria: CriteriaConfig[];
  scores: Record<string, number>;
  onScoreChange: (key: string, value: number) => void;
  average: number;
  colorClass: string;
  index: number;
}

const ScoringSection = ({
  title,
  subtitle,
  icon,
  criteria,
  scores,
  onScoreChange,
  average,
  colorClass,
  index,
}: ScoringSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl font-bold text-foreground">{average.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">avg score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {criteria.map((c) => (
            <ScoreCriteriaSlider
              key={c.key}
              label={c.label}
              description={c.description}
              value={scores[c.key]}
              onChange={(v) => onScoreChange(c.key, v)}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScoringSection;
