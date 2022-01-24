function chooseThis(pilih){
    const pilihan=pilih.id
    pilih.classList.toggle('suit')
    const game = new PlayGame(pilihan)
    let hasil=console.log(game.play())
    return hasil
}
function reloadPage(){
    return location.reload()
}
class PlayGame{
    constructor(pilihan1){
        this.pilihanPlayer=pilihan1
        let randomChoose=Math.floor((Math.random()*3)+1)
        if (randomChoose === 1){
            this.pilihanCom="batu"
            let computer=document.getElementById(this.pilihanCom+"2")
            computer.classList.toggle('suit')
        }else if (randomChoose === 2){
            this.pilihanCom="kertas"
            let computer=document.getElementById(this.pilihanCom+"2")
            computer.classList.toggle('suit')
        }else{
            this.pilihanCom="gunting"
            let computer=document.getElementById(this.pilihanCom+"2")
            computer.classList.toggle('suit')
        }
        
    }
    play(){
        let bothChoice=this.pilihanPlayer+this.pilihanCom
        const rubah=document.getElementById("middle")
        switch (bothChoice){
            case "guntingkertas":
                rubah.innerText="Player 1 win";
                rubah.classList.toggle('result')
                break;
            case "guntingbatu":
                rubah.innerText="Com win"
                rubah.classList.toggle('result')
                break;
            case "guntinggunting":
                rubah.innerText="Draw"
                rubah.classList.toggle('result')
                break;
            case "kertaskertas":
                rubah.innerText="Draw"
                rubah.classList.toggle('result')
                break;
            case "kertasgunting":
                rubah.innerText="Com win"
                rubah.classList.toggle('result')
                break;
            case "kertasbatu":
                rubah.innerText="Player 1 win"
                rubah.classList.toggle('result')
                break;
            case "batugunting":
                rubah.innerText="Player 1 win"
                rubah.classList.toggle('result')
                break;
            case "batukertas":
                rubah.innerText="Com win"
                rubah.classList.toggle('result')
                break;
            case "batubatu":
                rubah.innerText="Draw"
                rubah.classList.toggle('result')
        }
        rubah.style.color="white"
        rubah.style.fontSize="250%"
    }
}