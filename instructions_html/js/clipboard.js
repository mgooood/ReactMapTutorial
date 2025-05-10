// Function to copy code to clipboard
document.addEventListener('DOMContentLoaded', function() {
    // Find all code blocks (both commands and regular code examples)
    const allCodeBlocks = document.querySelectorAll('.code-block');
    
    // For each code block, add a copy button
    allCodeBlocks.forEach(function(block) {
        // Get the code text
        let codeText = '';
        
        // Handle different code block structures
        if (block.querySelector('pre code')) {
            // Regular code examples with pre > code structure
            codeText = block.querySelector('pre code').innerText;
        } else if (block.querySelector('code')) {
            // Command blocks with direct code child
            codeText = block.querySelector('code').innerText;
        } else {
            // Fallback to the block's own text
            codeText = block.innerText;
        }
        
        // Create a copy button with appropriate label
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        
        // Different label for commands vs code examples
        if (block.classList.contains('command')) {
            copyButton.textContent = 'Copy';
            copyButton.setAttribute('aria-label', 'Copy command to clipboard');
        } else {
            copyButton.textContent = 'Copy';
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        }
        
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
