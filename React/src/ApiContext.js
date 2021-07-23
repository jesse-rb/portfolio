import { createContext } from 'react';

let apiString = "/api/" // Prod mode
// let apiString = "/" // Dev mode

export var ApiContext = createContext({
    api: apiString
});