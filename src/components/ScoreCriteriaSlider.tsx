import { Slider } from "@/components/ui/slider";

interface ScoreCriteriaSliderProps {
  label: string;
  description: { low: string; mid: string; high: string };
  value: number;
  onChange: (value: number) => void;
}

const ScoreCriteriaSlider = ({ label, description, value, onChange }: ScoreCriteriaSliderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-sm font-semibold text-primary">{value.toFixed(1)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={1}
        max={5}
        step={0.5}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{description.low}</span>
        <span>{description.mid}</span>
        <span>{description.high}</span>
      </div>
    </div>
  );
};

export default ScoreCriteriaSlider;
