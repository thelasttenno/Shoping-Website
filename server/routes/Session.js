const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

//Local cache
const Keyv = require('keyv');
const sessionCache = new Keyv();


exports.createSessionHandler = (req, res) => {
    //
    //generate new session token
    const newSessionId = v4()
    //
    // hehe i mak u anal ytics 
    //
    const sessionObj = {
        "id":newSessionId,
        "created": Date.now(),
        "navigation-graph": []
    }
    //
    // append session to local cache
    sessionCache.set(newSessionId, JSON.stringify(sessionObj))
    

}


exports.validateSessionHandler = (req, res) => {
    
}

exports.refreshSessionHandler = (req, res) => {
    
}

exports.endSessionHandler = (req, res) => {
    
}

exports.sessionEventHandler = (req, res) => {
    //Appends an analytical event to the session

    // {
    //     eventName: "link",
    //     eventTriggerAriaLabel: "shop-page-tab-button",
    //     eventTime: Date.now(),
    //     referer: "/",
    // },

    // {
    //     eventName: "add-to-cart",
    //     eventTriggerAriaLabel: "backpack22309-add-to-cart-button",
    //     eventTime: Date.now(),
    //     eventAction: "",
    //     referer: "/items/backpack22309",
    // },

}