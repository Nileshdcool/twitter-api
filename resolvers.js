const fetch = require('node-fetch');
const debug = require('debug');

const baseURL = 'http://localhost:3001/api/';
const Query = {
    greeting: () => 'Hello Server',
    searchPosts: async (root, args) => {
        const returnedData = await fetch(`${baseURL}getTweetsByKey?searchTerm=${args.searchTerm}`).then( data => {
            return data.json();
        }).catch(err => debug.log('err: %o', err));
        return returnedData;
    },
    homeTweets: async(root, args) => {
        const returnedData = await fetch(`${baseURL}homeTweets`).then( data => {
            return data.json();
        }).catch(err => debug.log('err: %o', err));
        return returnedData;
    }
}

const Mutation = {
    createPost: async (root, args) => {
        const returnedData = await fetch(`${baseURL}postTweets`, {
            method: 'POST',
            body: JSON.stringify({body: args.text}),
            headers: { 'Content-Type': 'application/json' },
        }).then( data => {
            return data.json();
        }).catch(err => debug.log('err: %o', err));
        return !returnedData.error;
    },
    likeTweet: async (root, args) => {
        const returnedData = await fetch(`${baseURL}likeTweet`, {
            method: 'POST',
            body: JSON.stringify({id: args.id}),
            headers: { 'Content-Type': 'application/json' },
        }).then( data => {
            return data.json();
        }).catch(err => debug.log('err: %o', err));
        return !returnedData.error;
    },
    dislikeTweet: async (root, args) => {
        const returnedData = await fetch(`${baseURL}disLikeTweet`, {
            method: 'POST',
            body: JSON.stringify({id: args.id}),
            headers: { 'Content-Type': 'application/json' },
        }).then( data => {
            return data.json();
        }).catch(err => debug.log('err: %o', err));
        return !returnedData.error;
    }
}

module.exports = {Query, Mutation};