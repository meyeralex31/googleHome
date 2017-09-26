const app = require('actions-on-google').ApiAiApp;
exports.factsAboutGoogle = function(request,response){
	const app = new App({request,response});
	function tellFact(app){
		let fact = DEFAULT_FACT;
		let factCategory = app.getArgument('fact-category');
		if(factCategory == 'history'){
			fact = getRandomHistoryFact();
		}
		else if(factCategory === 'headquaters'){
			fact = getRandomHQFact();
		}
		if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
			app.ask(app.buildRichReponse()
				.addsimpleResponse('Here\'s a fact for you. ' + fact +
				' Which one do you want to hear about next,' +
				' Google\'s history or headquaters?')
				//basic card to response
				.addBasicCard(
					app.buildBasicCard(fact)
					//can even add an image although need to declare it
					//.setImage(IMG_SRC,IMG_ALT_TEXT)
				)
				//add sugestions to give back to user on screen;
				.addSuggestions(['History','Headquaters']);
			);
		}
		//if there is no screen and it is just talking
		else{
			app.ask('Here\'s a fact for you. ' + fact +
			' Which one do you want to hear about next,' +
			' Google\'s history or headquaters?');
		}
	}
	const actionMap = new Map();
	actionMap.set('tell.fact',tellFact);
	app.handleRequest(actionMap);
};