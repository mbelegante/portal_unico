/*
  Aplicação funcional com UX propositalmente ruim.
  Agora com menos etapas e uma pegadinha na etapa 3:
  - Clicar em "Voltar" avança.
  - Clicar em "Próximo" manda o usuário de volta para o início.
*/

const stepContent = document.getElementById("stepContent");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const errorBox = document.getElementById("errorBox");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const sessionTimer = document.getElementById("sessionTimer");
const randomPopup = document.getElementById("randomPopup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

let currentStep = 0;
let formData = {};
let revealedRequirements = {};
let finished = false;

const vagueErrors = [
  "Existem pendências no preenchimento.",
  "Não foi possível prosseguir por inconsistência genérica.",
  "Campo incompatível com regra administrativa não informada.",
  "A validação retornou uma ocorrência.",
  "Revise os dados e tente novamente."
];

const popupMessages = [
  "Por motivos de segurança, recomendamos que você não feche esta janela, mas talvez precise fechar.",
  "O sistema detectou uma atualização cadastral potencialmente obrigatória.",
  "Atenção: esta etapa poderá ser solicitada novamente em outro momento.",
  "Você está acessando um ambiente integrado. Algumas informações podem não ser salvas.",
  "Comunicado: o portal pode apresentar instabilidade mesmo quando estiver funcionando."
];

/*
  Foram removidas:
  - Antiga etapa 6: Situação habitacional
  - Antiga etapa 9: Anexos declaratórios
  - Antiga etapa 12: Validação humana / CAPTCHA

  Agora o formulário tem 9 etapas.
*/
const steps = [
  {
    title: "Etapa 1 de 9 — Identificação preliminar",
    description: "Informe seus dados básicos para início da análise inicial não conclusiva.",
    fields: [
      { id: "nome", label: "Nome completo", type: "text", required: true },
      { id: "cpf", label: "CPF", type: "text", required: true },
      { id: "nascimento", label: "Data de nascimento", type: "date", required: true },
      { id: "mae", label: "Nome da mãe", type: "text", required: true }
    ]
  },
  {
    title: "Etapa 2 de 9 — Documentação civil",
    description: "Preencha documentos que talvez já constem em bases governamentais.",
    fields: [
      { id: "rg", label: "RG", type: "text", required: true },
      { id: "orgao", label: "Órgão emissor", type: "text", required: true },
      { id: "titulo", label: "Título de eleitor", type: "text", required: false },
      { id: "nis", label: "NIS/PIS/PASEP", type: "text", required: true }
    ]
  },
  {
    title: "Etapa 3 de 9 — Endereço residencial",
    description: "O endereço será validado por critérios não exibidos nesta tela.",
    fields: [
      { id: "cep", label: "CEP", type: "text", required: true },
      { id: "rua", label: "Logradouro", type: "text", required: true },
      { id: "numero", label: "Número", type: "text", required: true },
      { id: "complemento", label: "Complemento", type: "text", required: false },
      { id: "bairro", label: "Bairro", type: "text", required: true },
      { id: "cidade", label: "Município", type: "text", required: true }
    ]
  },
  {
    title: "Etapa 4 de 9 — Composição familiar",
    description: "Declare informações familiares mesmo que não saiba se serão usadas.",
    fields: [
      { id: "moradores", label: "Quantidade de moradores", type: "number", required: true },
      { id: "dependentes", label: "Quantidade de dependentes", type: "number", required: true },
      {
        id: "estadoCivil",
        label: "Estado civil",
        type: "select",
        required: true,
        options: ["", "Solteiro(a)", "Casado(a)", "União estável", "Separado(a)", "Não declarado"]
      },
      {
        id: "responsavel",
        label: "Você é responsável familiar?",
        type: "select",
        required: true,
        options: ["", "Sim", "Não", "Talvez", "Não sei informar"]
      }
    ]
  },
  {
    title: "Etapa 5 de 9 — Renda e ocupação",
    description: "Informe renda mesmo que ela varie, não exista ou seja informal.",
    fields: [
      { id: "renda", label: "Renda mensal aproximada", type: "number", required: true },
      { id: "ocupacao", label: "Ocupação atual", type: "text", required: true },
      {
        id: "rendaExtra",
        label: "Possui renda eventual?",
        type: "select",
        required: true,
        options: ["", "Sim", "Não", "Não lembro"]
      },
      {
        id: "descricaoRenda",
        label: "Descreva detalhadamente a origem da renda",
        type: "textarea",
        required: false
      }
    ]
  },
  {
    title: "Etapa 6 de 9 — Dados bancários",
    description: "Preencha os dados para eventual pagamento, sem garantia de pagamento.",
    fields: [
      { id: "banco", label: "Banco", type: "text", required: true },
      { id: "agencia", label: "Agência", type: "text", required: true },
      { id: "conta", label: "Conta", type: "text", required: true },
      {
        id: "tipoConta",
        label: "Tipo de conta",
        type: "select",
        required: true,
        options: ["", "Corrente", "Poupança", "Pagamento", "Não sei"]
      }
    ]
  },
  {
    title: "Etapa 7 de 9 — Declarações complementares",
    description: "Marque informações que podem não fazer sentido para todos os cidadãos.",
    fields: [
      {
        id: "cadunico",
        label: "Possui Cadastro Único atualizado?",
        type: "select",
        required: true,
        options: ["", "Sim", "Não", "Em atualização", "Não sei o que é"]
      },
      {
        id: "beneficioAnterior",
        label: "Já recebeu benefício similar?",
        type: "select",
        required: true,
        options: ["", "Sim", "Não", "Não recordo"]
      },
      {
        id: "motivo",
        label: "Explique o motivo da solicitação em até 700 caracteres",
        type: "textarea",
        required: true
      }
    ]
  },
  {
    title: "Etapa 8 de 9 — Revisão parcial",
    description: "Confirme informações sem visualizar tudo claramente.",
    fields: [
      {
        id: "confirmaDados",
        label: "Declaro que revisei os dados apresentados anteriormente, embora eles não estejam todos visíveis agora",
        type: "select",
        required: true,
        options: ["", "Confirmo", "Não confirmo", "Prefiro não dizer"]
      },
      {
        id: "canalContato",
        label: "Canal preferencial para retorno",
        type: "select",
        required: true,
        options: ["", "E-mail", "Telefone", "Carta", "Notificação no portal"]
      },
      { id: "email", label: "E-mail", type: "email", required: true }
    ]
  },
  {
    title: "Etapa 9 de 9 — Ciência e responsabilidade",
    description: "Leia atentamente todas as declarações, inclusive as que ficam longe do botão.",
    fields: [
      {
        id: "declaracao1",
        label: "Declaro estar ciente de que a análise pode ser inconclusiva",
        type: "select",
        required: true,
        options: ["", "Sim", "Não"]
      },
      {
        id: "declaracao2",
        label: "Declaro que poderei ser convocado para apresentar documentos já informados",
        type: "select",
        required: true,
        options: ["", "Sim", "Não"]
      },
      {
        id: "observacoes",
        label: "Observações adicionais obrigatórias apenas se o sistema considerar necessário",
        type: "textarea",
        required: false
      }
    ],
    hiddenConsent: true
  }
];

renderStep();
startFakeTimer();
startRandomPopups();

nextBtn.addEventListener("click", () => {
  if (finished) {
    location.reload();
    return;
  }

  /*
    Pegadinha da etapa 3:
    o botão "Próximo", que deveria avançar, leva o usuário de volta ao início.
  */
  if (currentStep === 2) {
    currentStep = 0;
    showPopup("Fluxo reiniciado por inconsistência de navegação. Recomenda-se interpretar os botões com cautela.");
    renderStep();

    errorBox.textContent = "Ação processada fora da sequência esperada.";
    errorBox.classList.remove("hidden");

    return;
  }

  const valid = validateCurrentStep();

  if (!valid) {
    return;
  }

  saveCurrentStep();

  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    showFinalMessage();
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep === 0) return;

  /*
    Pegadinha da etapa 3:
    aqui o botão "Voltar" é o verdadeiro botão para avançar.
    É uma má experiência proposital porque quebra a expectativa do usuário.
  */
  if (currentStep === 2) {
    const valid = validateCurrentStep();

    if (!valid) {
      return;
    }

    saveCurrentStep();
    currentStep++;
    renderStep();
    return;
  }

  /*
    Má experiência:
    ao voltar, os dados da etapa atual são removidos.
  */
  delete formData[currentStep];

  currentStep--;
  renderStep();
});

