import React from 'react';
type Size = {
    width: number;
    height: number;
};
interface CropperProps {
    image: string;
    onCropAreaChange?: (croppedImage: string) => void;
    onSubmit: (croppedImage: string) => void;
    onSubmitBtnText?: string;
    shape?: 'rect' | 'round';
    borderType?: 'dashed' | 'solid';
    borderColor?: string;
    dotColor?: string;
    minZoom?: number;
    maxZoom?: number;
    zoomSpeed?: number;
    zoomable?: boolean;
    cropSize?: Size;
    classes?: {
        containerClassName?: string;
        mediaClassName?: string;
        cropAreaClassName?: string;
        buttonsClassName?: string;
    };
    objectFit?: '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
declare const CropperComponent: React.FC<CropperProps>;
export default CropperComponent;
