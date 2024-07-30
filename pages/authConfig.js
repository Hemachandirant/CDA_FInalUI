const msalConfig = {
    auth: {
        clientId: "f462e557-34e5-435b-be69-22c62e7ff278",  // Replace with your Client ID
        authority: "https://login.microsoftonline.com/f5791d91-daca-4d28-8700-680f7a2f8b6a",  // Replace with your Tenant ID
        redirectUri: "https://cda-dws.azurewebsites.net/pages/homepage.html",  // Replace with your Redirect URI
        // redirectUri: "http://localhost:5505/pages/homepage.html"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {    
        loggerOptions: {    
            loggerCallback: (level, message, containsPii) => {    
                if (containsPii) {        
                    return;        
                }        
                switch (level) {        
                    case msal.LogLevel.Error:        
                        console.error(message);        
                        return;        
                    case msal.LogLevel.Info:        
                        console.info(message);        
                        return;        
                    case msal.LogLevel.Verbose:        
                        console.debug(message);        
                        return;        
                    case msal.LogLevel.Warning:        
                        console.warn(message);        
                        return;        
                }    
            }    
        }    
    }
};

const loginRequest = {
    scopes: ["User.Read"]
};

const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false
};
