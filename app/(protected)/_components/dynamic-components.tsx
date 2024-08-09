import React from "react";

interface DynamicComponentProps {
  text: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ text }) => {
  return <div>{text}</div>;
};

const createDynamicComponent = (
  component: React.ComponentType<any>,
  props: any
) => {
  return React.createElement(component, props);
};

const App: React.FC = () => {
  const dynamicComponent = createDynamicComponent(DynamicComponent, {
    text: "Hello, Dynamic World!",
  });
  return <div>{dynamicComponent}</div>;
};

export default App;
