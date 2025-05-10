// JavaScript for handling collapsible sections with accessibility support
document.addEventListener('DOMContentLoaded', function() {
    // Find all collapsible headers
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    // Add click event listeners to each header
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleCollapsible(this);
        });
        
        // Add keyboard support
        header.addEventListener('keydown', function(e) {
            // Enter or Space key triggers the collapsible
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCollapsible(this);
            }
        });
    });
    
    // Helper function to toggle collapsible state with accessibility updates
    function toggleCollapsible(header) {
        // Toggle the 'open' class on the header
        header.classList.toggle('open');
        
        // Update ARIA attributes
        const isExpanded = header.classList.contains('open');
        header.setAttribute('aria-expanded', isExpanded);
        
        // Find and update the content section
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
            content.setAttribute('aria-hidden', !isExpanded);
        }
    }
    
    // Optional: Expand any sections marked with 'initially-open' class
    const initiallyOpen = document.querySelectorAll('.collapsible-header.initially-open');
    initiallyOpen.forEach(header => {
        toggleCollapsible(header);
    });
});
