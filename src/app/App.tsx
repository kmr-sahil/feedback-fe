/*
Here We can set configuration for our app | Important file
*/

"use client";
import { Provider } from "react-redux";
import store from "./store";

const App = ({ children } = {} as any) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default App;
