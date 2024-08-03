document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('./OtroArchivoMas.md', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const markdownContent = await response.text();
        // Usar marked para convertir Markdown a HTML
        document.getElementById('markdown-content').innerHTML = marked.parse(markdownContent);
    } catch (error) {
        console.error('Error fetching the markdown file:', error);
    }
});