  
// Initialize socket.io
const socket = io();

// Repopulate the list when the server broadcasts an event
socket.on('update-list', () => {
  populateList();
});

const getList = () => {
    const nameList = document.getElementById('superList');

    fetch('/prove10/fetchAll')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            while(nameList.firstChild){
                nameList.firstChild.remove()
            }
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {
    console.log('made it');
    const newName = document.getElementById('newName').value; // Grab the value of our new name

    fetch('/prove10/insert', {
        method: 'POST', // Send a POST request
        headers: {
            // Set the Content-Type, since our server expects JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName })
    })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = '';

            // Repopulate the list with our new name added
            getList();

            socket.emit('newName');
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = '';
            window.alert(err);
        })
}

getList();
document.getElementById("submitName").onclick = submitName;