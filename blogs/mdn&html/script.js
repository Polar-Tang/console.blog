document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('./mixmd.md', {
            method: 'GET'
        })
        
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const markdownContent = await response.text()
        const convertedHTML = marked.parse(markdownContent)

        const markdownContainer = document.getElementById('markdown-content')
        
        const loader = document.getElementById('loader')
        if (loader) {
            loader.remove()
        }

        const newContent = document.createElement('div') 
        newContent.innerHTML = convertedHTML

        markdownContainer.appendChild(newContent)
    } catch (error) {
        console.error('Error fetching the markdown file:', error)
    }
})
