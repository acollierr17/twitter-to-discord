const Twitter = require('twitter');
const { Webhook, MessageBuilder } = require('webhook-discord');
const { twitter, webHookURL } = require('./config');

const client = new Twitter(twitter);
const hook = new Webhook(webHookURL);

/**
 * @type {Object}
 * @param {String} hookName - The name of the webhook.
 * @param {String} username - The username of the Twitter user.
 * @param {String} id - The user ID of the Twitter user.
 */
const tUser = {
    hookName: 'Donald J Trump',
    username: 'realDonaldTrump',
    id: '25073877'
};

console.log('donald-node is now online!');

const stream = client.stream('statuses/filter', { follow: tUser.id });

stream.on('data', e => {
    if (e.user.id_str !== tUser.id) return;
    newTweet(e.id_str);
});

stream.on('error', error => {
    console.error('An error has occurred.', error.stack);
});

/**
 * Takes an ID of a Twitter status update.
 * @param {String} id - The Twitter status ID.
 */
async function newTweet(id) {
        try {
            const tweet = await client.get('statuses/show', { id });
            const tweetData = mapTweet(tweet);

            const tweetToDiscord = new MessageBuilder()
                .setName(tUser.hookName)
                .setAuthor(tweetData.screenName, tweetData.tweetURL, tweetData.profilePic)
                .setDescription(tweetData.tweet)
                .setColor(tweetData.themeColor)
                .setFooter(`Likes: ${tweetData.likeCount} | Retweets: ${tweetData.retweetCount}`);

            if (tweetData.entities.media) tweetToDiscord.setImage(tweetData.entities.media[0].media_url_https);

            console.log(`New tweet posted by ${tweetData.screenName}.`);
            hook.send(tweetToDiscord);

        } catch (err) {
            console.error('An error has occurred with posting the tweet.', err);
        }
}

/**
 * Takes a tweet object and maps it into a format used by the webhook.
 * @param {Object} tweet - The tweet object.
 * @param {String} tweet.tweet - The text of the tweet.
 * @param {String} tweet.id - The ID of the tweet (as a string).
 * @param {Array} tweet.entities - An array of tweet entities (urls object, media objects, etc).
 * @param {Number} tweet.retweetCount - The retweet count of the tweet.
 * @param {Number} tweet.likeCount - The like count of the tweet.
 * @param {String} tweet.screenName - The screen name of the author of the tweet.
 * @param {String} tweet.screenURL - The URL of the author of the tweet.
 * @param {String} tweet.profilePic - The URL of the author's profile.
 * @param {String} tweet.tweetURL - The full URL of the tweet.
 * @param {String} tweet.tweetURLShort - The short URL of the tweet.
 */
function mapTweet(tweet) {
    return {
        tweet: tweet.text,
        id: tweet.id_str,
        entities: tweet.entities,
        retweetCount: tweet.retweet_count,
        likeCount: tweet.favorite_count,
        screenName: tweet.user.screen_name,
        screenURL: `https://twitter.com/${tweet.user.screen_name}`,
        profilePic: tweet.user.profile_image_url_https,
        themeColor: tweet.user.profile_link_color,
        tweetURL: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    };
}