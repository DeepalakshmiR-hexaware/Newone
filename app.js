
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonData = require('./list.json');
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
                  // "ssml":"<speak>tested <break time=\"500ms\"/><say-as interpret-as=\"characters\">SSML</say-as></speak>",
                  "textToSpeech":"tested"
                  // "displayText": "tested"
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
 else if(req.body.queryResult.intent.displayName == "BookingList"){
  

   var listItems = [];
   for( var i=0; i<jsonData.Bookings.length; i++){     
      listItems.push({
        "optionInfo": {
          "key": jsonData.Bookings[i].id
        },
        "description": "FROM:"+jsonData.Bookings[i].from+"TO:"+jsonData.Bookings[i].to,

        "title":jsonData.Bookings[i].TicketType
      });   
   }
   
   console.log(JSON.stringify(listItems));
   var hal=res.json(
    {
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "Here your's booking list"
                }
              }
            ]
          },
          "systemIntent": {
            "intent": "actions.intent.OPTION",
            "data": {
              "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
              "listSelect": {
                "title": "Hello",
                
                "items":listItems
              }
            }
          }
        }
      }
    }
    
   )
 }
  });
app.listen(process.env.PORT, () => console.log("listening.."));





