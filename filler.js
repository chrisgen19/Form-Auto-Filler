// --- Form Filling Logic ---

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fills form fields on the page with specific and generated data.
 * This function should ONLY be called by a user action (e.g., button click).
 */
function fillForms() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        const inputName = input.name || input.id || '';
        if (!inputName) return;

        // Convert to lower case for case-insensitive matching
        const nameLower = inputName.toLowerCase();

        // Handle specific field names based on user requirements
        if (nameLower.includes('contactfirstname')) {
            input.value = `testChrisv${getRandomInt(1, 100)}`;
        } else if (nameLower.includes('contactlastname')) {
            input.value = 'test';
        } else if (nameLower.includes('contactphone')) {
            // Generate a random 10-digit number
            const randomPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            input.value = randomPhone;
        } else if (nameLower.includes('contactcompanyname')) {
            input.value = "TestCorp Inc.";
        } else if (nameLower.includes('projectlocationsuburb')) {
            input.value = "Mandaluyong";
        } else if (nameLower.includes('transactiontype')) {
            // Specific rule to always select "Buy"
            input.value = "Buy";
        } else if (input.tagName.toLowerCase() === 'select') {
            // Generic rule for other dropdowns: select the second option,
            // assuming the first one is a placeholder like "Select..."
            if (input.options.length > 1) {
                input.selectedIndex = 1;
            }
        } else if (nameLower.includes('email')) {
             input.value = `test.user${getRandomInt(1, 1000)}@test.com`;
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.value = "This is an automated test message from the Form Auto Filler extension.";
        }


        // Trigger change event to ensure frameworks like React/Vue detect the change
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    console.log('Form Auto Filler: Fields have been populated by widget click!');
}

