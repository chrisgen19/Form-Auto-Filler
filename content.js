// This script runs on the page to create and manage the floating widget.

/**
 * Creates the floating widget and adds it to the page.
 */
function createWidget() {
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

// Check if there is at least one form on the page before creating the widget.
// We wait for the window to load to ensure all DOM elements are available.
window.addEventListener('load', () => {
    if (document.querySelector('form')) {
        createWidget();
    }
});
