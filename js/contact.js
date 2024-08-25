document.getElementById("sendButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const subject = document.getElementById("subject").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;   


    // Create   
    const mailtoLink = `mailto:leibton@gatech.edu?cc=prakashaditya144@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Open the email app with the pre-filled information
    window.location.href = mailtoLink;
});