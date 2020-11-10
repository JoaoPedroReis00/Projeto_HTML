class Usuario{

    nome;
    email;
    senha;
    dtNascimento;
    genero;
    favoritos;
}

class Favoritos{

    artista;
    musica;
    src;
    iArtista;
    iAlbum;
    iMusica;
}

class Artista{

    nome;
    nascimento;
    obito;
    pais;
    estiloMusical;
    foto;
    singles;
    albuns;
}

class Single{

    nome;
    lancamento;
    src;
    reproducoes;
}

class Album{

    nome;
    lancamento;
    capa;
    musicas;
}

class Musica{

    nome;
    src;
    reproducoes;
}

class Todas{

    artista;
    musica;
    src;
    iArtista;
    iAlbum;
    iMusica;
    reproducoes;
}

function cadastrarUsuario(){

    let u = new Usuario();

    let nomeAux = validNome();
    let emailAux = validEmail();
    let senhaAux = validSenha();
    let nascimentoAux = validNascimento();
    let generoAux = validGenero();

    if(nomeAux && emailAux && senhaAux && nascimentoAux && generoAux){

        u.nome = document.getElementById('iNome').value;
        u.email = document.getElementById('iEmail').value;
        u.senha = document.getElementById('iSenha').value;
        u.nascimento = document.getElementById('iDtNascimento').value;
        u.genero = document.getElementById('iGenero').value;
        u.favoritos = [];

        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));

        if(listaUsuario == null){

            listaUsuario = [];
        }

        let valid = true;

        for(let i = 0 ; i<listaUsuario.length ; i++){

            if(listaUsuario[i].email == u.email){

                inputInvalida('pEmail' , 'email' , 'm');

                valid = false;
            }
        }

        if(valid == true){

            listaUsuario.push(u);

            window.localStorage.setItem('listaUsuario' , JSON.stringify(listaUsuario));
            window.localStorage.setItem('usuarioAtual' , JSON.stringify(u));

            document.getElementById('iNome').value = null;
            document.getElementById('iEmail').value = null;
            document.getElementById('iSenha').value = null;
            document.getElementById('iDtNascimento').value = null;
            document.getElementById('iGenero').value = '';

            window.open('index.html' , '_self');
        }
    }
}

function editarUsuario(){

    let nomeAux = validNome();
    let emailAux = validEmail();
    let senhaAux = validSenha();
    let nascimentoAux = validNascimento();
    let generoAux = validGenero();

    if(nomeAux && emailAux && senhaAux && nascimentoAux && generoAux){

        let u = new Usuario();

        u.nome = document.getElementById('iNome').value;
        u.email = document.getElementById('iEmail').value;
        u.senha = document.getElementById('iSenha').value;
        u.nascimento = document.getElementById('iDtNascimento').value;
        u.genero = document.getElementById('iGenero').value;

        let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));

        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));

        for(let i = 0 ; i<listaUsuario.length ; i++){

            if(listaUsuario[i].nome == usuario.nome){

                listaUsuario[i].nome = u.nome;
                listaUsuario[i].email = u.email;
                listaUsuario[i].senha = u.senha;
                listaUsuario[i].nascimento = u.nascimento;
                listaUsuario[i].genero = u.genero;

                localStorage.setItem('usuarioAtual' , JSON.stringify(listaUsuario[i]));
            }
        }

        localStorage.setItem('listaUsuario' , JSON.stringify(listaUsuario));

        window.open('index.html' , '_self')

    }
}

function apagarUsuario(){

    let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));

    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    let listaAux = [];

    for(let i = 0 ; i<listaUsuario.length ; i++){

        if(listaUsuario[i].nome != usuarioAtual.nome){

            listaAux.push(listaUsuario[i]);
        }
    }

    localStorage.setItem('listaUsuario' , JSON.stringify(listaAux));
    localStorage.setItem('usuarioAtual' , null);

    window.open('index.html' , '_self');
}

function validNome(){

    nome = document.getElementById('iNome').value;
    
    let alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','á','à','ã','â','ä','é','è','ê','ë','í','ì','î','ï','ó','ò','õ','ô','ö','ú','ù','û','ü','ç',' '];

    let valid = false;

        if(nome != '' && nome != null){

            nome = nome.trim();

            while(nome.includes('  ')){
  
                nome = nome.replace('  ',' ');
   
            }
   
            let nomeAux = nome.toLowerCase();

            let cont = 0;
    
            for(let i = 0 ; i<nomeAux.length ; i++){
     
                for(let j = 0 ; j<alfabeto.length ; j++){
      
                    if(nomeAux.charAt(i) == alfabeto[j]){

                        cont++;
                    }
                }
            }
       
            if(cont == nomeAux.length){

                valid = true;

            }else{
        
                inputInvalida('pNome', 'nome', 'm');

            }
        }else{

            inputVazia('pNome', 'nome', 'm');
        }
    return valid;
}

function validEmail(){

    email = document.getElementById('iEmail').value;

    let validos = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','_','.'];

    let valid = false;

    let iArroba = null;
    let contArroba = 0;

    let aux = 0;

    if(email != null && email != ''){

        for(let i = 0 ; i<email.length ; i++){

            if(email.charAt(i) == '@'){
    
                iArroba = i;
                contArroba++;
    
            }else{
    
                for(let j = 0 ; j<validos.length ; j++){
    
                    if(email.charAt(i) == validos[j]){

                        aux++;
                    }
                }
            }
        }
    
        if(contArroba == 1 && aux == email.length-1){
    
            for(let i = iArroba; i<email.length ; i++){
    
                if(email.charAt(i) == '.'){
    
                    valid = true;
                }
            }
        }
    
        if(valid == false){
    
            inputInvalida('pEmail', 'email', 'm');
        }
        
    }else{
       inputVazia('pEmail', 'email', 'm');
    }

    return valid;
}

function validSenha(){

    senha = document.getElementById('iSenha').value;

    let valid = false;

    let alfabetoMin = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let alfabetoMai = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let numeros = ['0','1','2','3','4','5','6','7','8','9'];
    let especial = ['@','.','-','_'];

    let contN = 0;
    let contTotal = 0;

    let booleanMai = false;
    let booleanMin = false;

    if(senha.length >= 8 && senha.length <= 32){

        for(let i = 0 ; i<senha.length ; i++){

            for(let j = 0 ; j<numeros.length ; j++){
    
                if(senha.charAt(i) == numeros[j]){
    
                    contN++;
                    contTotal++;
                }
            }
    
            for(let j = 0 ; j<alfabetoMin.length ; j++){

                if(senha.charAt(i) == alfabetoMin[j]){

                    booleanMin = true;
                    contTotal++;
                }
            }

            for(let j = 0 ; j<alfabetoMai.length ; j++){

                if(senha.charAt(i) == alfabetoMai[j]){

                    booleanMai = true;
                    contTotal++;
                }
            }

            for(let j = 0 ; j<especial.length ; j++){

                if(senha.charAt(i) == especial[j]){

                    contTotal++;
                }
            }
        }

        if(contTotal == senha.length){

            if(contN > 5 && booleanMai == true && booleanMin == true){

                valid = true;

            }else{

                document.getElementById('pSenha').innerHTML = 'A senha deve ter pelo menos 6 números, uma letra maiúscula e uma ninúscula.';
            }

        }else{

            document.getElementById('pSenha').innerHTML = 'Caracteres válidos : letras maiúscula e minúscula sem acentuação, números de 0-9, além de "@" , "." , "-" , "_"';
        }
    }else{

        document.getElementById('pSenha').innerHTML = 'A senha deve ter mais de 7 digitos e menos de 33 digitos.';
    }

    return valid;
}

