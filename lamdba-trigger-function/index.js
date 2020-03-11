const Alexa = require('alexa-sdk');
const http = require('http');


function release() {
    return new Promise((resolve, fail) => {
        //const date = new Date();
        
        const data_lol = JSON.stringify({
            'token': 'XXXX'
        });
        
        const options = {
            host: 'ansible-server||Deployer',
            port: '4444',
            path: '/release',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data_lol.length
            }
        };
        
        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`);
            
            res.on('data', response => {
	//	console.log(response.toString('utf8'));
                resolve(response.toString('utf8'));
            })
        });
        
        req.on('error', error => {
            console.error(error);
            fail(error);
        });
        
        req.write(data_lol);
        req.end();
    });
}

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;


const SKILL_NAME = 'Deployer';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================


exports.handler = async (event, context, callback) => {
    
    
    const retValue = await release();
    const data = [
        retValue
    ];
    const handlers = {
        'LaunchRequest': function () {
            this.emit('GetNewFactIntent');
        },
        'GetNewFactIntent': function () {
            const factArr = data;
            
            const factIndex = Math.floor(Math.random() * factArr.length);
            const randomFact = factArr[factIndex];
            const speechOutput = GET_FACT_MESSAGE + randomFact;//+ date;
            this.response.cardRenderer(SKILL_NAME, randomFact);
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        },
        'AMAZON.HelpIntent': function () {
            const speechOutput = HELP_MESSAGE;
            const reprompt = HELP_REPROMPT;
            
            this.response.speak(speechOutput).listen(reprompt);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent': function () {
            this.response.speak(STOP_MESSAGE);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            this.response.speak(STOP_MESSAGE);
            this.emit(':responseReady');
        },
    };
    
    
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    
};

