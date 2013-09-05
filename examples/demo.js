var RandomUser = require('..')
  , r = new RandomUser();

r.getUsers(function(data) {
	console.log(data);
});

r.getUsers({ seed: "foxie", results: 5, gender: "male" }, function(data) {
	console.log(data);
});
