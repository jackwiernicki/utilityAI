
    document.addEventListener("DOMContentLoaded", () => {
        const startCameraButton = document.getElementById('start-camera-button');
        const captureButton = document.getElementById('capture-button');
        const switchCameraButton = document.getElementById('switch-camera-button');
        const cameraPreview = document.getElementById('camera-preview');
        const cameraCanvas = document.getElementById('camera-canvas');
        const resultText = document.getElementById('result-text');
        let stream = null;
        let currentFacingMode = 'environment';
    

        const azureEndpoint = 'https://jack-sandbox-computer-vision.cognitiveservices.azure.com/';
        const subscriptionKey = 'ece73dc932284d078559087efb2be5fd';
    
        // Start the camera
        async function startCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
    
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: currentFacingMode
                    }
                });
                cameraPreview.srcObject = stream;
                cameraPreview.style.display = 'block';
                captureButton.style.display = 'block';
                switchCameraButton.style.display = 'block';
                cameraCanvas.style.display = 'none';
                resultText.innerText = ''; // Clear any previous result
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        }
    
        // Switch between front and back cameras
        function switchCamera() {
            currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
            startCamera();
        }
    
        // Capture the image from the video stream
        async function captureImage() {
            if (stream) {
                const context = cameraCanvas.getContext('2d');
                cameraCanvas.width = cameraPreview.videoWidth;
                cameraCanvas.height = cameraPreview.videoHeight;
                context.drawImage(cameraPreview, 0, 0, cameraCanvas.width, cameraCanvas.height);
                const imageDataUrl = cameraCanvas.toDataURL('image/png');
                await analyzeImage(imageDataUrl);
            }
        }
    
        async function analyzeImage(imageDataUrl) {
            try {
                const response = await fetch(`${azureEndpoint}/vision/v3.1/analyze?visualFeatures=Description`, {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey,
                        'Content-Type': 'application/octet-stream'
                    },
                    body: makeBlob(imageDataUrl)
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                console.error("Error analyzing image: ", error);
            }
        }
    
        function makeBlob(dataURL) {
            const BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) === -1) {
                const parts = dataURL.split(',');
                const contentType = parts[0].split(':')[1];
                const raw = decodeURIComponent(parts[1]);
                return new Blob([raw], { type: contentType });
            }
            const parts = dataURL.split(BASE64_MARKER);
            const contentType = parts[0].split(':')[1];
            const raw = window.atob(parts[1]);
            const rawLength = raw.length;
            const uInt8Array = new Uint8Array(rawLength);
    
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
    
            return new Blob([uInt8Array], { type: contentType });
        }
    
        function displayResult(data) {
            if (data && data.description && data.description.captions) {
                resultText.innerText = data.description.captions[0].text;
            } else {
                resultText.innerText = 'No description available.';
            }
        }
    
        // Event listeners
        startCameraButton.addEventListener('click', startCamera);
        captureButton.addEventListener('click', captureImage);
        switchCameraButton.addEventListener('click', switchCamera);
    });
       