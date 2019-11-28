
estr = "<div id='albumvazio' class='invisible'></div><div class='album-fora'><div class='album-dentro'><button onclick='albumObj.anterior()'><</button><div class='album-foto-dentro'><img src=''></div><button onclick='albumObj.proximo()'>></button><button id='btclose' onclick='albumObj.fecha()'>x</button></div></div>"

estr2 = ".album-fora{width: 100%;height: 100%;background-color: black;background-color: rgba(0,0,0,0.9);display: flex;justify-content: space-between;align-items: center;position: relative;position: fixed;top: 0;left: 0;justify-content: center;display: none;opacity: 0;transition: 0.3s;}.album-dentro{display: flex;justify-content: space-between;max-width: 100%;max-height: 100%;align-items: center;width: 100%;}.album-dentro button{padding: 30;color: white;background-color: transparent;outline: none;border: none;height: 100vh;font-family: monospace;cursor: pointer;}.album-dentro img{max-width: 100%;max-height: 100%;max-height: 90vh;}#btclose{position: absolute;display: flex;padding: 0;justify-content: center;align-items: center;width: 40;height: 40;top: 10;right: 10;width: 40;height: 40;}.invisible{display: none;}"

document.body.innerHTML += estr

stl = document.createElement("style")
stl.innerHTML = estr2
document.head.appendChild(stl)



albumFora = document.querySelector(".album-fora")
t = 200

albumObj = {
	atual:0,
	quantidade:0,
	fora:document.querySelector(".album-fora"),
	el:document.querySelector(".album-foto-dentro img"),
	lista:[],
	carregados:[],
	vai(n){

		this.pasta = this.lista[n].parentElement.parentElement.getAttribute("pasta")

		this.atual = n
		this.el.src = this.lista[n].src
		this.nome = this.lista[n].src.split("/").pop()
		this.el.src = this.pasta+"/"+this.nome
		this.fora.style.display="flex"
		this.el.style.transition=(t/1000)+'s';

		setTimeout(()=>{this.fora.style.opacity=1},t)
	},
	fecha(){
		this.fora.style.opacity=0
		setTimeout(()=>{this.fora.style.display="none"},t)

	},
	proximo(){
		this.el.style.opacity=0

		this.atual += 1
		if(this.atual >= this.lista.length) this.atual = this.lista.length-1;
		setTimeout(()=>{this.vai(this.atual)},t)

		setTimeout(()=>{this.el.style.opacity=1},t)

		this.carrega(this.atual-2)
		this.carrega(this.atual-1)
		this.carrega(this.atual+1)
		this.carrega(this.atual+2)
	},
	anterior(){
		this.el.style.opacity=0
		this.atual -= 1
		if(this.atual <= 0) this.atual = 0;
		setTimeout(()=>{this.vai(this.atual)},t)

		setTimeout(()=>{this.el.style.opacity=1},t)
		this.carrega(this.atual-2)
		this.carrega(this.atual-1)
		this.carrega(this.atual+1)
		this.carrega(this.atual+2)
	},
	carrega(n){
		k = this.carregados
		if(k.indexOf(this.pasta+"/"+this.lista[n].src.split("/").pop()) == -1){
			k.push(this.pasta+"/"+this.lista[n].src.split("/").pop())
			img = new Image()
			img.src = albumObj.lista[n].src
			img.onload=function(){
				albumvazio.appendChild(this)
			}
		}
	}
}

album = document.querySelectorAll(".album img")
imglista = document.querySelectorAll(".album img")
b = 0
for(i of album){
	i.pos = b++
	albumObj.lista.push(i)
	i.onclick=function(e){
		albumObj.pasta = this.parentElement.parentElement.getAttribute("pasta")
		albumObj.vai(this.pos)
	}
	i.parentElement.onclick=function(){
		this.querySelector("img").click()
	}
}
window.onkeyup=function(e){
	if(e.key=="Escape") albumObj.fecha();
	if(e.key=="ArrowLeft") albumObj.anterior();
	if(e.key=="ArrowRight") albumObj.proximo();
}