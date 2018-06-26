export const getEl = (selector, target=document)=>{
  return target.querySelector(selector);
}
export const getElAll = (selector, target=document)=>{
  return target.querySelectorAll(selector);
}
export const updateText = (el,updateText)=>{
  return el.innerText = updateText;
} 
export const addClassToList = (list, className) =>{
  return list.forEach(el=> el.classList.add(className))
}
export const removeClassToList = (list, className) => {
  return list.forEach(el=> el.classList.remove(className))
}
export const clearText = (el)=> {
  return el.innerHTML = "";
}

