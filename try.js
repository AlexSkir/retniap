jQuery.fn.swap = function(b){     
    b = jQuery(b)[0]; 
    var a = this[0]; 
    var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
    b.parentNode.insertBefore(a, b); 
    t.parentNode.insertBefore(b, t); 
    t.parentNode.removeChild(t); 
    return this; 
};


$( ".square" ).draggable({ 
    containment: ".container",
    revert: false, 
    helper: "clone",
    start: function(event, ui){        
        $(this).hide();        
    },
    stop: function(event, ui){        
        $(this).show();        
    }
});

$( ".square" ).droppable({
    accept: ".square",    
    hoverClass: "hovered",
    drop: function( event, ui ) {              
        var draggable = ui.draggable, droppable = $(this),
        dragPos = draggable.position(), dropPos = droppable.position();
        
        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });
        
        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
        
    }
});
// $( ".container" ).droppable({
//     accept: ".square",
//     drop:function( event, ui ){
//         $(this).append(ui.draggable);
//     }
// })