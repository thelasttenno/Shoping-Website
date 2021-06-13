import axios from "axios";

//callback = (err: Error | undefined, sessionObj: sessionObj | undefinded): void => {};
//callback provides an err which is null on success, or an error.
export const getNewSession = (prevSessionId, callback) => {
  let sessionObj = {
    id: "",
    jwtToken: "",
  };

  //Axios request to API
  axios({
    method: "post",
    url: "http://localhost:8080/session/new",
    data: {
      savedSessionId: prevSessionId, //Pass a saved sessionId to server, will be ignored if value blank or null
    },
  })
    .then((resp) => {
      //
      if (resp) {
        //
        if (resp.data.code === "success") {
          //
          sessionObj.jwtToken = resp.data.sessionToken;
          sessionObj.id = resp.data.sessionId;
          //
          window.localStorage.setItem("sessionId", resp.data.sessionId);
          window.localStorage.setItem("sessionToken", resp.data.sessionToken);

          //Successfull callback
          callback(null, sessionObj);
          return;
          //
        } else {
          //
          callback(Error("invalid_resp"), null);
          return;
        }
      } else {
        callback(Error("malformed_response"), null);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      callback(err, null);
    });
};

//callback = (err: Error | undefined): void => {};
//callback provides an err which is null on success, or an error...
export const verifySession = (callback) => {
  //Get token from localStorage
  let sessionToken = window.localStorage.getItem("sessionToken");
  if (!sessionToken || sessionToken === "") {
    callback(Error("noSessionActive"));
    return;
  }
  //
  //Successful callback
  //Hit veri fication endpoint with token
  //Axios request to API
  axios({
    method: "post",
    url: "http://localhost:8080/session/validate",
    data: {
      sessionToken: sessionToken,
    },
  }).then((resp) => {
    //
    if (resp) {
      //
      console.log("verifysession: ", resp.data);
      if (resp.data.code === "error") {
        console.log("err", resp.data.message);
        callback(Error(resp.data.message));
        return;
      }
      if (resp.data.code === "success") {
        console.log("success");
        callback(null);
        return;
      }
    }
    callback(Error("no_data"));
    return;
  });
};
