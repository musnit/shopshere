import request from 'superagent';
import shopsFixture from './shopsFixture';

export default (function() {
			request.get('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/shop/')
			    .set('Content-Type', 'application/json')
			    .end(function(err, res){
				     if (err || !res.ok) {
				       alert('Oh no! error');
				     } 
				     else {
				       //alert('yay got ' + JSON.stringify(res.body));
				       console.log("1111");
				       console.log(res.body["Items"]);
				       console.log("2222");
				       console.log(typeof res.body["Items"])
					   console.log("3333");
				       console.log(shopsFixture);
				       console.log("4444");
				       console.log(typeof shopsFixture)
				       console.log("5555");
				       console.log(JSON.stringify(res.body["Items"]));
				       //console.log(shopsFixture);
				       console.log("0" + res.body["Items"]);
				       return shopsFixture;
				     }
			    })

	  	})();