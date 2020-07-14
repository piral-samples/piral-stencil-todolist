# Stencil in Pilets

This is the simplest example on how to use Stencil components in a pilet. There are multiple ways, potentially using things like lazy loading, feature inspection and more.

![Quick Demo](./demo.gif)

## Preparation of Stencil

Be ready to compile your Stencil components to a library, e.g., by specifying the `outputTargets` in the *stencil.config.js*:

```js
exports.config = {
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ]
};
```

In the example above we still compile the "default Stencil app". This is to show that you don't need to decide between using Stencil as a library (default case, recommended) and having a Stencil application (well, maybe you want to preserve your Stencil app and have the components also exported as a lib for use, e.g., in a pilet).

## Define your Pilet

Ideally, you start a new pilet. In the given example we just extend the codebase to be a pilet. We do that by installing:

- Your app shell (here we just used `sample-piral`)
- The Piral CLI (`piral-cli`) for running commands
- A bundler (e.g., `piral-cli-parcel`) for bundling (debug / build)

Start a new root module such as *src/index.ts*:

```ts
import { PiletApi } from 'sample-piral';

export function setup(api: PiletApi) {
  // ...
}

```

Add the name of your Piral instance to the *package.json*:

```json
{
  // ....
  "piral": {
    "name": "sample-piral"
  },
}
```

## Register the Web Components

You can just import everything from the created build (lib) artifacts of Stencil:

```ts
import '../dist/app';
```

To have this available make sure to run:

```sh
stencil build --prerender
```

This could be also done before *any* piral CLI task - and you can set it in watch mode, too. Here, we keep it simple.

## Expose the Web Components in Your Pilet

Now you can expose your Stencil components as you want. For instance, exposing them the sample TODO app as a tile would work as follows:

```ts
api.registerTile(fromHtml(element => {
  const app = document.createElement('my-app');
  element.appendChild(app);
},
), {
  initialColumns: 4,
  initialRows: 4,
});
```

For convenience we introduce a helper function `fromHtml`. The function is super simple and not actually needed for just a single registration, but quite handy for multiple.

The basic idea is to just hand over a callback function that determines how the rendering should look like. For the sample above we could have even made it more easy using just the components name, however, maybe we want to use a second argument to retrieve (and forward) the props.

```ts
function fromHtml<TProps>(mount: (el: Element, props: TProps) => void): HtmlComponent<TProps> {
  return {
    type: 'html',
    component: {
      mount,
    },
  };
}
```

## Run the Pilet

Add another script to your *package.json*. Since the `build` and `start` scripts have both been taken in the current example we can just pick another.

For demonstration purposes the following script was added:

```json
{
  //...
    "pilet": "pilet debug src/index.ts",
}
```

Since there is another *index.* file in the *src* folder we need to be explicit. Otherwise, Parcel will pick the *index.html* due to its prio-list.

```sh
npm run pilet
```

Building would be similar. Remember that we kept it simple and did not introduce a pre-build step to output the component lib again.
