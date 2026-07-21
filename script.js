const reels = document.querySelectorAll('.reel')
const spin = document.getElementById('spin')
const reset = document.getElementById('reset')
const score = document.getElementById('score')
const output = document.getElementById('log')

function resetreel() {
    for (let i=0; i<(reels.length);i++) {
        reels[i].textContent = 0
    }
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
/* check if balance is more than 50 and  if  yes then continue animation */
document.addEventListener('click', async(e) => {
    if (e.target == spin && score.value > 50) {
        spin.disabled = true /* can't press spin while animation is going on */
        resetreel()
        for (let i=0;i<reels.length;i++) {
            for (let j=0;j<10;j++) {
            await wait(70)
                reels[i].textContent = String(Math.floor(Math.random() * 9)) /* random number generator */
            }
        }
        /*check for match  */
        if (reels[0].textContent == reels[1].textContent && reels[1].textContent == reels[2].textContent) {
        /* win context */
            score.value = Number(score.value) + 100
            output.value='You Win!!!'
            
        }
        else {
        /* lose context */
            score.value = Number(score.value) - 50
             output.value='Better Luck Next Time!'
        }
    await wait(2000)
    output.value='Spin to Check Luck....'
    }
    else if(e.target == spin && Number(score.value) <= 50) {
        output.value='You Have Too Little Coins!'
    }
    await wait(500)/* so spin doesnt operate after 2.5 secs */
    spin.disabled = false
  /* Check if reset button is pressed */  
    if (e.target == reset) {
        resetreel()
        score.value = 500
        output.value='Spin to Check Luck....'
    }    
})