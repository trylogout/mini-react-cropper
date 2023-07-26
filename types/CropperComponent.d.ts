import React from 'react';
import './MiniCropperDefaultStyles.scss';
type Size = {
    width: number;
    height: number;
};
interface MiniCropperProps {
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
    processing?: boolean;
    cropSize?: Size;
    classes?: {
        containerClassName?: string;
        mediaClassName?: string;
        cropAreaClassName?: string;
        buttonsClassName?: string;
        buttonZoomInClassName?: string;
        buttonZoomOutClassName?: string;
    };
    objectFit?: '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
declare const MiniCropper: React.FC<MiniCropperProps>;
export default MiniCropper;
