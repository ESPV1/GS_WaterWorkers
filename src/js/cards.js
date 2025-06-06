export function tecnologiesDescription() {
    const tecnologiasCards = document.querySelectorAll('.tecnologiaCard');
    const descriptionArea = document.getElementById('descriptionArea');

    const descriptions = [
        "C é uma linguagem de programação de baixo nível, usada no desenvolvimento de sistemas operacionais e aplicações de alto desempenho.",
        "Wokwi é um simulador online de circuitos e microcontroladores, ideal para testar projetos com Arduino, ESP32 e outros.",
        "HTML é a linguagem de marcação usada para estruturar páginas web, definindo textos, imagens e links exibidos pelo navegador.",
        "CSS é a linguagem de estilo usada para definir cores, layouts e fontes, dando aparência visual ao conteúdo HTML.",
        "JavaScript é uma linguagem de programação que adiciona interatividade às páginas web com animações, validações e funcionalidades dinâmicas.",
        "GitHub é uma plataforma de hospedagem de código baseada em Git, usada para versionamento e colaboração em projetos de software.",
        "Python é uma linguagem de programação versátil e de alto nível, usada em automação, web, ciência de dados e inteligência artificial."
    ];

    tecnologiasCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            descriptionArea.textContent = descriptions[index];
        });

        // card.addEventListener('mouseleave', () => {
        //     descriptionArea.textContent = ''; // ou alguma mensagem padrão
        // });
    });
}