function validNascimento(){

    nascimento = document.getElementById('iDtNascimento').value;

    let data = new Date();
    let valid = true;

    let ano = "";
    let mes = "";
    let dia = "";

    if(nascimento != null && nascimento != ''){

        for(let i = 0 ; i<nascimento.length ; i++){

            switch(i){

            case 0: case 1: case 2: case 3:{

                ano += nascimento.charAt(i);

                break;
            }
            case 5: case 6:{

                mes += nascimento.charAt(i);

                break;
            }
            case 8: case 9:{

                dia += nascimento.charAt(i);

                break;
            }
            }
        }

        if(ano < 1900 || ano > data.getFullYear()){

            valid = false;

            inputInvalida('pDtNascimento' , 'data de nascimento' , 'f');

        }else{

            if(ano == data.getFullYear()){

                if(mes > data.getMonth()){

                    valid = false;

                    inputInvalida('pDtNascimento' , 'data de nascimento' , 'f');

                }else{

                    if(mes == data.getMonth()){

                        if(dia >= data.getDay()){

                            valid = false;
                            
                            inputInvalida('pDtNascimento' , 'data de nascimento' , 'f');
                        }
                    }
                }
            }
        }
    }else{

        valid = false;

        inputVazia('pDtNascimento' , 'data de nascimento' , 'f');
    } 

    return valid;
}

function verifIdade(dtNascimento){

    let data = new Date();

    let ano = "";
    let mes = "";
    let dia = "";

    for(let i = 0 ; i<dtNascimento.length ; i++){

        switch(i){

        case 0: case 1: case 2: case 3:{

            ano += dtNascimento.charAt(i);

            break;
        }
        case 5: case 6:{

            mes += dtNascimento.charAt(i);

            break;
        }
        case 8: case 9:{

            dia += dtNascimento.charAt(i);

            break;
        }
        }
    }
    let idadeAux = data.getFullYear() - ano;

    if((data.getMonth() + 1) < mes){

        idadeAux--;

    }else{

        if((data.getMonth() + 1) == mes){

            if(data.getDate() < dia){

                idadeAux--;
            }
        }
    }
    return idadeAux;
}

function validGenero(){

    genero = document.getElementById('iGenero').value;
    
    let valid = false;

    if(genero == ''){

        inputVazia('pGenero' , 'gênero' , 'm');

    }else{

        valid = true;
    }

    return valid;
}

function inputInvalida(p, n, g){

    if(g == 'm'){

        document.getElementById(p).innerHTML = 'O '+n+' digitado é inválido.';

    }else{

        document.getElementById(p).innerHTML = 'A '+n+' digitada é inválida.';
    }
}

function inputVazia(p, n, g){

    if(g == 'm'){

        document.getElementById(p).innerHTML = 'O '+n+' não foi informado.';

    }else{

        document.getElementById(p).innerHTML = 'A '+n+' não foi informada.';
    }
}

function limparP(p){

    document.getElementById(p).innerHTML = null;
}

function login(){

    let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));

    let valid = true;

    let u = new Usuario();

    u.email = document.getElementById('iEmail').value;
    u.senha = document.getElementById('iSenha').value;

    if(u.email == null || u.email == ''){

        valid = false;

        inputVazia('pEmail' , 'email' , 'm');
    }

    if(u.senha == null || u.senha == ''){

        valid = false;

        inputVazia('pSenha' , 'senha' , 'f');
    }

    if(valid == true){

        let aux = false;

        for(let i = 0 ; i<listaUsuario.length ; i++){

            if(listaUsuario[i].email == u.email && listaUsuario[i].senha == u.senha){

                localStorage.setItem('usuarioAtual' , JSON.stringify(listaUsuario[i]));

                window.open('index.html' , '_self');

                aux = true;

            }
        }

        if(aux == false){

            alert('Email ou senha não localizado.');
        }
    }
}

function cadastrarArtista(){

    let nomeAux = validArtista();
    let fotoAux = validSrc('iFoto' , 'pFoto');
    let paisAux = validPais();
    let estiloAux = validEstiloMusical();

    if(nomeAux && fotoAux && paisAux && estiloAux){

        let valid = true;

        let a = new Artista();

        a.nome = document.getElementById('iNome').value;
        a.foto = document.getElementById('iFoto').value;
        a.pais = document.getElementById('iPaises').value;
        a.estiloMusical = document.getElementById('iEstilo').value;
        a.albuns = [];
        a.singles = [];

        console.log(a);

        let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

        if(listaArtistas == null){

            listaArtistas = [];
        }

        for(let i = 0 ; i<listaArtistas.length ; i++){

            if(listaArtistas[i].nome == a.email){

                inputInvalida('pNome' , 'artista' , 'm');

                valid = false;
            }
        }

        if(valid == true){

            listaArtistas.push(a);

            let listaAux = ordemAlfabetica(listaArtistas);

            localStorage.setItem('listaArtistas', JSON.stringify(listaAux));

            document.getElementById('iNome').value = null;
            document.getElementById('iFoto').value = null;
            document.getElementById('iPaises').value = '';
            document.getElementById('iEstilo').value = null;
        }
    }

}

function localizarArtista(){

    let nomeArtista = document.getElementById('inputLoc').value;
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    if(listaArtistas == null){

        listaArtistas = [];
    }

    let valid = false;

    for(let i = 0 ; i<listaArtistas.length ; i++){

        if(listaArtistas[i].nome == nomeArtista){

            document.getElementById('iIndice').value = i;
            document.getElementById('iNome').value = listaArtistas[i].nome;
            document.getElementById('iFoto').value = listaArtistas[i].foto;
            document.getElementById('iPaises').value = listaArtistas[i].pais;
            document.getElementById('iEstilo').value = listaArtistas[i].estiloMusical;

            valid = true;
        }
    }

    if(valid == true){

        document.getElementById('inputLoc').value = null;
        document.getElementById('popUpLoc').hidden = true;
        document.getElementById('divTransparente').hidden = true;
        document.getElementById('divBtn1').hidden = true;
        document.getElementById('divBtn2').hidden = false;
    
    }else{

        alert('O artista informado não foi encontrado.');
    }
}

function editarArtista(){

    let nomeAux = validArtista();
    let paisAux = validPais();
    let estiloAux = validEstiloMusical();

    if(nomeAux && paisAux && estiloAux){

        let iArtista = parseInt(document.getElementById('iIndice').value);
        let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

        console.log(iArtista);

        listaArtistas[iArtista].nome = document.getElementById('iNome').value;
        listaArtistas[iArtista].foto = document.getElementById('iFoto').value;
        listaArtistas[iArtista].pais = document.getElementById('iPaises').value;
        listaArtistas[iArtista].estiloMusical = document.getElementById('iEstilo').value;

        localStorage.setItem('listaArtistas' , JSON.stringify(listaArtistas));

        document.getElementById('iIndice').value = null;
        document.getElementById('iNome').value = null;
        document.getElementById('iFoto').value = null;
        document.getElementById('iPaises').value = '';
        document.getElementById('iEstilo').value = null;

        document.getElementById('divBtn1').hidden = false;
        document.getElementById('divBtn2').hidden = true;

    }
}

