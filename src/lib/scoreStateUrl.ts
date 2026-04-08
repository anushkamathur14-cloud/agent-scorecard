export interface ScorecardUrlState {
  v: 1;
  n: string;
  a: Record<string, number>;
  b: Record<string, number>;
  f: Record<string, number>;
}

export function serializeScorecardState(params: {
  useCaseName: string;
  agentScores: Record<string, number>;
  businessScores: Record<string, number>;
  feasibilityScores: Record<string, number>;
}): string {
  const payload: ScorecardUrlState = {
    v: 1,
    n: params.useCaseName,
    a: params.agentScores,
    b: params.businessScores,
    f: params.feasibilityScores,
  };
  return encodeURIComponent(JSON.stringify(payload));
}

export function parseScorecardState(raw: string): ScorecardUrlState | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as ScorecardUrlState;
    if (parsed.v !== 1 || typeof parsed.n !== "string" || !parsed.a || !parsed.b || !parsed.f) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildScoreSummaryText(params: {
  useCaseName: string;
  agentAvg: number;
  businessAvg: number;
  feasibilityAvg: number;
  finalScore: number;
  recommendation: string;
}): string {
  const name = params.useCaseName.trim() || "Untitled use case";
  return [
    `Agentic AI Scorecard — ${name}`,
    "",
    `Final score: ${params.finalScore.toFixed(1)} → ${params.recommendation}`,
    "",
    `Business Value (40%): ${params.businessAvg.toFixed(1)}`,
    `Agent Fit (35%): ${params.agentAvg.toFixed(1)}`,
    `Feasibility (25%): ${params.feasibilityAvg.toFixed(1)}`,
    "",
    `Formula: (0.4 × ${params.businessAvg.toFixed(1)}) + (0.35 × ${params.agentAvg.toFixed(1)}) + (0.25 × ${params.feasibilityAvg.toFixed(1)}) = ${params.finalScore.toFixed(1)}`,
  ].join("\n");
}
