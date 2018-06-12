export const gs = (selector, target=document)=>{
  return target.querySelector(selector);
}
export const gsA = (selector, target=document)=>{
  return target.querySelectorAll(selector);
}
export const ut = (el,updateText)=>{
  return el.innerText = updateText;
} 
export const acL = (list, className) =>{
  return list.forEach(el=> el.classList.add(className))
}
export const rcL = (list, className) => {
  return list.forEach(el=> el.classList.remove(className))
}
export const ct = (el)=> {
  return el.innerHTML = "";
}