function excluirArtista(){

    let iArtista = parseInt(document.getElementById('iIndice').value);
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let listaAux = [];

    for(let i = 0 ; i<listaArtistas.length ; i++){

        if(i != iArtista){

            listaAux.push(listaArtistas[i]);
        }
    }

    localStorage.setItem('listaArtistas' , JSON.stringify(listaAux));

    document.getElementById('divBtn1').hidden = true;
    document.getElementById('divBtn2').hidden = false;
}

function validArtista(){
        
    nome = document.getElementById('iNome').value;

    let valid = true;

    while(nome.includes('  ')){

        nome = nome.replace('  ' , ' ');
    }

    nome = nome.trim();

    if(nome == null || nome == ''){

        valid = false;

        inputVazia('pNome' , 'nome do artista' , 'm');
    }

    return valid;
}

function validPais(){

    pais = document.getElementById('iPaises').value;

    let valid = true;

    if(pais == ''){

        inputVazia('pPaises' , 'país' , 'm');

        valid = false;
    }

    return valid;
}

function validEstiloMusical(){

    return true;

}

function cadastrarSingle(){

    let s = new Single();

    let nomeAux = validInput('iSingle' , 'pSingle' , 'single' , 'm');
    let lancamentoAux = validLancamento('iSLancamento' , 'pSLancamento');
    let srcAux = validSrc('iSrcSingle' , 'pSrcSingle');

    if(nomeAux && lancamentoAux && srcAux){

        s.nome = document.getElementById('iSingle').value;
        s.lancamento = document.getElementById('iSLancamento').value;
        s.src = document.getElementById('iSrcSingle').value;
        s.reproducoes = 0;

        let valid = true;

        let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

        let iArtista = parseInt(document.getElementById('iListaArtistas').value);

        for(let i = 0 ; i<listaArtistas[iArtista].singles.length ; i++){

            if(listaArtistas[iArtista].singles[i].nome == s.nome){

                inputInvalida('pSingle' , 'musica' , 'f');

                valid = false;
            }
        }

        if(valid == true){

            listaArtistas[iArtista].singles.push(s);

            console.log(listaArtistas);

            localStorage.setItem('listaArtistas' , JSON.stringify(listaArtistas));

            document.getElementById('iSingle').value = null;
            document.getElementById('iSLancamento').value = null;
            document.getElementById('iSrcSingle').value = null;
        }
    }
}

function localizarSingle(){

    let iArtista = document.getElementById('iListaArtistas').value;
    let singleLoc = document.getElementById('inputLoc').value;
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    
    if(listaArtistas == null){

        listaArtistas = [];

        alert('Nenhum artista encontrado.');

    }else{

        let valid = false;

        for(let i = 0 ; i<listaArtistas[iArtista].singles.length ; i++){

            if(listaArtistas[iArtista].singles[i].nome == singleLoc){

                console.log(listaArtistas[iArtista].singles[i].src);

                document.getElementById('iIndice').value = i;
                document.getElementById('iSingle').value = listaArtistas[iArtista].singles[i].nome;
                document.getElementById('iSLancamento').value = listaArtistas[iArtista].singles[i].lancamento;
                document.getElementById('iSrcSingle').value = listaArtistas[iArtista].singles[i].src;

                valid = true;

                break;
            }
        }

        if(valid == false){

            alert('Musica não encontrada.');

        }else{

            document.getElementById('inputLoc').value = null;
            document.getElementById('popUpLoc').hidden = true;
            document.getElementById('divTransparente').hidden = true;
            document.getElementById('divBtn1').hidden = true;
            document.getElementById('divBtn2').hidden = false;
        }
    }
}

function editarSingle(){

    let s = new Single();

    let nomeAux = validInput('iSingle' , 'pSingle' , 'single' , 'm');
    let lancamentoAux = validLancamento('iSLancamento' , 'pSLancamento');
    let srcAux = validSrc('iSrcSingle' , 'pSrcSingle');

    if(nomeAux && lancamentoAux && srcAux){

        s.nome = document.getElementById('iSingle').value;
        s.lancamento = document.getElementById('iSLancamento').value;
        s.src = document.getElementById('iSrcSingle').value;

        let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
        let iListaArtista = parseInt(document.getElementById('iListaArtistas').value);
        let iSingle = parseInt(document.getElementById('iIndice').value);

        listaArtistas[iListaArtista].singles[iSingle].nome = s.nome;
        listaArtistas[iListaArtista].singles[iSingle].lancamento = s.lancamento;
        listaArtistas[iListaArtista].singles[iSingle].src = s.src;

        document.getElementById('divBtn1').hidden = false;
        document.getElementById('divBtn2').hidden = true;
    }
}

function excluirSingle(){

    let iListaArtista = parseInt(document.getElementById('iListaArtistas').value);
    let iSingle = parseInt(document.getElementById('iIndice').value);
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let listaAux = [];

    for(let i = 0 ; i<listaArtistas[iListaArtista].singles.length ; i++){

        if(i != iSingle){

            listaAux.push(listaArtistas[iListaArtista].singles[i]);
        }
    }

    listaArtistas[iListaArtista].singles = [];

    for(let i = 0 ; i<listaAux.length ; i++){

        listaArtistas[iListaArtista].singles.push(listaAux);
    }

    console.log(listaArtistas[iListaArtista]);

    localStorage.setItem('listaArtistas' , JSON.stringify(listaArtistas));

    document.getElementById('iSingle').value = null;
    document.getElementById('iSLancamento').value = null;
    document.getElementById('iSrcSingle').value = null;

    document.getElementById('divBtn1').hidden = false;
    document.getElementById('divBtn2').hidden = true;
}

function validInput(id , p , n , g){

    nome = document.getElementById(id).value;

    let valid = true;

    nome = nome.trim();

    while(nome.includes('  ')){

        nome = nome.replace('  ',' ');
    }

    if(nome == '' || nome == null){

        valid = false;

        inputVazia(p , n , g);
    }

    return valid;
}

function validLancamento(id , p){

    lancamento = document.getElementById(id).value;

    let valid = false;

    if(lancamento != null && lancamento != ''){

        valid = true;

    }else{

        inputVazia(p , 'ano de lançamento' , 'm');
    }
    return valid;
}

function validSrc(id , p){

    src = document.getElementById(id).value;

    let valid = true;

    src = src.trim();

    while(src.includes(' ')){

        src = src.replace(' ','');
    }

    if(src == '' || src == null){

        valid = false;

        inputVazia(p , 'caminho' , 'm');
    }

    return valid;
}

