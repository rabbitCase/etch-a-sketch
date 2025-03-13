document.addEventListener('DOMContentLoaded',() =>{
    const gridContainer = document.getElementsByClassName('grid-container')[0];
    const label = document.getElementById("size-warning");
    const border = document.getElementsByClassName('tool-container')[0];

    let activate = false;
    let mode = 'black';

    window.addEventListener('mousedown', () => activate = true);
    window.addEventListener('mouseup', () => activate = false);

    function setLabel(message){
        gridContainer.innerHTML="";
        gridContainer.appendChild(label);//re-append label as we just cleared it with the above statement
        label.textContent = message;
        console.log('Label set to:', message);
    }
    
    function creategrid(size){
        if(size>100){
            setLabel("100x100 size grids are the maximum");
            return;
        }
        else if(size > 0){
            gridContainer.innerHTML = "";
            
            for(let i=0; i<size*size; i++){
                setTimeout(() => {
                    const newbox= document.createElement('div');
                    newbox.className='box';
                    newbox.style.width = (500/size) +"px";
                    newbox.style.height= (500/size) + "px"; 
                    gridContainer.appendChild(newbox);

                    //cursor control
                    let currentcolor = '';
                    newbox.addEventListener('mouseenter',() =>{
                            currentcolor = newbox.style.backgroundColor;
                            newbox.style.backgroundColor = 'brown';
                    });

                    newbox.addEventListener('mouseleave',() =>{
                            newbox.style.backgroundColor = currentcolor;
                        
                    });

                    newbox.addEventListener("mouseover", () => {//change color
                        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;//a random color everytime
                        if(activate)
                        {
                            if(mode == 'black'){
                                newbox.style.backgroundColor = 'black';
                            }
                            else if(mode == 'erase'){
                                newbox.style.backgroundColor = 'lightblue';
                            }
                            else if(mode== 'rainbow'){
                                newbox.style.backgroundColor = randomColor;
                            }
                            else{
                                console.error("error fetching brush");
                            }
                        }
                    });
                    newbox.addEventListener("mousedown", (drag) => {
                        drag.preventDefault(); //Prevent the default drag behavior
                    });
                },i*0.1);
            }
        }

        else{
            setLabel("Invalid input");
            return;
        }
    }

    function cleargrid(){
        gridContainer.innerHTML = "";
    }

    const gridMakerButton = document.getElementById('grid-maker');
    const gridResetButton = document.getElementById('grid-reset');
    const gridClearButton = document.getElementById('grid-clear');
    const colorBlack = document.getElementById('black-color');
    const colorErase = document.getElementById('erase');
    const colorRainbow = document.getElementById('rainbow-color');

    colorBlack.addEventListener('click', () => {
        mode = 'black'
        border.style.border= '3px solid black';
    });
    colorRainbow.addEventListener('click', () => {
        mode = 'rainbow';
        border.style.border= '3px solid lawngreen';
    });
    colorErase.addEventListener('click', () =>{ 
        mode = 'erase'
        border.style.border= '3px solid royalblue';
    });
    
    gridMakerButton.addEventListener('click',() => {
        if(document.getElementById('grid-size-input').value === ""){
            creategrid(16);
            return;
        }
        creategrid(document.getElementById('grid-size-input').value);
    });

    gridResetButton.addEventListener('click',() => {
        const size= document.getElementById('grid-size-input').value;
        if(!size){
            creategrid(16);
        }
        else if(size <=100 && gridContainer.innerHTML != ""){
            creategrid(size);
        }
        else{
            creategrid(size)
        }
            
    });

    gridClearButton.addEventListener('click',cleargrid);

    creategrid(16);//initial size is 16x16
});