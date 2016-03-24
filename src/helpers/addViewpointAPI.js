import request from 'superagent';

export default (data) => {
  return new Promise((resolve, reject) => {

	  request.post('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/viewpoint/')
	    .set('Content-Type', 'application/json')
	    .send(data)
	    .end(function(err, res){
	     if (err || !res.ok) {
	       console.log('Oh no! error' + JSON.stringify(err));
	     } else {
	       console.log('yay posted ' + JSON.stringify(res.text));
	       //console.log(res.text);
	       resolve(JSON.parse(res.text)["Item"]);	
	     }
	   })

  });
};