closePopup.addEventListener("click", () => {
  randomPopup.classList.add("hidden");
});

function renderStep() {
  const step = steps[currentStep];
  errorBox.classList.add("hidden");
  errorBox.textContent = "";

  updateMisleadingProgress();
  updateMovingButton();

  backBtn.disabled = currentStep === 0;

  let html = `
    <div class="step-box">
      <h2>${step.title}</h2>
      <p class="step-description">${step.description}</p>
      <div class="form-grid">
  `;

  step.fields.forEach(field => {
    const savedValue = formData[currentStep]?.[field.id] || "";
    const showRequired = revealedRequirements[currentStep] && field.required;

    /*
      Má experiência:
      os campos obrigatórios só passam a parecer obrigatórios depois
      que o usuário tenta avançar e erra.
    */
    html += `
      <div class="field ${field.type === "textarea" ? "full" : ""}" data-field="${field.id}">
        <label for="${field.id}">
          ${field.label}
          ${showRequired ? '<span class="required-late">* obrigatório</span>' : ""}
        </label>
        ${renderInput(field, savedValue)}
      </div>
    `;
  });

  if (step.hiddenConsent) {
    const checked = formData[currentStep]?.["hiddenConsent"] ? "checked" : "";

    /*
      Má experiência:
      checkbox obrigatório escondido no final da etapa, longe do fluxo principal.
    */
    html += `
      <div class="field full hidden-consent-area" data-field="hiddenConsent">
        <label>
          <input type="checkbox" id="hiddenConsent" ${checked}>
          Confirmo que li a cláusula complementar de ciência tácita, localizada nesta mesma página.
          ${revealedRequirements[currentStep] ? '<span class="required-late">* obrigatório</span>' : ""}
        </label>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  stepContent.innerHTML = html;
}

function renderInput(field, value) {
  if (field.type === "select") {
    const options = field.options.map(option => {
      const selected = option === value ? "selected" : "";
      return `<option value="${option}" ${selected}>${option || "Selecione uma opção"}</option>`;
    }).join("");

    return `<select id="${field.id}">${options}</select>`;
  }

  if (field.type === "textarea") {
    return `<textarea id="${field.id}">${value}</textarea>`;
  }

  return `<input id="${field.id}" type="${field.type}" value="${value}">`;
}

function validateCurrentStep() {
  const step = steps[currentStep];
  const invalidFields = [];

  step.fields.forEach(field => {
    const element = document.getElementById(field.id);
    const value = element.value.trim();

    if (field.required && !value) {
      invalidFields.push(field.id);
    }
  });

  if (step.hiddenConsent) {
    const checkbox = document.getElementById("hiddenConsent");

    if (!checkbox.checked) {
      invalidFields.push("hiddenConsent");
    }
  }

  if (invalidFields.length > 0) {
    revealedRequirements[currentStep] = true;
    renderStep();

    invalidFields.forEach(id => {
      const field = document.querySelector(`[data-field="${id}"]`);
      if (field) field.classList.add("invalid");
    });

    /*
      Mensagem propositalmente vaga.
      Ela informa que há erro, mas não explica direito como resolver.
    */
    errorBox.textContent = vagueErrors[Math.floor(Math.random() * vagueErrors.length)];
    errorBox.classList.remove("hidden");

    return false;
  }

  return true;
}

function saveCurrentStep() {
  const step = steps[currentStep];

  if (!formData[currentStep]) {
    formData[currentStep] = {};
  }

  step.fields.forEach(field => {
    const element = document.getElementById(field.id);
    formData[currentStep][field.id] = element.value.trim();
  });

  if (step.hiddenConsent) {
    formData[currentStep]["hiddenConsent"] = document.getElementById("hiddenConsent").checked;
  }
}

function updateMisleadingProgress() {
  /*
    Barra de progresso enganosa:
    com menos etapas, ela continua ficando presa em 90%.
  */
  const fakeProgress = [8, 31, 74, 90, 90, 90, 90, 94, 97];
  const value = fakeProgress[currentStep];

  progressBar.style.width = `${value}%`;
  progressText.textContent = `${value}%`;
}

function updateMovingButton() {
  /*
    Má experiência:
    o botão muda levemente de posição em algumas etapas,
    gerando frustração sem impedir totalmente o uso.
  */
  nextBtn.classList.remove("shift-one", "shift-two", "shift-three");

  if ([1, 4, 6].includes(currentStep)) {
    nextBtn.classList.add("shift-one");
  }

  if ([2, 5].includes(currentStep)) {
    nextBtn.classList.add("shift-two");
  }

  if ([7].includes(currentStep)) {
    nextBtn.classList.add("shift-three");
  }

  nextBtn.textContent = currentStep === steps.length - 1 ? "Enviar solicitação" : "Próximo";
  backBtn.textContent = "Voltar";
}

function startFakeTimer() {
  /*
    Temporizador fictício:
    cria urgência, mas ao chegar perto do fim reinicia parcialmente.
    Isso simula sistemas que pressionam o usuário sem motivo real.
  */
  let seconds = 599;

  setInterval(() => {
    if (finished) return;

    seconds--;

    if (seconds <= 45) {
      seconds = 179;
      showPopup("Sua sessão foi prorrogada automaticamente, mas alguns dados podem exigir nova conferência.");
    }

    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");

    sessionTimer.textContent = `${min}:${sec}`;
  }, 1000);
}

function startRandomPopups() {
  /*
    Pop-ups aleatórios:
    interrompem o preenchimento e quebram a concentração.
  */
  setInterval(() => {
    if (finished) return;

    const shouldShow = Math.random() < 0.35;

    if (shouldShow) {
      const message = popupMessages[Math.floor(Math.random() * popupMessages.length)];
      showPopup(message);
    }
  }, 18000);
}

function showPopup(message) {
  popupText.textContent = message;
  randomPopup.classList.remove("hidden");
}

function showFinalMessage() {
  finished = true;

  progressBar.style.width = "99%";
  progressText.textContent = "99%";

  const protocol = `BR-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`;

  /*
    Confirmação final ambígua:
    gera protocolo, mas não deixa claro se o benefício foi aprovado,
    enviado, recebido ou apenas pré-registrado.
  */
  stepContent.innerHTML = `
    <div class="final-message">
      <h2>Manifestação registrada em ambiente de pré-processamento</h2>

      <p>
        Seu registro foi incluído na fila de verificação preliminar do Portal Único do Cidadão Brasileiro.
      </p>

      <p class="protocol">${protocol}</p>

      <p>
        A existência deste número não representa aprovação, reprovação, recebimento definitivo,
        análise concluída ou garantia de encaminhamento operacional.
      </p>

      <p>
        Caso necessário, o cidadão poderá ser comunicado por meio eletrônico, postal,
        telefônico, presencial ou por nenhum dos meios anteriores.
      </p>

      <p>
        Situação atual: <strong>processável sob condição administrativa pendente de classificação.</strong>
      </p>
    </div>
  `;

  errorBox.classList.add("hidden");
  backBtn.style.display = "none";
  nextBtn.textContent = "Iniciar nova solicitação";
  nextBtn.classList.remove("shift-one", "shift-two", "shift-three");
}