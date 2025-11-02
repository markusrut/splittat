import { AlertCircle, X } from "lucide-react";
import { useState, type HTMLAttributes } from "react";

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const ErrorMessage = ({
  title = "Error",
  message,
  dismissible = false,
  onDismiss,
  className = "",
  ...props
}: ErrorMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
            {title}
          </h4>
          <p className="text-sm text-red-700 dark:text-red-400">{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// Inline error for form fields (already handled in Input component)
export const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return (
    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {error}
    </p>
  );
};
