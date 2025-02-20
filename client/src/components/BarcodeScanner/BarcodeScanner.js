import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const isQuaggaRunning = useRef(false); // Track if Quagga is running

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      console.error("Video element not found!");
      return;
    }

    // Check for camera access
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("Camera access not supported on this browser.");
      return;
    }

    const initQuagga = () => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoElement,
            constraints: {
              facingMode: "environment",
            },
          },
          decoder: {
            readers: ["code_128_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error("Error initializing Quagga:", err);
            return;
          }
          console.log("Quagga initialized successfully");
          Quagga.start();
          isQuaggaRunning.current = true; // Set flag to true when running
        }
      );
    };

    // Use requestAnimationFrame to ensure the DOM is ready
    requestAnimationFrame(() => {
      setTimeout(initQuagga, 500);
    });

    // Cleanup function
    return () => {
      if (isQuaggaRunning.current) {
        Quagga.offProcessed(); // Remove event listeners
        Quagga.offDetected();
        Quagga.stop();
        isQuaggaRunning.current = false; // Set flag to false when stopped
        console.log("Quagga stopped");
      }
    };
  }, []); // Run effect only on mount/unmount

  return (
    <div>
      <div>
        <video ref={videoRef} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default BarcodeScanner;
