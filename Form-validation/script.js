const form = document.getElementById('form');
const inputs = document.querySelectorAll('input');
const password = document.getElementById('password');
const confirmed = document.getElementById('confirmed');
const message = document.getElementById('message');

let isValid = false;
let isMatch = false;

function validateForm() {
    isValid = form.checkValidity();

    if(!isValid) {
        message.style.borderColor = 'red';
        message.style.color = 'red';
        message.textContent = 'Please fill out all fields.';
        return;
    };

    if(password.value === confirmed.value) {
        isMatch = true;
        password.style.borderColor = 'green';
        confirmed.style.borderColor = 'green';
    } else {
        isMatch = false;
        message.style.borderColor = 'red';
        message.style.color = 'red';
        message.textContent = 'Please make sure the passwords matched.';
        password.style.borderColor = 'red';
        confirmed.style.borderColor = 'red';
        return;
    };

    if(isValid && isMatch) {
        message.style.borderColor = 'green';
        message.style.color = 'green';
        message.textContent = 'Successfully Register!';
    };
};

function storeInfo() {
    const user = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        phoneNumber: form.phone.value,
        email: form.email.value,
        website: form.web.value,
        password: form.confirmed.value
    };
    console.log(user);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    if(isValid && isMatch) {
        storeInfo();
    };
})