const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    addMessage(data, false)
})

// A simple function to format the time as a string
const getTime = () => {
    const d = new Date();
    
    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
    
    // Return the time as a string
    return `${hours}:${mins}`;
};

const postMessage = () => {
    // Get input values from the page
    const message = messageEl.value.trim();
    const from = user.value;
    const time = getTime();
  
    const data = { message, from, time };

    socket.emit('message', data);

    addMessage(data, true);

    messageEl.value = '';
  };
  
  // Add message from any user to chatbox, determine if added
  // by current user.
  const addMessage = (data = {}, user = false) => {
    chatBox.innerHTML += `
      <li class="message${user ? ' uMessage' : ''}">
          ${data.from} @${data.time}: ${data.message}
      </li>
      `;
}
