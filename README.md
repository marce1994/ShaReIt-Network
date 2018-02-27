# DEMO(Autodeployed -> not working now) http://shareitalpha.herokuapp.com/

# ShaReIt (Still in brainstorming and development).
  - p2p Share magnet link application.
  - Real time actualizations via socket.io
  - Real time webs and other nodes db sync.
  - Customizable and modular.
  - SteemIt like system to earn money with like(maybe some day).
  
# How to start

  - CLONE THE REPOSITORY
  - npm install
  - node app.js

# Adding new posts (DEPRECATED)
  - open http://localhost:8080/
  - postman to http://localhost:8080/api/upload with the next body
  
  ```json
  {
  "title" : "A very special title",
  "imgLink": "http://someimage.com/something.png",
  "magnet" : "magnet:?xt=urn:sha1:PDAQRAOQQRYS76MRZJ33LK4MMVZBDSCL",
  "description" : "Put some description here"
}
```
  - Ready, u can see real time posting in your web, and if there is another one in other server connected and peeared u can see it in that too. :)

If u are interested in make contributions, you are welcome :)
