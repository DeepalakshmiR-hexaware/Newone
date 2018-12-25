
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
                  },
                }
              ]
            },
            "systemIntent": {
              "intent": "actions.intent.OPTION",
              "data": {
                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                "carouselSelect": {
                  "items": [
                    {
                      "optionInfo": {
                        "key": "first title"
                      },
                      "description": "first description",
                      "image": {
                        "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                        "accessibilityText": "first alt"
                      },
                      "title": "first title"
                    },
                    {
                      "optionInfo": {
                        "key": "second"
                      },
                      "description": "second description",
                      "image": {
                        "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                        "accessibilityText": "second alt"
                      },
                      "title": "second title"
                    }
                  ]
                }
              }
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
      console.log("good");
      ticketObj = req.body.queryResult.outputContexts[i];
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
                    "subtitle":ticketObj.parameters.TicketType,
                    "formattedText":"FROM:"+ticketObj.parameters.from.name+'\n'
                                    +"TO:"+ticketObj.parameters.to.name+'\n'
                                    +"Class:"+ticketObj.parameters.Class
                  }
                }
              ],
              "suggestions": [
                {
                  "title": "Approve"
                },
                {
                  "title": "Deny"
                }
              ]
            }
          }
        }
      }

    )
  } 
  else if(req.body.queryResult.action == "Ticket.Ticket-custom.Ticket-custom-custom"){
    console.log("JJ",JSON.stringify(req.body));
    if(req.body.queryResult.parameters.success == "Approve"){
    res.json(
      {
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Booking"+req.body.queryResult.parameters.success+"success",
                    "displayText": "Booking "+req.body.queryResult.parameters.success+" success" 
                  }
                }
              ]
            }
          }
        }
      }
     
    )
  } else { 
     res.json(
    {
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "Booking"+req.body.queryResult.parameters.deny+"success",
                  "displayText": "Booking "+req.body.queryResult.parameters.deny+" success" 
                }
              }
            ]
          }
        }
      }
    }
   
  ) }
}
  });
app.listen(process.env.PORT, () => console.log("listening.."));





