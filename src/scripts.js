const form = document.getElementById('card-contact');
const subBtn = document.getElementById('button');
const subMsg = document.getElementById('submit-msg');

subBtn.addEventListener('click', () => {
    if (form.checkValidity()) {
        subMsg.textContent = "Thank You! Form has been successfully submitted!";
        subMsg.style.color = "green";
    }
    else {
        subMsg.textContent = "Error! Please fill out all the fields!";
        subMsg.style.color = "red";
    }
});