function cadastrarAlbum(){

    let alb = new Album();

    let nomeAux = validInput('iAlbum' , 'pAlbum' , 'álbum' , 'm');
    let lancamentoAux = validLancamento('iALancamento' , 'pALancamento');
    let capaAux = validSrc('iCapa' , 'pCapa');

    if(nomeAux && lancamentoAux && capaAux){

        alb.nome = document.getElementById('iAlbum').value;
        alb.lancamento = document.getElementById('iALancamento').value;
        alb.capa = document.getElementById('iCapa').value;
        alb.musicas = JSON.parse(localStorage.getItem('listaMusicas'));

        if(alb.musicas.length > 2){

            let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

            let iArtista = parseInt(document.getElementById('iListaArtistas').value);

            listaArtistas[iArtista].albuns.push(alb);

            console.log(listaArtistas);

            listaArtistas[iArtista].albuns = ordemNumerica(listaArtistas[iArtista].albuns);

            console.log(listaArtistas);

            localStorage.setItem('listaArtistas', JSON.stringify(listaArtistas));
    
            document.getElementById('iAlbum').value = null;
            document.getElementById('iALancamento').value = null;
            document.getElementById('iCapa').value = null;

            document.getElementById('iTbody').innerHTML = null;

            localStorage.setItem('listaMusicas' , null);

        }else{

            alert('O álbum deve ter mais que duas músicas.');
        }
    }
}

function localizarAlbum(){

    let iArtista = document.getElementById('iListaArtistas').value;
    let albumLoc = document.getElementById('inputLoc').value;
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let listaMusicas = JSON.parse(localStorage.getItem('listaMusicas'));
    
    if(listaArtistas == null){

        listaArtistas = [];

        alert('Nenhum artista encontrado.');

    }else{

        let valid = false;

        for(let i = 0 ; i<listaArtistas[iArtista].albuns.length ; i++){

            if(listaArtistas[iArtista].albuns[i].nome == albumLoc){

                document.getElementById('iIndice').value = i;
                document.getElementById('iAlbum').value = listaArtistas[iArtista].albuns[i].nome;
                document.getElementById('iALancamento').value = listaArtistas[iArtista].albuns[i].lancamento;
                document.getElementById('iCapa').value = null;

                listaMusicas = listaArtistas[iArtista].albuns[i].musicas;

                for(let i = 0 ; i<listaMusicas.length ; i++){
            
                    document.getElementById('iTbody').innerHTML += '<tr><td>'+(i+1)+'</td><td>'+listaMusicas[i].nome+'</td><td>'+listaMusicas[i].src+'</td></tr>';
                }

                localStorage.setItem('listaMusicas' , JSON.stringify(listaMusicas));

                valid = true;

                break;
            }
        }

        if(valid == false){

            alert('Musica não encontrada.');

        }else{

            document.getElementById('inputLoc').value = null;
            document.getElementById('popUpLoc').hidden = true;
            document.getElementById('divTransparente').hidden = true;
            document.getElementById('divBtn1').hidden = true;
            document.getElementById('divBtn2').hidden = false;
        }
    }
}

function editarAlbum(){

    let alb = new Album();

    let nomeAux = validInput('iAlbum' , 'pAlbum' , 'álbum' , 'm');
    let lancamentoAux = validLancamento('iALancamento' , 'pALancamento');
    let capaAux = validSrc('iCapa' , 'pCapa');

    if(nomeAux && lancamentoAux && capaAux){

        alb.nome = document.getElementById('iAlbum').value;
        alb.lancamento = document.getElementById('iALancamento').value;
        alb.capa = document.getElementById('iCapa').value;
        alb.musicas = JSON.parse(localStorage.getItem('listaMusicas'));

        if(alb.musicas.length > 2){

            let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
            let iArtista = parseInt(document.getElementById('iListaArtistas').value);
            let iAlbum = parseInt(document.getElementById('iIndice').value);

            listaArtistas[iArtista].albuns[iAlbum] = alb;

            listaArtistas[iArtista].albuns = ordemNumerica(listaArtistas[iArtista].albuns);

            localStorage.setItem('listaArtistas', JSON.stringify(listaArtistas));
    
            document.getElementById('iAlbum').value = null;
            document.getElementById('iALancamento').value = null;
            document.getElementById('iCapa').value = null;
            document.getElementById('iTbody').innerHTML = '';

            document.getElementById('divBtn1').hidden = false;
            document.getElementById('divBtn2').hidden = true;

        }else{

            alert('O álbum deve ter mais que duas músicas.');
        }
    }      
}

function excluirAlbum(){

    let iListaArtista = parseInt(document.getElementById('iListaArtistas').value);
    let iAlbum = parseInt(document.getElementById('iIndice').value);
    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let listaAux = [];

    for(let i = 0 ; i<listaArtistas[iListaArtista].albuns.length ; i++){

        if(i != iAlbum){

            listaAux.push(listaArtistas[iListaArtista].albuns[i]);
        }
    }

    listaArtistas[iListaArtista].albuns = [];

    for(let i = 0 ; i<listaAux.length ; i++){

        listaArtistas[iListaArtista].albuns.push(listaAux);
    }

    console.log(listaArtistas[iListaArtista]);

    localStorage.setItem('listaArtistas' , JSON.stringify(listaArtistas));

    document.getElementById('iAlbum').value = null;
    document.getElementById('iALancamento').value = null;
    document.getElementById('iCapa').value = null;
    document.getElementById('iTbody').innerHTML = '';
    document.getElementById('divBtn1').hidden = false;
    document.getElementById('divBtn2').hidden = true;
    
}
function verificarLista(){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    if(listaArtistas == null){

        listaArtistas = [];
    }

    let nomeArtista = [];

    for(let i = 0 ; i<listaArtistas.length ; i++){

        nomeArtista.push(listaArtistas[i].nome);
    }

    console.log(listaArtistas);

    document.getElementById('iListaArtistas').innerHTML = '<option value=""></option>';

    let aux = [];

    for(let i = 0 ; i<nomeArtista.length ; i++){

        document.getElementById('iListaArtistas').innerHTML += '<option value="'+i+'">'+nomeArtista[i]+'</option>';

        aux.push(''+i+'');

        console.log(parseInt(aux[i]));
    }

    carregarIndex();
    apagarListaMusicas();
}

function apagarListaMusicas(){

    localStorage.setItem('listaMusicas' , null);
}

function validLista(id , p , n , g){ 

    lista = document.getElementById(id).value;

    if(lista == ""){

        inputVazia(p , n , g);

        document.getElementById('form').hidden = true;

    }else{

        document.getElementById('form').hidden = false;
    }
}

function divAddMusica(){

    document.getElementById('divMusica').hidden = false;

    document.getElementById('divNome').hidden = false;
    document.getElementById('divSrc').hidden = false;

    document.getElementById('btnCadastrarMusica').hidden = false;
    document.getElementById('btnExcluirMusica').hidden = true;
    document.getElementById('btnEditarMusica').hidden = true;
    document.getElementById('btnLocalizarMusica').hidden = true;
}

function divExcluirMusica(){

    document.getElementById('divMusica').hidden = false;

    document.getElementById('divNome').hidden = false;
    document.getElementById('divSrc').hidden = true;

    document.getElementById('btnCadastrarMusica').hidden = true;
    document.getElementById('btnExcluirMusica').hidden = false;
    document.getElementById('btnEditarMusica').hidden = true;
    document.getElementById('btnLocalizarMusica').hidden = true;
}

