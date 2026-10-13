document.addEventListener('DOMContentLoaded', () => {
  const checklistItems = document.querySelectorAll('.checklist-item');
  const radios = document.querySelectorAll('.checklist-item input[type="radio"]');
  const dialProgress = document.getElementById('dial-progress-circle');
  const dialText = document.getElementById('dial-score-text');
  const dialVerdict = document.getElementById('dial-verdict');
  const dialMessage = document.getElementById('dial-message');
  const dynamicTipsContainer = document.getElementById('dynamic-tips');

  // SVG Dial Math
  const circumference = 2 * Math.PI * 45;
  dialProgress.style.strokeDasharray = `${circumference}`;
  dialProgress.style.strokeDashoffset = `${circumference}`;

  // Tips for 'no' or 'unknown' answers
  const tipsData = {
    lohn: "Ohne fairen Lohn bleiben Arbeiter in der Armut gefangen. Achte auf Siegel wie Fairtrade oder GOTS (mit Zusatzfokus auf Living Wage).",
    material: "Konventionelle Materialien belasten Umwelt und Gesundheit. Bio-Baumwolle oder recycelte Stoffe sind die bessere Wahl.",
    repair: "Kurze Lebensdauer bedeutet mehr Müll. Überlege, ob du das Produkt wirklich brauchst oder ob es eine langlebigere Alternative (oder Second Hand) gibt.",
    transport: "Weite Wege und Flugfracht belasten das Klima extrem. Regionale Produkte haben hier einen klaren Vorteil.",
    packaging: "Unnötige Verpackungen verschwenden Ressourcen. Kaufe wenn möglich unverpackt oder in recycelten Monomaterialien."
  };

  function updateScore() {
    let totalScore = 0;
    let maxPossibleScore = 100; // sum of all weights
    let allAnswered = true;
    let answeredQuestions = 0;

    let activeTips = [];

    checklistItems.forEach(item => {
      const weight = parseInt(item.getAttribute('data-weight'), 10);
      const categoryId = item.getAttribute('data-id');
      const selectedRadio = item.querySelector('input[type="radio"]:checked');

      if (!selectedRadio) {
          allAnswered = false;
          return; // Shouldn't happen with default 'unknown'
      }

      const val = selectedRadio.value;
      if (val !== 'unknown') {
          answeredQuestions++;
      }

      if (val === 'yes') {
        totalScore += weight;
      } else if (val === 'no' || val === 'unknown') {
        activeTips.push(tipsData[categoryId]);
      }
    });

    // Update Dial Graphic
    const offset = circumference - (totalScore / maxPossibleScore) * circumference;
    dialProgress.style.strokeDashoffset = offset;
    dialText.textContent = totalScore;

    // Determine Color based on score
    let strokeColor = 'var(--color-sage)';
    if (answeredQuestions === 0) strokeColor = 'var(--color-unknown)';
    else if (totalScore >= 80) strokeColor = 'var(--color-success)';
    else if (totalScore >= 50) strokeColor = 'var(--color-warning)';
    else strokeColor = 'var(--color-error)';

    dialProgress.style.stroke = strokeColor;

    // Update Verdict Text
    if (answeredQuestions === 0) {
        dialVerdict.textContent = "Bisher keine Bewertung";
        dialVerdict.style.color = 'inherit';
        dialMessage.textContent = "Beantworte die Fragen links, um ein Ergebnis zu erhalten.";
    } else if (totalScore >= 80) {
        dialVerdict.textContent = "Sehr Fair!";
        dialVerdict.style.color = 'var(--color-success)';
        dialMessage.textContent = "Ein vorbildliches Produkt. Du kannst mit gutem Gewissen zugreifen.";
    } else if (totalScore >= 50) {
        dialVerdict.textContent = "Durchschnittlich";
        dialVerdict.style.color = 'var(--color-warning)';
        dialMessage.textContent = "Das Produkt hat gute Ansätze, aber noch Luft nach oben.";
    } else {
        dialVerdict.textContent = "Kritisch";
        dialVerdict.style.color = 'var(--color-error)';
        dialMessage.textContent = "Hier solltest du nach einer faireren Alternative suchen.";
    }

    // Render Tips
    dynamicTipsContainer.innerHTML = ''; // clear old tips
    if (answeredQuestions > 0 && activeTips.length > 0) {
        // Show up to 3 tips to not overwhelm
        const tipsToShow = activeTips.slice(0, 3);
        tipsToShow.forEach(tipText => {
            const tipEl = document.createElement('div');
            tipEl.className = 'tip-item';
            tipEl.textContent = tipText;
            dynamicTipsContainer.appendChild(tipEl);
        });
    }
  }

  // Initial execution
  updateScore();

  radios.forEach(radio => {
    radio.addEventListener('change', updateScore);
  });
});
