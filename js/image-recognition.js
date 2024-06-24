// image-recognition.js

document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById('upload-input');
    const imageUploadButton = document.getElementById('image-upload');
    const captureButton = document.getElementById('capture-button');
    const cameraPreview = document.getElementById('camera-preview');
    const cameraCanvas = document.getElementById('camera-canvas');
    const resultText = document.getElementById('result-text');
    let stream = null;

    // Handle image upload
    imageUploadButton.addEventListener('click', () => {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', () => {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                displayImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle camera functionality
    captureButton.addEventListener('click', async () => {
        if (stream) {
            // Capture the image from the video stream
            const context = cameraCanvas.getContext('2d');
            cameraCanvas.width = cameraPreview.videoWidth;
            cameraCanvas.height = cameraPreview.videoHeight;
            context.drawImage(cameraPreview, 0, 0, cameraCanvas.width, cameraCanvas.height);
            const imageDataUrl = cameraCanvas.toDataURL('image/png');
            displayImage(imageDataUrl);
            stopCamera();
        } else {
            // Start the camera
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                cameraPreview.srcObject = stream;
                cameraPreview.style.display = 'block';
                cameraCanvas.style.display = 'none';
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        }
    });

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            cameraPreview.style.display = 'none';
        }
    }

    function displayImage(imageDataUrl) {
        cameraPreview.style.display = 'none';
        cameraCanvas.style.display = 'block';
        const context = cameraCanvas.getContext('2d');
        const image = new Image();
        image.onload = () => {
            cameraCanvas.width = image.width;
            cameraCanvas.height = image.height;
            context.drawImage(image, 0, 0);
        };
        image.src = imageDataUrl;
    }
});