function divEditarMusica(){

    document.getElementById('divMusica').hidden = false;

    document.getElementById('divNome').hidden = false;
    document.getElementById('divSrc').hidden = true;

    document.getElementById('btnCadastrarMusica').hidden = true;
    document.getElementById('btnExcluirMusica').hidden = true;
    document.getElementById('btnEditarMusica').hidden = true;
    document.getElementById('btnLocalizarMusica').hidden = false;
}

function cadastrarMusica(){

    let m = new Musica();

    let nomeAux = validInput('iMusica' , 'pMusica' , 'música' , 'f');
    let srcAux = validSrc('iSrcMusica' , 'pSrcMusica');

    if(nomeAux && srcAux){

        m.nome = document.getElementById('iMusica').value;
        m.src = document.getElementById('iSrcMusica').value;
        m.reproducoes = 0;

        let listaMusicas = JSON.parse(localStorage.getItem('listaMusicas'));

        if(listaMusicas == null){

            listaMusicas = [];
        }

        listaMusicas.push(m);

        localStorage.setItem('listaMusicas' , JSON.stringify(listaMusicas));

        document.getElementById('iTbody').innerHTML = null;

        for(let i = 0 ; i<listaMusicas.length ; i++){
            
            document.getElementById('iTbody').innerHTML += '<tr><td>'+(i+1)+'</td><td>'+listaMusicas[i].nome+'</td><td>'+listaMusicas[i].src+'</td></tr>';
        }

        document.getElementById('iMusica').value = null;
        document.getElementById('iSrcMusica').value = null;

        document.getElementById('divMusica').hidden = true;

        document.getElementById('divNome').hidden = true;
        document.getElementById('divSrc').hidden = true;

        document.getElementById('btnCadastrarMusica').hidden = true;
    }
}

function excluirMusica(){

    let m = new Musica();

    let nomeAux = validInput('iMusica' , 'pMusica' , 'música' , 'f');

    if(nomeAux){
        
        m.nome = document.getElementById('iMusica').value;

        let listaMusicas = JSON.parse(localStorage.getItem('listaMusicas'));

        let listaAux = [];

        let valid = false;

        for(let i = 0 ; i<listaMusicas.length ; i++){

            if(listaMusicas[i].nome == m.nome){

                valid = true;

            }else{

                listaAux.push(listaMusicas[i]);
            }
        }

        document.getElementById('iTbody').innerHTML = null;

        for(let i = 0 ; i<listaAux.length ; i++){
            
            document.getElementById('iTbody').innerHTML += '<tr><td>'+(i+1)+'</td><td>'+listaAux[i].nome+'</td><td>'+listaAux[i].src+'</td></tr>';
        }

        localStorage.setItem('listaMusicas' , JSON.stringify(listaAux));

        if(valid == false){

            alert('A musica não foi encontrada');

        }else{

            document.getElementById('iMusica').value = null;
            document.getElementById('iSrcMusica').value = null;

            document.getElementById('divMusica').hidden = true;

            document.getElementById('divNome').hidden = true;

            document.getElementById('btnExcluirMusica').hidden = true;
        }
    }
}

function localizarMusica(){

    let m = new Musica();

    let nomeAux = validInput('iMusica' , 'pMusica' , 'música' , 'f');

    if(nomeAux){

        m.nome = document.getElementById('iMusica').value;

        let listaMusicas = JSON.parse(localStorage.getItem('listaMusicas'));

        let iLoc = null;

        for(let i = 0 ; i<listaMusicas.length ; i++){

            if(listaMusicas[i].nome == m.nome){

                iLoc = i;

                break;
            }
        }

        if(iLoc != null){

            document.getElementById('iMusica').value = null;
            document.getElementById('iSrcMusica').value = null;

            document.getElementById('divSrc').hidden = false;

            document.getElementById('btnEditarMusica').hidden = false;
            document.getElementById('btnLocalizarMusica').hidden = true;

            document.getElementById('iLoc').value = iLoc;

        }else{

            alert('A musica não foi encontrada');
        }
    }
}

function editarMusica(){

    let m = new Musica();

    let iLoc = parseInt(document.getElementById('iLoc').value);
    let nomeAux = validInput('iMusica' , 'pMusica' , 'música' , 'f');
    let srcAux = validSrc('iSrcMusica' , 'pSrcMusica');

    if(nomeAux && srcAux){

        m.nome = document.getElementById('iMusica').value;
        m.src = document.getElementById('iSrcMusica').value;

        let listaMusicas = JSON.parse(localStorage.getItem('listaMusicas'));

        listaMusicas[iLoc] = m;

        document.getElementById('iTbody').innerHTML = null;

        for(let i = 0 ; i<listaMusicas.length ; i++){
            
            document.getElementById('iTbody').innerHTML += '<tr><td>'+(i+1)+'</td><td>'+listaMusicas[i].nome+'</td><td>'+listaMusicas[i].src+'</td></tr>';
        }

        document.getElementById('iMusica').value = null;
        document.getElementById('iSrcMusica').value = null;

        localStorage.setItem('listaMusicas' , JSON.stringify(listaMusicas));
        
        document.getElementById('divMusica').hidden = true;

        document.getElementById('divNome').hidden = true;
        document.getElementById('divSrc').hidden = true;
        
        document.getElementById('btnEditarMusica').hidden = true;
    }
}

function addReproducao(iArtista , iMusica , iAlbum){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    if(iAlbum == null){

        if(listaArtistas[iArtista].singles[iMusica].reproducoes == null || listaArtistas[iArtista].singles[iMusica].reproducoes == undefined){

            listaArtistas[iArtista].singles[iMusica].reproducoes == 0;
        }
        listaArtistas[iArtista].singles[iMusica].reproducoes++;

        console.log(listaArtistas[iArtista].singles[iMusica].reproducoes);
    }else{

        if(listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].reproducoes == null || listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].reproducoes == undefined){

            listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].reproducoes == 0;
        }
        listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].reproducoes++;

        console.log(listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].reproducoes);
    }

    localStorage.setItem('listaArtistas' , JSON.stringify(listaArtistas));
}

