interface Issue {
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
}

interface Props {
  issues: Issue[];
}

const severityStyles = {
  high: "border-red-200 bg-red-50 text-red-700",
  medium: "border-orange-200 bg-orange-50 text-orange-700",
  low: "border-green-200 bg-green-50 text-green-700",
};

export default function IssueCard({ issues }: Props) {
  if (issues.length === 0) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Issues</h2>
        <p className="text-sm text-gray-500">No issues detected.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Issues</h2>
      <div className="space-y-3">
        {issues.map((issue, index) => (
          <div
            key={`${issue.title}-${index}`}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="font-medium text-gray-900">{issue.title}</h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${severityStyles[issue.severity]}`}
              >
                {issue.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600">{issue.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
