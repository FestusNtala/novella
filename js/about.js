// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Team member data
    const teamMembers = [
        {
            name: "Festus Larona Alex Ntala",
            position: "Founder & CEO",
            bio: "Book enthusiast with 15 years of publishing experience",
            image: "team/member1.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                email: "#"
            }
        },
        {
            name: "David Mbeki",
            position: "Head of Operations",
            bio: "Logistics expert who ensures your books arrive on time",
            image: "team/member2.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                email: "#"
            }
        },
        {
            name: "Amanda Smith",
            position: "Marketing Director",
            bio: "Creative mind behind our book recommendations",
            image: "team/member3.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                email: "#"
            }
        },
        {
            name: "James Wilson",
            position: "Customer Experience",
            bio: "Makes sure every customer has a great experience",
            image: "team/member4.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                email: "#"
            }
        }
    ];

    // Render team members
    const teamContainer = document.getElementById('teamContainer');
    teamContainer.innerHTML = teamMembers.map(member => `
        <div class="team-member">
            <div class="member-image">
                <img src="images/${member.image}" alt="${member.name}">
            </div>
            <h3>${member.name}</h3>
            <p class="position">${member.position}</p>
            <p class="bio">${member.bio}</p>
            <div class="social-links">
                <a href="${member.social.twitter}" aria-label="${member.name}'s Twitter"><i class="fab fa-twitter"></i></a>
                <a href="${member.social.linkedin}" aria-label="${member.name}'s LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:${member.social.email}" aria-label="Email ${member.name}"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
    `).join('');

    // Initialize any other about page specific functionality
    console.log('About page initialized');
});