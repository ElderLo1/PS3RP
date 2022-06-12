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
	ste = profile.onlineId;
	
	if (pres[0].titleName != null) {
	    stat = pres[0].titleName + " (" + pres[0].platform + ")";
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
