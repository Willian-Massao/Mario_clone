setInterval(AttMove, 16);

var state = 'run';

var framestate = 0;

var frames = ['src/mario.png', 'src/mario1.png', 'src/mario3.png', 'src/mario4.png'];

var Pvelocity = 15;

var diretion = 1;

var Gravity = 20;

var position = 80;

var keypress = {
    keyleft: 0, 
    keyright: 0, 
    keytop: 0, 
    keybottom: 0
};

var borderlimit;

document.addEventListener('keyup', (e) => {
    if(e.key.toLowerCase() == 'd') {keypress.keyleft = 0;}
    if(e.key.toLowerCase() == 'a') {keypress.keyright = 0;}
    if(e.key.toLowerCase() == 'w') {keypress.keytop = 0;}
    if(e.key.toLowerCase() == 's') {keypress.keybottom = 0;}
});

document.addEventListener('keydown', (e) => {
    if(!e.repeat){
        if(e.key.toLowerCase() == 'd') {keypress.keyleft = 1;}
        if(e.key.toLowerCase() == 'a') {keypress.keyright = 1;}
        if(e.key.toLowerCase() == 'w') {if(position > 80){ keypress.keytop = 0; }else{ keypress.keytop = 1; }}
        if(e.key.toLowerCase() == 's') {keypress.keybottom = 1;}
    }
});
function getViewport(){
    borderlimit = window.innerWidth;
    borderlimit-=140;
}

function AttMove(){
    if(keypress.keyleft == 1){Hmove(Pvelocity);}
    if(keypress.keyright == 1){Hmove(-Pvelocity);}
    if(keypress.keytop == 1){frame('jump');Vmove(150);}
    if(keypress.keyright == 0&&keypress.keyleft == 0){person.src = frames[0];}
    if(keypress.keybottom == 1){frame('crouch');}
    isDirecition();
    gravity();
    getViewport();
}

function isDirecition(){
    if(keypress.keyright == 1){ diretion = -1;}
    if(keypress.keyleft == 1){ diretion = 1;}
    person.style.transform = `scaleX(${diretion})`;
}

function gravity(){
    if(position != 80){position = position - Gravity;}
    person.style.marginBottom = `${position}px`;
}

function Vmove(Height){
    if(position > 80){keypress.keytop = 0;}

    position = position + Height;
    person.style.marginBottom = `${position}px`;
}

function Hmove(velocity){
    var person = document.getElementById("person");
    
    let position = person.x;

    if(position < 0){
        position =  0;
        person.style.marginLeft = `${position}px`;
    }if(position > borderlimit){
        position = borderlimit;
        person.style.marginLeft = `${position}px`;
    }else{
        position =  position + velocity;
        person.style.marginLeft = `${position}px`;
        frame('run');
    }
}
function frame(state){
    framestate++;
    console.log(framestate);
    if(state == 'run'){
        if(framestate == 5){person.src = frames[0];}
        if(framestate == 10){person.src = frames[1];framestate = 0;}}
    if(state == 'jump'){
        person.src = frames[2];
        setTimeout(framestate = 0, 100);
    }
    if(state == 'crouch'){
        person.src = frames[3];
        framestate = 0;
    }
}