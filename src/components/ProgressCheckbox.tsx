interface ProgressCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

export function ProgressCheckbox({
  checked,
  label,
  onToggle,
}: ProgressCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
        checked
          ? "border-rust bg-rust text-white"
          : "border-zinc-300 hover:border-rust/50 dark:border-zinc-700"
      }`}
    >
      {checked && (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
