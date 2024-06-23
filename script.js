const flashcards = [
    {
        question: "Tem a finalidade de avaliar o desempenho do material, após a utilização",
        answer: "Relatório de Informações Técnicas"
    },
    {
        question: "Tem a finalidade de apurar as causas, os efeitos e as responsabilidades de avarias provocadas por acidentes de trânsito",
        answer: "Inquérito Técnico"
    },
    {
        question: "Tem a finalidade de verificar o estado do material, principalmente, se ele é suscetível ou não a recuperação",
        answer: "Termo de Exame e Averiguação de Material"
    },
    {
        question: "Tem a finalidade de receber e examinar todo e qualquer material que der entrada na OM",
        answer: "Termo de Recebimento e Exame de Material"
    },
    {
        question: "Tem a finalidade de apurar se as causas das avarias encontradas no material foram decorrentes de falhas pessoais ou técnicas e se a recuperação do material é viável econômica e tecnicamente",
        answer: "Parecer Técnico"
    },
    {
        question: "De acordo com o R-3 é o ato de verificação do estado do material e, principalmente, se ele é susceptível ou não de reparação ou recuperação",
        answer: "Exame de Material"
    },
    {
        question: "É o canal através da qual o comandante de engenharia de cada escalão exerce uma ação de coordenação e controle técnico, diretamente sobre a engenharia dos escalões subordinados",
        answer: "Canal Técnico"
    },
    {
        question: "É todo artigo que se destina à aplicação, transformação, utilização ou emprego imediato e, quando utilizado, incorpora-se a outro bem",
        answer: "Material de Consumo"
    },
    {
        question: "É uma modificação no desenho ou na montagem de qualquer parte do equipamento para aumentar sua segurança ou rendimento",
        answer: "Adaptação"
    },
    {
        question: "De acordo com o R-3 é o ato de verificação da causa dos estragos, dano, inutilização, etc, afim de ser o prejuízo imputado aos detentores, usuários ou à União, conforme o caso",
        answer: "Averiguação de Material"
    },
    {
        question: "Ato de aprovação, pelo Comandante do Grupamento de Engenharia de Construção para as suas OMDS, ou pelo Diretor de Obras de Cooperação",
        answer: "Autorização de Descarga"
    },
    {
        question: "Quais os elementos básicos de uma oficina de engenharia",
        answer: "Metodos de trabalho, material, ferramental e recursos humanos"
    },
    {
        question: "O que são metodos de trabalhos?",
        answer: "Conjunto de ações realizadas para transformar insumos em bens e serviços"
    },
    {
        question: "Quais os processos de organização da oficina?",
        answer: "Cadastro, Organização, Papeis e responsabilidades, SGM e indicadores de manutenção"
    },
    {
        question: "Os materiais da DOC são adquiridos por força de:",
        answer: "convenios, contratos, alienações, doações ou procedentes, por transferencia, do acervo de orgãos publicos"
    },
    {
        question: "As VTRS  do EB são identificadas com um umero de registro de quantos digitos?",
        answer: "12"
    },
    {
        question: "Ato de confirmação, pelo: - Diretor de Obras de Cooperação, da descarga do material: a. controlado do Acervo da DOC para todas as OM E Cnst; e b. não controlado do Acervo da DOC para demais OM",
        answer: "Homologação de Descarga"
    }

];
// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
  }
  
  // Embaralha o array de flashcards
  shuffleArray(flashcards);

const flashcardsContainer = document.getElementById('flashcards');
const questionElement = document.getElementById('question-text');
const answerElement = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const previousButton = document.getElementById('previous');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;

const loadQuestion = () => {
    questionElement.innerHTML = flashcards[currentQuestionIndex].question;
    answerElement.value = '';
    feedbackElement.innerHTML = '';
    updateButtons();
};

const updateButtons = () => {
    previousButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = true;
};

const checkAnswer = () => {
    const userAnswer = answerElement.value.trim().toLowerCase();
    const correctAnswer = flashcards[currentQuestionIndex].answer.toLowerCase();
    const normalizedUserAnswer = removeAccents(userAnswer);
    const normalizedCorrectAnswer = removeAccents(correctAnswer);

    // Comparação aproximada das strings usando o algoritmo de Levenshtein
    const similarityThreshold = 0.8; // Limiar de similaridade (ajuste conforme necessário)
    const similarity = calculateSimilarity(normalizedUserAnswer, normalizedCorrectAnswer);
    
    if (similarity >= similarityThreshold) {
        feedbackElement.textContent = "Excelente! Você Acertou! Clique em Próxima";
        nextButton.disabled = false;
    } else {
        feedbackElement.textContent = "Tente novamente.";
    }
};

// Função para remover acentos
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Função para calcular a similaridade entre duas strings usando o algoritmo de Levenshtein
const calculateSimilarity = (str1, str2) => {
    const maxLength = Math.max(str1.length, str2.length);
    const distance = levenshteinDistance(str1, str2);
    return 1 - distance / maxLength;
};

// Função para calcular a distância de Levenshtein entre duas strings
const levenshteinDistance = (str1, str2) => {
    const matrix = [];

    // Inicialização da matriz
    for (let i = 0; i <= str1.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    // Preenchimento da matriz
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deleção
                matrix[i][j - 1] + 1, // Inserção
                matrix[i - 1][j - 1] + cost // Substituição
            );
        }
    }

    return matrix[str1.length][str2.length];
};

submitButton.addEventListener('click', checkAnswer);

previousButton.addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion();
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

loadQuestion();
