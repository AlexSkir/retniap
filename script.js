document.addEventListener('DOMContentLoaded', () =>
{
    //------------current palette saver------//
    var current = localStorage.getItem("currentColor")
    var prev = localStorage.getItem("prevColor")    
    window.state.currentColor = current
    window.state.prevColor = prev
    changeBG()
    //------------shape saver---------------//
    var shapeIscircle = localStorage.getItem("shapeIscircle");
    window.state.shape = JSON.parse(localStorage.getItem('elems'))
    if (shapeIscircle == "true" && window.state.shape) {
        var elements = JSON.parse(localStorage.getItem('elems'))        
        for (var i = 0; i<elements.length; i++){
            document.getElementById(elements[i]).className += " circle";
        }      
    }
    //------------figure's color saver---------------//
    var bgChanged = localStorage.getItem("bgChanged");
    window.state.bg = JSON.parse(localStorage.getItem('bg'))
    var colored = window.state.bg
    if (bgChanged == "true" && window.state.bg) {
        for (var i = 0; i<colored.length; i++){
            document.getElementById(colored[i]['id']).style.backgroundColor = colored[i]['bg']
        }
    }
    if (localStorage.getItem('elems')){
        window.state.shape = JSON.parse(localStorage.getItem('elems'))
    } else {
        window.state.shape = [];
    }
    if (localStorage.getItem('bg')){
        window.state.bg = JSON.parse(localStorage.getItem('bg'))
    } else {
        window.state.bg = [];
    }
})


const transformEl = document.getElementById('transform');
const paintBucketEl = document.getElementById('paint-bucket');
const colorPickerEl = document.getElementById('choose-color');
const dragEl = document.getElementById('move');

const currentColor = jQuery('#currentColor').css("background-color");
const prevColor = jQuery('#prevColor').css("background-color");
const theInput = document.getElementById("customed");

window.state = {
    currentTool: '',
    currentColor: currentColor,
    prevColor: prevColor,
    shape: [],    
    bg: []
};


transformEl.addEventListener('click', () => {
    if (window.state.currentTool !== 'transformTool') {
        transform.classList.add('hovered');
        paintBucketEl.classList.remove('hovered');
        colorPickerEl.classList.remove('hovered');
        dragEl.classList.remove('hovered');
        window.state.currentTool = 'transformTool';        
        transformEl.focus();
        document.body.style.cursor = 'default';
    } else if (window.state.currentTool == 'transformTool'){
        window.state.currentTool = ''; 
        transform.classList.remove("hovered");
        transform.blur();
    }
});
paintBucketEl.addEventListener('click', (e)=> {
    if (window.state.currentTool !== 'paintBucketTool') {
        paintBucketEl.classList.add("hovered");
        transform.classList.remove("hovered");
        colorPickerEl.classList.remove("hovered");
        dragEl.classList.remove("hovered");
        window.state.currentTool = 'paintBucketTool';
        paintBucketEl.focus()  
        document.body.style.cursor = "url('C:/Users/Note/Desktop/js school/repos/retniap/assets/bucket.png'), auto"      
    } else if (window.state.currentTool == 'paintBucketTool') {
        window.state.currentTool = ''; 
        paintBucketEl.classList.remove("hovered");
        paintBucketEl.blur() 
        document.body.style.cursor = "default"      
    }     
    
})

colorPickerEl.addEventListener('click', (e)=> {
    if (window.state.currentTool !== 'colorPickerTool') {
        colorPickerEl.classList.add("hovered");
        transform.classList.remove("hovered");
        paintBucketEl.classList.remove("hovered");
        dragEl.classList.remove("hovered");
        window.state.currentTool = 'colorPickerTool';
        colorPickerEl.focus();      
        document.body.style.cursor = 'default';
    } else if (window.state.currentTool == 'colorPickerTool'){
        window.state.currentTool = ''; 
        colorPickerEl.classList.remove("hovered");
        colorPickerEl.blur();      
    }     
    
})

dragEl.addEventListener('click', (e)=> {
    if (window.state.currentTool !== 'dragTool') {
        dragEl.classList.add("hovered");
        paintBucketEl.classList.remove("hovered");
        transform.classList.remove("hovered");
        colorPickerEl.classList.remove("hovered");
        window.state.currentTool = 'dragTool';
        dragEl.focus();       
        document.body.style.cursor = 'default';
    } else if (window.state.currentTool == 'dragTool'){
        window.state.currentTool = ''; 
        dragEl.classList.remove("hovered");
        dragEl.blur()    
        document.body.style.cursor = "default"   
    }           
})

