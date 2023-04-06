function randomTwoLettersAndFourDigits() {
    let letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let digits = Math.floor(1000 + Math.random() * 9000);
    return letters + digits;
}
let ids = ["random-string-1", "random-string-2", "random-string-3", "random-string-4", "random-string-5", "random-string-6", "random-string-7", "random-string-8"];
for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).innerHTML = randomTwoLettersAndFourDigits();
}