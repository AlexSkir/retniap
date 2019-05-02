document.addEventListener('DOMContentLoaded', () =>
{
    //------------current palette saver------//
    var current = localStorage.getItem("currentColor")
    var prev = localStorage.getItem("prevColor")    
    window.state.currentColor = current
    window.state.prevColor = prev
    changeBG()
    //------------shape saver---------------//
    var style = JSON.parse(localStorage.getItem('style'));
    //console.log(style)
    if (style){
        for (var i = 0; i< style.length; i++){
            document.getElementById(style[i]['id']).style.backgroundColor = style[i]['bg'];
            if (style[i]['circle']==true){
                document.getElementById(style[i]['id']).classList.add('circle');
            }
        }
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
    prevColor: prevColor
};


transformEl.addEventListener('click', () => {
    
    if (window.state.currentTool !== 'transformTool') {
        transform.classList.add('hovered');
        paintBucketEl.classList.remove('hovered');
        colorPickerEl.classList.remove('hovered');
        dragEl.classList.remove('hovered');
        window.state.currentTool = 'transformTool';        
        transformEl.focus();
        document.body.style.cursor = 'url("assets/transform.png"), auto';
    } else if (window.state.currentTool == 'transformTool'){
        window.state.currentTool = ''; 
        transform.classList.remove("hovered");
        transform.blur();
        document.body.style.cursor = 'default'
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
        document.body.style.cursor = 'url("assets/bucket.png"), auto'      
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
        document.body.style.cursor = 'url("assets/colorpicker.png") 4 12, auto'
    } else if (window.state.currentTool == 'colorPickerTool'){
        window.state.currentTool = ''; 
        colorPickerEl.classList.remove("hovered");
        colorPickerEl.blur();   
        document.body.style.cursor = 'default';   
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
            
            var element = e.target.id;                       
            if (e.target.classList.contains("circle")){
                e.target.classList.remove('circle'); 
            } else {
                e.target.classList.add('circle');
            }            
        }  
             
    }
    if (window.state.currentTool== 'paintBucketTool'){        
        if (e.target.classList.contains("square")) {
            e.target.style.backgroundColor = jQuery('#currentColor').css("background-color");             
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
                if (dragShape == '50%'){
                    if (dropShape != '50%'){                        
                        droppable.addClass('circle');
                        draggable.removeClass('circle');
                    }
                } else if (dragShape != '50%'){
                    if (dropShape == '50%'){                        
                        draggable.addClass('circle');
                    } 
                }
                draggable.css({
                    backgroundColor: dropBG
                });
                
                droppable.css({
                    backgroundColor: dragBG
                }); 
            }            
        });        
        
    }     
    if (window.state.currentTool !='') {
        var style = [
            {
                id: "i1",
                bg: jQuery('#i1').css("background-color"),
                circle: document.getElementById('i1').classList.contains('circle')
            },
            {
                id: "i2",
                bg: jQuery('#i2').css("background-color"),
                circle: document.getElementById('i2').classList.contains('circle')
            },
            {
                id: "i3",
                bg: jQuery('#i3').css("background-color"),
                circle: document.getElementById('i3').classList.contains('circle')
            },
            {
                id: "i4",
                bg: jQuery('#i4').css("background-color"),
                circle: document.getElementById('i4').classList.contains('circle')
            },
            {
                id: "i5",
                bg: jQuery('#i5').css("background-color"),
                circle: document.getElementById('i5').classList.contains('circle')
            },
            {
                id: "i6",
                bg: jQuery('#i6').css("background-color"),
                circle: document.getElementById('i6').classList.contains('circle')
            },
            {
                id: "i7",
                bg: jQuery('#i7').css("background-color"),
                circle: document.getElementById('i7').classList.contains('circle')
            },
            {
                id: "i8",
                bg: jQuery('#i8').css("background-color"),
                circle: document.getElementById('i8').classList.contains('circle')
            },
            {
                id: "i9",
                bg: jQuery('#i9').css("background-color"),
                circle: document.getElementById('i9').classList.contains('circle')
            }];
        localStorage.setItem('style', JSON.stringify(style))
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



function moveRect(e){
    switch(e.keyCode){
        case 80: document.getElementById('paint-bucket').click(); break
        case 67: document.getElementById('choose-color').click(); break
        case 77: document.getElementById('move').click(); break
        case 84: document.getElementById('transform').click(); break
    }
}
document.addEventListener("keydown", moveRect);




$('#restart').click(function(){   
    localStorage.clear();
    document.location.reload(true);
})

var save = {
    current: '',
    prev: '',
    style: ''    
}

$('#save').click(function(){  
    save.current = localStorage.getItem("currentColor");
    save.prev = localStorage.getItem("prevColor");
    save.style = localStorage.getItem("style");
    
})


$('#load').click(function(){
    localStorage.setItem("currentColor", save.current); 
    localStorage.setItem("prevColor", save.prev);    
    save.style? localStorage.setItem("style", save.style) : false;
    
    location.reload(true)
})
