song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

song1_status = "";
song2_status = "";


function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("song.mp3");
    
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}

function draw(){
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill(red);
    stroke(blue);
    if(ScoreLefttWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song1_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "song 2 is playing";
        }
    }

    if(ScoreRighttWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song2_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "song 1 is playing";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}


function modelloaded(){
    console.log("model is initialized");
}

function gotposes(results){
    if(results.length > 0){
       console.log(results);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;

       console.log("left wrist x= " + leftWristX + ",left wrist y = " + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;

       console.log("right wrist x= " + rightWristX + ",right wrist y = " + rightWristY); 
    }
}

