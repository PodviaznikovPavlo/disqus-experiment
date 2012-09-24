var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/public'));


app.get('/time', function(req, res){
  res.send(new Date().toString());
});

app.get('/users/:username', function(req, res){
	var username = req.params.username;
	console.log("Hello", username);


	request('https://api.github.com/users/'+username, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Print the google web page.

	    var user = JSON.parse(body);
	    if (!user.name){
	    	res.redirect("/");
	    } else{
        var html = "<p style='color:red;'>" + user.name + "</p><img src='" + user.avatar_url +"'>";


    	html+="<div id='disqus_thread'></div>";
    	html+="<script type='text/javascript'>";
        html+="var disqus_shortname = 'disqus-experiment';"
		html+="(function() {var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';";
        html+="(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);";
        html+="})();";
        html+="</script><noscript>Please enable JavaScript to view the <a href='http://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript><a href='http://disqus.com' class='dsq-brlink'>comments powered by <span class='logo-disqus'>Disqus</span></a>";
    



	    res.send(html);
		}
	  }
	  else{
	  	res.redirect("/");
	  }
	})


	
});






app.listen(3000);
console.log('Listening on port 3000');