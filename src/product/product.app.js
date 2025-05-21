import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import ProductPage from "./ProductPage.jsx";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ProductPage,
  domElementGetter: () => document.getElementById('product'),
});

export const { bootstrap, mount, unmount } = lifecycles;