function listaFavoritos(iArtista , iMusica , iAlbum , indice){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));

    let f = new Favoritos();

    console.log(usuario);

    if(iArtista == null){

        f.artista = usuario.favoritos[iMusica].artista;
        f.musica = usuario.favoritos[iMusica].musica;

    }else{

        f.artista = listaArtistas[iArtista].nome;
        f.iArtista = iArtista;
    
        if(iAlbum == null){
    
            f.musica = listaArtistas[iArtista].singles[iMusica].nome;
            f.src = listaArtistas[iArtista].singles[iMusica].src;
            f.iMusica = iMusica;
            f.iAlbum = null;

        }else{

            f.musica = listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].nome;
            f.src = listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].src;
            f.iMusica = iMusica;
            f.iAlbum = iAlbum;
        }
    }

    if(document.getElementById('musica'+iMusica).innerHTML == 'favoritar'){

        if(usuario == null){

            alert('Por Favor, faça o login para adicionar aos favoritos.');
    
        }else{

            usuario.favoritos.push(f);
    
            localStorage.setItem('usuarioAtual' , JSON.stringify(usuario));
    
            let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'));
    
            for(let i = 0 ; i<listaUsuario.length ; i++){
    
                if(listaUsuario[i].email == usuario.email){
    
                    listaUsuario[i] = usuario;
                }
            }
            localStorage.setItem('listaUsuario' , JSON.stringify(listaUsuario));
    
            if(indice == null){

                document.getElementById('musica'+iMusica).innerHTML = 'desfavoritar';

            }else{

                document.getElementById('musica'+indice).innerHTML = 'desfavoritar';
            }
        }

    }else{
    
        let listaAux = [];
    
        if(usuario.favoritos.length>1){

            for(let i = 0 ; i<usuario.favoritos.length ; i++){
    
                if(usuario.favoritos[i].artista != f.artista || usuario.favoritos[i].musica != f.musica){
        
                    listaAux.push(usuario.favoritos[i]);
                }
            }
        }else{

            listaAux = [];
        }

        usuario.favoritos = listaAux;
    
        for(let i = 0 ; i<listaUsuario.length ; i++){
    
            if(listaUsuario[i].email == usuario.email){
    
                listaUsuario[i] = usuario;
            }
        }
        localStorage.setItem('usuarioAtual' , JSON.stringify(usuario));
        localStorage.setItem('listaUsuario' , JSON.stringify(listaUsuario));
    
        if(indice == null){

            document.getElementById('musica'+iMusica).innerHTML = 'favoritar';

        }else{

            document.getElementById('musica'+indice).innerHTML = 'favoritar';
        }
    }
}

function ordemAlfabetica(lista){

    let aux = null;

    for(let i = 0 ; i<(lista.length-1) ; i++){

        for(let j = i+1 ; j<lista.length ; j++){

            let string1 = lista[i].nome.toLowerCase();
            let string2 = lista[j].nome.toLowerCase();

            if(string1.localeCompare(string2) == 1){

                aux = lista[i];
                lista[i] = lista[j];
                lista[j] = aux;
            }
        }
    }

    return lista;
}

function ordemNumerica(lista){

    let aux = null;

    if(lista.length > 1){

        for(let i = 0 ; i<(lista.length-1) ; i++){

            for(let j = i+1 ; j<lista.length ; j++){
    
                let int1 = parseInt(lista[i].lancamento);
                let int2 = parseInt(lista[j].lancamento);
    
                if(int1 > int2){
    
                    aux = lista[i];
                    lista[i] = lista[j];
                    lista[j] = aux;
                }
            }
        }
    }
    return lista;
}

function carregarIndex(){

    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    if(usuarioAtual == null){

        document.getElementById('divLogin').hidden = false;
        document.getElementById('divCadastrarUsuario').hidden = false;

    }else{

        document.getElementById('pMsg').innerHTML = 'Olá, '+usuarioAtual.nome;
        document.getElementById('divConta').hidden = false;
        document.getElementById('divAdm').hidden = false;
    }
}

function verificarUsuario(){

    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    if(usuarioAtual == null){

        document.getElementById('btnCadastrarUsuario').hidden = false;

    }else{

        document.getElementById('btnEditarUsuario').hidden = false;

        document.getElementById('iNome').value = usuarioAtual.nome;
        document.getElementById('iEmail').value = usuarioAtual.email;
        document.getElementById('iSenha').value = usuarioAtual.senha;
        document.getElementById('iDtNascimento').value = usuarioAtual.nascimento;
        document.getElementById('iGenero').value = usuarioAtual.genero;
    }

    carregarIndex();
}

function abrirDivConta(){

    document.getElementById('divIConta').hidden = false;
    document.getElementById('divIAdm').hidden = true;
    document.getElementById('divTransparente').hidden = false;
}

function abrirDivAdm(){

    document.getElementById('divIConta').hidden = true;
    document.getElementById('divIAdm').hidden = false;
    document.getElementById('divTransparente').hidden = false;
}

function fecharDiv(){

    document.getElementById('divIConta').hidden = true;
    document.getElementById('divIAdm').hidden = true;
    document.getElementById('divTransparente').hidden = true;
}

function msgConfirm(){

    if(document.getElementById('divMsgConfirm').hidden == true){

        document.getElementById('divMsgConfirm').hidden = false;

    }else{

        document.getElementById('divMsgConfirm').hidden = true;
        document.getElementById('divTransparente').hidden = true;
    }
}

function abrirPopUpLoc(){

    document.getElementById('popUpLoc').hidden = false;
    document.getElementById('divTransparente').hidden = false;

}

function fecharPopUp(){

    document.getElementById('popUpLoc').hidden = true;
    document.getElementById('divTransparente').hidden = true;
    document.getElementById('inputLoc').value = null;
}

function sairConta(){

    localStorage.setItem('usuarioAtual' , null);

    window.open('index.html' , '_self');
} 

function abrirEM(em){

    localStorage.setItem('emSelecionado' , em);

    window.open('telaEstiloMusical.html' , '_self');
}

function entrarEM(){

    let em = localStorage.getItem('emSelecionado');
    localStorage.setItem('emSelecionado' , null);

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    console.log(listaArtistas);

    document.getElementById('h1Principal').innerHTML = em.toUpperCase();

    for(let i = 0 ; i<listaArtistas.length ; i++){

        let aux = listaArtistas[i].estiloMusical.toLowerCase();

        if(aux.includes(em)){

            let srcCompleto = '../Projeto Final/imagens/'+listaArtistas[i].foto;

            document.getElementById('mainPrincipal').innerHTML += "<div class='divEMArtista' id='divIndice"+i+"' onclick='abrirTelaArtista("+i+")'><img class='imgEMArtista' src='"+srcCompleto+"'><h2 class='h2EMArtista'>"+listaArtistas[i].nome+"</h2></div>";
        }
    }

    carregarIndex();
}

function abrirTelaArtista(iArtista){

    localStorage.setItem('iArtistaSelecionado' , JSON.stringify(iArtista));

    window.open('telaArtista.html' , '_self');
}

function verificarFavs(artista , musica){

    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    let valid = false;

    for(let i = 0 ; i<usuarioAtual.favoritos.length ; i++){

        if(usuarioAtual.favoritos[i].musica == musica && usuarioAtual.favoritos[i].artista == artista){

            valid = true;
        }
    }

    return valid;
}

