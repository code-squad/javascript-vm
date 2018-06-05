const gs = (selector, target=document)=>{
  return target.querySelector(selector);
}
const gsA = (selector, target=document)=>{
  return target.querySelectorAll(selector);
}
const ut = (el,updateText)=>{
  return el.innerText = updateText;
} 
const acL = (list, className) =>{
  return list.forEach(el=> el.classList.add(className))
}
const rcL = (list, className) => {
  return list.forEach(el=> el.classList.remove(className))
}
const ct = (el)=> {
  return el.innerHTML = "";
}