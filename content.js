// This script runs on the page to create and manage the floating widget.

let checkInterval; // To hold our interval ID
let attempts = 0; // To count how many times we've checked
const maxAttempts = 10; // Check for a total of 10 seconds

/**
 * Creates the floating widget and adds it to the page.
 */
function createWidget() {
    // Prevent creating more than one widget
    if (document.getElementById('form-filler-widget')) {
        return;
    }

    // Create the widget container
    const widget = document.createElement('div');
    widget.id = 'form-filler-widget';

    // Set the inner HTML for the widget
    widget.innerHTML = `
        <div class="widget-header">Auto Filler</div>
        <p class="widget-text">Form detected on this page.</p>
        <button id="fill-form-btn">Click to Fill</button>
    `;

    // Add the widget to the document body
    document.body.appendChild(widget);

    // Add a click event listener to the button
    document.getElementById('fill-form-btn').addEventListener('click', () => {
        // Check if the fillForms function from filler.js exists
        if (typeof fillForms === 'function') {
            fillForms();
            // Optionally, hide the widget after it's used
            widget.style.display = 'none'; 
        } else {
            console.error('Form Filler Error: The fillForms() function could not be found.');
        }
    });
}

/**
 * Checks for a form element on the page. If found, it creates the widget
 * and stops the interval.
 */
function checkForForm() {
    attempts++;
    
    // If a form is found...
    if (document.querySelector('form')) {
        console.log('Auto Filler: Form found! Creating widget.');
        createWidget();
        clearInterval(checkInterval); // Stop checking
    }
    
    // Stop checking after max attempts to avoid running forever
    if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
    }
}

// Instead of waiting for a single 'load' event, start checking repeatedly.
// This handles forms that are loaded dynamically after the initial page load.
checkInterval = setInterval(checkForForm, 1000); // Check every 1 second

