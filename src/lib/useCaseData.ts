export interface SavedUseCase {
  id: string;
  name: string;
  agentScores: Record<string, number>;
  businessScores: Record<string, number>;
  feasibilityScores: Record<string, number>;
  agentAvg: number;
  businessAvg: number;
  feasibilityAvg: number;
  finalScore: number;
  recommendation: string;
}

export const EXAMPLE_USE_CASES: Omit<SavedUseCase, "id">[] = [
  {
    name: "Customer Support Resolution Agent",
    agentScores: { decision: 4.5, workflow: 4, systems: 4.5, autonomy: 5 },
    businessScores: { time: 5, cost: 4.5, revenue: 5, frequency: 5 },
    feasibilityScores: { data: 4, integration: 3.5, risk: 3.5, speed: 4 },
    agentAvg: 4.5,
    businessAvg: 4.875,
    feasibilityAvg: 3.75,
    finalScore: 4.46,
    recommendation: "Build immediately",
  },
  {
    name: "Automated Data Analysis & Reporting",
    agentScores: { decision: 3.5, workflow: 4, systems: 3, autonomy: 3.5 },
    businessScores: { time: 4.5, cost: 3.5, revenue: 3, frequency: 4.5 },
    feasibilityScores: { data: 3, integration: 3.5, risk: 4, speed: 3.5 },
    agentAvg: 3.5,
    businessAvg: 3.875,
    feasibilityAvg: 3.5,
    finalScore: 3.65,
    recommendation: "Pilot / MVP",
  },
  {
    name: "Sales Lead Qualification Agent",
    agentScores: { decision: 4, workflow: 3.5, systems: 4, autonomy: 4 },
    businessScores: { time: 4, cost: 3.5, revenue: 5, frequency: 4.5 },
    feasibilityScores: { data: 3.5, integration: 3, risk: 3, speed: 3 },
    agentAvg: 3.875,
    businessAvg: 4.25,
    feasibilityAvg: 3.125,
    finalScore: 3.84,
    recommendation: "Pilot / MVP",
  },
  {
    name: "IT Incident Response Agent",
    agentScores: { decision: 4.5, workflow: 5, systems: 5, autonomy: 4.5 },
    businessScores: { time: 4.5, cost: 4, revenue: 3.5, frequency: 4 },
    feasibilityScores: { data: 3, integration: 2.5, risk: 2, speed: 2.5 },
    agentAvg: 4.75,
    businessAvg: 4.0,
    feasibilityAvg: 2.5,
    finalScore: 3.885,
    recommendation: "Pilot / MVP",
  },
  {
    name: "Employee Onboarding Coordinator",
    agentScores: { decision: 2.5, workflow: 3, systems: 3, autonomy: 2.5 },
    businessScores: { time: 3, cost: 2.5, revenue: 1.5, frequency: 2 },
    feasibilityScores: { data: 3.5, integration: 3, risk: 4, speed: 4 },
    agentAvg: 2.75,
    businessAvg: 2.25,
    feasibilityAvg: 3.625,
    finalScore: 2.77,
    recommendation: "Re-scope",
  },
  {
    name: "Contract Review & Compliance Agent",
    agentScores: { decision: 5, workflow: 4, systems: 3, autonomy: 3.5 },
    businessScores: { time: 4, cost: 4.5, revenue: 3, frequency: 3 },
    feasibilityScores: { data: 2.5, integration: 2, risk: 1.5, speed: 2 },
    agentAvg: 3.875,
    businessAvg: 3.625,
    feasibilityAvg: 2.0,
    finalScore: 3.31,
    recommendation: "Pilot / MVP",
  },
];
