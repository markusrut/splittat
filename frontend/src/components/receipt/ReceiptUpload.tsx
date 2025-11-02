import { useRef, useState, type ChangeEvent } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui";

export interface ReceiptUploadProps {
  onUpload: (file: File) => void;
  uploading?: boolean;
  disabled?: boolean;
}

export const ReceiptUpload = ({
  onUpload,
  uploading = false,
  disabled = false,
}: ReceiptUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraButtonClick = () => {
    cameraInputRef.current?.click();
  };

  if (preview && selectedFile) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
          <img
            src={preview}
            alt="Receipt preview"
            className="w-full h-auto max-h-96 object-contain bg-gray-50 dark:bg-gray-900"
          />
          <button
            onClick={handleCancel}
            disabled={uploading}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="Cancel"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleUpload}
            loading={uploading}
            disabled={uploading}
            fullWidth
          >
            Upload Receipt
          </Button>
          <Button onClick={handleCancel} variant="outline" disabled={uploading}>
            Cancel
          </Button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
              <Camera className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="p-4 bg-secondary-100 dark:bg-secondary-900 rounded-full">
              <Upload className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Upload Receipt
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Take a photo or select an image file
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={handleCameraButtonClick}
              variant="primary"
              disabled={disabled || uploading}
              className="gap-2"
            >
              <Camera className="h-5 w-5" />
              Take Photo
            </Button>
            <Button
              onClick={handleFileButtonClick}
              variant="secondary"
              disabled={disabled || uploading}
              className="gap-2"
            >
              <Upload className="h-5 w-5" />
              Choose File
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Supported formats: JPG, PNG, HEIC (max 10MB)
          </p>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Choose file"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Take photo"
      />
    </div>
  );
};
