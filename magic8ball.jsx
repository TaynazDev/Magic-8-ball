// Magic 8 Ball React Component
// This component creates an interactive Magic 8 Ball game!

const { useState } = React;

function Magic8Ball() {
  // STATE MANAGEMENT - These variables keep track of what's happening
  const [question, setQuestion] = useState(''); // Stores the user's question
  const [answer, setAnswer] = useState(''); // Stores the current answer
  const [isShaking, setIsShaking] = useState(false); // Tracks if ball is shaking
  const [answerColor, setAnswerColor] = useState(''); // Color of the answer text

  // THE 20 MAGIC 8 BALL ANSWERS
  // Organized into positive, neutral, and negative categories
  const answers = {
    positive: [
      "It is certain",
      "Without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Signs point to yes"
    ],
    neutral: [
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again"
    ],
    negative: [
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
      "Absolutely not",
      "No way"
    ]
  };

  // RANDOM ANSWER SELECTION FUNCTION
  // This picks a random answer and determines its color
  const getRandomAnswer = () => {
    // First, randomly pick a category (positive, neutral, or negative)
    const categories = ['positive', 'neutral', 'negative'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Then, pick a random answer from that category
    const categoryAnswers = answers[randomCategory];
    const randomAnswer = categoryAnswers[Math.floor(Math.random() * categoryAnswers.length)];
    
    // Set the color based on the category
    let color;
    if (randomCategory === 'positive') {
      color = '#00ff00'; // Green for positive
    } else if (randomCategory === 'neutral') {
      color = '#ffaa00'; // Yellow/Orange for neutral
    } else {
      color = '#ff3333'; // Red for negative
    }
    
    return { answer: randomAnswer, color: color };
  };

  // CONTENT FILTER - Checks for inappropriate content
  // This helps keep the Magic 8 Ball family-friendly!
  const containsInappropriateContent = (text) => {
    const lowerText = text.toLowerCase();
    
    // List of inappropriate words to filter out
    const inappropriateWords = [
      'damn', 'hell', 'crap', 'stupid', 'idiot', 'dumb',
      'hate', 'kill', 'die', 'death', 'hurt', 'violence',
      'blood', 'weapon', 'gun', 'knife', 'fight'
      // Add more words as needed for your family's standards
    ];
    
    // Check if the question contains any inappropriate words
    return inappropriateWords.some(word => lowerText.includes(word));
  };

  // SHAKE THE BALL FUNCTION
  // This is what happens when you click "Shake the Ball"
  const shakeBall = () => {
    // Don't shake if already shaking
    if (isShaking) return;
    
    // Check if user typed a question
    if (!question.trim()) {
      alert('Please ask a question first! 🔮');
      return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(question)) {
      alert('🔮 The Magic 8 Ball only answers kind and appropriate questions! Please try again with a different question.');
      return;
    }
    
    // Start the shake animation
    setIsShaking(true);
    setAnswer(''); // Clear the old answer
    
    // THINKING STATE - Show dots while "thinking"
    // After 1.5 seconds, show the answer
    setTimeout(() => {
      const result = getRandomAnswer();
      setAnswer(result.answer);
      setAnswerColor(result.color);
      setIsShaking(false); // Stop shaking
      setQuestion(''); // Clear the question after getting answer
    }, 1500); // 1500 milliseconds = 1.5 seconds
  };

  // Handle Enter key press in the input box
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      shakeBall();
    }
  };

  return (
    <div className="magic8ball-container">
      {/* TITLE */}
      <h1 className="title">🔮 Magic 8 Ball 🔮</h1>
      <p className="subtitle">Ask a yes or no question and shake the ball!</p>
      
      {/* QUESTION INPUT BOX */}
      <div className="input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          className="question-input"
        />
      </div>
      
      {/* THE MAGIC 8 BALL */}
      <div 
        className={`ball ${isShaking ? 'shake' : ''}`}
        onClick={shakeBall}
      >
        {/* Triangle window where answer appears */}
        <div className="triangle-window">
          {isShaking ? (
            // Show thinking dots while shaking
            <div className="thinking">
              <span className="dot">●</span>
              <span className="dot">●</span>
              <span className="dot">●</span>
            </div>
          ) : answer ? (
            // Show the answer when ready
            <div className="answer" style={{ color: answerColor }}>
              {answer}
            </div>
          ) : (
            // Show number 8 when no answer yet
            <div className="eight">8</div>
          )}
        </div>
      </div>
      
      {/* SHAKE BUTTON */}
      <button onClick={shakeBall} className="shake-button" disabled={isShaking}>
        {isShaking ? 'Shaking...' : 'Shake the Ball'}
      </button>
      
      {/* INSTRUCTIONS */}
      <div className="instructions">
        <p>💡 <strong>How to use:</strong></p>
        <p>1. Type a yes/no question</p>
        <p>2. Click the ball or button to shake</p>
        <p>3. Wait for your mystical answer!</p>
        <p><small>🟢 Green = Positive | 🟡 Yellow = Neutral | 🔴 Red = Negative</small></p>
      </div>
    </div>
  );
}

// Render the component to the page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Magic8Ball />);