function entrarTelaArtista(){

    let iArtista = JSON.parse(localStorage.getItem('iArtistaSelecionado'));
    localStorage.setItem('artistaAtual' , iArtista);
    localStorage.setItem('artistaSelecionado' , null);

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    document.getElementById('h1Principal').innerHTML = listaArtistas[iArtista].nome;

    if(listaArtistas[iArtista].albuns.length > 0){

        let srcCompleto = '../Projeto Final/imagens/'+listaArtistas[iArtista].albuns[0].capa;

        document.getElementById('h3Album').innerHTML = listaArtistas[iArtista].albuns[0].nome;
        document.getElementById('imgAlbum').src = srcCompleto;
        document.getElementById('pAlbum').innerHTML = listaArtistas[iArtista].albuns[0].lancamento;

        localStorage.setItem('iAlbum' , '0');

        document.getElementById('divAlbum').hidden = false;
    }

    if(listaArtistas[iArtista].singles.length > 0){

        let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));

        for(let i = 0 ; i<listaArtistas[iArtista].singles.length ; i++){

            let id = 'single'+i;

            document.getElementById('divSingles').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+iArtista+' , '+i+')"><h3 class="h3Single">'+listaArtistas[iArtista].singles[i].nome+'</h3><p class="pSingle">'+listaArtistas[iArtista].singles[i].lancamento+'</p></div>';

            if(usuario != null){

                let validFav = verificarFavs(listaArtistas[iArtista].nome , listaArtistas[iArtista].singles[i].nome);

                let action = null;
                let botao = null;

                action = 'listaFavoritos('+iArtista+' , '+i+')';

                if(validFav == true){

                    botao = 'desfavoritar';

                }else{

                    botao = 'favoritar';
                }

                document.getElementById('divSingles').innerHTML += '<button class="btnFavorito" id="musica'+i+'" onclick="'+action+'">'+botao+'</button>';
            }

            console.log(document.getElementById('divSingles').innerHTML);
        }

        document.getElementById('divSingles').hidden = false;
    }

    carregarIndex();
}

function proximoAlbum(){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let iArtista = parseInt(localStorage.getItem('artistaAtual'));
    let iAlbum = parseInt(localStorage.getItem('iAlbum'));

    if(listaArtistas[iArtista].albuns.length > iAlbum+1){

        iAlbum++;

        let srcCompleto = '../Projeto Final/imagens/'+listaArtistas[iArtista].albuns[iAlbum].capa;

        document.getElementById('h3Album').innerHTML = listaArtistas[iArtista].albuns[iAlbum].nome;
        document.getElementById('imgAlbum').src = srcCompleto;
        document.getElementById('pAlbum').innerHTML = listaArtistas[iArtista].albuns[iAlbum].lancamento;

        localStorage.setItem('iAlbum' , iAlbum+'');
    }
}

function albumAnterior(){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let iArtista = parseInt(localStorage.getItem('artistaAtual'));
    let iAlbum = parseInt(localStorage.getItem('iAlbum'));

    if(iAlbum>0){

        iAlbum--;

        let srcCompleto = '../Projeto Final/imagens/'+listaArtistas[iArtista].albuns[iAlbum].capa;

        document.getElementById('h3Album').innerHTML = listaArtistas[iArtista].albuns[iAlbum].nome;
        document.getElementById('imgAlbum').src = srcCompleto;
        document.getElementById('pAlbum').innerHTML = listaArtistas[iArtista].albuns[iAlbum].lancamento;

        localStorage.setItem('iAlbum' , iAlbum+'');
    }
}

function reproduzirMusica(iArtista , iMusica , iAlbum){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    let srcCompleto = null;
    let musica = null;
    let artista = null;

    if(iAlbum == null){

        if(iArtista == true){

            srcCompleto = '../Projeto Final/audios/'+usuarioAtual.favoritos[iMusica].src;
            musica = usuarioAtual.favoritos[iMusica].musica;
            artista = usuarioAtual.favoritos[iMusica].artista;

        }else{
         
            srcCompleto = '../Projeto Final/audios/'+listaArtistas[iArtista].singles[iMusica].src;
            musica = listaArtistas[iArtista].singles[iMusica].nome;
            artista = listaArtistas[iArtista].nome;
        }
    }else{

        console.log(listaArtistas);
        console.log(iArtista);
        console.log(iAlbum);
        console.log(iMusica);
        console.log(listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica]);

        srcCompleto = '../Projeto Final/audios/'+listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].src;
        musica = listaArtistas[iArtista].albuns[iAlbum].musicas[iMusica].nome;
        artista = listaArtistas[iArtista].nome;
    }

    addReproducao(iArtista , iMusica , iAlbum);

    document.getElementById('pAudio').innerHTML = artista+' - '+musica;
    document.getElementById('audio').hidden = false;
    document.getElementById('audio').src = srcCompleto;
}

function entrarTelaAlbum(){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let iArtista = parseInt(localStorage.getItem('artistaAtual'));
    let iAlbum = parseInt(localStorage.getItem('iAlbum'));

    let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));

    document.getElementById('h1Principal').innerHTML = listaArtistas[iArtista].albuns[iAlbum].nome;

    for(let i = 0 ; i<listaArtistas[iArtista].albuns[iAlbum].musicas.length ; i++){

        let id = 'div'+i;
        let id2 = 'musica'+i;

        document.getElementById('divMusicas').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+iArtista+' , '+i+' , '+iAlbum+')"><p class="pMusica">'+(i+1)+' | '+listaArtistas[iArtista].albuns[iAlbum].musicas[i].nome+'</p></div>';

        if(usuario != null){
            
            let validFav = verificarFavs(listaArtistas[iArtista].nome , listaArtistas[iArtista].albuns[iAlbum].musicas[i].nome);

            let action = null;
            let botao = null;

            action = 'listaFavoritos('+iArtista+' , '+i+' , '+iAlbum+')';

            if(validFav == true){

                botao = 'desfavoritar';

            }else{

                botao = 'favoritar';
            }

            document.getElementById('divMusicas').innerHTML += '<button class="btnFavorito" id="'+id2+'" onclick="'+action+'">'+botao+'</button>';
        }
        
    }

    carregarIndex();
}

function entrarTelaFavoritos(){

    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));

    for(let i = 0 ; i<usuarioAtual.favoritos.length ; i++){

        let id = 'div'+i;
        let id2 = 'musica'+i;

        document.getElementById('divMusicas').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+usuarioAtual.favoritos[i].iArtista+' , '+usuarioAtual.favoritos[i].iMusica+' , '+usuarioAtual.favoritos[i].iAlbum+')"><h3 class="h3Single">'+usuarioAtual.favoritos[i].musica+'</h3><p class="pSingle">'+usuarioAtual.favoritos[i].artista+'</p></div>';
        document.getElementById('divMusicas').innerHTML += '<button class="btnFavorito" id="'+id2+'" onclick="retirarDaLista('+i+' , '+id+' , '+id2+')">desfavoritar</button>';
    }
    carregarIndex();
}

function retirarDaLista(iMusica , id , id2){

    id.hidden = true;
    id2.hidden = true;

    listaFavoritos(null , iMusica);
}

