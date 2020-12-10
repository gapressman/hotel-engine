## To Run Locally

`Yarn install`-- to install packages

`Yarn start`

`http://localhost:3000` in browser

## available routes

`/`

`/repositories/<owner>/<repo>`

## To run tests

`Yarn test` this command takes an optional argument to say which test files. Additionally jest some customization in tests to decide which run.

A few examples an "x" prefixing a block:

`xit()`
`xdescribe()`

.skip, and .only

`it.skip()`
`it.only`

## Notable Components

`<ContentSwitch />`

This component is to handle async calls so not to have to repeatedly handle loading and error states. Similar to what `React Suspense` does/will do, but suspense is still in experimental limbo.

One thing I'd do differently inretrospect is change how the success-view gets displayed. I don't like that I have to tell typescript the data is there. I think it can be rewritten so overriding the compiler with a `!` isn't necessary.

## Packages

`React Router` for routing

`Material-ui` as a component library

`Axios` for api calls

`React-testing library`

## Testing

I tried to give examples of different things I would test. Some places are well tested, others are lacking. For example I tested the api calls in a vacuum, but didn't test interacting with the components to run them.