document.addEventListener('click', (e)=> {
    
    if (window.state.currentTool== 'transformTool'){        
        if (e.target.classList.contains("square")) {
            e.target.classList.toggle('circle');
            localStorage.setItem("shapeIscircle", "true");
            var element = e.target.id;            
            if (e.target.classList.contains("circle")){
                if (window.state.shape.indexOf(element) == -1){
                    window.state.shape.push(element)
                }                
            }
            if (!e.target.classList.contains("circle")){
                if (window.state.shape.indexOf(element) != -1){
                    window.state.shape.splice(window.state.shape.indexOf(element), 1)
                }                                
            }
            localStorage.setItem('elems', JSON.stringify(window.state.shape))
        }        
    }
    if (window.state.currentTool== 'paintBucketTool'){        
        if (e.target.classList.contains("square")) {
            e.target.style.backgroundColor = jQuery('#currentColor').css("background-color");
            localStorage.setItem("bgChanged", "true");            
            var element = e.target.id
            
            window.state.bg.push({
                id: element,
                bg: e.target.style.backgroundColor
            })     
            localStorage.setItem('bg', JSON.stringify(window.state.bg))
        }
    }
    if (window.state.currentTool== 'colorPickerTool'){  
        var picked = $( e.target) 
        if ( picked.is( "div" ) )  {                     
            window.state.prevColor = window.state.currentColor;
            
            if (picked.css('background-color')!=window.state.currentColor) {
                window.state.currentColor = picked.css('background-color');
                changeBG()
            }  
        }
    }
    
    if (window.state.currentTool == 'dragTool') { 
        $('.square').draggable({  
            containment: ".container",            
            revert: false,
            helper: "clone",
            start: function(event, ui){                  
                $(this).hide();
            },
            stop: function(event, ui){       
                $(this).show();      
            },
            drag: function(e) { 
                if (window.state.currentTool!== 'dragTool'){
                    e.preventDefault(); 
                }         
            }
        });
        
        $( ".square" ).droppable({
            accept: ".square",
            hoverClass: "hovered",
            drop: function ( event, ui ) {
                
                var draggable = ui.draggable, droppable = $(this),
                dragBG = draggable.css('backgroundColor'), dragShape = draggable.css('borderRadius'),
                dropBG = droppable.css('backgroundColor'), dropShape = droppable.css('borderRadius');
                
                draggable.css({
                    backgroundColor: dropBG,
                    borderRadius: dropShape
                });
                
                droppable.css({
                    backgroundColor: dragBG,
                    borderRadius: dragShape
                }); 
                
            }            
        });
    }
})



function changeBG() {
    document.getElementById('currentColor').style.backgroundColor = window.state.currentColor;
    document.getElementById('prevColor').style.backgroundColor = window.state.prevColor;
    
    localStorage.setItem('currentColor', window.state.currentColor);
    localStorage.setItem('prevColor', window.state.prevColor);
}

theInput.addEventListener("input", function() {    
    var customedColor = theInput.value;
    window.state.prevColor = window.state.currentColor;
    window.state.currentColor = customedColor;
    changeBG()
}, false);



$('#list').click(function(){   
    $('#list').toggleClass('active')    
    $('.list').toggleClass('hidden')
})

$('.container').bind('click', function(){   
    $('#list').removeClass('active')    
    $('.list').addClass('hidden')
})

$('#restart').click(function(){   
    localStorage.clear();
    document.location.reload(true);
})

var save = {
    current: '',
    prev: '',
    elems: '',
    bg: '',
    shapeIscircle: '',
    bgChanged: ''
}

$('#save').click(function(){  
    save.current = localStorage.getItem("currentColor")
    save.prev = localStorage.getItem("prevColor") 
    save.elems = localStorage.getItem('elems') 
    save.bg = localStorage.getItem('bg') 
    save.shapeIscircle = localStorage.getItem("shapeIscircle");
    save.bgChanged = localStorage.getItem("bgChanged");
})


$('#load').click(function(){
    localStorage.setItem("currentColor", save.current) 
    localStorage.setItem("prevColor", save.prev)
    save.elems? localStorage.setItem('elems', save.elems) : false;
    save.bg? localStorage.setItem('bg', save.bg) : false;
    localStorage.setItem("shapeIscircle", save.shapeIscircle);
    localStorage.setItem("bgChanged", save.bgChanged);
    location.reload(true)
})  

function moveRect(e){
    switch(e.keyCode){
        case 80: document.getElementById('paint-bucket').click(); break
        case 67: document.getElementById('choose-color').click(); break
        case 77: document.getElementById('move').click(); break
        case 84: document.getElementById('transform').click(); break
    }
}
document.addEventListener("keydown", moveRect);
