const buttons = document.querySelectorAll('.btn'),
      display = document.querySelector('.operation'),
      history = document.querySelector('.history');

//event listener
buttons.forEach((btn)=>{
   btn.addEventListener('click',(e)=>{
      if (e.target.classList.contains('operator')){
         if(display.innerText =="" && e.target.id=="-"){
             setDisplay(e.target.id)
         } else {
            if(display.innerText!=""){
              setHistory(display.innerText+e.target.id);
              setDisplay('')
            }  
         }
      } else{
        if(e.target.id == "clear"){
           setDisplay(''); setHistory('')
        } else if(e.target.id == "backspace"){
            backSpace();
        } else if(e.target.id == "eval"){
            let historyValue = getHistory();
            let displayValue = getDisplay();
            calculate(historyValue, displayValue);
        } else{
          setDisplay(e.target.id)
        }   
      }    
   });
});
//ui event
document.querySelector('.ui-controller').addEventListener("click",ui);
//functions
function backSpace(){
  let temp = display.innerText;
  temp=temp.slice(0,temp.length-1);
  setDisplay('');
  setDisplay(temp);
}
function getDisplay(){
  return display.innerText;
}
function getHistory(){
  return history.innerText;
}
//set history
function setHistory(str){
  if(str==""){
    history.innerHTML = str;
   }else{
    history.innerText += str;
   }
}
//set display
function setDisplay(str){
  if(str==""){
    display.innerText = str;
   }else{
    if(String(str).length>12){
      display.style.fontSize="1.2rem";
    } 
     display.innerText += str;
   } 
}
//calculate
function calculate(his, dis){
   if(dis!= "" && his!=""){
     his += dis;
     let result = eval(his);
     result = Number(result);
     setDisplay('');
     setHistory('');
     setDisplay(Math.trunc(result));  
   } else if(dis=="" && his!=""){
    his=Number(his.slice(0,his.length-1));
    setHistory('')
    try {
      setDisplay(Math.trunc(eval(his)));
       } catch (e){
          setDisplay('syntax error')
       }
 
   }
}
//ui controller
function ui(){
  let imgSrc={
    light:"https://img.icons8.com/ios/24/000000/sun--v1.png",
    dark:"https://img.icons8.com/ios-glyphs/24/000000/sun--v1.png"
  }
  let cal= document.querySelector('.calculator')
  cal.classList.toggle('light');
  if(cal.classList.contains('light')){
    document.querySelector('#icon').src = imgSrc.dark;
    document.body.style.backgroundColor="#a5a5a5";
  } else{
    document.querySelector('#icon').src = imgSrc.light;
    document.querySelector('.ui-controller').style.backgroundColor = "#b0afaf";
    document.body.style.backgroundColor = "#e7e7e7";
  }
}

