//Constants//
url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD';
//Query Variables//
let boroughBtns = document.querySelectorAll('.borough-button');
let limitSelector = document.querySelector('#complaint-limit');
let complaintUl = document.querySelector('.complaint-ul');
let incidenceUl = document.querySelector('.incidence-ul');
//Variables//
let borough = '';
let limit = '';
complaints = [];
let displayResolution = false;
//Event Listeners//
boroughBtns.forEach((boroughBtn) => {
	boroughBtn.addEventListener('click', (event) => {
		event.preventDefault();
		limit = limitSelector.value;
		borough = boroughBtn.innerText;
		borough = borough.toUpperCase();
		getData();
	});
});
//functions//
function getData() {
	fetch(url + '&borough=' + borough + '&$limit=' + limit)
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			complaintUl.innerHTML = '';
			complaintArray = [];
			for (i = 0; i < limit; i++) {
				//Get Complaint Types
				complaint = res[i].complaint_type;
				//Alphabetize List
				complaintArray.push(complaint);
				complaintArray.sort();
				//Complaint Incidence Tracker
				let complaintPresent = complaintArray[i].includes('Noise');
				console.log(complaintPresent);
				// Make Li, Change innerText to Complaint, Append to Ul
				complaintLi = document.createElement('li');
				complaintLi.setAttribute('class', 'complaint-li');
				complaintLi.innerText = complaintArray[i];
				complaintUl.appendChild(complaintLi);
				//Get Police Resolution, Make Div, Append to Li
				policeAction = res[i].resolution_description;
				let policeActionDiv = document.createElement('div');
				policeActionDiv.setAttribute('class', 'police-action-div');
				policeActionDiv.innerText = policeAction;
				complaintLi.appendChild(policeActionDiv);
				wdpdBtn = document.createElement('button');
				//Create wdpdBtn, Show/Hide Police Resolution Div when wdpdBtn is clicked
				wdpdBtn.setAttribute('class', 'wdpd-btns');
				wdpdBtn.innerText = 'WHAT DID THE POLICE DO?';
				complaintLi.appendChild(wdpdBtn);
				wdpdBtn.addEventListener('click', () => {
					if (displayResolution === false) {
						policeActionDiv.style.display = 'block';
						displayResolution = true;
					} else if (displayResolution === true) {
						policeActionDiv.style.display = 'none';
						displayResolution = false;
					}
				});
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
