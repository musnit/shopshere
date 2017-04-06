import shopsFixture from './shopsFixture';
import request from 'superagent';

export default () => {
  return new Promise((resolve, reject) => {

  	var getResult = (() => {
			request.get('https://4rv33ibj84.execute-api.us-west-2.amazonaws.com/dev/data/shop/')
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
