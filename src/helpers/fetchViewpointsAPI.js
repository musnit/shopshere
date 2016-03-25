import request from 'superagent';

export default (name) => {
  return new Promise((resolve, reject) => {

  	var getResult = (() => {
			request.get('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/viewpoint/')
				.query({ 'filter[shop]' : String(name) })
			    .set('Content-Type', 'application/json')
			    .end(function(err, res){
				     if (err || !res.ok) {
				       console.log('Oh no! error' + JSON.stringify(err));
				     } 

				     else {
				       //console.log('yay got ' + JSON.stringify(res.body));
				       //console.log(res.body["Items"].length);	
				       resolve(res.body["Items"]);		       
				     }
			    })

	  	})();

  });
};


