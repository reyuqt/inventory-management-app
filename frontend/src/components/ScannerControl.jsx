import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Scanner from './Scanner';

const ScannerControl = forwardRef(({ onScanResult }, ref) => {
    const scannerRef = useRef(null);
    const scannerComponentRef = useRef(null);

    const startScanner = () => {
        if (scannerComponentRef.current) {
            scannerComponentRef.current.startScanner();
        }
    };

    const stopScanner = () => {
        if (scannerComponentRef.current) {
            scannerComponentRef.current.stopScanner();
        }
    };

    const handleDetected = (result) => {
        if (onScanResult) {
            onScanResult(result);
        }
        stopScanner(); // Optionally stop scanning after detection
    };

    useImperativeHandle(ref, () => ({
        startScanner,
        stopScanner
    }));

    return (
        <div>
            <div
                ref={scannerRef}
            />
            <Scanner
                ref={scannerComponentRef}
                scannerRef={scannerRef}
                onDetected={handleDetected}
            />
        </div>
    );
});

export default ScannerControl;
