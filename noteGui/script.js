let list = [];
let path = 'http://localhost:3000/note';


var listNote = document.getElementById('list');
var btn = document.getElementById("btn");
var input = document.getElementById('input-text');



listNote.addEventListener('click', removeItem);
btn.addEventListener("click", addItem);


function loadData(){
	axios.get(path)
	.then(function(res){
		list = res.data;
		render(list);
	}).catch(function(err){
		console.log('loi roi nhe chu');
	});
}
loadData();


function render(list){
	var listItem = list.map(function(item, i){
		
		return '<li class="listItem">' + item.content + ' <button id="'+ item.id +'">Delete</button></li> ';
	})
	listNote.innerHTML = listItem.join('');		
}


function removeItem(event){
	var i = event.target.getAttribute('id');
	var newPath = path + '/' + i;
	axios.delete(newPath)
		 .then(function(res){
		 	loadData();
		 })
		 .catch(function(err){
		 	console.log('loi roi nha chu');
		 })
}


function addItem(){
	var textContent = input.value;
	if(!textContent){
		return;
	}
	var obj = {content: textContent};
	list.push(obj);
	render(list);
	input.value = '';

	axios.post(path, obj)
	  .then(function (response) {
	    loadData();
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}