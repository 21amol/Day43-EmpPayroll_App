window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

	const createInnerHtml = () => {
	
    const innerHtml = 
		'<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>'+ 
		'<tr><td><img class="profile" alt="" src="../assests/profile-images/Ellipse -9.png"></td>'+
		'<td>Amol</td><td>Male</td><td><div class="Dept-label">HR</div></td><td>50000</td>'+
		'<td>21 May 2020</td><td><img id="1" onclick="remove(this)" alt="delete" src="../assests/icons/delete-black-18dp.svg">'+
		'<img id="1" alt="edit" onclick="upgate(this)" src="../assests/icons/create-black-18dp.svg"></td></tr>';
			
	document.querySelector('#table-display').innerHTML = innerHtml;
	};

						