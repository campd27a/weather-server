
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

message1.textContent=''
message2.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() // stops broswer refresh
    const location=search.value
    message1.textContent='Loading...'
    message2.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            //return console.log(data.error)
            message1.textContent=''
           return message2.textContent=data.error
        }
        message1.textContent=data.location
        message2.textContent=data.forcast
       
    })

})
}
)