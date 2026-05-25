const cvInput   = document.getElementById('cv-input');
const reviewBtn = document.getElementById('review-btn');
const btnText = document.querySelector('.btn-text')
const charCount = document.getElementById('char-count');
const errMsg = document.getElementById('errMsg');

const resultsSection   = document.getElementById('results-section');
const scoreNumber = document.getElementById('score-number');
const scoreBar = document.getElementById('score-bar');
const strengthsList = document.getElementById('strengths-list');
const weaknessesList = document.getElementById('weaknesses-list');
const rewrittenSummary = document.getElementById('rewritten-summary');
const overallAdvice = document.getElementById('overall-advice');



async function APICall() {
    const userText = cvInput.value.trim();
    try {
        errMsg.innerHTML = '';
        let response = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${CONFIG.API_KEY}` 
        },
            body :JSON.stringify({
                model : 'llama-3.3-70b-versatile',
                messages : [
                    {role : 'system',content : 'You are a professional CV reviewer. Respond ONLY with a valid JSON object, no intro text, no explanation, no markdown. The JSON must have these exact keys: score (number out of 100), strengths (array of strings), weaknesses (array of strings), rewrittenSummary (string), advice (string).'},
                    {role : 'user',content : userText}
                ]
            })
        });
        if(!response.ok) {
            throw new Error("Something went wrong,try again later");
        }
        const data = await response.json();        
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);                

        strengthsList.innerHTML = '';
        weaknessesList.innerHTML = '';
        scoreBar.style.width = '';
        parsed.strengths.forEach(strength => {
            const list = document.createElement('li');
            list.textContent = strength;
            strengthsList.appendChild(list)                        
            
        });
        parsed.weaknesses.forEach(weakness => {
            const list = document.createElement('li');
            list.textContent = weakness;
            weaknessesList.appendChild(list)            
            
        })        
        scoreNumber.textContent = parsed.score;        
        rewrittenSummary.textContent = parsed.rewrittenSummary;        
        overallAdvice.textContent = parsed.advice;        

        scoreBar.style.width = `${parsed.score}%`

        resultsSection.removeAttribute('hidden')
    }catch(err) {        
        errMsg.innerHTML = err.message;
    }
    
}

reviewBtn.addEventListener('click',async () => {
    if(cvInput.value.trim() === '') return            
    reviewBtn.disabled = true; 
    btnText.textContent = 'Analysing...'       
        await APICall();        
    reviewBtn.disabled = false;    
    btnText.textContent = 'Analyse'    
    
})

cvInput.addEventListener('input',() => {
    const length = cvInput.value.length;
    charCount.textContent = `${length} character${length !== 1 ? 's' : ''}`;        
})