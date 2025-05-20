// Feedback Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const ratingInputs = document.querySelectorAll('.rating-stars input');
    const ratingText = document.getElementById('ratingText');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // Rating stars interaction
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const ratingDescriptions = {
                '1': 'Poor',
                '2': 'Fair',
                '3': 'Good',
                '4': 'Very Good',
                '5': 'Excellent'
            };
            ratingText.textContent = ratingDescriptions[this.value];
        });
    });
    
    // Form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate form
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        const message = document.getElementById('message').value.trim();
        
        if (!name) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        if (!rating) {
            document.getElementById('ratingError').style.display = 'block';
            isValid = false;
        }
        
        if (!message) {
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the data to a server here
            // For demonstration, we'll just show the confirmation message
            feedbackForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
            
            // Scroll to confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                feedbackForm.reset();
                feedbackForm.style.display = 'block';
                confirmationMessage.style.display = 'none';
                ratingText.textContent = 'Select rating';
            }, 5000);
        }
    });
});