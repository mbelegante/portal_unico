# Portal Único do Cidadão Brasileiro

Portal governamental fictício criado para demonstrar, de forma proposital, uma péssima experiência de usuário. O projeto simula a solicitação de um benefício social em uma interface confusa, burocrática e frustrante, mas ainda funcional até a tela final.

## Equipe

* Nome da equipe: Ctrl Girls
* Integrantes: Mariana dos Santos Belegante e Juliana de Souza Martins
* Curso/Turma: Análise e Desenvolvimento de Sistemas - 6º período
* Categoria: Desafio Pior Experiência de Usuário

## Link do pitch

Acesse em:

https://canva.link/b7q0f1x2ka4t269

## Link do MVP

Acesse em:

https://mbelegante.github.io/portal_unico/

## Como testar

1. Acesse o link do MVP ou abra o arquivo `index.html` no navegador.
2. Preencha as etapas do formulário.
3. Observe os comportamentos ruins implementados de propósito, como pop-ups, mensagens vagas, botões inconsistentes e barra de progresso enganosa.
4. Na etapa 3, clique em **Próximo** e observe que o sistema retorna ao início.
5. Para avançar na etapa 3, é necessário clicar em **Voltar**.
6. Continue preenchendo o formulário até chegar à tela final.
7. Ao concluir, o sistema exibirá a mensagem final: **“Parabéns, você chegou ao final da pior experiência de usuário”**.

## Tecnologias, bibliotecas, frameworks e ferramentas utilizadas

* HTML5
* CSS3
* JavaScript puro
* Git
* GitHub

## Princípios de UX/UI violados

O projeto viola propositalmente vários princípios de UX/UI, incluindo:

* **Clareza:** textos burocráticos, mensagens vagas e instruções pouco úteis.
* **Consistência:** botões com cores fora do padrão e comportamentos inesperados.
* **Previsibilidade:** na etapa 3, o botão “Voltar” avança e o botão “Próximo” reinicia o fluxo.
* **Feedback ao usuário:** mensagens de erro não explicam claramente o que precisa ser corrigido.
* **Acessibilidade:** contraste ruim em alguns elementos e escolhas visuais desconfortáveis.
* **Controle do usuário:** pop-ups interrompem o preenchimento e o botão “Voltar” remove dados da etapa atual.
* **Eficiência:** excesso de informações, etapas burocráticas e elementos que atrasam a conclusão.
* **Prevenção de erros:** campos obrigatórios só aparecem depois da tentativa de envio.

## Elementos de má experiência implementados

* Barra de progresso enganosa, que permanece em 90% durante boa parte do processo.
* Botões com cores inconsistentes e fora do padrão visual esperado.
* Botão “Próximo” que muda levemente de posição em algumas etapas.
* Etapa em que o usuário precisa clicar em “Voltar” para avançar.
* Etapa em que clicar em “Próximo” leva o usuário de volta ao início.
* Campos obrigatórios exibidos apenas após tentativa de envio.
* Mensagens de erro vagas e pouco úteis.
* Checkbox obrigatório escondido próximo ao final da página.
* Pop-ups aleatórios que interrompem o preenchimento.
* Temporizador de sessão fictício.
* Botão “Voltar” que remove dados preenchidos na etapa atual.
* Confirmação final ambígua e burocrática.

## Proposta de melhoria

Uma versão corrigida do fluxo deveria ter:

* Etapas mais curtas e bem explicadas.
* Barra de progresso real.
* Botões com cores e posições consistentes.
* Campos obrigatórios indicados desde o início.
* Mensagens de erro claras e específicas.
* Navegação previsível.
* Ausência de pop-ups desnecessários.
* Melhor contraste visual.
* Confirmação final objetiva, informando claramente o resultado da solicitação.
* Preservação dos dados ao clicar em “Voltar”.

## Uso de IA

Ferramenta utilizada:

* ChatGPT

Finalidade:

A IA foi utilizada como apoio na criação da estrutura do projeto, organização do código e escrita da documentação.

Partes do projeto apoiadas por IA:

* Estrutura inicial dos arquivos `index.html`, `style.css` e `script.js`;
* Criação do fluxo em etapas;
* Apoio na organização do README;
* Comentários explicativos no código.

O que a equipe revisou, adaptou ou validou:

A equipe revisou o código gerado, adaptou o comportamento das etapas, escolheu quais más práticas seriam usadas, ajustou cores, removeu avisos que revelavam a pegadinha e validou se o fluxo continuava funcional até a tela final.

## Validação

Foram realizados testes manuais durante o desenvolvimento para verificar se o fluxo continuava funcional, mesmo com a experiência propositalmente ruim.

Durante os testes, foram observados os seguintes pontos:

* O usuário consegue preencher o formulário até o final.
* A barra de progresso funciona, mas apresenta comportamento enganoso.
* A etapa 3 cria confusão ao inverter a lógica dos botões.
* Os pop-ups aparecem durante o uso e interrompem o preenchimento.
* Os campos obrigatórios aparecem somente depois da tentativa de envio.
* O botão “Voltar” remove os dados preenchidos na etapa atual.
* A tela final é exibida corretamente após a conclusão do fluxo.

## O que funciona

* O formulário possui fluxo completo até a tela final.
* A interface é responsiva.
* Os campos obrigatórios são validados.
* A barra de progresso muda conforme as etapas.
* Os pop-ups aparecem durante o preenchimento.
* O temporizador fictício funciona.
* A etapa 3 possui uma pegadinha de navegação.
* A tela final de conclusão é exibida.
* O projeto usa apenas HTML, CSS e JavaScript puro.

## O que ainda pode melhorar

* Criar uma versão corrigida do fluxo para comparação entre boa e má experiência.
* Adicionar mais exemplos de problemas de acessibilidade.
* Melhorar a documentação visual com prints da interface.
* Incluir uma explicação visual de cada erro de UX/UI implementado.
* Criar uma página extra mostrando como o mesmo fluxo deveria funcionar corretamente.

## Licença e uso do código

Este projeto foi desenvolvido para fins educacionais, como parte de um desafio acadêmico. O código pode ser utilizado, estudado e adaptado para fins de aprendizado.
