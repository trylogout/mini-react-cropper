# Mini React Cropper

Mini React Cropper is a versatile image cropping component for React applications. It allows users to select and crop a specific area of an image, providing various customization options such as shape, border type, zooming, and more.

<div align="center">
  <img src="assets/mini-cropper.png" alt="drawing" width="400" alt="mini-react-cropper-preview"/>
</div>

## Features

- Easy-to-use and intuitive image cropping functionality.
- Support for rectangular or round cropping shapes.
- Configurable border type, color, and dot color.
- Zoom in and zoom out options with customizable zoom levels.
- Ability to specify minimum and maximum zoom levels.
- Drag and resize functionality for the crop area.
- Callbacks for capturing cropped image data.
- Customizable styles and classes for easy integration with your project's UI.

## Installation

To install the Mini React Cropper, use npm or yarn:

```shell
npm install mini-react-cropper
```

or

```shell
yarn add mini-react-cropper
```

## Usage

Here's a basic example demonstrating how to use the Cropper Component in your React application:

```tsx
import React from 'react';
import MiniCropper from 'mini-react-cropper';

const App = () => {
  const handleSubmit = (croppedImage) => {
    // Handle the cropped image data base64
    console.log('Cropped Image:', croppedImage);
  };

  return (
    <div>
      <h1>Image Cropper Demo</h1>
      <MiniCropper image='base64image' onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
```

For detailed usage instructions and available props, please refer to the documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## Package Information

[![NPM](https://nodei.co/npm/mini-react-cropper.png?compact=true)](https://nodei.co/npm/mini-react-cropper/)


## License

This package is open source and available under the [MIT License](./LICENSE).
