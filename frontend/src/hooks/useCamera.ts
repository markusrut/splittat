import { useState, useCallback, useRef } from "react";

interface UseCameraReturn {
  isSupported: boolean;
  isCameraActive: boolean;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<File | null>;
}

export const useCamera = (): UseCameraReturn => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if camera is supported
  const isSupported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    !!navigator.mediaDevices.getUserMedia;

  // Start camera stream
  const startCamera = useCallback(async () => {
    if (!isSupported) {
      setError("Camera is not supported on this device");
      return;
    }

    try {
      setError(null);

      // Request camera permission and get video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraActive(true);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError("Camera permission denied. Please allow camera access.");
        } else if (err.name === "NotFoundError") {
          setError("No camera found on this device.");
        } else if (err.name === "NotReadableError") {
          setError("Camera is already in use by another application.");
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError("Failed to access camera");
      }
      setIsCameraActive(false);
    }
  }, [isSupported]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
  }, []);

  // Capture photo from video stream
  const capturePhoto = useCallback(async (): Promise<File | null> => {
    if (!videoRef.current || !isCameraActive) {
      setError("Camera is not active");
      return null;
    }

    try {
      // Create canvas to capture video frame
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        setError("Failed to create canvas context");
        return null;
      }

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Convert blob to File
              const file = new File([blob], `receipt-${Date.now()}.jpg`, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(file);
            } else {
              setError("Failed to capture photo");
              resolve(null);
            }
          },
          "image/jpeg",
          0.9 // Quality: 0.9 (90%)
        );
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to capture photo: ${err.message}`);
      } else {
        setError("Failed to capture photo");
      }
      return null;
    }
  }, [isCameraActive]);

  return {
    isSupported,
    isCameraActive,
    error,
    videoRef,
    startCamera,
    stopCamera,
    capturePhoto,
  };
};
