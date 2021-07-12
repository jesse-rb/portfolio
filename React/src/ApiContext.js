import { createContext } from 'react';
import React from 'react';

export var ApiContext = createContext({
    api: ""
});

if ('_self' in React.createElement('div')) { // Prod mode
    ApiContext.api = "/api/"
} else { // Dev mode
    ApiContext.api = "/"
}