function maisOuvidas(){

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));
    let listaMusicas = [];

    console.log(listaArtistas);

    if(listaArtistas == null){

        listaArtistas = [];

    }else{

        for(let i = 0 ; i<listaArtistas.length ; i++){

            for(let j = 0 ; j<listaArtistas[i].albuns.length ; j++){

                for(let k = 0 ; k<listaArtistas[i].albuns[j].musicas.length ; k++){

                    let t = new Todas();

                    t.artista =  listaArtistas[i].nome;
                    t.musica = listaArtistas[i].albuns[j].musicas[k].nome;
                    t.src = listaArtistas[i].albuns[j].musicas[k].src;
                    t.iArtista = i;
                    t.iAlbum = j;
                    t.iMusica = k;
                    t.reproducoes = listaArtistas[i].albuns[j].musicas[k].reproducoes;

                    console.log(t);

                    listaMusicas.push(t);
                }
            }

            for(let j = 0 ; j<listaArtistas[i].singles.length ; j++){

                let t = new Todas();

                t.artista =  listaArtistas[i].nome;
                t.musica = listaArtistas[i].singles[j].nome;
                t.src = listaArtistas[i].singles[j].src;
                t.iArtista = i;
                t.iAlbum = null;
                t.iMusica = j;
                t.reproducoes = listaArtistas[i].singles[j].reproducoes;

                console.log(t);

                listaMusicas.push(t);
            }
        }
    }
    
    let aux = null;

    for(let i = 0 ; i<listaMusicas.length-1 ; i++){

        for(let j = i+1 ; j<listaMusicas.length ; j++){

            if((listaMusicas[j].reproducoes)>(listaMusicas[i].reproducoes)){

                aux = listaMusicas[i];
                listaMusicas[i] = listaMusicas[j];
                listaMusicas[j] = aux;
            }
        }
    }
    return listaMusicas;
}

function entrarMaisOuvidas(){

    let listaMusicas = maisOuvidas();

    console.log(listaMusicas);

    let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));

    for(let i = 0 ; i<10 ; i++){

        let id = 'div'+i;
        let id2 = 'musica'+i;

        document.getElementById('divMusicas').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+listaMusicas[i].iArtista+' , '+listaMusicas[i].iMusica+' , '+listaMusicas[i].iAlbum+')"><h3 class="h3Single">'+listaMusicas[i].musica+'</h3><p class="pSingle">'+listaMusicas[i].artista+'</p></div>';

        if(usuario != null){

            let validFav = verificarFavs(listaMusicas[i].artista , listaMusicas[i].musica);

            let action = null;
            let botao = null;

            action = 'listaFavoritos('+listaMusicas[i].iArtista+' , '+listaMusicas[i].iMusica+' , '+listaMusicas[i].iAlbum+' , '+i+')';

            if(validFav == true){

                botao = 'desfavoritar';

            }else{

                botao = 'favoritar';
            }

            document.getElementById('divMusicas').innerHTML += '<button class="btnFavorito" id="'+id2+'" onclick="'+action+'">'+botao+'</button>';
        }
    }
    carregarIndex();
}

function abrirAlbum(iArtista , iAlbum){

    localStorage.setItem('artistaAtual' , iArtista)
    localStorage.setItem('iAlbum' , iAlbum);

    window.open('telaAlbum.html' , '_self');
}

function pesquisar(){

    document.getElementById('divArtistas').innerHTML = '<div class="divH2"><h2 class="h2Interna">Artistas/Bandas:</h2></div>';
    document.getElementById('divAlbuns').innerHTML = '<div class="divH2"><h2 class="h2Interna">Álbuns:</h2></div>';
    document.getElementById('divMusicas').innerHTML = '<div class="divH2"><h2 class="h2Interna">Musicas:</h2></div>';

    document.getElementById('divArtistas').hidden = true;
    document.getElementById('divAlbuns').hidden = true;
    document.getElementById('divMusicas').hidden = true;

    let pesquisa = document.getElementById('pesquisar').value;

    let usuario = JSON.parse(localStorage.getItem('usuarioAtual'));

    let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas'));

    if(listaArtistas.length > 0){

        document.getElementById('h1Principal').innerHTML = 'Pesquisa';
        document.getElementById('divPesquisa').hidden = false;
        document.getElementById('mainPrincipal').hidden = true;

        console.log(pesquisa);

        for(let i = 0 ; i<listaArtistas.length ; i++){

            if(listaArtistas[i].nome.includes(pesquisa)){

                let srcCompleto = '../Projeto Final/imagens/'+listaArtistas[i].foto;

                document.getElementById('divArtistas').innerHTML += "<div class='divEMArtista' id='artista"+i+"' onclick='abrirTelaArtista("+i+")'><img class='imgEMArtista' src='"+srcCompleto+"'><h2 class='h2EMArtista'>"+listaArtistas[i].nome+"</h2></div>";
                document.getElementById('divArtistas').hidden = false;
            }

            if(listaArtistas[i].albuns.length > 0){

                for(let j = 0 ; j<listaArtistas[i].albuns.length ; j++){

                    if(listaArtistas[i].albuns[j].nome.includes(pesquisa)){

                        document.getElementById('divAlbuns').innerHTML += '<div class="divSingleInterno" id="album'+i+'" onclick="abrirAlbum('+i+' ,'+j+')"><h3 class="h3Single">'+listaArtistas[i].albuns[j].nome+' | '+listaArtistas[i].albuns[j].lancamento+'</h3><p class="pSingle">'+listaArtistas[i].nome+'</p></div>';
                        document.getElementById('divAlbuns').hidden = false;
                    }

                    if(listaArtistas[i].albuns[j].musicas.length > 0){

                        for(let k = 0 ; k<listaArtistas[i].albuns[j].musicas.length ; k++){

                            if(listaArtistas[i].albuns[j].musicas[k].nome.includes(pesquisa)){

                                let id = 'div'+k;
                                let id2 = 'musica'+k;
                            
                                document.getElementById('divMusicas').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+i+' , '+k+' , '+j+')"><p class="pMusica">'+listaArtistas[i].albuns[j].musicas[k].nome+'</p></div>';

                                if(usuario != null){

                                    let validFav = verificarFavs(listaArtistas[i].nome , listaArtistas[i].albuns[j].musicas[k].nome);

                                    let action = null;
                                    let botao = null;

                                    action = 'listaFavoritos('+i+' , '+k+' , '+j+')';

                                    if(validFav == true){
                                
                                        botao = 'desfavoritar';
                            
                                    }else{
                                
                                        botao = 'favoritar';
                                    } 
                                    document.getElementById('divMusicas').innerHTML += '<button class="btnFavorito" id="'+id2+'" onclick="'+action+'">'+botao+'</button>';
                                }
                            
                                document.getElementById('divMusicas').hidden = false;
                            }
                        }
                    }
                }
            }
            if(listaArtistas[i].singles.length > 0){

                for(let j = 0 ; j<listaArtistas[i].singles.length ; j++){

                    if(listaArtistas[i].singles[j].nome.includes(pesquisa)){

                        let id = 'single'+j;

                        document.getElementById('divMusicas').innerHTML += '<div class="divSingleInterno" id="'+id+'" onclick="reproduzirMusica('+i+' , '+j+')"><h3 class="h3Single">'+listaArtistas[i].singles[j].nome+'</h3><p class="pSingle">'+listaArtistas[i].singles[j].lancamento+'</p></div>';

                        if(usuario != null){

                            let validFav = verificarFavs(listaArtistas[i].nome , listaArtistas[i].singles[j].nome);
                            let action = null;
                            let botao = null;
            
                            action = 'listaFavoritos('+i+' , '+j+')';

                            if(validFav == true){

                                botao = 'desfavoritar';

                            }else{

                                botao = 'favoritar';
                            }

                            document.getElementById('divMusicas').innerHTML += '<button class="btnFavorito" id="musica'+j+'" onclick="'+action+'">'+botao+'</button>';
                        }            
                        document.getElementById('divMusicas').hidden = false;

                    }
                }
            }
        }
    }
}

