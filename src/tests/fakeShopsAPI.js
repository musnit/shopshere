import shopsFixture from './shopsFixture';
import request from 'superagent';

export default () => {
  return new Promise((resolve, reject) => {

  	var getResult = (() => {
			request.get('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/data/shop/')
			    .set('Content-Type', 'application/json')
			    .end(function(err, res){
				     if (err || !res.ok) {
				       alert('Oh no! error');
				     }

				     else {
				       alert('yay got ' + JSON.stringify(res.body));
				       resolve(res.body["Items"]);
				     }
			    })

	  	})();

  });
};
