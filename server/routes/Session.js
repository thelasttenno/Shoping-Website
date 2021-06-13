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
   * req.params.sessionToken,          //This validates the user and provides the correct sessionToken for tracking.
   * req.params.eventName,             //Was this a: navigation, add-to-cart, remove-from-cart,
   * req.params.eventTriggerAriaLabel, // The HTML Aria label of the UI object that triggered the event, this helps us understand exactly what users click on first and when.
   * req.params.referrer,              // The url when the event occured.
   * req.params.location               // In the case of a navigation event, this field tells us the new URL the user navigated to. for any other case it must remain the same as the referrer field (this is important, do not leave it blank)
   */
  //
  //Appends, to the sessionObj in cache, an analytical event defined as detailed above
  // sessionObj["navigation-graph"].append(...
  // examples...
  // {
  //     eventName: "navigation",
  //     eventTriggerAriaLabel: "shop-page-menu-navbutton",
  //     eventTime: Date.now(),
  //     referer: "/",
  //     location: "/shop"
  // },
  // {
  //     eventName: "favorite-item",
  //     eventTriggerAriaLabel: "backpack22309-favorite-button",
  //     eventTime: Date.now(),
  //     referer: "/items/backpack22309",
  //     location: "/items/backpack22309"
  // },
  // OR
  // {
  //     eventName: "add-to-cart",
  //     eventTriggerAriaLabel: "backpack22309-add-to-cart-button",
  //     eventTime: Date.now(),
  //     referer: "/items/backpack22309",
  //     location: "/items/backpack22309"
  // },

  let sessionId = ""; // To be set by valid JWT claim

  //Retrieve sessionId before checking if valid
  let decoded = jwt.decode(token);
  sessionId = decoded.sessionId;

  //Use sessionId to get sessionObj -> signingKey from session cache
  let sessionObj = JSON.parse(await cache.get(sessionId));

  //check if token valid with retrieved key
  jwt.verify(token, sessionObj.signingKey, function (err, decoded) {
    if (err) {
      res
        .status(500)
        .send(`{"code":"unauthorized", "message":"invalid_token"}`);

      return;
    }
    //Token is valid
  });
};
