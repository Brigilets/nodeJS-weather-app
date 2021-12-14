console.log('Client side JavaScript is loaded')

// getting data into client side javascript using fetch API
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
response.json().then((data)=>{
    console.log(data)
})
})
*/
/*fetch('http://localhost:3000/weather?address=').then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
        }else{
           console.log(data.location);
           console.log(data.forecast);
        }
})
})*/
const weatherForm = document.querySelector('form');
const search=document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...';
   messageTwo.textContent ='';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent =data.error;
        }else{
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
     
})
})
})