# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### :warning: **RESTORE DATABASE FIRST, CHECK README.MD IN DATABASE FOLDER**

### `installation`

Before start Strapi application use NPM (Node Package Manager) to install all dependencies


```
1. npm install 
2. npm install pg
# or
1. yarn install 
2. yarn install pg
```

### `configuration`

Configuration is required after installation for the application to run

1.edit file __database.js__ on directory _/be/config/database.js
```javascript
 module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'), 
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'db_fit_proper'),
      user: env('DATABASE_USERNAME', 'postgres'), // change this according to the username of the owner of your postgresql database
      password: env('DATABASE_PASSWORD', 'irfannoor123'), // change this according to the password of the owner of your postgresql database
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```
2.edit file __auth.js__ on directory _/be/node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js_

in line 59
```javascript
 const user = await strapi.query('plugin::users-permissions.user').findOne({ where: query });
```
change to
```javascript
 const user = await strapi.query('plugin::users-permissions.user').findOne({ where: query, populate: ["role", "employee"]});
```
and comment line 322
```javascript
 params.role = role.id;
```
change to
```javascript
// params.role = role.id;
```

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
