
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.post('/', function (req, res) {
    console.log("BODY ",req.body);
  if(req.body.queryResult.intent.displayName == "test"){
    res.json({
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech":"tested",
                  "displayText": "tested"
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
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Provide depart date",
                    "displayText": "Provide depart date"
                  }
                }
              ]
            }
          }
        }
      }
     
    )
  } 
  else if(req.body.queryResult.action == "Ticket.Ticket-custom" ){
  console.log("DD",JSON.stringify(req.body));
  var ticketObj;
  for(var i=0; i<req.body.queryResult.outputContexts.length; i++){
    if(req.body.queryResult.outputContexts[i].name.includes("ticket-followup")){
      ticketObj = ticket-followup ;
    }
  }
    res.json(
      {
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Please, confirm"
                  }
                },
                {
                  "basicCard": {
                    "title": "Booking process",
                    "subtitle":ticketObj.parameters.ticketType,
                    "formattedText":ticketObj.parameters.ticketType
                  }
                }
              ]
            }
          }
        }
      }

    )
  } 
  });
app.listen(process.env.PORT, () => console.log("listening.."));





