
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.post('/', function (req, res) {
    console.log("BODY ",req.body);
  if(req.body.queryResult.intent.displayName == "test"){
    console.log("ddd");
    res.json({
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "this is a simple response"
            }
          }
        ]
      }
    }
  }
});
  }
  else if(req.body.queryResult.intent.displayName =="Ticket"){
    res.json(
      {
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Howdy! I can tell you fun facts about almost any number, like 42. What do you have in mind?",
                                    "displayText": "Howdy! I can tell you fun facts about almost any number. What do you have in mind?"
                                }
                            }
                        ]
                        
                    }
                }
                
            }
        ]
    }
    )
  }  
  });
app.listen(process.env.PORT, () => console.log("listening.."));
