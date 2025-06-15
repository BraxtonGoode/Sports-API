const mongoDb = require('./DB/connect.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();  
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/', require('./routes'));
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,  
}))

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION');
    next();
});
app.use(cors({method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
app.use("/", require("./routes/index.js"));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
},
function(accessToken, refreshToken, profile,done){
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.use !== undefined ? `logged in as ${req.session.user.displayName}`: "logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });


mongoDb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database successfully');
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});

