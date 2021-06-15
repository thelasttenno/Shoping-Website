const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const session = require("./../lib/session");
require("dotenv").config();

//JWT module
var jwt = require("jsonwebtoken");

//navigation-graph-recorder
// worker process for recording session data to file,
//  sleeps for 1hr between saves this is slightly shorter than the session expiry
//  timeframe to ensure no data loss on cache gc.
const indexFilePath = "./Data/session/session-index.json";
const historyFilePath = "./Data/session/session-history.json";

//API Endpoints
exports.createSessionHandler = (req, res, cache) => {
  /* req
   * req.params.savedSessionId,          //unless this var is null or empty, use it as the session id when creating a new session.
   */
  //
  //check if token is provided by request, if not, generate a new one.
  let newSessionId = "";
  if (typeof req.body.savedSessionId !== "undefined") {
    if (req.body.savedSessionId !== null && req.body.savedSessionId !== "") {
      //Is set by request
      newSessionId = req.body.savedSessionId;
    } else {
      //is not set by request
      newSessionId = uuidv4();
    }
  } else {
    newSessionId = uuidv4();
  }
  console.log("newSessionId:", newSessionId);
  //
  session.createSession(newSessionId, cache, (err, token) => {
    //Check if err is set
    if (err) {
      console.log(err);
      res
        .status(409)
        .send(`{"code":"conflict", "message":"could_not_init_session"}`);
      return;
    }
    //no error, return key to user
    res
      .status(200)
      .send(
        `{"code":"success", "sessionToken":"${token}", "sessionId":"${newSessionId}"}`
      );
    return;
  });
};

exports.validateSessionHandler = (req, res, cache) => {
  //Assert sessionToken exists and is set
  if (req.body.sessionToken) {
    if (req.body.sessionToken !== "") {
      //
      session.verifySessionToken(
        req.body.sessionToken,
        cache,
        function (err, sessionObj) {
          if (err) {
            console.log(err);
            //Unauthorized, refresh required
            res
              .status(401)
              .send(`{"code":"unauthorized", "message":"invalid_token"}`);
            return;
          }
          //Token is valid
          res
            .status(200)
            .send(`{"code":"success", sessionId:"${sessionObj.sessionId}"}`);
          return;
        }
      );
      return;
    }
  }
  //request is not valid
  res.status(200).send(`{"code":"error", "message":"request_invalid"}`);
  return;
};

exports.sessionEventHandler = async (req, res, cache) => {
  /* req
   * req.body.sessionToken,          //This validates the user and provides the correct sessionToken for tracking.
   * req.body.eventName,             //navigation, add-to-cart, remove-from-cart,
   * req.body.eventTime              // obvs
   * req.body.eventTriggerAriaLabel, // The HTML Aria label of the UI object that triggered the event, this helps us understand exactly what users click on first and when.
   * req.body.referrer,              // The url when the event occured.
   * req.body.location               // In the case of a navigation event, this field tells us the new URL the user navigated to. for any other case it must remain the same as the referrer field (this is important, do not leave it blank)
   */
  let sessionToken = req.body.sessionToken;
  let eventObj = {
    eventName: req.body.eventName,
    eventTime: req.body.eventTime,
    eventTriggerAriaLabel: req.body.eventTriggerAriaLabel,
    referer: req.body.referer,
    location: req.body.location,
  };
  session.sessionEvent(sessionToken, eventObj, cache, (err) => {
    if (err) {
      res
        .status(401)
        .send(`{"code":"unauthorized", "message":"invalid_token"}`);
      return;
    }
    res.status(200).send(`{"code":"OK", "message":"event_appended"}`);
    return;
  });
};
