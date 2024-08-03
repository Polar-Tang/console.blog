async function loadMarkdown(file) {
    try {
        const response = await fetch(`./${file}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const markedHTML = document.getElementById('markdown-content');
        const markdownContent = await response.text();
        markedHTML.innerHTML = marked.parse(markdownContent);
    } catch (error) {
        console.error('Error fetching the markdown file:', error);
    } finally {
        contentContainer.classList.remove('loading'); 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadMarkdown('example.md');
});