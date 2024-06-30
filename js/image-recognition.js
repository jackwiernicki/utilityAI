document.addEventListener("DOMContentLoaded", () => {
    const captureButton = document.getElementById('capture-button');
    const cameraPreview = document.getElementById('camera-preview');
    const cameraCanvas = document.getElementById('camera-canvas');
    const resultText = document.getElementById('result-text');
    let stream = null;

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Hide capture button if on mobile device
        captureButton.style.display = 'none';
    }

    // Start the camera
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraPreview.srcObject = stream;
            cameraPreview.style.display = 'block';
            cameraCanvas.style.display = 'none';
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    }

    // Capture the image from the video stream
    function captureImage() {
        if (stream) {
            const context = cameraCanvas.getContext('2d');
            cameraCanvas.width = cameraPreview.videoWidth;
            cameraCanvas.height = cameraPreview.videoHeight;
            context.drawImage(cameraPreview, 0, 0, cameraCanvas.width, cameraCanvas.height);
            const imageDataUrl = cameraCanvas.toDataURL('image/png');
            displayImage(imageDataUrl);
        }
    }

    function displayImage(imageDataUrl) {
        cameraPreview.style.display = 'none';
        cameraCanvas.style.display = 'block';
        
        const context = cameraCanvas.getContext('2d');
        const image = new Image();
        image.onload = () => {
            const maxWidth = document.getElementById('image-recognition-container').offsetWidth;
            const maxHeight = document.getElementById('image-recognition-container').offsetHeight;

            // Calculate the new image dimensions to fit within the container
            let width = image.width;
            let height = image.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            cameraCanvas.width = width;
            cameraCanvas.height = height;

            context.drawImage(image, 0, 0, width, height);
        };
        image.src = imageDataUrl;
    }

    // Event listeners
    captureButton.addEventListener('click', captureImage);

    // Start the camera on page load
    startCamera();
});


