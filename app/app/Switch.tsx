export default function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex h-11 items-center justify-between gap-6 rounded-xl text-left"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 ring-1 ring-inset transition-colors ${
          checked ? "bg-foreground ring-foreground" : "bg-foreground/10 ring-foreground/40"
        }`}
      >
        <span
          className={`size-5 rounded-full transition-transform ${
            checked ? "translate-x-5 bg-background" : "translate-x-0 bg-foreground/60"
          }`}
        />
      </span>
    </button>
  );
}
