import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScoringSection, { CriteriaConfig } from "@/components/ScoringSection";
import ResultsPanel from "@/components/ResultsPanel";
import BubbleChart from "@/components/BubbleChart";
import ComparisonView from "@/components/ComparisonView";
import ExampleLibrary from "@/components/ExampleLibrary";
import { SavedUseCase, EXAMPLE_USE_CASES } from "@/lib/useCaseData";
import { motion } from "framer-motion";
import { Bot, TrendingUp, Wrench, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

const agentFitCriteria: CriteriaConfig[] = [
  { key: "decision", label: "Decision Complexity", description: { low: "Rule-based", mid: "Some judgment", high: "High judgment" } },
  { key: "workflow", label: "Workflow Complexity", description: { low: "Single step", mid: "Multi-step", high: "Dynamic, non-linear" } },
  { key: "systems", label: "System Interaction", description: { low: "1 system", mid: "2–3 systems", high: "3+ systems" } },
  { key: "autonomy", label: "Autonomy Need", description: { low: "Assist only", mid: "Partial execution", high: "End-to-end ownership" } },
];

const businessValueCriteria: CriteriaConfig[] = [
  { key: "time", label: "Time Savings", description: { low: "Minimal", mid: "Moderate", high: "Significant" } },
  { key: "cost", label: "Cost Impact", description: { low: "Low", mid: "Medium", high: "High" } },
  { key: "revenue", label: "Revenue / CX Impact", description: { low: "None", mid: "Indirect", high: "Direct, measurable" } },
  { key: "frequency", label: "Frequency", description: { low: "Rare", mid: "Weekly", high: "Daily / high volume" } },
];

const feasibilityCriteria: CriteriaConfig[] = [
  { key: "data", label: "Data Readiness", description: { low: "Poor / unavailable", mid: "Partial", high: "Clean, accessible" } },
  { key: "integration", label: "Integration Effort", description: { low: "Very hard", mid: "Moderate", high: "Easy" } },
  { key: "risk", label: "Risk Level", description: { low: "High risk", mid: "Manageable", high: "Low risk" } },
  { key: "speed", label: "Implementation Speed", description: { low: ">6 months", mid: "Medium", high: "<6–8 weeks" } },
];

function initScores(criteria: CriteriaConfig[]) {
  return Object.fromEntries(criteria.map((c) => [c.key, 3]));
}

function avg(scores: Record<string, number>) {
  const vals = Object.values(scores);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function getRecommendation(score: number) {
  if (score >= 4) return "Build immediately";
  if (score >= 3) return "Pilot / MVP";
  if (score >= 2) return "Re-scope";
  return "Drop";
}

const Index = () => {
  const [useCaseName, setUseCaseName] = useState("Customer Support Resolution Agent");
  const [agentScores, setAgentScores] = useState(initScores(agentFitCriteria));
  const [businessScores, setBusinessScores] = useState(initScores(businessValueCriteria));
  const [feasibilityScores, setFeasibilityScores] = useState(initScores(feasibilityCriteria));
  const [savedUseCases, setSavedUseCases] = useState<SavedUseCase[]>([]);

  const agentAvg = useMemo(() => avg(agentScores), [agentScores]);
  const businessAvg = useMemo(() => avg(businessScores), [businessScores]);
  const feasibilityAvg = useMemo(() => avg(feasibilityScores), [feasibilityScores]);
  const finalScore = useMemo(
    () => 0.4 * businessAvg + 0.35 * agentAvg + 0.25 * feasibilityAvg,
    [agentAvg, businessAvg, feasibilityAvg]
  );
  const recommendation = getRecommendation(finalScore);

  const handleReset = () => {
    setAgentScores(initScores(agentFitCriteria));
    setBusinessScores(initScores(businessValueCriteria));
    setFeasibilityScores(initScores(feasibilityCriteria));
    setUseCaseName("");
  };

  const handleSave = useCallback(() => {
    if (!useCaseName.trim()) {
      toast.error("Please enter a use case name first");
      return;
    }
    const newCase: SavedUseCase = {
      id: crypto.randomUUID(),
      name: useCaseName,
      agentScores: { ...agentScores },
      businessScores: { ...businessScores },
      feasibilityScores: { ...feasibilityScores },
      agentAvg,
      businessAvg,
      feasibilityAvg,
      finalScore,
      recommendation,
    };
    setSavedUseCases((prev) => [...prev, newCase]);
    toast.success(`"${useCaseName}" saved for comparison`);
  }, [useCaseName, agentScores, businessScores, feasibilityScores, agentAvg, businessAvg, feasibilityAvg, finalScore, recommendation]);

  const handleRemove = (id: string) => {
    setSavedUseCases((prev) => prev.filter((uc) => uc.id !== id));
  };

  const handleLoad = (uc: SavedUseCase) => {
    setUseCaseName(uc.name);
    setAgentScores({ ...uc.agentScores });
    setBusinessScores({ ...uc.businessScores });
    setFeasibilityScores({ ...uc.feasibilityScores });
    toast.info(`Loaded "${uc.name}"`);
  };

  const handleLoadExample = (ex: typeof EXAMPLE_USE_CASES[number]) => {
    setUseCaseName(ex.name);
    setAgentScores({ ...ex.agentScores });
    setBusinessScores({ ...ex.businessScores });
    setFeasibilityScores({ ...ex.feasibilityScores });
    toast.info(`Loaded example: "${ex.name}"`);
  };

  const updateScore = (setter: typeof setAgentScores) => (key: string, value: number) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-hero py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 mb-6">
              <Bot className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-sm text-primary-foreground/80 font-medium">Agentic AI Assessment</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-4">
              Use Case Scorecard
            </h1>
            <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto">
              Evaluate whether your AI use case should be built as an agent. Score across agent fit, business value, and feasibility to get a data-driven recommendation.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 -mt-8 pb-20 space-y-8">
        {/* Use case name input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-elevated">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center">
              <Input
                value={useCaseName}
                onChange={(e) => setUseCaseName(e.target.value)}
                placeholder="Enter your use case name..."
                className="text-lg font-medium border-0 bg-transparent focus-visible:ring-0 flex-1"
              />
              <div className="flex gap-2 shrink-0">
                <Button variant="default" size="sm" onClick={handleSave} className="gap-2">
                  <Save className="h-3.5 w-3.5" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Example Library */}
        <ExampleLibrary onSelect={handleLoadExample} />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Scoring Sections */}
          <div className="lg:col-span-2 space-y-6">
            <ScoringSection
              title="Agent Fit"
              subtitle="Should this be an agent?"
              icon={<Bot className="h-5 w-5 text-primary-foreground" />}
              criteria={agentFitCriteria}
              scores={agentScores}
              onScoreChange={updateScore(setAgentScores)}
              average={agentAvg}
              colorClass="bg-primary"
              index={0}
            />
            <ScoringSection
              title="Business Value"
              subtitle="Is it worth it?"
              icon={<TrendingUp className="h-5 w-5 text-accent-foreground" />}
              criteria={businessValueCriteria}
              scores={businessScores}
              onScoreChange={updateScore(setBusinessScores)}
              average={businessAvg}
              colorClass="bg-accent"
              index={1}
            />
            <ScoringSection
              title="Feasibility"
              subtitle="Can we actually build this?"
              icon={<Wrench className="h-5 w-5 text-primary-foreground" />}
              criteria={feasibilityCriteria}
              scores={feasibilityScores}
              onScoreChange={updateScore(setFeasibilityScores)}
              average={feasibilityAvg}
              colorClass="bg-foreground"
              index={2}
            />
          </div>

          {/* Right: Results */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <ResultsPanel
              agentFit={agentAvg}
              businessValue={businessAvg}
              feasibility={feasibilityAvg}
              finalScore={finalScore}
              recommendation={recommendation}
              useCaseName={useCaseName}
            />
            <Card className="shadow-card">
              <CardContent className="p-4">
                <BubbleChart
                  businessValue={businessAvg}
                  feasibility={feasibilityAvg}
                  agentFit={agentAvg}
                  recommendation={recommendation}
                  savedUseCases={savedUseCases}
                />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Decision Matrix</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { range: "4.0 – 5.0", label: "Build immediately", color: "bg-score-build" },
                    { range: "3.0 – 3.9", label: "Pilot / MVP", color: "bg-score-pilot" },
                    { range: "2.0 – 2.9", label: "Re-scope", color: "bg-score-rescope" },
                    { range: "< 2.0", label: "Drop", color: "bg-score-drop" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${row.color}`} />
                      <span className="font-mono text-muted-foreground w-16">{row.range}</span>
                      <span className="text-foreground font-medium">{row.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparison Table */}
        <ComparisonView
          useCases={savedUseCases}
          onRemove={handleRemove}
          onLoad={handleLoad}
        />
      </main>
    </div>
  );
};

export default Index;
