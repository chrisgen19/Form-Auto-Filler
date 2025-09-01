// Logic for the settings page (options_page)

const siteInput = document.getElementById('site-input');
const addSiteBtn = document.getElementById('add-site-btn');
const sitesList = document.getElementById('sites-list');
const statusMessage = document.getElementById('status-message');

// Function to display a temporary status message
const showStatus = (message) => {
    statusMessage.textContent = message;
    setTimeout(() => {
        statusMessage.textContent = '';
    }, 2000); // Message disappears after 2 seconds
};

// Function to render the list of allowed sites
const renderSites = (sites) => {
    sitesList.innerHTML = ''; // Clear the current list
    if (sites && sites.length > 0) {
        sites.forEach((site, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${site}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            sitesList.appendChild(li);
        });
    } else {
        sitesList.innerHTML = '<li>No websites added yet.</li>';
    }
};

// Load sites from storage when the page is opened
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['allowedSites'], (result) => {
        const sites = result.allowedSites || [];
        renderSites(sites);
    });
});

// Add a new site to the list
addSiteBtn.addEventListener('click', () => {
    const newSite = siteInput.value.trim();
    if (newSite) {
        chrome.storage.sync.get(['allowedSites'], (result) => {
            const sites = result.allowedSites || [];
            if (sites.includes(newSite)) {
                showStatus('This site is already on the list.');
                return;
            }
            sites.push(newSite);
            chrome.storage.sync.set({ allowedSites: sites }, () => {
                renderSites(sites);
                siteInput.value = '';
                showStatus('Website added!');
            });
        });
    }
});

// Delete a site from the list (using event delegation)
sitesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const indexToDelete = parseInt(event.target.getAttribute('data-index'), 10);
        chrome.storage.sync.get(['allowedSites'], (result) => {
            const sites = result.allowedSites || [];
            sites.splice(indexToDelete, 1); // Remove the site at the specified index
            chrome.storage.sync.set({ allowedSites: sites }, () => {
                renderSites(sites);
                showStatus('Website removed.');
            });
        });
    }
});
