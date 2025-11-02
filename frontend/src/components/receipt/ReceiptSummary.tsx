import { Card } from "@/components/ui";

export interface ReceiptSummaryProps {
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
}

export const ReceiptSummary = ({
  subtotal,
  tax,
  tip,
  total,
}: ReceiptSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Summary
        </h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tip</span>
            <span>{formatCurrency(tip)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
