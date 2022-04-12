function sendImg() {
    const options = {
	    method: 'POST',
	    headers: {
		    'content-type': 'application/json',
		    'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
		    'X-RapidAPI-Key': ''
	    },
	    body: '{"url":"./download.jpeg"}'
    };

    fetch('https://image-labeling1.p.rapidapi.com/img/label', options)
	    .then(response => response.json())
	    .then(response => console.log(response))
	    .catch(err => console.error(err));
}
