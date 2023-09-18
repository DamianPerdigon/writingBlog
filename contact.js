//Form submission
$('#contactForm').submit(function (event) {
    // Prevent default form submission
    event.preventDefault();
    // Get values from form fields
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();
    // Get existing contacts from session storage or set to empty array if null
    var contacts = JSON.parse(sessionStorage.getItem('contacts')) || [];
    // Add new contact to contacts array
    contacts.push({ name: name, email: email, message: message });
    // Save contacts array to session storage
    sessionStorage.setItem('contacts', JSON.stringify(contacts));
    // Alert user that message has been sent
    alert('Message sent!');
});
