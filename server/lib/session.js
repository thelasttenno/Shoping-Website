const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");

exports.analyticsWorker = (cache) => {};

exports.verifySessionToken = async (token, cache, callback) => {
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
  
  if(decoded.sessionId){
      sessionId = decoded.sessionId;
  }else{
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

//Not implemented
exports.destroySession = (token, cache) => {};

//Callback(err: Error, token: string)
exports.createSession = async (newSessionId, cache, callback) => {
  //
  const sessionObj = {
    sessionId: newSessionId,
    sessionStartedAt: Date.now(),
    signingKey: uuidv4(),
    navigationGraph: [], // ;]
    savedToFile: false,
  };
  //If the session does not already exist, append session to cache, marking it as live.
  cache.get(newSessionId, function (err, value) {
    if (err) {
      if (!err.notFound) {
        // handle a 'NotFoundError' here
        return callback(err, null);
      }
      //If it is a notFound, that is good.
    }
    // Create session in cache
    cache.put(newSessionId, JSON.stringify(sessionObj), function (err) {
      if (err) {
        callback(err, null);
        return;
      } // some kind of I/O error
      //
      // Create sessionToken for client to store
      const token = jwt.sign(
        {
          sessionId: newSessionId,
        },
        sessionObj.signingKey,
        { expiresIn: 60 * 30 }
      );
      //Callback successfully with token and valid session in cache
      callback(null, token);
    });
  });
};

//This function is a background worker that records session data to disk, this allows sciency shit later for maximum user exploitation :)
exports.sessionRecorder = async (cache) => {
  //Loop through all entities in the cache and if the saved field is not true, save it to file and mark it as true.

  //Exit
  return;
};
