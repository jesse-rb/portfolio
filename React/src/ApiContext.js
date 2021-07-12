import { createContext } from 'react';
import React from 'react';

export var ApiContext = createContext({
    api: ""
});

if ('_self' in React.createElement('div')) { // Dev mode
    ApiContext.api = "/"
} else { // Prod mode
    ApiContext.api = "/api/"
}
