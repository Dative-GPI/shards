# Shards

Shards is a component library based on [Vuetify](https://vuetifyjs.com/en/) developped by Dative.  
A storybook presenting all the components is available [here](https://dative-gpi.github.io/shards/).

## Installation

To use this library, you first need a Vue.Js project:

```sh
vue create my-add
cd my-app
```

Shards depends on Vuetify, so you have to add it to the Vue dependencies:

```sh
vue add vuetify
```

The library has been published on [npm](https://www.npmjs.com/package/@dative-gpi/shards), so you can add it to your project simply by running:

```sh
npm install @dative-gpi/shards
```

## Contributing

Use the following commands to setup the project and run the storybook server:

```sh
cd src
yarn install
yarn storybook
```

Your browser will automatically open on the storybook page (by default [localhost:6006](localhost:6006)).

Please use yarn, as it is more stable than npm and npm might not work then.
