const rwClient = require("./twitterClient");
const CronJob = require("cron").CronJob;

const tweet = async () => {
    try {
        await rwClient.v2.tweet("good morning #techtwitter, from #twitter_api_v2")
    } catch(e) {
        console.error(e)
    }
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


const job = new CronJob("0 5 * * *", () => {
    // tweet()
    jsTweets()
})

job.start();

// jsTweets();


