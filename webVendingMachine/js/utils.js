const getSearched = (selector, target=document)=>{
  return target.querySelector(selector);
}
const getSearchedAll = (selector, target=document)=>{
  return target.querySelectorAll(selector);
}
const updateText = (el,updateText)=>{
  return el.innerText = updateText;
} 
const addClassElList = (list, className) =>{
  return list.forEach(el=> el.classList.add(className))
}
const removeClassElList = (list, className) => {
  return list.forEach(el=> el.classList.remove(className))
}
const clearText = (el)=> {
  return el.innerHTML = "";
}