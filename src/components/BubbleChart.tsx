import { motion } from "framer-motion";

interface BubbleChartProps {
  businessValue: number;
  feasibility: number;
  agentFit: number;
  recommendation: string;
}

function getColor(rec: string) {
  switch (rec) {
    case "Build immediately": return "hsl(168, 71%, 40%)";
    case "Pilot / MVP": return "hsl(221, 83%, 53%)";
    case "Re-scope": return "hsl(38, 92%, 50%)";
    default: return "hsl(0, 84%, 60%)";
  }
}

const BubbleChart = ({ businessValue, feasibility, agentFit, recommendation }: BubbleChartProps) => {
  const width = 320;
  const height = 320;
  const padding = 40;

  const x = padding + ((feasibility - 1) / 4) * (width - padding * 2);
  const y = padding + ((5 - businessValue) / 4) * (height - padding * 2);
  const r = 12 + (agentFit - 1) * 6;
  const color = getColor(recommendation);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xs">
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(214, 20%, 88%)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x={padding} y={padding} width={width - padding * 2} height={height - padding * 2} fill="url(#grid)" />

        {/* Quadrant labels */}
        <text x={width / 2} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display">
          HIGH VALUE
        </text>
        <text x={width / 2} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display">
          LOW VALUE
        </text>
        <text x={10} y={height / 2} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display" transform={`rotate(-90, 10, ${height / 2})`}>
          LOW FEASIBILITY
        </text>
        <text x={width - 10} y={height / 2} textAnchor="middle" className="fill-muted-foreground text-[10px] font-display" transform={`rotate(90, ${width - 10}, ${height / 2})`}>
          HIGH FEASIBILITY
        </text>

        {/* Quadrant zones */}
        <rect x={width / 2} y={padding} width={(width - padding * 2) / 2} height={(height - padding * 2) / 2} fill="hsl(168, 71%, 40%)" opacity="0.06" />
        <text x={width * 0.75} y={padding + 20} textAnchor="middle" className="fill-score-build text-[9px] font-semibold font-display opacity-60">BUILD</text>

        <rect x={width / 2} y={height / 2} width={(width - padding * 2) / 2} height={(height - padding * 2) / 2} fill="hsl(221, 83%, 53%)" opacity="0.06" />
        <text x={width * 0.75} y={height - padding - 10} textAnchor="middle" className="fill-score-pilot text-[9px] font-semibold font-display opacity-60">PILOT</text>

        {/* Axes */}
        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="hsl(214, 20%, 80%)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} stroke="hsl(214, 20%, 80%)" strokeWidth="1" strokeDasharray="4,4" />

        {/* Bubble */}
        <motion.circle
          cx={x}
          cy={y}
          fill={color}
          opacity={0.25}
          initial={{ r: 0 }}
          animate={{ r: r + 8 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        <motion.circle
          cx={x}
          cy={y}
          fill={color}
          initial={{ r: 0 }}
          animate={{ r }}
          transition={{ type: "spring", stiffness: 120 }}
        />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground text-center">Bubble size = Agent Fit score</p>
    </div>
  );
};

export default BubbleChart;
