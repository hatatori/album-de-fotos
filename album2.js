class Move{
  constructor(div,win){
    this.div = div
    this.img = div.querySelector("img")
    
    this.img.style.position="absolute"
    this.img.style.inset = "0px 0px 0px 0px"
    this.img.style.margin = "auto"
    this.x = 0
    this.y = 0
    this.z = 1


    this.img.addEventListener("mousemove",(e)=>{
      if(e.buttons)
        this.addPos(e.movementX*3,e.movementY*-1*3)
    })
    
    this.div.addEventListener("wheel",(e)=>{
      this.z += ((e.deltaY < 0) ? 0.1 : -0.1)
      this.zoom = this.z
    })

    window.addEventListener('keyup',e=>{
      if(e.key == "Escape"){
        this.off()
      }
    })

    this.img.addEventListener("mousedown",(e)=>{
      e.stopPropagation()
      e.preventDefault()
    })

    this.div.addEventListener("mousedown",(e)=>{
      this.off()
    })

    if(win != 1)
      this.off()

  }

  set link(url){
    this.img.src = url
  }

  on(){ 
    this.div.style.display = "block" 
    document.body.style.overflow = "hidden"
  }
  off(){ 
    this.div.style.display = "none" 
    document.body.style.overflow = "auto"
    this.resetPos()
  }

  resetPos(){
    this.img.style.inset = `0px 0px 0px 0px`
    this.zoom = 1
    this.x = 0
    this.y = 0
    this.z = 1
  }

  addPos(x,y){
    this.x += x
    this.y += y
    this.img.style.inset = `0px 0px ${this.y}px ${this.x}px`
  }

  set zoom(z){
    this.z = z
    this.img.style.transform = `scale(${this.z})`
    console.log(z)
  }
  
}

const mov_janela = new Move(square)

for(i of document.querySelectorAll("*[real]")){
  i.addEventListener('click',e=>{
    mov_janela.link = e.target.getAttribute('real')
    mov_janela.on()
  })
}