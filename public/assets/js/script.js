const middleDiv = document.querySelector('.middle');

const bottomDiv = document.querySelector('.bottom');

const header =  middleDiv.querySelector('.header');
const accountHolder = middleDiv.querySelector('.account-holder');

header.addEventListener('click', (e)=>{
     accountHolder.classList.toggle('active');
})

const headerB =  bottomDiv.querySelector('.header');
const accountHolderB = bottomDiv.querySelector('.account-holder');

headerB.addEventListener('click', (e)=>{
     accountHolderB.classList.toggle('active');
})
