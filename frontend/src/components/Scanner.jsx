import { useCallback, useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

function getMedian(arr) {
    const newArr = [...arr];
    newArr.sort((a, b) => a - b);
    const half = Math.floor(newArr.length / 2);
    if (newArr.length % 2 === 1) {
        return newArr[half];
    }
    return (newArr[half - 1] + newArr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.flatMap((x) => x.error);
    return getMedian(errors);
}

const defaultConstraints = {
    width: 640,
    height: 480,
};

const defaultLocatorSettings = {
    patchSize: 'medium',
    halfSample: true,
};

const defaultDecoders = ['ean_reader', 'upc_reader'];

const Scanner = forwardRef(({
    onDetected,
    scannerRef,
    onScannerReady,
    cameraId,
    facingMode,
    constraints = defaultConstraints,
    locator = defaultLocatorSettings,
    decoders = defaultDecoders,
    locate = true,
}, ref) => {
    const isInitializedRef = useRef(false);

    const errorCheck = useCallback((result) => {
        if (!onDetected) return;
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        if (err < 0.25) {
            onDetected(result.codeResult.code);
        }
    }, [onDetected]);

    const handleProcessed = (result) => {
        /**const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillStyle = 'green';

        if (result?.boxes) {
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            result.boxes
                .filter((box) => box !== result.box)
                .forEach((box) => Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 }));

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
            }
        }

        if (result?.codeResult?.code) {
            drawingCtx.fillText(result.codeResult.code, 10, 20);
        }**/
    };

    const startScanner = async () => {
        if (isInitializedRef.current) return;

        await Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    ...constraints,
                    ...(cameraId && { deviceId: cameraId }),
                    ...(!cameraId && { facingMode }),
                },
                target: scannerRef.current,
            },
            locator,
            decoder: { readers: decoders },
            locate,
        }, (err) => {
            if (err) {
                console.error('Error starting Quagga:', err);
                return;
            }
            Quagga.onProcessed(handleProcessed);
            Quagga.onDetected(errorCheck);
            Quagga.start();
            isInitializedRef.current = true;
            if (onScannerReady) onScannerReady();
        });
    };

    const stopScanner = () => {
        if (!isInitializedRef.current) return;

        Quagga.stop();
        Quagga.offDetected(errorCheck);
        Quagga.offProcessed(handleProcessed);
        isInitializedRef.current = false;
    };

    useImperativeHandle(ref, () => ({
        startScanner,
        stopScanner,
    }));

    useLayoutEffect(() => () => stopScanner(), [errorCheck, handleProcessed]);

    return null;
});

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired,
    scannerRef: PropTypes.object.isRequired,
    onScannerReady: PropTypes.func,
    cameraId: PropTypes.string,
    facingMode: PropTypes.string,
    constraints: PropTypes.object,
    locator: PropTypes.object,
    decoders: PropTypes.array,
    locate: PropTypes.bool,
};

export default Scanner;
