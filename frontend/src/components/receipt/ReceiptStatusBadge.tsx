import { Loader2 } from "lucide-react";
import { ReceiptStatus } from "@/types";

export interface ReceiptStatusBadgeProps {
  status: ReceiptStatus;
  className?: string;
}

export const ReceiptStatusBadge = ({
  status,
  className = "",
}: ReceiptStatusBadgeProps) => {
  const getStatusColor = (status: ReceiptStatus) => {
    switch (status) {
      case ReceiptStatus.Ready:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case ReceiptStatus.Processing:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case ReceiptStatus.Failed:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)} ${className}`}
    >
      {status === ReceiptStatus.Processing && (
        <span className="inline-flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Processing
        </span>
      )}
      {status === ReceiptStatus.Ready && "Ready"}
      {status === ReceiptStatus.Failed && "Failed"}
    </span>
  );
};
