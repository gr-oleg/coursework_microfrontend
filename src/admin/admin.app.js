import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import AdminPanel from "./AdminPanel";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AdminPanel,
  domElementGetter: () => document.getElementById('admin'),
  errorBoundary(err, info, props) {
    return <div>Помилка в адмін-панелі: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;