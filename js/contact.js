// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate form
        let isValid = true;
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value.trim();
        
        if (!name) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        if (!subject) {
            document.getElementById('subjectError').style.display = 'block';
            isValid = false;
        }
        
        if (!message) {
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the data to a server here
            // For demonstration, we'll just show the confirmation message
            contactForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
            
            // Scroll to confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                confirmationMessage.style.display = 'none';
            }, 5000);
        }
    });
});