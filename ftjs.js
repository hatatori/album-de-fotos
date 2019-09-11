ftimgs = document.querySelectorAll("img")
valor_atual = 0

function ftsetimg(n){
	nome_pasta = ftimgs[n].getAttribute("pasta")
	if(nome_pasta != null){
		ftativa.src = nome_pasta+"/"+ftimgs[n].src.split("/").pop()
		valor_atual = n
	}
}

function ftnext(){ try{ ftsetimg(valor_atual+1) }catch(e){} }
function ftprev(){ try{ftsetimg(valor_atual-1)}catch(e){} }
function fttoggle(){ ftalbum.classList.toggle("ftinvisible") }
ftbtclose.onclick=fttoggle

window.onkeyup=function(e){
	if(e.key == "ArrowRight") ftnext();
	if(e.key == "ArrowLeft") ftprev();
	if(e.key == "Escape") fttoggle()
}

for(i in ftimgs){
	try{
		ftimgs[i].pos = parseInt(i)
		ftimgs[i].onclick=function(e){
			if(this.outerHTML.match(/pasta/g))
				ftsetimg(this.pos)
			fttoggle()
		}
	}catch(e){}
}