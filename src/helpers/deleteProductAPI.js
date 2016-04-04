import request from 'superagent';

export default (object) => {
  return new Promise((resolve, reject) => {
  	var getResult = (() => {
			request.del('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/product/'+object.name)
			    .set('Content-Type', 'application/json')
			    .end(function(err, res){
				     if (err || !res.ok) {
				       console.log('Oh no! error' + JSON.stringify(err));
				     } 

				     else {
				       //console.log('yay got ' + JSON.stringify(res.body));	
				       resolve({index: object.index});		       
				     }
			    })

	  	})();

  });
};
