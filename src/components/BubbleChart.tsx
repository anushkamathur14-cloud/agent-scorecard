import { motion } from "framer-motion";
import { SavedUseCase } from "@/lib/useCaseData";

interface BubbleData {
  name: string;
  businessValue: number;
  feasibility: number;
  agentFit: number;
  recommendation: string;
  isCurrent?: boolean;
}

interface BubbleChartProps {
  businessValue: number;
  feasibility: number;
  agentFit: number;
  recommendation: string;
  savedUseCases?: SavedUseCase[];
}

function getColor(rec: string) {
  switch (rec) {
    case "Build immediately": return "hsl(168, 71%, 40%)";
    case "Pilot / MVP": return "hsl(221, 83%, 53%)";
    case "Re-scope": return "hsl(38, 92%, 50%)";
    default: return "hsl(0, 84%, 60%)";
  }
}

const BubbleChart = ({ businessValue, feasibility, agentFit, recommendation, savedUseCases = [] }: BubbleChartProps) => {
  const width = 320;
  const height = 320;
  const padding = 40;

  const toX = (f: number) => padding + ((f - 1) / 4) * (width - padding * 2);
  const toY = (bv: number) => padding + ((5 - bv) / 4) * (height - padding * 2);
  const toR = (af: number) => 10 + (af - 1) * 5;

  const bubbles: BubbleData[] = [
    ...savedUseCases.map((uc) => ({
      name: uc.name,
      businessValue: uc.businessAvg,
      feasibility: uc.feasibilityAvg,
      agentFit: uc.agentAvg,
      recommendation: uc.recommendation,
    })),
    { name: "Current", businessValue, feasibility, agentFit, recommendation, isCurrent: true },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xs">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(214, 20%, 88%)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x={padding} y={padding} width={width - padding * 2} height={height - padding * 2} fill="url(#grid)" />

        <text x={width / 2} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display">HIGH VALUE</text>
        <text x={width / 2} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display">LOW VALUE</text>
        <text x={10} y={height / 2} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display" transform={`rotate(-90, 10, ${height / 2})`}>LOW FEASIBILITY</text>
        <text x={width - 10} y={height / 2} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display" transform={`rotate(90, ${width - 10}, ${height / 2})`}>HIGH FEASIBILITY</text>

        <rect x={width / 2} y={padding} width={(width - padding * 2) / 2} height={(height - padding * 2) / 2} fill="hsl(168, 71%, 40%)" opacity="0.06" />
        <text x={width * 0.75} y={padding + 20} textAnchor="middle" className="fill-score-build text-[9px] font-semibold font-display opacity-60">BUILD</text>

        <rect x={width / 2} y={height / 2} width={(width - padding * 2) / 2} height={(height - padding * 2) / 2} fill="hsl(221, 83%, 53%)" opacity="0.06" />
        <text x={width * 0.75} y={height - padding - 10} textAnchor="middle" className="fill-score-pilot text-[9px] font-semibold font-display opacity-60">PILOT</text>

        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="hsl(214, 20%, 80%)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} stroke="hsl(214, 20%, 80%)" strokeWidth="1" strokeDasharray="4,4" />

        {bubbles.map((b, i) => {
          const cx = toX(b.feasibility);
          const cy = toY(b.businessValue);
          const cr = toR(b.agentFit);
          const color = getColor(b.recommendation);
          return (
            <g key={i}>
              <motion.circle
                cx={cx} cy={cy} fill={color} opacity={b.isCurrent ? 0.25 : 0.12}
                initial={{ r: 0 }} animate={{ r: cr + 6 }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
              />
              <motion.circle
                cx={cx} cy={cy} fill={color} opacity={b.isCurrent ? 1 : 0.5}
                stroke={b.isCurrent ? "white" : "none"} strokeWidth={b.isCurrent ? 2 : 0}
                initial={{ r: 0 }} animate={{ r: cr }}
                transition={{ type: "spring", stiffness: 120, delay: i * 0.05 }}
              />
              {!b.isCurrent && (
                <text x={cx} y={cy + cr + 10} textAnchor="middle" className="fill-muted-foreground text-[7px] font-display">
                  {b.name.length > 15 ? b.name.slice(0, 14) + "…" : b.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground text-center">
        Bubble size = Agent Fit{savedUseCases.length > 0 ? " · White ring = current" : ""}
      </p>
    </div>
  );
};

export default BubbleChart;
