function validateForm() {
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;
    const email = document.querySelector('.email').value;
    const phone = document.querySelector('.phone').value;

    if (username === '') {
        alert('Please enter your username');
        return false;
    }

    if (password === '') {
        alert('Please enter your password');
        return false;
    }

    if (email === '') {
        alert('Please enter your email');
        return false;
    }

    // check if email is valid using regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return false;
    }

    if (phone === '') {
        alert('Please enter your phone number');
        return false;
    }

    // check if phone number is valid using regex
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return false;
    }

    // all fields are valid, form can be submitted
    alert('Form submitted successfully');
    alert('Thank you for registering with us');
    
}
