import { PiletApi, HtmlComponent } from 'sample-piral';
import '../dist/app';

function fromHtml<TProps>(mount: (el: Element, props: TProps) => void): HtmlComponent<TProps> {
  return {
    type: 'html',
    component: {
      mount,
    },
  };
}

export function setup(api: PiletApi) {
  api.registerTile(fromHtml(element => {
    const app = document.createElement('my-app');
    element.appendChild(app);
  },
  ), {
    initialColumns: 4,
    initialRows: 4,
  });
}
