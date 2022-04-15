function sendImg() {

    if (dropArea.getElementsByTagName("img").length == 0) { // check if user didn't load an image
	if (!document.getElementById("noImageError")) { // check if error message don't exist yet
	    const main = document.querySelectorAll("main")[0];
	    // Create error text
	    const para = document.createElement("p");
	    const node = document.createTextNode("There is no image loaded!");
	    para.setAttribute("class", "text-danger bg-dark text-center");
	    para.setAttribute("id", "noImageError");
	    para.appendChild(node);
	    main.appendChild(para);
	}
    } else {
	imgUrl = dropArea.getElementsByTagName("img")[0].getAttribute("src"); // getting img url
	console.log("This is a url in image");
	console.log(imgUrl);
	//imgUrl = imgUrl.substring(22, imgUrl.length); // decision from stackoverflow doesn't work :(
	//console.log(imgUrl);

	imageInfo = document.getElementById("imageInfo"); // div that containes image info
	header = imageInfo.childNodes[1]; // No Info header

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
			'X-RapidAPI-Key': '1a8dcf20a0mshc5346be1d4720c5p1fb685jsnb29c9f6774e6' // paste here api key secretly
		},
		body: `{"url":"${imgUrl}"}`
		//body: '{"url":"https://www.inferdo.com/img/label-1.jpg"}' // original string file from server
	};

	/* currently there is an error here: POST 400 bad request
	 * when getting response the api server returns text with
	 * a message that states: Request image failed to download: failed to parse
	 * maybe it's that the server adds http:// string at the beginning
	 * that maybe is the cause
	 * Because server response with a text, there is complains with JSON
	 * syntax.
	 */
	console.log("Sending imgUrl and getting response...");
	fetch('https://image-labeling1.p.rapidapi.com/img/label', options) // getting response
		.then(response => response.text()) // it must be response.json()
		.then(response => console.log(response))
		//.then(response => {
		//    console.log(response);
		//    header.textContent = "Info";
		//    for (const label in response) { //enumerating (iterating through indexes)
		//	let match = response[label];
		//	let labelPara = document.createElement('p')
		//	labelPara.textContent = label + " " + match;
		//	imageInfo.appendChild(labelPara);
		//    }
		//})
		.catch(err => console.error(err));
    }

}

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable

            let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}

// Here we will delete our image
function deleteImg(){
    window.location.reload();
}