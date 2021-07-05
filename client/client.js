//const { response } = require('express');

//const { response } = require("express");

console.log("Hellow Catsss")
const mewsElemetn =document.querySelector('.mews');
const form =document.querySelector('form');
const loadingElement =document.querySelector('.loading');
const API_url = 'http://localhost:5000/mews';

loadingElement.style.display='';

listAllMews();

form.addEventListener('submit' , (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name =formData.get('name');
    const content =formData.get('content');
    const mew ={
        name,
        content
    };
   
    fetch(API_url,{
        method : 'POST',
        body : JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdMew => {
        console.log(createdMew);
        form.reset();
        setTimeout(() =>{
            form.style.display='';
        },30000);
        
        loadingElement.style.display='none';
        listAllMews();
    });
    console.log("form is submitted");
    form.style.display='none';
    loadingElement.style.display='';
});

function listAllMews(){
    mewsElemetn.innerHTML='';
    fetch(API_url)
    .then(response => response.json())
    .then(mews => {
        mews.reverse();
        mews.forEach(mew => {
            const div =document.createElement('div');
            const header =document.createElement('h3');
            header.textContent=mew.name;
            const contents=document.createElement('p');
            contents.textContent=mew.content;
            const date =document.createElement('small');
            date.textContent=new Date(mew.created);
            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);
            mewsElemetn.appendChild(div);
        });
        loadingElement.style.display='none';
    });
}