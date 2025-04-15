function getEventObjectType(target) {
  if (target.tagName === 'IMG') return 'image';
  if (target.tagName === 'P') return 'paragraph';
  if (target.tagName === 'A') return 'link';
  if (target.tagName === 'H1' || target.tagName === 'H2') return 'heading';
  if (target.tagName === 'LI') return 'list item';
  if (target.tagName === 'SECTION') return 'section';
  if (target.tagName === 'BUTTON') return 'button';
  return target.tagName.toLowerCase();
}

function logEvent(eventType, target) {
  const timestamp = new Date().toLocaleString();
  const objectType = getEventObjectType(target);
  console.log(`${timestamp}, ${eventType}, ${objectType}`);
}

document.addEventListener('click', function (e) {
  logEvent('click', e.target);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      logEvent('view', entry.target);
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll('section, img, p, a, h1, h2, li').forEach((el) => {
  observer.observe(el);
});
function analyzeText() {
  const text = document.getElementById("textInput").value;

  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialSymbols = (text.match(/[^\w\s]/g) || []).length;

  const pronouns = [
    "i", "you", "he", "she", "it", "we", "they",
    "me", "him", "her", "us", "them",
    "my", "your", "his", "its", "our", "their",
    "mine", "yours", "hers", "ours", "theirs"
  ];
  const prepositions = [
    "in", "on", "at", "since", "for", "ago", "before", "to", "past", "by",
    "under", "over", "with", "without", "about", "against", "between", "into",
    "through", "during", "above", "below", "from", "up", "down", "off", "near"
  ];
  const articles = ["a", "an"];

  const wordList = text.toLowerCase().match(/\b\w+\b/g) || [];

  const countGroup = (groupWords) => {
    const count = {};
    groupWords.forEach(word => {
      count[word] = wordList.filter(w => w === word).length;
    });
    return count;
  };

  const pronounCount = countGroup(pronouns);
  const prepositionCount = countGroup(prepositions);
  const articleCount = countGroup(articles);

  document.getElementById("results").innerHTML = `
    <h3>Text Statistics</h3>
    <ul>
      <li><strong>Letters:</strong> ${letters}</li>
      <li><strong>Words:</strong> ${words}</li>
      <li><strong>Spaces:</strong> ${spaces}</li>
      <li><strong>Newlines:</strong> ${newlines}</li>
      <li><strong>Special Symbols:</strong> ${specialSymbols}</li>
    </ul>

    <h3>Pronoun Count</h3>
    <pre>${JSON.stringify(pronounCount, null, 2)}</pre>

    <h3>Preposition Count</h3>
    <pre>${JSON.stringify(prepositionCount, null, 2)}</pre>

    <h3>Indefinite Articles Count</h3>
    <pre>${JSON.stringify(articleCount, null, 2)}</pre>
  `;
}
