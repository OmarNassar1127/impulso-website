import { Plus } from "lucide-react";

type FaqItem = { question: string; answer: string };

/**
 * Collapsible FAQ list.
 *
 * Built on native <details>/<summary> rather than React state: it works with
 * JavaScript disabled, is keyboard accessible for free, and the answers stay
 * in the HTML so Google still reads them for the FAQPage rich result.
 */
export default function FaqAccordion({
  items,
  defaultOpenFirst = true,
}: {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.question}
          open={defaultOpenFirst && i === 0}
          className="group overflow-hidden rounded-2xl border border-foreground/15 border-l-[3px] border-l-terracotta surface-warm [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              {item.question}
            </h3>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-card transition-transform duration-200 group-open:rotate-45">
              <Plus className="h-3.5 w-3.5 text-terracotta" strokeWidth={2.5} />
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
