var express = require('express');
var app = express();
var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.post('/', function (req, res) {
    console.log("BODY ",req.body);
  if(req.body.queryResult.intent.displayName == "test"){
    res.json({
        "conversationToken": "",
        "expectUserResponse": true,
        "expectedInputs": [
            {
                "inputPrompt": {
                    "richInitialPrompt": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Howdy! ",
                                    "displayText": "Howdy!"
                                }
                            }
                        ]
                        
                    }
                }
                
            }
        ]
    });
  }
  else if(req.body.queryResult.intent.displayName =="Ticket"){
    res.JSON(
      {
        "conversationToken": "",
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
