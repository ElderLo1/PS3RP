var psn = require('psn-api');
const client = require('discord-rich-presence')('yourDiscordClientIDhere');
// Insert your client ID here. Don't share it with anyone else!

console.log("Initializing...");

//THIS IS VERY HACKY LMAO

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function getUserInfo() {
	const accessCode = await psn.exchangeNpssoForCode('yourNPSSOhere');
	// Insert your npsso here. Don't share it with anyone else!
	
	const auth = await psn.exchangeCodeForAccessToken(accessCode);
	
	const response = await psn.getProfileFromUserName(auth, 'yourPSNIDhere');
	// Insert your PSN ID here!
	return response;
}
async function doStuff() {
while (true) {
const uInfo = getUserInfo();
uInfo.then(function(result) {
    //console.log(result.profile);	
	const profile = result.profile;
	const pres = profile.presences;
	gameTitle = null;
	ste = "";
	
	if (pres[0].titleName != null) {
		if (pres[0].npTitleId == "NPJA00040_00" || pres[0].npTitleId == "NPIA00183_00")
		{
			gameTitle = "PlayStation Home (v1.83)";
			if (pres[0].gameStatus != null) {
			    ste = pres[0].gameStatus + " (" + profile.onlineId + ")";	
			} else {
			    ste = "???" + " (" + profile.onlineId + ")";	
			}
		} else {
			gameTitle = pres[0].titleName
		}
	    stat = gameTitle + " (" + pres[0].platform + ")";
	} else if (profile.primaryOnlineStatus == 'online') {
	    stat = "Not in-game";
	} else {
	    stat = "Offline";	
	}
	//stat = "amogus (test lol)";
	console.log(stat);
	client.updatePresence({
		state: ste,
	    details: stat,
	    startTimestamp: Date.now(),
    });
})
await sleep(60000);
}
}

doStuff();
