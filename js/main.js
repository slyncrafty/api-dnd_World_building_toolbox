/* ========== ========== */
// https://www.dnd5eapi.co/
/* ========== ========== */

import { generateGameName } from "./nameGenerator.js";
import { generateClassColorScheme } from './colorGenerator.js';

document.querySelector('#generate-name-btn').addEventListener('click', () => {
    const select = document.querySelector('#race-select').value;
    const genName = generateGameName(select);
    document.getElementById('char-name').value = genName; 
    saveName(genName);
})

function saveName(genName) {
    const li = document.createElement('li');
    li.textContent = genName;
    li.classList.add('name-list-item');
    const dest = document.getElementById('char-name');
    li.addEventListener('click', () => {
        dest.value = genName;
    });
    const list = document.getElementById('name-list');
    list.prepend(li);

    if(list.children.length > 10){
        list.removeChild(list.lastChild);
    }
}


function getFetch(){
    // const choice = document.querySelector('input').value
    const apiurl = `https://www.dnd5eapi.co/api/races`
    fetch(apiurl)      
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        // console.log(data.results)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

/* ========== Populate dropdown menu on load ========== */
document.addEventListener('DOMContentLoaded', () => {
    loadDropdownMenu();
})

function loadDropdownMenu(){
    getDropdownFetch('races', '#race-select');
    getDropdownFetch('classes', '#class-select');
    getDropdownFetch('backgrounds', '#background-select');
    getDropdownFetchString('#keyphrase-select');
}

function getDropdownFetch(t, selector){
    const url = `https://www.dnd5eapi.co/api/${t}`
    fetch(url)    
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        // console.log(data.results)
        const selectElem = document.querySelector(selector);
        populateDropdownMenu(data.results, selectElem); 
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function populateDropdownMenu(arr, elem){
    const result = arr.map((elem) => elem.name);
    result.forEach((item) => addDropdownMenu(elem, item))
}

function addDropdownMenu(elem, val) {
    const menuItem = document.createElement('option');
    menuItem.classList.add('menuItem');
    menuItem.value = val;
    menuItem.textContent = val;
    elem.appendChild(menuItem);
}


function getDropdownFetchString(selector){
    fetch("https://www.dnd5eapi.co/api/2014/backgrounds/acolyte")
        .then((res) => res.json())
        .then((res) =>{
            //   console.log(res);
            const selectElem = document.querySelector(selector);
            const types = res.personality_traits.from.options;
            const strings = [];
            for(let i = 0; i<types.length;i++) {
                addDropdownMenu(selectElem, types[i].string)
            }
        })
        .catch((error) => console.error(error));
}

document.querySelector('#class-select').addEventListener('change', async (e) => {
    const selectedClass = e.target.value;
    const palette = await generateClassColorScheme(selectedClass);
    applyThemeColors(palette);
});

document.addEventListener('DOMContentLoaded', async () => {
    const select = document.querySelector('#class-select');
    const selectedClass = select.value;
    const palette = await generateClassColorScheme(selectedClass);
    applyThemeColors(palette);

});
  
function applyThemeColors(palette) {
    if (!palette || palette.length < 4) return;
    // console.log(`palette: ${palette}`);
    document.documentElement.style.setProperty('--theme-primary', palette[0]);
    document.documentElement.style.setProperty('--theme-secondary', palette[1]);
    document.documentElement.style.setProperty('--theme-accent', palette[2]);
    document.documentElement.style.setProperty('--theme-highlight', palette[3]);
    //localStorage.setItem('classThemePalette', JSON.stringify(palette));
} 


// Generate backstory -- future idea using generative model to get creative backstory generation
function generateStory(section){
    document.getElementById("output").innerText = "Generating... please wait ⏳";
    
    const options = section.from.options;
    const choose = section.choose || 1;

    const shuffled = [...options].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, choose).map(opt => opt.string || opt.desc);
}

document.getElementById('build-character-btn').addEventListener('click', () => {
    fetch('https://www.dnd5eapi.co/api/2014/backgrounds/acolyte')
      .then(res => res.json())
      .then(data => {
        const name = document.getElementById("char-name").value;
        const race = document.getElementById("race-select").value;
        const charClass = document.getElementById("class-select").value;
        const phrase = document.getElementById("keyphrase-select").value;
        const ideals = generateStory(data.ideals);
        const bonds = generateStory(data.bonds);
        const flaws = generateStory(data.flaws);
        const featureName = data.feature.name;
        const featureDesc = data.feature.desc.join(' ');

        const story = ` 
        I am a ${race} ${charClass} named ${name}.
        ${phrase}. My ideal is ${ideals.join(' / ').toLowerCase()}.
        ${bonds.join(' / ')}
        ${flaws.join(' / ')}
        `;
        const elem = document.querySelector('#output');
        elem.innerHTML = '';
        const descriptions = document.createElement('p');
        descriptions.classList.add('storyItem');
        descriptions.textContent = `${featureName}. ${featureDesc}.`;
        const storyLine = document.createElement('p');
        storyLine.classList.add('storyItem');
        storyLine.textContent = story; 
        elem.appendChild(descriptions);
        elem.appendChild(storyLine);
      });})