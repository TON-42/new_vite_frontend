# MSW Request Resolver

In Mock Service Worker (MSW), the resolver functions are the callback functions that are passed as the second argument to methods like `http.get`, `http.post`, etc. These resolver functions follow a fixed prototype, which takes a single argument—an object containing various properties about the intercepted request.

## Key Points about Resolvers

### Position in the API Call

The resolver function is the second argument in the MSW methods such as `http.get`, `http.post`, etc.

```javascript
http.get("/path", resolverFunction);
```

### Prototype of Resolver Functions

Resolver functions take a single argument, an object that includes several properties about the intercepted request.

```javascript
const resolverFunction = ({request, requestId, cookies, params}) => {
  // Your response logic here
};
```

### Common Properties Provided to Resolvers

- **request**: The Fetch API Request representation of the intercepted request.
- **requestId**: A UUID string identifier for the intercepted request.
- **cookies**: An object containing request cookies.
- **params**: An object containing request path parameters.

### Example of a Resolver Function

Here's an example demonstrating how to use these properties within a resolver function:

```javascript
import {http, HttpResponse} from "msw";

const getUserResolver = async ({request, params, cookies}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }
  const {userId} = json;
  const users = {
    1: {id: 1, name: "Lead User"},
    2: {id: 2, name: "New User"},
    3: {id: 3, name: "Invitee User"},
  };

  return HttpResponse.json(users[userId] || {error: "User not found"});
};

export const handlers = [http.post("/get-user", getUserResolver)];
```

### Summary

- **Resolver functions** are indeed the callback functions used as the second argument in MSW methods like `http.get`.
- These functions follow a specific prototype, accepting an object with properties such as `request`, `requestId`, `cookies`, and `params`.
- The resolver function determines how to handle the intercepted request, allowing you to return a mocked response, passthrough, or fallthrough.
