import { createContext } from 'react';
import React from 'react';

let apiString = "/api/" // Prod mode
// let apiString = "/" // Dev mode

export var ApiContext = createContext({
    api: apiString
});