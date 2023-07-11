"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CropperComponent = function (_a) {
    var image = _a.image, onSubmit = _a.onSubmit, _b = _a.onCropAreaChange, onCropAreaChange = _b === void 0 ? function () { } : _b, _c = _a.onSubmitBtnText, onSubmitBtnText = _c === void 0 ? 'Save' : _c, _d = _a.shape, shape = _d === void 0 ? 'rect' : _d, _e = _a.borderType, borderType = _e === void 0 ? 'dashed' : _e, _f = _a.borderColor, borderColor = _f === void 0 ? '#000' : _f, _g = _a.dotColor, dotColor = _g === void 0 ? borderColor : _g, _h = _a.minZoom, minZoom = _h === void 0 ? 0.5 : _h, _j = _a.maxZoom, maxZoom = _j === void 0 ? 2 : _j, _k = _a.zoomSpeed, zoomSpeed = _k === void 0 ? 0.1 : _k, _l = _a.zoomable, zoomable = _l === void 0 ? true : _l, _m = _a.cropSize, cropSize = _m === void 0 ? { width: 200, height: 200 } : _m, _o = _a.classes, classes = _o === void 0 ? {
        containerClassName: 'cropper-container',
        mediaClassName: 'cropper-media',
        cropAreaClassName: 'cropper-drag-handle',
        buttonsClassName: 'cropper-action',
    } : _o, _p = _a.objectFit, objectFit = _p === void 0 ? 'contain' : _p;
    var _q = (0, react_1.useState)({
        x: 0,
        y: 0,
        width: cropSize.width,
        height: cropSize.height,
    }), cropperData = _q[0], setCropperData = _q[1];
    var _r = (0, react_1.useState)(''), croppedImage = _r[0], setCroppedImage = _r[1];
    var imageRef = (0, react_1.useRef)(null);
    var cropperContainerRef = (0, react_1.useRef)(null);
    var dragHandleRef = (0, react_1.useRef)(null);
    var _s = (0, react_1.useState)(1), zoomLevel = _s[0], setZoomLevel = _s[1];
    var handleMouseMove = null; // For drag and drop mouse click position control
    var styleOptions = {
        borderRadius: shape === 'rect' ? '0px' : '999px',
        top: shape === 'rect'
            ? "calc(".concat(cropperData.y, "px + ").concat(cropperData.height, "px - 6px)")
            : "calc(".concat(cropperData.y, "px + ").concat(cropperData.height, "px * 0.85)"),
        left: shape === 'rect'
            ? "calc(".concat(cropperData.x, "px + ").concat(cropperData.width, "px - 6px)")
            : "calc(".concat(cropperData.x, "px + ").concat(cropperData.width, "px * 0.85)"),
    };
    (0, react_1.useEffect)(function () {
        var imageElement = imageRef.current;
        var cropperContainerElement = cropperContainerRef.current;
        var dragHandleElement = dragHandleRef.current;
        var calculateInitialCropperData = function () {
            if (imageElement && cropperContainerElement && dragHandleElement) {
                var containerWidth = cropperContainerElement.offsetWidth;
                var containerHeight = cropperContainerElement.offsetHeight;
                var imageAspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
                var containerAspectRatio = containerWidth / containerHeight;
                var width = containerWidth;
                var height = containerHeight;
                var x = 0;
                var y = 0;
                if (imageAspectRatio > containerAspectRatio) {
                    height = containerWidth / imageAspectRatio;
                    y = (containerHeight - height) / 2;
                }
                else {
                    width = containerHeight * imageAspectRatio;
                    x = (containerWidth - width) / 2;
                }
                setCropperData({ x: x, y: y, width: width, height: height });
                // Adjust drag handle size
                var handleSize = Math.min(width, height) / 6;
                dragHandleElement.style.width = "".concat(handleSize, "px");
                dragHandleElement.style.height = "".concat(handleSize, "px");
            }
        };
        calculateInitialCropperData();
        window.addEventListener('resize', calculateInitialCropperData);
        return function () {
            window.removeEventListener('resize', calculateInitialCropperData);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var imageElement = imageRef.current;
        if (imageElement) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            if (ctx) {
                var scale = imageElement.naturalWidth / (imageElement.width * zoomLevel);
                var x = cropperData.x, y = cropperData.y, width = cropperData.width, height = cropperData.height;
                canvas.width = width * scale;
                canvas.height = height * scale;
                ctx.drawImage(imageElement, x * scale, y * scale, width * scale, height * scale, 0, 0, width * scale, height * scale);
                var dataUrl = canvas.toDataURL();
                onCropAreaChange(dataUrl);
                setCroppedImage(dataUrl);
            }
        }
    }, [cropperData, zoomLevel]);
    var handleDragStart = function (event) {
        event.preventDefault();
        var initialMouseX = event.clientX;
        var initialMouseY = event.clientY;
        var initialCropperX = cropperData.x;
        var initialCropperY = cropperData.y;
        handleMouseMove = function (event) {
            return handleDragMove(event, initialMouseX, initialMouseY, initialCropperX, initialCropperY);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleDragEnd);
    };
    var handleDragMove = function (event, initialMouseX, initialMouseY, initialCropperX, initialCropperY) {
        event.preventDefault();
        var imageElement = imageRef.current;
        var cropperContainerElement = cropperContainerRef.current;
        if (imageElement && cropperContainerElement) {
            var width = cropperData.width, height = cropperData.height;
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            var maxX = cropperContainerElement.offsetWidth - width;
            var maxY = cropperContainerElement.offsetHeight - height;
            var clampedX_1 = Math.max(0, Math.min(maxX, initialCropperX + mouseX - initialMouseX));
            var clampedY_1 = Math.max(0, Math.min(maxY, initialCropperY + mouseY - initialMouseY));
            setCropperData(function (prevData) { return (tslib_1.__assign(tslib_1.__assign({}, prevData), { x: clampedX_1, y: clampedY_1 })); });
        }
    };
    var handleDragEnd = function () {
        if (handleMouseMove) {
            document.removeEventListener('mousemove', handleMouseMove);
            handleMouseMove = null;
        }
        document.removeEventListener('mouseup', handleDragEnd);
    };
    var handleResizeStart = function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
    };
    var handleResizeMove = function (event) {
        event.preventDefault();
        var imageElement = imageRef.current;
        var cropperContainerElement = cropperContainerRef.current;
        if (imageElement && cropperContainerElement) {
            var containerRect = cropperContainerElement.getBoundingClientRect();
            var newWidth = event.clientX - containerRect.left - cropperData.x;
            var newHeight = event.clientY - containerRect.top - cropperData.y;
            var x = cropperData.x, y = cropperData.y;
            var clampedWidth_1 = Math.max(0, Math.min(newWidth, containerRect.width - x));
            var clampedHeight_1 = Math.max(0, Math.min(newHeight, containerRect.height - y));
            setCropperData(function (prevData) { return (tslib_1.__assign(tslib_1.__assign({}, prevData), { width: clampedWidth_1, height: clampedHeight_1 })); });
        }
    };
    var handleResizeEnd = function () {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
    };
    var handleZoomIn = function () {
        setZoomLevel(function (prevZoomLevel) { return Math.min(prevZoomLevel + zoomSpeed, maxZoom); });
    };
    var handleZoomOut = function () {
        setZoomLevel(function (prevZoomLevel) { return Math.max(prevZoomLevel - zoomSpeed, minZoom); });
    };
    var handleSave = function () {
        onSubmit(croppedImage);
    };
    return (react_1.default.createElement("div", { className: classes.containerClassName || 'cropper-container', ref: cropperContainerRef },
        react_1.default.createElement("div", { className: 'cropper-image', style: { position: 'relative', overflow: 'hidden' } },
            react_1.default.createElement("img", { src: image, alt: 'Crop', ref: imageRef, className: classes.mediaClassName || 'cropper-media', style: {
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    top: 0,
                    left: 0,
                    transform: "scale(".concat(zoomLevel, ")"),
                    transformOrigin: 'top left',
                    backfaceVisibility: 'hidden',
                    objectFit: "".concat(objectFit),
                } }),
            react_1.default.createElement("div", { className: classes.cropAreaClassName || 'cropper-drag-handle', style: {
                    position: 'absolute',
                    top: "".concat(cropperData.y, "px"),
                    left: "".concat(cropperData.x, "px"),
                    width: "".concat(cropperData.width, "px"),
                    height: "".concat(cropperData.height, "px"),
                    maxWidth: '100%',
                    maxHeight: '100%',
                    border: "1px ".concat(borderType, " ").concat(borderColor),
                    pointerEvents: 'initial',
                    cursor: 'move',
                    zIndex: 2,
                    borderRadius: "".concat(styleOptions.borderRadius),
                    boxShadow: '0 0 0 1600px rgba(0,0,0,0.65)' /* dark around it */,
                }, onMouseDown: handleDragStart }),
            react_1.default.createElement("div", { className: 'cropper-resize-handle', style: {
                    position: 'absolute',
                    top: "".concat(styleOptions.top),
                    left: "".concat(styleOptions.left),
                    width: '12px',
                    height: '12px',
                    cursor: 'nwse-resize',
                    backgroundColor: "".concat(dotColor),
                    border: '1px solid #000',
                    borderRadius: "".concat(styleOptions.borderRadius),
                    zIndex: 2,
                }, onMouseDown: handleResizeStart })),
        react_1.default.createElement("div", { className: 'cropper-actions' },
            zoomable && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("button", { className: classes.buttonsClassName || 'cropper-action', onClick: handleZoomIn }, "Zoom In"),
                react_1.default.createElement("button", { className: classes.buttonsClassName || 'cropper-action', onClick: handleZoomOut }, "Zoom Out"))),
            react_1.default.createElement("button", { className: classes.buttonsClassName || 'cropper-action', onClick: handleSave }, onSubmitBtnText))));
};
exports.default = CropperComponent;
