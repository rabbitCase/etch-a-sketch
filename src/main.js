const gridContainer = document.getElementsByClassName('grid-container')[0];
function creategrid(){
    const size= document.getElementById('grid-size-input').value;
    if(size>100){
        document.getElementById('size-warning').textContent="100x100 size grids are the maximum";
        return;
    }
    else if(size < 0){
        alert("Invalid input");
        return;
    }
    gridContainer.innerHTML = "";
    for(let i=0; i<size*size; i++){
        setTimeout(() => {
            const newbox= document.createElement('div');
            newbox.className='box';
            newbox.style.width = (500/size) +"px";
            newbox.style.height= (500/size) + "px";
           
            newbox.addEventListener("mouseover", () => { //change color
                newbox.style.backgroundColor = "black"
            })

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
gridMakerButton.addEventListener('click',creategrid);
gridResetButton.addEventListener('click',() => {
    const size= document.getElementById('grid-size-input').value;
    if(size <=100 && gridContainer.innerHTML != ""){
        creategrid();
    }
    else{
        cleargrid();
    }
        
});
gridClearButton.addEventListener('click',cleargrid);