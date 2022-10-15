const canvas = document.querySelector(".canvas1"),
    ctx = canvas.getContext("2d"),
    particleArray = [];

let hue = 0;

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("click", (event) => {
    console.log(event, "mouse-events");
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 10 ; i++){
        particleArray.push(new Particle());
    }
});

canvas.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
})


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 +1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ",100%, 50%)";
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const initialization = () => {
    for (let i = 0; i < 100; i++){
        particleArray.push(new Particle());
    }
}

const handleParticle = () => {
    for(let i = 0; i< particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray[i].size <= 0.3){
            particleArray.splice(i ,1);
            i--;
            console.log(particleArray.length);
        }
    }
}

initialization();
console.log(particleArray);

const animate = () => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++; //change this to change speed at which the colors switch
    requestAnimationFrame(animate)
}

animate();