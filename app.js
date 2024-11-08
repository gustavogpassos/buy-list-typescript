const formularioItem = document.getElementById('formularioItem');
const listaItens = document.getElementById('listaItens');
const inputItem = document.getElementById('item');
const carregarItens = () => {
    const itens = localStorage.getItem('itens');
    return itens ? JSON.parse(itens) : [];
};
const salvarItens = (itens) => {
    localStorage.setItem('itens', JSON.stringify(itens));
};
const adicionarItem = (nome) => {
    const itens = carregarItens();
    const novo = {
        id: new Date().toISOString(),
        nome
    };
    itens.push(novo);
    salvarItens(itens);
};
const removerItem = (id) => {
    const itens = carregarItens();
    const itensAtuaizados = itens.filter((item) => item.id != id);
    salvarItens(itensAtuaizados);
};
const editarItem = (id, novoNome) => {
    const itens = carregarItens();
    const item = itens.find(item => item.id == id);
    if (item) {
        item.nome = novoNome;
        salvarItens(itens);
    }
};
const renderizarItens = () => {
    const itens = carregarItens();
    listaItens.innerHTML = '';
    itens.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nome;
        listItem.addEventListener('dblclick', () => {
            const novoNome = prompt('Editar item:', item.nome);
            if (novoNome != null)
                editarItem(item.id, novoNome);
            renderizarItens();
        });
        listaItens.appendChild(listItem);
    });
};
formularioItem.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = inputItem.value.trim();
    if (nome) {
        adicionarItem(nome);
        inputItem.value = '';
        renderizarItens();
    }
});
renderizarItens();
