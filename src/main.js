document.addEventListener('DOMContentLoaded',() =>{
    const gridContainer = document.getElementsByClassName('grid-container')[0];
    const label = document.getElementById("size-warning");
    
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
        else if(size < 0){
            setLabel("Invalid Input")
            return;
        }
        gridContainer.innerHTML = "";
        for(let i=0; i<size*size; i++){
            setTimeout(() => {
                const newbox= document.createElement('div');
                newbox.className='box';
                newbox.style.width = (500/size) +"px";
                newbox.style.height= (500/size) + "px";
                newbox.addEventListener("mouseover", () => {//change color
                    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;//a random color everytime
                    newbox.style.backgroundColor = randomColor;
                });

                gridContainer.appendChild(newbox);
            },i*0.1);
        }
    }

    function cleargrid(){
        gridContainer.innerHTML = "";
    }

    const gridMakerButton = document.getElementById('grid-maker');
    const gridResetButton = document.getElementById('grid-reset');
    const gridClearButton = document.getElementById('grid-clear');
    gridMakerButton.addEventListener('click',() => creategrid(document.getElementById('grid-size-input').value));
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