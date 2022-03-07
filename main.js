const rwClient = require("./twitterClient");
const CronJob = require("cron").CronJob;

const mytwitterID = '1486239064663597061';

const tweet = async () => {
    try {
        await rwClient.v2.tweet("good morning #techtwitter, from #twitter_api_v2")
    } catch(e) {
        console.error(e)
    }
}

const like_ten_tweets = async () => {
    //search for tweets
    let tweets = await rwClient.v2.search("100daysofcode", {'media.fields': 'url'})
    let uniqueIDS = new Set();
    for (const tweet of tweets){
        uniqueIDS.add(tweet.id);
    }
    console.log(uniqueIDS)

    uniqueIDS.forEach(element => {
        console.log("liking this tweet: ", element);
        rwClient.v2.like(mytwitterID, element);
        setTimeout( () => {console.log("waiting")}, 1500)
    });
    // console.log(mytwitterID, uniqueIDS[0])
    // await rwClient.v2.like(mytwitterID ,uniqueIDS[0]);
}

const jsTweets = async () => {
    try {
        let data = await rwClient.v2.search("100daysofcode", {'media.fields': 'url' });
        const thingy = data.tweets[0]
        console.log(thingy.id, 'thingy id')
        const user_info = await rwClient.v2.me();
        console.log(user_info.data.id, 'user id')
        await rwClient.v2.retweet( `${user_info.data.id}`, `${thingy.id}`)
        return data.tweets[0]
    } catch(e){
        console.error(e)
    }
}


// const job = new CronJob("0 5 * * *", () => {
//     // tweet()
//     jsTweets()
// })

// job.start();


await like_ten_tweets();
await jsTweets();


