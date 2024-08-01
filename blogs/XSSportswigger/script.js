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

// async function loadMarkdown(url) {
//     const contentContainer = document.getElementById('markdown-content');
//     const loader = document.getElementById('loader');
//     contentContainer.classList.add('loading'); 

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const markdownContent = await response.text();
//         contentContainer.innerHTML = marked.parse(markdownContent);
//     } catch (error) {
//         console.error('Error fetching the markdown file:', error);
//     } finally {
//         contentContainer.classList.remove('loading'); 
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     loadMarkdown('./example.md');
// });

// function loadAnotherMarkdown() {
//     loadMarkdown('./OtroArchivoMas.md');
// }