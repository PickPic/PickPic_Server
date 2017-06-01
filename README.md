# PickPic_Server

# set up

We also support Windows OS, but we recommend Ubuntu OS.

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
    
    npm install

#	run server

    Enter “sudo node server.js” to execute server
