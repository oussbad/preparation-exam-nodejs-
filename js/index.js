
const questionInput = document.querySelector('#questionInput')
const errorQuestionInput = document.querySelector('#errorQuestionInput')
const resetBtn = document.querySelector('#resetBtn')
const submitBtn = document.querySelector('#submitBtn')
const countQuestionsSpan = document.querySelector('#countQuestionsSpan')
const questionsDiv = document.querySelector('#questionsDiv')
const url = "http://localhost:3000/questions";

const getQ=new XMLHttpRequest()
const postQ=new XMLHttpRequest()
const deleteQ=new XMLHttpRequest()
const putQ=new XMLHttpRequest()
getQ.open('GET',url ,true)
getQ.setRequestHeader("Content-Type", "application/json")
getQ.addEventListener('load',()=>{
    
    let data = JSON.parse(getQ.responseText)
    data.forEach(ele => {
        addQuestion(ele)
        
    });
   
    
    
})
getQ.send()


const addQuestion = (ques)=>{
    let {id,question ,answer}=ques
    
    
    const div1 = document.createElement('div')
    const span=document.createElement('span')
    const div2=document.createElement('div')
    const deletebutton =document.createElement('button')
    const switchbutton=document.createElement('button')
    //liee
    questionsDiv.appendChild(div1)
    div1.appendChild(span)
    div1.appendChild(div2)
    div1.appendChild(deletebutton)
    div1.appendChild(switchbutton)
    span.setAttribute('class','idQuestion')
    div2.setAttribute('class' ,'content')
    deletebutton.setAttribute('class','delete')
    deletebutton.innerText='Delete'

    switchbutton.setAttribute('class','switch')
    switchbutton.innerText='Switch'
    div2.innerText=question
    span.innerText=id

    if(answer =="true" ){
        div1.setAttribute('class','question true')

    }else{
        div1.setAttribute('class','question false')
    }
    deletebutton.addEventListener('click',()=>{
        deleteQ.open('DELETE',url +'/' + id,true)
        deleteQ.send()

        div1.remove()
        countQuestionsSpan.innerText=questionsDiv.children.length
    })

    switchbutton.addEventListener('click',()=>{
        if(answer =="true" ){
            answer ="false"
            div1.setAttribute('class','question false')
    
        }else{
            answer ="true"
            div1.setAttribute('class','question true')
        }
        putQ.open('PUT',url +'/'+id,true)
        putQ.setRequestHeader("Content-Type", "application/json")
        const sendd ={id,question ,answer}
        putQ.send(JSON.stringify(sendd))

    })
    countQuestionsSpan.innerText=questionsDiv.children.length
}
submitBtn.addEventListener('click',()=>{
    let question =questionInput.value
    let answer=answerInput.value
    let id =questionsDiv.children.length+1+''
    let sendquestion ={id,question ,answer}
    postQ.open('POST',url,true);
    postQ.setRequestHeader("Content-Type" , "application/json");
    postQ.send(JSON.stringify(sendquestion))
    addQuestion(sendquestion)
    reset()
})
const reset =()=>{
    questionInput.value=""
    answerInput.value="true" 
}











/*let qestion={questionInput:"hhhdhd" ,option :true ,id:1}
let qestion2={questionInput:"qqqqqqhd" ,option :false ,id:1}

addQuestion(qestion)
addQuestion(qestion2)

*/
