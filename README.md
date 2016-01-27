# BoilerPlate

Yes. Another one, but this one is packed full of features.

## Features

- **React** Yes its the best
- **Redux** For the data flow, has example action creators/reducers
- **React-Router** For all your routing needs. Configured to use HTML5
history/routing out of the box. (Will need approriate server config in production. see https://www.nginx.com/blog/creating-nginx-rewrite-rules)
- **UI Server** React components are rendered server side.
- **API Server** A seperate express container mounted at `/api`
- **es2015** All es2015 for the latest features. Requires node v5.5.0+
- **Sass/Libsass** The best CSS preprocessor, also has normalize.css & reboot.css helpers to get going.
- **Webpack** Build system automatically minifies production builds has hot module
development server which also proxies the UI/API server! Neat
- **Babel** Use es2015+ everywhere
- **eslint** has some sensible rules built in.


## Usage

Simple enough again after a clone:

Install the deps:

```shell
~/boilerplate $ npm install
```

Building the JS & CSS for production

```shell
~/boilerplate $ npm run build
```

Running the server:

```shell
~/boilerplate $ npm start
```

or to watch for code changes and restart

```shell
~/boilerplate $ npm run watch
```


Running Webpack Development Server (requires Server to be running):

```shell
~/boilerplate $ npm run dev
```

## Credits

Chris Walker [@thechriswalker](https://github.com/thechriswalker);


