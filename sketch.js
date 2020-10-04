// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier;

const options = { probabilityThreshold: 0.9 };

// Teachable Machine model URL:
let soundModel = './model/';


// Label (start by showing listening)
let label = "開始收音";

// Teachable Machine model URL:

let soundModelURL = 'https://city535353.github.io/frogdetect/model/model.json';
//file:///D:/桌面/學校公務/108/108-2/智在家鄉/html/model/model.json
//https://city535353.github.io/frogdetect/model/model.json  原網址

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL,options,modelready);
}

function modelready() {
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  ThunkableWebviewerExtension.postMessage(label);
  text(label, width / 2, height / 2);
  
  
}
var countType = 0;
var TimeCount = 0;
var TimeID;
var ani;
// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]); results[0].label
  if(results[0].label == 'mose') {
    label = "莫式樹蛙";
  }else if(results[0].label == 'taipei'){
	  label = "台北樹蛙";
  }else if(results[0].label == 'draw'){
	  label = "諸羅樹蛙" ;
  }

  //如果辨識結果有東西
  if(results[0].label != null){
    TimeID = setInterval(Time(results[0].label),500);//每0.5秒進Time function，
  }
  //label = results[0].label;

}

function Time(targ){
  //尚未到達5秒時
  if(TimeCount%10 != 0 && TimeCount != 0){
    TimeCount+=1;//訪問計數加1
    if(ani == targ){
      countType += 1;
    }else{
      ani = targ;//ani變數等於預測的結果
    }
    
    if(TimeCount%10 == 0){//當訪問達5秒時
      //傳送資料
      recordurl = "http://210.240.203.166/test1/record.aspx?lid="+ lid +"&freq="+countType;
      PostData();
      //停止計時
      clearInterval(TimeID);
    }
  }
}
function PostData(){
    var requ = new XMLHttpRequest();
    requ.open("GET",myurl);
    requ.onload=function(){
    };
    requ.send();
  }


