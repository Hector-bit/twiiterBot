const rwClient = require("./twitterClient.js");

const tweet = async () => {
    try {
        await rwClient.v2.tweet("good morning #techtwitter, from #helperbot")
    } catch(e) {
        console.error(e)
    }
}

tweet()