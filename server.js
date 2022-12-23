// NodeJS module for filepaths
const path = require('path');
// NodeJS web framework (routes, etc) and session support
const express = require('express');
const session = require('express-session');
// Express Handlebars for View provisions
const exphbs = require('express-handlebars');
// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Path to Controller (route) files 
const routes = require('./controllers');
// Import the SQL connection object
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Defines a session to connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  // Express session uses cookies by default, but here we specify options for cookies.
  cookie: {
    // maxAge sets the maximum age for the cookie to be valid.
    maxAge: 60 * 60 * 1000,
    // Only store session cookies when the protocol is HTTP.
    httpOnly: true,
    // Only initialize session cookies when the protocol is HTTPS.
    secure: false,
    // Only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Mount a session
app.use(session(sess));

// Express Handlebars instance, with View Engine
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to handle JSON and URL-encoded data requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// For other files to serve up to client-side
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => 
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
