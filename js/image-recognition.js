

    document.addEventListener("DOMContentLoaded", () => {


        const startCameraButton = document.getElementById('start-camera-button');
        const imageUpload = document.getElementById('image-upload');
        const capturedImage = document.getElementById('captured-image');
        const resultText = document.getElementById('result-text');
    
        const azureEndpoint = 'https://jack-sandbox-computer-vision.cognitiveservices.azure.com/';
        const key1 = 'ece73dc93'
        const key2 = '2284d07855'
        const key3 = '9087efb2be5fd'
        const  subscriptionKey = key1 + key2 + key3

        // Function to analyze the image
        async function analyzeImage(imageBlob) {
            try {
                const response = await fetch(`${azureEndpoint}/vision/v3.1/analyze?visualFeatures=Description`, {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey,
                        'Content-Type': 'application/octet-stream'
                    },
                    body: imageBlob
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                console.error("Error analyzing image: ", error);
            }
        }
    
        // Function to display the result
        function displayResult(data) {
            if (data && data.description && data.description.captions) {
                resultText.innerText = data.description.captions[0].text;
            } else {
                resultText.innerText = 'No description available.';
            }
        }
    
        // Event listener for when the image is selected
        imageUpload.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                capturedImage.src = imageUrl;
                capturedImage.style.display = 'block';
                resultText.innerText = ''; // Clear any previous result
    
                // Analyze the image
                const imageBlob = await fetch(imageUrl).then(res => res.blob());
                analyzeImage(imageBlob);
            }
        });
    
        // Event listener for the start camera button
        startCameraButton.addEventListener('click', () => {
            imageUpload.click();
        });
    });
    
    