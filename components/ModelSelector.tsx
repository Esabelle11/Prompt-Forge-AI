import type { ModelOption } from "@/lib/models";

interface Props {
  label: string;
  value: string;
  models: ModelOption[];
  onChange: (model: string) => void;
  disabled?: boolean;
}

export default function ModelSelector({
  label,
  value,
  models,
  onChange,
  disabled,
}: Props) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </select>
    </label>
  );
}
