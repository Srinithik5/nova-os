interface TrafficDotsProps {
  onClose?: () => void;
}

// The red/yellow/green window controls repeated in every app window header
// (project/Nova OS.dc.html's `dots` render helper). Only the red dot is
// ever interactive in the source design — it returns to Home.
export function TrafficDots({ onClose }: TrafficDotsProps) {
  return (
    <div className="flex gap-[7px]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        disabled={!onClose}
        className="h-3 w-3 rounded-full bg-[#ff5f57] disabled:cursor-default"
      />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}