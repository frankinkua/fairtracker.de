document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.fairness-checkbox');
  const dialProgress = document.getElementById('dial-progress-circle');
  const dialText = document.getElementById('dial-score-text');
  const dialMessage = document.getElementById('dial-message');

  // SVG Dial Math
  // radius = 45, circumference = 2 * Math.PI * 45 ≈ 282.74
  const circumference = 2 * Math.PI * 45;
  dialProgress.style.strokeDasharray = `${circumference}`;
  dialProgress.style.strokeDashoffset = `${circumference}`;

  const messages = {
    0: "Lass uns starten!",
    20: "Ein guter Anfang!",
    40: "Es wird besser!",
    60: "Auf einem guten Weg!",
    80: "Fast perfekt!",
    100: "Vorbildlich fair!"
  };

  function updateScore() {
    let score = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        score += parseInt(cb.value, 10);
      }
    });

    // Update Text
    dialText.textContent = `${score}%`;

    // Update Message
    dialMessage.textContent = messages[score] || "";

    // Update SVG Dial Stroke
    // offset = circumference - (score / 100) * circumference
    const offset = circumference - (score / 100) * circumference;
    dialProgress.style.strokeDashoffset = offset;

    // Accessibility announcement for screen readers
    const srMessage = `Fairness score updated to ${score}%. ${messages[score]}`;
    // Assuming aria-live="polite" is on the container (dial-section)
    // it will read out the text change of the elements inside.
  }

  // Initial calculation just in case (e.g. browser preserves state on reload)
  updateScore();

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateScore);
  });
});
