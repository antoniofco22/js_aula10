produtos = [];
produto=[];

function incluir(){
  data = document.querySelector('#data');
  nome=document.querySelector('#name').value;
  des=document.querySelector('#des').value;
  value=document.querySelector('#value').value;

  try {
    if(nome == "") throw `Falha no cadastro do produto!`;
  }
  catch(err) {
    return data.innerHTML =  err;
  }
  if(produtos.length == 0){
    x=0;
  }else{
    x=(produtos[produtos.length-1].id)+1;
  }
  produto={'id':x,
    'name':nome,
    'description':des,
    'value':value,
    'include':new Date().getTime()};
  produtos.push(produto);
  return data.innerHTML = `Produto ${produto.name} incluído com sucesso!`;
  
}



function listar(){
  data = document.querySelector('#data');
  table="<table><tr><th>ID</th><th>Produto</th><th>Valor</th><th>Editar</th><th>Apagar</th></tr>";
  fin="</table>";
  if(produtos.length==0){
    return data.innerHTML = table+fin;
  }
  
  linha="";
  i=0;
  while (i < produtos.length) {
    linha += "<tr><td>"+produtos[i]['id']+"</td>";
    linha += "<td onclick='info("+produtos[i]['id']+")'>"+produtos[i]['name']+"</td>";
    linha += "<td>"+produtos[i]['value']+"</td>";
    linha += "<td><img src='./img/edit.png' onclick='edit("+produtos[i]['id']+")'></td>";
    linha +="<td><img src='./img/delete.png' onclick='del("+produtos[i]['id']+")'></td></tr>";
    i++;
  }
  return data.innerHTML = table+linha+fin;
}




function info(dado){
  data = document.querySelector('#data');
  i=0;
  while (i < produtos.length) {
  if(produtos[i]['id']==dado){
    dado=i;
  }
  i++;
  }
  produto = produtos[dado];
  div="";
  div+="<div>ID:"+produto.id+"</div>";
  div+="<div>NOME:"+produto.name+"</div>";
  div+="<div>DESCRIÇÃO:"+produto.description+"</div>";
  div+="<div>VALOR:"+produto.value+"</div>";

  horas = new Date(produto.include);
  dt = horas.toLocaleDateString();
  horas = horas.getHours()+":"+horas.getMinutes()+":"+horas.getSeconds();

  div+="<div>INCLUIDO EM:"+dt+" - "+horas+"</div>";
  return data.innerHTML = div;
}

function edit(dado){
  i=0;
  while (i < produtos.length) {
  if(produtos[i]['id']==dado){
    dado=i;
  }
  i++;
  }
  produto = produtos[dado];
  div="";
  div+="<div>ID:"+produto.id+"</div>";
  div+="<div>NOME:<input type='text' value='"+produto.name+"' id='name_save'></div>";
  div+="<div>DESCRIÇÃO:<input type='text' value='"+produto.description+"' id='des_save'></div>";
  div+="<div>VALOR:<input type='text' value='"+produto.value+"' id='value_save'></div>";
  

  horas = new Date(produto.include);
  dt = horas.toLocaleDateString();
  horas = horas.getHours()+":"+horas.getMinutes()+":"+horas.getSeconds();

  div+="<div>INCLUIDO EM:"+dt+" - "+horas+"</div>";
  div+="<div><button class='but' onclick='save_edit("+dado+")'>Editar</button></div>";
  return data.innerHTML = div;
}

function save_edit(dado){

  nome=document.querySelector('#name_save').value;
  des=document.querySelector('#des_save').value;
  value=document.querySelector('#value_save').value;
  produtos[dado]={'id':dado,
    'name':nome,
    'description':des,
    'value':value,
    'include':produtos[dado]['include']};
  listar();
}

function del(dado){
  i=0;
  while (i < produtos.length) {
  if(produtos[i]['id']==dado){
    dado=i;
  }
  i++;
  }
  i=0;
  pro = [];
  while(i<produtos.length){
    
    if(i==dado){
      
    }else{
      
      pro.push({'id':produtos[i].id,
      'name':produtos[i].name,
      'description':produtos[i].description,
      'value':produtos[i].value,
      'include':produtos[i].include});
      
    }
    i++;
  }
  produtos = pro;
  listar();
}


function back(){
al = document.querySelector('#all');
array = ['https://img.freepik.com/vetores-gratis/wallpaper-de-paisagem-em-design-plano_74890-34.jpg?w=2000',
'https://www.10wallpaper.com/wallpaper/1366x768/1610/Canada_Harrison_Lake_Beautiful_Landscape_Wallpaper_13_1366x768.jpg',
'https://images7.alphacoders.com/423/423348.jpg'];
x = parseInt(Math.random()*3)
al.style.background = "url('"+array[x]+"')";
}

window.onload = function(){
back();


data = document.querySelector('#data');
};


