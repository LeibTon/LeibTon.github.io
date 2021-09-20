 
const video = document.getElementById('webcam');
const image_dis = document.getElementById('display_image');
const instruction = document.getElementById('caminstruct');
const liveView = document.getElementById('liveView');
const enableWebcamButton = document.getElementById('webcamButton');
const instructionText = document.getElementById("camiText");
// const webcam_canvas = document.getElementById('webcam_canvas');
// const cam_ctx = webcam_canvas.getContext('2d');
const width = 640
const height = 480
var model = undefined;
var model_emotion = undefined;

// Error fallback when webcam access is denied.
var errorCallback = function(error) {
  if (error.name == 'NotAllowedError') {instructionText.innerHTML = "Webcam Access Not Allowed";}
	else if(error.name == 'PermissionDismissedError')  {instructionText.innerHTML = "Permission Denied. Please provide Webcam Access."; }

};

// Function to handle enableWebcamButton click.
// Takes video feed and the call predictWebcam function.
function enableCam(event) {
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    audio: false,
		video: { width: width, height: height },
  };
  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
		instruction.style.display = "none";
		document.getElementById("cam_chart_main").style.left = 0;
    video.addEventListener('loadeddata', predictWebcam);
		cameraaccess = true;
  })
	.catch(errorCallback)
}

//The main functioning starts from here. Check if webcam is supported/acceesible or not.
// Then loads the models and then wait for webcam permission.
// Check if webcam access is supported.

function getUserMediaSupported() {
  return (navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
if (getUserMediaSupported()) {

	if(model && model_emotion){
	enableWebcamButton.style.display = "inline-flex";
	instructionText.innerHTML = "Please provide Webcam Access."
}

	else{
	blazeface.load().then(function (loadedModel) {
  model = loadedModel;
	if(model_emotion)
 {
	 enableWebcamButton.style.display = "inline-flex";
	instructionText.innerHTML = "Please provide Webcam Access."
}
});

tf.loadLayersModel('model/model.json', false).then(function (loadedModel) {
  model_emotion = loadedModel;
	if(model)
 {
	 enableWebcamButton.classList.remove("removed");
	instructionText.innerHTML = "Please provide Webcam Access."
}
});
	}
	 enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
	instructionText	.innerHTML = "getUserMedia() is not supported by your browser"
}

/*For code debigging*/
/*
	if(model && model_emotion){
	enableWebcamButton.style.display = "inline-flex";
	instructionText.innerHTML = "Please provide Webcam Access."
}

	else{
	blazeface.load().then(function (loadedModel) {
  model = loadedModel;
	if(model_emotion)
 {
	video.src = "video.mp4"
		document.getElementById("cam_chart_main").style.left = 0;
video.addEventListener('loadeddata', predictWebcam);

}
});

tf.loadLayersModel('model/model.json', false).then(function (loadedModel) {
  model_emotion = loadedModel;
	if(model)
 {
	 video.src = "video.mp4"
		document.getElementById("cam_chart_main").style.left = 0;
video.addEventListener('loadeddata', predictWebcam);
}
});
	}*/
var count = 1
function predictWebcam() {
	count+=1
  // Now let's start classifying a frame in the stream.
	const video_temp = video
  model.estimateFaces(video_temp).then(function (predictions) {
		if(predictions.length === 1)
	{
		landmark = predictions[0]['landmarks'];
		nosex = landmark[2][0];
		nosey = landmark[2][1];
		right = landmark[4][0];
		left = landmark[5][0];
		length = (left-right)/2 + 5;
		x1 = (nosex - length)/width
		x2 = (nosex + length)/width
		y1 = (nosey - length)/height
		y2 = (nosey + length)/height
		//Cropping the image.
		var tensor = tf.browser.fromPixels(video_temp).mean(2).toFloat().expandDims(0).expandDims(-1)
		var image_tensor= tf.image.cropAndResize(tensor, tf.tensor2d([[x1, y1, x2, y2]]), [0], [48, 48], "bilinear" )
		//Image is converted to tensor, resized, toBlackandWhite, then additional dimesion are added to match with [1, 48, 48, 1].
		//PIxels converted to image to check if the image is correct or not.
	tf.browser.toPixels(image_tensor.squeeze(0).squeeze(-1).div(tf.scalar(255)).clipByValue(0, 1)
    .mul(tf.scalar(255)) // floats automatically are multiplied by toPixels
    .cast('int32'), image_dis) //image_dis    -------->   img element.

			//Predicting from image.
		const result = model_emotion.predict(image_tensor);
		const predictedValue = result.arraySync();
		document.getElementById("angry").style.width = 100*predictedValue['0'][0]+"%";
		document.getElementById("disgust").style.width = 100*predictedValue['0'][1]+"%";
		document.getElementById("fear").style.width = 100*predictedValue['0'][2]+"%";
		document.getElementById("happy").style.width = 100*predictedValue['0'][3]+"%";
		document.getElementById("sad").style.width = 100*predictedValue['0'][4]+"%";
		document.getElementById("surprise").style.width = 100*predictedValue['0'][5]+"%";
		document.getElementById("neutral").style.width = 100*predictedValue['0'][6]+"%";
	}
    // Call this function again to keep predicting when the browser is ready.
    if(count<100)
    window.requestAnimationFrame(predictWebcam);
  });
}
