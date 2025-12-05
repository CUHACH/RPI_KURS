import { AbstractComponent } from "./AbstractComponent.js";

const RenderPosition = {
  BEFOREBEGIN: "beforebegin",
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  AFTEREND: "afterend",
};

function createElement(template) {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    if (component && typeof component.getElement === "function") {
      container.insertAdjacentElement(place, component.getElement());
      return;
    }
    throw new Error("Can render only components");
  }

  container.insertAdjacentElement(place, component.element);


  if (typeof component.afterRender === "function") {
    component.afterRender();
  }
}

export { RenderPosition, createElement, render };
