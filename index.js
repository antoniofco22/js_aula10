produtos = [];
produto=[];

function incluir(){
  data = document.querySelector('#data');
  nome=document.querySelector('#name').value;
  des=document.querySelector('#des').value;
  value=document.querySelector('#value').value;

  // a validação tem pontos cegos. Por exemplo:
  // - preço não-numérico
  // - preço menor ou igual a zero
  // - descrição vazia
  // - nome que consiste somente de espaços, como "   "
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

// o parâmetro "dado" é inicialmente o "id" do produto
function edit(dado){
  i=0;
  while (i < produtos.length) {
  if(produtos[i]['id']==dado){
    // aqui você troca o parâmetro "dado" para o índice do produto (i).
    // Isso é uma má prática, porque deixa bem confuso qual é o papel do "dado".
    // Ou seja, quem vai ler o código tem uma primeira impressão sobre o papel dele
    // e depois descobre que na verdade o papel do "dado" muda durante a execução do código.
    // Pensando no princípio de que um bom código é aquele que é simples de ler e entender,
    // trocar o propósito do "dado" adiciona complexidade desnecessariamente.
    // Alternativa: renomear o parâmetro dado para "produtoID" e criar uma outra variável local
    // "const produtoIndice = i;"
    // Assim quem está lendo sabe de imediato pra quê cada uma serve (o próprio nome das variáveis
    // já diz).
    // Aliás, esse "dado" gera um bug na função save_edit, veja lá
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
  // trocar o id pra "dado" é fonte de bug, porque o "dado" aqui é o ÍNDICE do produto, não seu ID original. 
  // Pra perceber isso faça o seguinte:
  //  - Crie 4 produtos
  //  - Apague o segundo (id=1)
  //  - Edite o último (id=3)
  //  - Verá que o último produto vai mudar pra id 2 !! Aí ficarão 2 produtos com id=2: o último e o penúltimo !
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


