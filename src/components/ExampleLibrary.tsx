import { EXAMPLE_USE_CASES } from "@/lib/useCaseData";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface ExampleLibraryProps {
  onSelect: (example: typeof EXAMPLE_USE_CASES[number]) => void;
}

function getRecColor(rec: string) {
  switch (rec) {
    case "Build immediately": return "border-score-build/30 bg-score-build/5";
    case "Pilot / MVP": return "border-score-pilot/30 bg-score-pilot/5";
    case "Re-scope": return "border-score-rescope/30 bg-score-rescope/5";
    default: return "border-score-drop/30 bg-score-drop/5";
  }
}

function getRecBadge(rec: string) {
  switch (rec) {
    case "Build immediately": return "bg-score-build text-accent-foreground";
    case "Pilot / MVP": return "bg-score-pilot text-primary-foreground";
    case "Re-scope": return "bg-score-rescope text-foreground";
    default: return "bg-score-drop text-destructive-foreground";
  }
}

const ExampleLibrary = ({ onSelect }: ExampleLibraryProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-score-rescope" />
        <h3 className="text-lg font-semibold text-foreground">Example Library</h3>
        <span className="text-xs text-muted-foreground">— click to load</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLE_USE_CASES.map((ex, i) => (
          <motion.div
            key={ex.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Card
              className={`cursor-pointer border-2 transition-all hover:shadow-elevated hover:scale-[1.02] ${getRecColor(ex.recommendation)}`}
              onClick={() => onSelect(ex)}
            >
              <CardContent className="p-4">
                <p className="font-medium text-sm text-foreground mb-2 leading-tight">{ex.name}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-foreground">{ex.finalScore.toFixed(1)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getRecBadge(ex.recommendation)}`}>
                    {ex.recommendation}
                  </span>
                </div>
                <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
                  <span>AF {ex.agentAvg.toFixed(1)}</span>
                  <span>BV {ex.businessAvg.toFixed(1)}</span>
                  <span>FE {ex.feasibilityAvg.toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExampleLibrary;
