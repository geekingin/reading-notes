var photos=[];
photos.push({
	name:'Node.js Logo',
	path:'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
	name:'Ryan Speaking',
	path:'http://nodejs.org/images/logos/ryan-speaker.png'
});

exports.list=function(req,res){
	res.render('photos',{
		title:'Photos',
		photos:photos
	});
}