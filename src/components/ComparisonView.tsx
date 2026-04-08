import { SavedUseCase } from "@/lib/useCaseData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface ComparisonViewProps {
  useCases: SavedUseCase[];
  onRemove: (id: string) => void;
  onLoad: (useCase: SavedUseCase) => void;
}

function getRecColor(rec: string) {
  switch (rec) {
    case "Build immediately": return "bg-score-build text-accent-foreground";
    case "Pilot / MVP": return "bg-score-pilot text-primary-foreground";
    case "Re-scope": return "bg-score-rescope text-foreground";
    default: return "bg-score-drop text-destructive-foreground";
  }
}

const ComparisonView = ({ useCases, onRemove, onLoad }: ComparisonViewProps) => {
  if (useCases.length === 0) return null;

  const sorted = [...useCases].sort((a, b) => b.finalScore - a.finalScore);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-elevated">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Saved Use Cases ({useCases.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Use Case</th>
                  <th className="text-center py-2 px-2 text-muted-foreground font-medium">Agent Fit</th>
                  <th className="text-center py-2 px-2 text-muted-foreground font-medium">Biz Value</th>
                  <th className="text-center py-2 px-2 text-muted-foreground font-medium">Feasibility</th>
                  <th className="text-center py-2 px-2 text-muted-foreground font-medium">Final</th>
                  <th className="text-center py-2 px-2 text-muted-foreground font-medium">Decision</th>
                  <th className="py-2 pl-2"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sorted.map((uc, i) => (
                    <motion.tr
                      key={uc.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 group"
                    >
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => onLoad(uc)}
                          className="text-left font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 group/btn"
                        >
                          <span className="truncate max-w-[180px]">{uc.name}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </button>
                      </td>
                      <td className="py-3 px-2 text-center font-mono">{uc.agentAvg.toFixed(1)}</td>
                      <td className="py-3 px-2 text-center font-mono">{uc.businessAvg.toFixed(1)}</td>
                      <td className="py-3 px-2 text-center font-mono">{uc.feasibilityAvg.toFixed(1)}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold">{uc.finalScore.toFixed(1)}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRecColor(uc.recommendation)}`}>
                          {uc.recommendation}
                        </span>
                      </td>
                      <td className="py-3 pl-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onRemove(uc.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComparisonView;
