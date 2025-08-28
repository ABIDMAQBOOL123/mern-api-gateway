// Function to add two numbers
function addNumbers(a, b) {
    return a + b;
}


console.log(addNumbers(5, 10));
// function to find odd number in an array
function findOddNumbers(arr) {
    return arr.filter(num => num % 2 !== 0);
}

console.log(findOddNumbers([1, 2, 3, 4, 5]));

// function to count vowels in a word
function countVowels(word) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return word.split('').filter(char => vowels.includes(char.toLowerCase())).length;
}   

console.log(countVowels("Hello World"));

// Create a simple WebSocket server using Node.js and ws
  

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');






