//https://teachablemachine.withgoogle.com/models/eqdGMOfUn/
prediction1 = "";
prediction2 = "";

Webcam.set({
    height: 300,
    width:350,
    image_format: "jpg",
    jpg_quality: 90

})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eqdGMOfUn/model.json", modelloaded );

function modelloaded() { 
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "this is the symbol for" + prediction1;
    
    var utterThis = new SpeechSynthesisUtterance(speakdata1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        
        prediction1 = results[0].label;
        

        speak();

        if( prediction1 == "Victory" ){
            document.getElementById("update_emoji").innerHTML = "&#9996;" ;
        }
        if( prediction1 == "Amazing" ){
            document.getElementById("update_emoji").innerHTML = "&#128072;" ;
        }
        if( prediction1 == "Best" ){
            document.getElementById("update_emoji").innerHTML = "&#128077;" ;
        }
        if( prediction1 == "Stop" ){
            document.getElementById("update_emoji").innerHTML = "&#9995;" ;
        }
        if( prediction1 == "No" ){
            document.getElementById("update_emoji").innerHTML = "&#128078;" ;
        }
        if( prediction1 == "Rock on" ){
            document.getElementById("update_emoji").innerHTML = "&#129304;" ;
        }
        if( prediction1 == "Look!" ){
            document.getElementById("update_emoji").innerHTML = "&#128072;" ;
        }
    }
}