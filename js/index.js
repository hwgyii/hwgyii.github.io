//DELAYING BUTTONS
window.onload = function() {
    setTimeout(buttonShow, 5000);
}

//SHOWING BUTTONS
function buttonShow() {
    document.getElementById("button_container").className = "show";
}

//ADDING THE CAMERA TO GET PICTURE FOR DATABASE
document.getElementById("no").addEventListener("click", function() {
    const div = document.getElementById("button_container");
    div.remove();

    const video = document.createElement("video");
    video.autoplay = true;
    video.id = "videoElement";
    document.getElementById("video_container").append(video);

    const open_camera = document.createElement("button");
    open_camera.id = "open_camera";
    open_camera.innerHTML = "Open Camera";
    open_camera.style.marginLeft = "auto";
    open_camera.style.marginRight = "auto";
    document.getElementById("video_container").append(open_camera);

    const input_name = document.createElement("input");
    input_name.type = "text";
    input_name.placeholder = "Pangalan mo boi...";
    input_name.id = "user_name";
    input_name.required = true;
    document.getElementById("video_container").append(input_name);

    const submit = document.createElement("button");
    submit.id = "submit_button";
    submit.innerHTML = "Submit";
    document.getElementById("video_container").append(submit);


})

//FOR CAMERA, TO OPEN IT
document.addEventListener('click',function(e){
    if (e.target && e.target.id == "open_camera") {
        var video = document.querySelector("#videoElement");
        console.log("clicked");
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
              video.srcObject = stream;
            })
            .catch(function (err0r) {
              console.log("Something went wrong!");
            });
        }
    }

    if (e.target && e.target.id == "submit_button") {
      const canvas = document.createElement("canvas");

      canvas.width = document.getElementById("videoElement").videoWidth;
      canvas.height = document.getElementById("videoElement").videoHeight;
      canvas.getContext("2d").drawImage(document.getElementById("videoElement"), 0, 0);

      const link = document.createElement("a");

      var d = new Date();
      var n = d.getTime();
      console.log(n);
      link.download = n + ".png";
      link.href = canvas.toDataURL();

      link.click();
      link.delete;
    }
})