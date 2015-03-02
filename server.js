var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    http = require('http'),
    path = require('path'),
    winston = require('winston'),
    sqlinit = require('./server/sqlinit'),

// App modules
    offers = require('./server/offers'),
    users = require('./server/users'),
//    cases = require('./server/cases'),
    wallet = require('./server/wallet'),
    hotels = require('./server/hotels'),
    auth = require('./server/auth'),
    facebook = require('./server/facebook'),
    s3signing = require('./server/s3signing'),
    activities = require('./server/activities'),
    cors = require('cors'),
    app = express();

app.use(cors());

app.set('port', process.env.PORT || 5000);

app.use(compression());
app.use(bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, './client')));

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.send(500, err.message);
});

app.post('/login', auth.login);
app.post('/logout', auth.validateToken, auth.logout);
app.post('/signup', auth.signup);
app.post('/fblogin', facebook.login);

app.get('/users/me', auth.validateToken, users.getProfile);
app.put('/users/me', auth.validateToken, users.updateProfile);

app.get('/offers', auth.validateToken, offers.getAll);
app.get('/offers/:id', offers.getById);
app.get('/hotels', hotels.findAll);

app.get('/wallet', auth.validateToken, wallet.getItems);
app.post('/wallet', auth.validateToken, wallet.addItem);
app.delete('/wallet/:id', auth.validateToken, wallet.deleteItem);

app.get('/activities', auth.validateToken, activities.getItems);
app.post('/activities', auth.validateToken, activities.addItem);
app.delete('/activities', auth.validateToken, activities.deleteAll);

//app.post('/cases', auth.validateToken, cases.createCase);
//app.get('/nfrevoke', cases.revokeToken);

app.post('/s3signing', auth.validateToken, s3signing.sign);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});