let allNovels = [];
async function fetchAndDisplayNovels() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/DANY1238621/Sherlock-Holmes/refs/heads/Sherlock-Holmes/narrators.json');
        allNovels = await response.json();
        displayNovels(allNovels);
        addSearchInput();
    } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
        document.getElementById('narrators-list').innerHTML =
            '<p>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</p>';
}} function addSearchInput() {
    document.getElementById('search').addEventListener('input', filterNovels);
    document.getElementById('btn').addEventListener('click', filterNovels);
}
function filterNovels() {
    const searchTerm = document.getElementById('search').value.toLowerCase().trim();
    if (!searchTerm) {
        displayNovels(allNovels); // إعادة عرض الكل إذا كان البحث فارغاً
        return;
    } const filtered = allNovels.filter(novel =>
        novel.name.toLowerCase().includes(searchTerm) ||
        novel.author.toLowerCase().includes(searchTerm)
    ); displayNovels(filtered.length ? filtered : []);
    if (!filtered.length) {
        const container = document.getElementById('narrators-list');
        container.innerHTML = '<p class="no-results">لا توجد نتائج تطابق بحثك</p>';
}} function displayNovels(novels) {
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
        alert("hay")
})} window.onload = fetchAndDisplayNovels;
function Darkmode(mode) {
    if (mode) {
        document.body.classList.add("darkmode")
        document.getElementById("moon").style.display = "none"
        document.getElementById("sun").style.display = "unset"
    } else {
        document.body.classList.remove("darkmode")
        document.getElementById("moon").style.display = "unset"
        document.getElementById("sun").style.display = "none"
}} Darkmode(true)
