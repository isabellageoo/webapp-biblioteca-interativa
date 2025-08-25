function showSection(id) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section =>{
        section.style.display = section.id === id ? 'block' : 'none';
    });
}

function searchByTitle() {
    const query = document.getElementById('titleInput').value;
    const container = document.getElementById('titleResults');
    container.innerHTML = "<p>🔄 Carregando...</p>";
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const results = data.docs.slice(0, 10);
            if (results.length === 0) {
                container.innerHTML = "<p>Nenhum livro encontrado ❌</p>";
                return;
            }
            container.innerHTML = results.map(book => `
                <p><strong>${book.title}</strong> - ${book.author_name?.join(', ') || 'Autor Desconhecido'}</p>
            `).join('');
        })
        .catch(() => {
            container.innerHTML = "<p>⚠️ Ocorreu um erro. Tente novamente.</p>";
        });
}

function searchBySubject() {
    const subject = document.getElementById('subjectInput').value;
    const container = document.getElementById('subjectResults');
    container.innerHTML = "<p>🔄 Carregando...</p>"; 
    fetch(`https://openlibrary.org/subjects/${encodeURIComponent(subject.toLowerCase())}.json?limit=10`)
        .then(response => response.json())
        .then(data => {
            if (!data.works || data.works.length === 0) {
                container.innerHTML = "<p>Nenhum livro encontrado ❌</p>";
                return;
            }
            container.innerHTML = data.works.map(work => `
                <div class="result-card">
                    <h3>${work.title}</h3>
                    <p>${work.authors?.map(a => a.name).join(', ') || 'Autor Desconhecido'}</p>
                </div>
            `).join('');
        })
        .catch(() => {
            container.innerHTML = "<p>⚠️ Ocorreu um erro. Tente novamente.</p>";
        });
}

function searchCovers() {
    const query = document.getElementById('coverInput').value;
    const container = document.getElementById('coverResults');
    container.innerHTML = "<p>🔄 Carregando...</p>"; 
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const results = data.docs.slice(0, 12);
            if (results.length === 0) {
                container.innerHTML = "<p>Nenhuma capa encontrada ❌</p>";
                return;
            }
            container.innerHTML = results.map(book => {
                const coverId = book.cover_i;
                return coverId
                    ? `<img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="${book.title}" title="${book.title}">`
                    : '';
            }).join('');
        })
        .catch(() => {
            container.innerHTML = "<p>⚠️ Ocorreu um erro. Tente novamente.</p>";
        });
}