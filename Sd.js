
  let allNovels = [];
  
  // Initialize dark mode from localStorage or system preference
  function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || savedMode === null && systemPrefersDark) {
      document.body.classList.add('darkmode');
    }
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle('darkmode');
    localStorage.setItem('darkMode', isDark);
  }
  
  // Fetch and display novels
  async function fetchAndDisplayNovels() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/DANY1238621/Sherlock-Holmes/refs/heads/Sherlock-Holmes/narrators.json');
        allNovels = await response.json();
        displayNovels(allNovels);
        addSearchInput();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('narrators-list').innerHTML =
            '<p>Error loading data. Please try again later.</p>';
    }
  }
  
  function addSearchInput() {
    document.getElementById('search').addEventListener('input', filterNovels);
    document.getElementById('btn').addEventListener('click', filterNovels);
  }
  
  function filterNovels(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value.toLowerCase().trim();
    if (!searchTerm) {
        displayNovels(allNovels);
        return;
    }
    const filtered = allNovels.filter(novel =>
        novel.name.toLowerCase().includes(searchTerm) ||
        novel.author.toLowerCase().includes(searchTerm)
    );
    displayNovels(filtered.length ? filtered : []);
    if (!filtered.length) {
        const container = document.getElementById('narrators-list');
        container.innerHTML = '<p class="no-results">No results found</p>';
    }
  }
  
  function displayNovels(novels) {
    const container = document.getElementById('narrators-list');
    container.innerHTML = '';
    novels.forEach(novel => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.id = `${novel.name}`
        card.innerHTML = `
            <a href="${novel.downloadLink}"><img src="${novel.image}" alt="${novel.name}"/></a>
        `;
        container.appendChild(card);
    });
  }
  
  // Initialize everything when page loads
  window.onload = function() {
    initDarkMode();
    fetchAndDisplayNovels();
  };
  toggleDarkMode();
