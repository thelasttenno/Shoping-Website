const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");
const fs = require("fs");

//Callback (err: Error, decoded: jwtclaimsobj) => {}
const verifySessionToken = async (token, cache, callback) => {
  let sessionId = ""; // To be set by valid JWT claim when parsed

  //Retrieve sessionId before checking if valid
  let decoded = jwt.decode(token);
  //assert valid
  if (!decoded) {
    console.log("err");
    callback(Error("invalid_token"), null);
    return;
  }
  //Get ID

  if (decoded.sessionId) {
    sessionId = decoded.sessionId;
  } else {
    callback(Error("invalid_token"), null);
    return;
  }

  //Use sessionId to get sessionObj -> signingKey from session cache
  cache.get(sessionId, function (err, value) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    //Parse session obj
    let sessionObj = JSON.parse(value);
    //Assert valid obj
    if (!sessionObj) {
      console.log("session_obj_invalid");
      callback(Error("session_obj_invalid"), null);
      return;
    }
    if (!sessionObj.signingKey || sessionObj.signingKey === "") {
      console.log("session_obj_invalid");

      callback(Error("session_obj_invalid"), null);
      return;
    }
    //check if token is valid with parsed signing key.
    jwt.verify(token, sessionObj.signingKey, callback);
  });
};
exports.verifySessionToken = verifySessionToken;

//
exports.destroySession = (token, cache) => {};

//Callback(err: Error, token: string)
exports.createSession = async (newSessionId, cache, callback) => {
  //
  const sessionObj = {
    sessionId: newSessionId,
    sessionStartedAt: Date.now(),
    signingKey: uuidv4(),
    navigationGraph: [
      {
        eventName: "sessionStart",
        eventTime: Date.now(),
        eventTriggerAriaLabel: "root",
        referer: "/",
        location: "/",
        sessionId: newSessionId,
      },
    ], // ;]
  };
  //If the session does not already exist, append session to cache, marking it as live.
  cache.get(newSessionId, function (err, value) {
    if (err) {
      if (!err.notFound) {
        // handle anything but a 'NotFoundError' here
        return callback(err, null);
      }
      //'NotFoundError' is what we expect, continue without err.
    }
    // Create session in cache
    cache.put(newSessionId, JSON.stringify(sessionObj), function (err) {
      if (err) {
        callback(err, null);
        return;
      }
      //
      // Create sessionToken for client to storec
      const token = jwt.sign(
        {
          sessionId: newSessionId,
        },
        sessionObj.signingKey,
        { expiresIn: 60 * 30 }
      );
      //Callback successfully with token and valid session in cache
      callback(null, token);
      return;
    });
  });
};

exports.sessionEvent = async (sessionToken, eventObj, cache, callback) => {
  //Verify token
  verifySessionToken(sessionToken, cache, (err, decoded) => {
    if (err) {
      callback(err);
      return;
    }
    //Token is valid
    let sessionId = decoded.sessionId;
    eventObj = { ...eventObj, sessionId: sessionId }; // Adding this allows the recorder to always save each entity only once.
    /** get current session object and mutate with new event */
    //Use sessionId to get sessionObj -> signingKey from session cache
    cache.get(sessionId, function (err, value) {
      if (err) {
        // handle anything other than a 'NotFoundError' here
        console.log(err);
        callback(err);
        return;
      }
      //Parse session obj
      let sessionObj = JSON.parse(value);
      console.log(sessionObj);

      //Assert navigation array is valid
      if (!sessionObj.navigationGraph) {
        //
        console.log("invalid_navigationGraph");
        callback(Error("invalid_navigationGraph"));
        return;
      }
      //Is valid
      sessionObj.navigationGraph.push(eventObj);
      //
      //Reinsert mutated graph to Cache
      // Create session in cache
      cache.put(sessionId, JSON.stringify(sessionObj), function (err) {
        if (err) {
          callback(err);
          return;
        }
        //Success
        callback(null);
        return;
      });
    });
  });
};

exports.analyticsWorker = (cache) => {
  //Saves the contents of the navigation-graph on each sessionObj, or deletes the navigationGraph item if it has already been saved.

  //This iterates over each active session and writes event history to disk and deletes it from the cache.
  let iter = cache.iterator();
  recursivelyGetEvents(iter, cache);
};

//This steps through the navigationGraph array in a timely fashion without fucking the memory.
const recursivelyGetEvents = async (iter, cache) => {
  //This stop this process from eating up CPU in peak traffic
  await new Promise((res) => setTimeout(res, 10));
  //
  iter.next((err, key, value) => {
    if (err) {
      return;
    }
    if (!key || !value) {
      return;
    }
    //Save to JSON and remove from session
    let sessionObj = JSON.parse(value.toString());
    if (sessionObj) {
      let events = sessionObj.navigationGraph;
      if (events) {
        if (events.length === 0) {
          return;
        }
        //Successfully copied events, patch session in cache
        sessionObj.navigationGraph = [];
        cache.put(key.toString(), JSON.stringify(sessionObj), (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
        //Record events to JSON file

        // events.forEach((elem) => {
        //   fs.appendFile(
        //     "Data/session/events.json",
        //     JSON.stringify(elem) + "        ",
        //     function (err) {
        //       if (err) throw err;
        //     }
        //   );
        // });
        console.log(events);
        fs.readFile("Data/session/events.json", "utf-8", function (err, data) {
          if (err) {
            console.log("read:", err);
            return;
          }
          //Parse
          var arrayOfEvents = JSON.parse(data);
          arrayOfEvents = arrayOfEvents.concat(events);

          //Write back to file
          fs.writeFile(
            "Data/session/events.json",
            JSON.stringify(arrayOfEvents),
            "utf-8",
            function (err) {
              if (err) {
                console.log("err: ", err);
                return;
              }
            }
          );
        });
      }
    } else {
      console.log("failed_to_parse_session");
    }

    recursivelyGetEvents(iter, cache);
  });
};
