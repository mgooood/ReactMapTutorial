// Function to copy code to clipboard
document.addEventListener('DOMContentLoaded', function() {
    // Find all code blocks that are specifically marked as commands
    const commandBlocks = document.querySelectorAll('.code-block.command');
    
    // For each command block, add a copy button
    commandBlocks.forEach(function(block) {
        // Get the code text
        const codeElement = block.querySelector('code');
        const codeText = codeElement ? codeElement.innerText : block.innerText;
        
        // Create a copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        copyButton.setAttribute('aria-label', 'Copy command to clipboard');
        
        // Add copy functionality
        copyButton.addEventListener('click', function() {
            // Copy to clipboard
            navigator.clipboard.writeText(codeText)
                .then(function() {
                    // Visual feedback
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                        copyButton.classList.remove('copied');
                    }, 2000);
                })
                .catch(function(error) {
                    console.error('Failed to copy: ', error);
                    copyButton.textContent = 'Error!';
                    
                    // Reset after 2 seconds
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
        });
        
        // Add the button to the code block
        block.appendChild(copyButton);
    });
});
