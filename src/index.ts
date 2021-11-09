import { PiletApi, HtmlComponent } from "sample-piral";

function fromHtml<TProps>(
  mount: (el: Element, props: TProps) => void
): HtmlComponent<TProps> {
  return {
    type: "html",
    component: {
      mount,
    },
  };
}

function includeStencilApp(resourcesUrl: string) {
  const scripts = document.querySelectorAll("script");
  const index = scripts.length - 1;
  scripts[index].setAttribute("data-resources-url", resourcesUrl);
  require("../dist/app");
}

export function setup(api: PiletApi) {
  includeStencilApp(api.meta.basePath + "app/");

  api.registerTile(
    fromHtml((element) => {
      const app = document.createElement("my-app");
      element.appendChild(app);
    }),
    {
      initialColumns: 4,
      initialRows: 4,
    }
  );
}
