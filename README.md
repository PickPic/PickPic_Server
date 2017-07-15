# PickPic
Pick is a gallery application that helps you to search and manage by automatically generating tags related to images using machine learning technology.  

<img src="https://avatars4.githubusercontent.com/u/26853221?v=4&s=200" width="200">  

# Introduce

PickPic Server is a server that analyzes images and returns tags.

You need to send the image in form-data format to the 8080 port of /upload in post format.

It analyzes objects, dominant color and text, and makes them into tags.

PickPic Server use Inception V3 as object recognition model that trained for the ImageNet Large Visual Recognition Challenge using the data from 2012. (https://goo.gl/U8QG8m)

# set up

We also support Windows OS, but we recommend Ubuntu OS.

## 0. get PickPic_Server source code

Click the download button above to download it or type the command below
        
        git clone https://github.com/PickPic/PickPic_Server.git

## 1. set up python
PickPic_Server use Tensorflow for Python, so you need to set up python and Tensorflow for python.

    To set up python: https://www.python.org/
    To set up Tensorflow: https://www.tensorflow.org/install/

## 2. set up node js
  PickPic_Server is node js server, so you need to set up node js.
  
      use https://nodejs.org/

## 3. set up tesseract-ocr
To extract text from image, so you need to set up tesseract-ocr.
    
    sudo apt-get install tesseract-ocr
    sudo apt-get install tesseract-ocr-eng

*if you want detect more language from image, then

see "https://ubuntu.flowconsult.at/linux/ocr-tesseract-text-recognition-ubuntu-14-04/" and "https://github.com/tesseract-ocr/langdata"

*if you are not linux, then see "https://github.com/tesseract-ocr/tesseract/wiki")

## 4. set up modules to node js
PickPic_Server use variable modules for ndoe js, so you need to set up modules for nodejs.
    
    cd PickPic_server/nodeserver
    npm install

# PickPic Client
    If you want use PickPic Client, then come with "https://github.com/PickPic/PickPic_Client"

#	run server

    Enter “sudo node server.js” to execute server
