const questions =[
    {
        question:"What does CSS stand for?",
        answers :[
            {text:"Creative Style Sheets",correct:false},
            {text:"Cascading Style Sheets",correct:true},
            {text:"Colorful Style Sheets",correct:false},
            {text:"Computer Style Sheets",correct:false},
        ]    
    },
    {
        question:"Which is the correct CSS syntax?",
        answers :[
            {text:"body:color=red;",correct:false},
            {text:"body{color:red;}",correct:true},
            {text:"{body:color=red;}",correct:false},
            {text:"{body;color:red;}",correct:false},
        ]    
    },
    {
        question:"How do you insert a comment in a CSS file?",
        answers :[
            {text:"'this is a comment",correct:false},
            {text:"//this is a comment//",correct:false},
            {text:"//this is a comment",correct:false},
            {text:"/*this is a comment*/",correct:true},
        ]    
    },
    {
        question:"HTML stands for?",
        answers :[
            {text:"Hyper Text Module Language",correct:false},
            {text:"Hyper Test Markup Language",correct:false},
            {text:"Hypertext Markup Language",correct:true},
            {text:"Hyperlink Module Language",correct:false},
        ]    
    },
    {
        question:"Which of the following property changes the width of right border?",
        answers :[
            {text:"border-bottom-width:",correct:false},
            {text:"border-top-width:",correct:false},
            {text:"border-left-width:",correct:false},
            {text:"border-right-width:",correct:true},
        ]    
    }
];

const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("ans-btns");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz()
{
    let currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML ="next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo+ ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct ==="true"){
        button.classList.add("correct");
        questionElement.innerHTML=` ${score} out of  ${questions.length}`;
       }
       button.disabled = true;
    });
    nextButton.style.display =" block";
}

function showScore(){
    resetState();
    if(score === questions.length){
        questionElement.innerHTML=` congratulations ! you scored ${score} out of  ${questions.length}....`;

    }
    else if(score === questions.length-questions.length){
        questionElement.innerHTML=`OOPS! BETTER LUCK NEXT TIME ...you scored ${score} out of  ${questions.length}..`;

    }else{
        questionElement.innerHTML=`Good!  you scored ${score} out of  ${questions.length}....`;

    }

    nextButton.innerHTML ="play again";
    nextButton.style.display = "block";
}

function  handleNextButton() 
{
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});

startQuiz();
