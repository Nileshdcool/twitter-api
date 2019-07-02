const debug = require('debug');

const express = require('express'),
    tweetRoute = express.Router(),
    Twit = require('twit');

var T = new Twit({
    consumer_key: 'PhkUl2noPa27OEcQnEukeCLCi',
    consumer_secret: 'jYa0A96oS3KS56QeMUYp4MTAkt6rFslSJcg7mdEQbUd7yMop2r',
    access_token: '1145876225375649792-I8t3uCtP6S73BOnv8VQhQOFzqL3WkR',
    access_token_secret: 'O7tSsfTIOY3eGYB6Ea5ChKUyvZy4axEY5SPuwiQSOdcmz',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: false,     // optional - requires SSL certificates to be valid.
});

tweetRoute.route('/getTweetsByKey').get((req, res) => {
    const searchTerm = req.query.searchTerm || '';
    T.get('search/tweets', { q: searchTerm, count: 10 }, function (err, data, response) {
        const returnData = data.statuses.map(item => {
            return {
                id: item.id,
                id_str: item.id_str,
                created_at: item.created_at,
                user: {
                    profile_image_url: item.user.profile_image_url,
                    screen_name: item.user.screen_name
                },
                text: item.text,
                favorited: item.favorited
            };
        });
        res.json(returnData);
    });
});

tweetRoute.route('/postTweets').post((req, res) => {
    T.post('statuses/update', { status: req.body.body }, function (error, tweet, response) {
        if (error) {
            res.send({ error: true, message: error });
            debug.log(error);
        } else {
            res.send({ error: false, message: 'Sent' });
        }
    });
});

tweetRoute.route('/likeTweet').post((req, res) => {
    T.post('favorites/create', { id: req.body.id }, function (error, data, response) {
        if (error) {
            res.send({ error: true, message: error });
        } else {
            res.send({ error: false, message: 'Sent' });
        }
    });
});

tweetRoute.route('/disLikeTweet').post((req, res) => {
    T.post('favorites/destroy', { id: req.body.id }, function (error, data, response) {
        if (error) {
            res.send({ error: true, message: error });
        } else {
            res.send({ error: false, message: 'Sent' });
        }
    });
});

const params = {
    user_id: 'NileshSukalikar',
    count: 10
}

tweetRoute.route('/userTweets').get((req, res) => {
    T.get('statuses/user_timeline', params, function (err, data, response) {
        res.send(data);
    });
});

tweetRoute.route('/homeTweets').get((req, res) => {
    T.get('statuses/home_timeline', { count: 10 }, function (err, data, response) {
        if (err) {
            debug.log(err);
        }
        let returnData = {};
        if (data && data.length > 0) {
            returnData = data.map(item => {
                return {
                    id: item.id,
                    id_str: item.id_str,
                    created_at: item.created_at,
                    user: {
                        profile_image_url: item.user.profile_image_url,
                        screen_name: item.user.screen_name
                    },
                    text: item.text,
                    favorited: item.favorited
                };
            });
        }
        res.json(returnData);
    });
});

module.exports = tweetRoute;


