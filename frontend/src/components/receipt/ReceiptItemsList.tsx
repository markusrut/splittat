import { Plus, X } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";
import type { ReceiptItem } from "@/types";

export interface ReceiptItemsListProps {
  items: ReceiptItem[];
  isEditing?: boolean;
  editedItems?: Omit<ReceiptItem, "id">[];
  onItemChange?: (
    index: number,
    field: keyof Omit<ReceiptItem, "id">,
    value: string | number
  ) => void;
  onAddItem?: () => void;
  onRemoveItem?: (index: number) => void;
}

export const ReceiptItemsList = ({
  items,
  isEditing = false,
  editedItems = [],
  onItemChange,
  onAddItem,
  onRemoveItem,
}: ReceiptItemsListProps) => {
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
          Items
        </h2>
      </Card.Header>
      <Card.Body>
        {isEditing ? (
          <div className="space-y-3">
            {editedItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) =>
                      onItemChange?.(index, "name", e.target.value)
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) =>
                        onItemChange?.(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      step="0.01"
                    />
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        onItemChange?.(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => onRemoveItem?.(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              onClick={onAddItem}
              variant="outline"
              fullWidth
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center py-4">
                No items found
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    {item.quantity && item.quantity > 1 && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
