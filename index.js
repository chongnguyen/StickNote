var readline = require('readline-sync');
var fs = require('fs')

var list = [];
var path = './data.json';

function menu(){
    while(true){
        console.log('--------------- MENU --------------');
        console.log('1. display sticknote.');
        console.log('2. add note');
        console.log('3. edit note');
        console.log('4. delete note');
        console.log('0. Exit')

        var select = readline.question('select: >');
        switch(select){
            case '0':
            save(path)
                return 0;
            case '1': 
                show();
                break;
            case '2': 
                add();
                break;
            case '3':
                edit();
                break;
            case '4':
                remove();
                break;
            default:
                console.log('Wrong!');
               break;
        }
    }

}

function loadData(path){
    list = JSON.parse(fs.readFileSync(path, 'utf-8'));
}
loadData(path);

function show(){
    console.log('-----------------------------------------\n\n');
    console.log('\n\nDanh sach note:');
    for(var note of list){
        console.log(note.id + ': ' + note.content);
    }
    console.log('-----------------------------------------\n\n');
}

// add
function add(){
    var i = list.length + 1;
    var newNote = readline.question('nhap noi dung: >');
    var obj = {id: i, content: newNote};
    list.push(obj);
    console.log('Success');
}

// edit
function edit(){
    var id = readline.question('Sua o vitri ? >');
    list[id - 1].content = readline.question('Nhap thay doi: >');
    console.log('Success');

}

function remove(){
    var id = readline.question('Xoa o vitri ? >');
    list.splice(id - 1, 1);
    for(let j = id - 1; j < list.length; j++){
        list[j].id-=1;
    }
    console.log('Success');
}

function save(path){
    fs.writeFileSync(path, JSON.stringify(list));
}

menu();