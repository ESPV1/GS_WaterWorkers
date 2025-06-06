import { quizData } from "./quizDados.js";

export function quiz() {
  const quizContainer = document.getElementById("quizDiv");
  const form = document.getElementById("quizPanel");
  const finalResultEl = document.getElementById("finalResult");

  const loadQuiz = () => {
    quizContainer.innerHTML = quizData
      .map((q, i) => {
        const options = q.options
          .map((opt, j) => {
            const id = `q${i}_${j}`;
            return `
          <div class="option">
            <input type="radio" id="${id}" name="question${i}" value="${opt.value}">
            <label for="${id}">${opt.value}) ${opt.text}</label>
          </div>`;
          })
          .join("");

        return `
        <div class="question">
          <h3>${i + 1}. ${q.question}</h3>
          ${options}
          <div class="error-message" id="error${i}">
            <strong>É necessário responder essa pergunta.</strong>
          </div>
        </div>`;
      })
      .join("");
  };

  const showfinalResults = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let score = 0,
      allAnswered = true;

    finalResultEl.style.display = "none";
    finalResultEl.classList.remove("success", "warning", "danger");

    quizContainer
      .querySelectorAll("label")
      .forEach((label) => label.classList.remove("correct", "incorrect"));

    quizData.forEach((q, i) => {
      const answer = formData.get(`question${i}`);
      const error = document.getElementById(`error${i}`);
      error.style.display = answer ? "none" : ((allAnswered = false), "block");
    });

    if (!allAnswered) {
      finalResultEl.classList.add("danger");
      finalResultEl.innerHTML = `<span>Responda todas as perguntas antes de enviar.</span>`;
      finalResultEl.style.display = "block";
      finalResultEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    quizData.forEach((q, i) => {
      const answer = formData.get(`question${i}`);
      q.options.forEach((opt, j) => {
        const input = document.getElementById(`q${i}_${j}`);
        const label = input.nextElementSibling;
        const isCorrect = opt.value === q.correct;
        const isSelected = answer === opt.value;

        if (isSelected) {
          label.classList.add(isCorrect ? "correct" : "incorrect");
          if (isCorrect) score++;
        }
      });
    });

    const feedbacks = [
      {
        min: 8,
        text: `👏 <strong>${score}/10</strong> – Parabéns! Você está bem preparado para agir em situações de enchente.`,
        class: "success",
      },
      {
        min: 5,
        text: `⚠️ <strong>${score}/10</strong> – Você tem boas noções, mas ainda pode melhorar.`,
        class: "warning",
      },
      {
        min: 0,
        text: `🚨 <strong>${score}/10</strong> – Atenção! Informe-se mais sobre como agir em enchentes.`,
        class: "danger",
      },
    ];

    const { text, class: cls } = feedbacks.find((f) => score >= f.min);
    finalResultEl.classList.add(cls);
    finalResultEl.innerHTML = text;
    finalResultEl.style.display = "block";
    finalResultEl.scrollIntoView({ behavior: "smooth" });
  };

  loadQuiz();
  form.addEventListener("submit", showfinalResults);
}

quiz();