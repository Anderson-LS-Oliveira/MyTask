const btnSalvar = document.getElementById("salvar");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const lista = document.getElementById("listaTarefas");

let tarefas = [];

// carregar do localStorage
window.onload = () => {
  const dados = localStorage.getItem("tarefas");
  if (dados) {
    tarefas = JSON.parse(dados);
    renderizarTarefas();
  }
};

btnSalvar.addEventListener("click", () => {
  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();

  if (!titulo) {
    alert("Digite um título!");
    return;
  }

  tarefas.push({ titulo, descricao });

  salvarLocal();
  renderizarTarefas();

  tituloInput.value = "";
  descricaoInput.value = "";

  const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
  modal.hide();
});

function renderizarTarefas() {
    lista.innerHTML = "";
  
    tarefas.forEach((tarefa, index) => {
      const div = document.createElement("div");
      div.className = "card p-3 mb-2";
  
      div.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
  
          <div class="d-flex align-items-center gap-2">
  
            <input type="checkbox" ${tarefa.done ? "checked" : ""} 
              onchange="toggleDone(${index})">
  
            <h6 class="mb-0" style="text-decoration: ${tarefa.done ? "line-through" : "none"}">
              ${tarefa.titulo}
            </h6>
  
          </div>
  
          <button class="btn btn-sm btn-secondary" onclick="toggleDescricao(${index})">
            ...
          </button>
  
        </div>
  
        <p id="desc-${index}" style="display:none; margin-top:10px;">
          ${tarefa.descricao}
        </p>
      `;
  
      lista.appendChild(div);
    });
  }

function toggleDescricao(index) {
  const desc = document.getElementById(`desc-${index}`);

  if (desc.style.display === "none") {
    desc.style.display = "block";
  } else {
    desc.style.display = "none";
  }
}

function salvarLocal() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function toggleDone(index) {
  tarefas[index].done = !tarefas[index].done;
  salvarLocal();
  renderizarTarefas();
}