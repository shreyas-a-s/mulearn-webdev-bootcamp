// Birthday details
const birthDate = new Date("1968-01-09");
const today = new Date();

// Calculate age
let age = today.getFullYear() - birthDate.getFullYear();
const isBirthdayPassed = (today.getMonth() > birthDate.getMonth()) ||
	(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
if (!isBirthdayPassed) {
	age--;
}

// Update HTML
document.getElementById("bday-age").textContent = `${age} years old`;
document.getElementById("bday-date").textContent = "09-01-" + today.getFullYear();
