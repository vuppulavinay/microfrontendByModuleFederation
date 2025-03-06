import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("microfrontend/App"));

const App = () => {
  return (
    <div>
      <h1>Host Application</h1>
      <Suspense fallback="Loading...">
        <RemoteApp />
      </Suspense>
    </div>
  );
};

export default App;