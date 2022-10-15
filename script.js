const canvas = document.querySelector(".canvas1"),
    ctx = canvas.getContext("2d"),
    particleArray = [];

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
});

canvas.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})


class Particle {
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 +1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = "#b20000";
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
    }
}

initialization();
console.log(particleArray);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    requestAnimationFrame(animate)
}

animate();