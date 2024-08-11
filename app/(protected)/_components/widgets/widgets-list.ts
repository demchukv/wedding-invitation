export type WidgetType = {
  id: string;
  name: string;
  file: string;
  version: string;
  description: string;
  widgetData: object;
};

export const enabledWidgets = [
  {
    id: "text-widget-1-0-0",
    name: "TextWidget",
    file: "text-widget",
    version: "1.0.0",
    description: "Simple widget for render text",
    widgetData: {
      text: "example text message",
      tAlign: "center",
      tValign: "center",
      fSize: "20px",
      fColor: "black",
      fStyle: "normal",
      fWeight: "normal",
      fFamily: "Arial",
      bColor: "transparent",
    },
  },
  {
    id: "image-widget-1-0-0",
    name: "ImageWidget",
    file: "image-widget",
    version: "1.0.0",
    description: "Simple widget for upload and render single image",
    widgetData: {
      imgSrc: "/path/to/image.png",
      tAlign: "center",
      tValign: "center",
      fSize: "20px",
      fColor: "black",
      fStyle: "normal",
      fWeight: "normal",
      fFamily: "Arial",
      bColor: "transparent",
    },
  },
];
