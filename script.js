const getDescriptions = async () => {
    try {
        const response = await fetch('./public/blogDescription.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const descriptions = await response.json();
        return descriptions;
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
        return [];
    }
};

const descContainerHTML = document.getElementById('descContainerHTML');
const inputOnBrow = document.getElementById('input');
const howMuchMatchHTML = document.getElementById('muchMatches');
const loadingMessage = document.getElementById('loadingMessage');

const renderLoaders = () => {
    let loaders = '';
    for (let i = 0; i < 30; i++) {
        loaders += `
        <div class="card-body">
            <h3 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
            </h3>
            <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
            </p>
        </div>
        `;
    }
    loadingMessage.innerHTML = loaders;
};

renderLoaders(30);

const renderDescriptions = (descriptions) => {
    const arrayDesc = descriptions.map(description => `
         <a class="description link-to-blog col" href="${description.anchor}">
                    <h3 class="title row">${description.title}</h3>
                    <p class="content row">${description.descriptions}</p>
                    <div class="details row w-100">
                        <p class="date col-3 d-flex justify-content-start "> ${description.date} </p>
                        <div class="col-9 gap-3 d-flex justify-content-end" >
                        ${description.vulnerabillity ? `<p class="vulnerabillity border border-danger danger gap-10 text">  ${description.vulnerabillity}   </p>` : ''}
                        ${description.category ? `<p class="category border border-success-subtle text ">     ${description.category}    </p>` : ''}
                        ${description.difficulty ? `<p class="difficulty border border-warning text ">   ${description.difficulty}   </p>` : ''}    
                        </div>
                    </div>
                </a>
    `);
    descContainerHTML.innerHTML = arrayDesc.join('');
};


const filterDescriptions = (descriptions, query) => {
    return descriptions.filter(description => {
        const matchTitle = description.title.toLowerCase().includes(query);
        const matchCategory = description.category.toLowerCase().includes(query);
        const matchDifficulty = description.difficulty ? description.difficulty.toLowerCase().includes(query) : false;
        const matchVulnerabillity = description.vulnerabillity ? description.vulnerabillity.toLowerCase().includes(query) : false;
        return matchTitle || matchCategory || matchDifficulty || matchVulnerabillity;
    });
};

const init = async () => {
    const descriptions = await getDescriptions();
    loadingMessage.style.display = 'block';

    // Render inicial
    renderDescriptions(descriptions);

    inputOnBrow.addEventListener('input', () => {
        const query = inputOnBrow.value.toLowerCase();
        const filteredDescriptions = filterDescriptions(descriptions, query);

        renderDescriptions(filteredDescriptions);

        if (query) {
            howMuchMatchHTML.innerHTML = `Tienes ${filteredDescriptions.length} resultados encontrados.`;
        } else {
            howMuchMatchHTML.innerHTML = '';
        }
    });
};

init();



