
const parent = document.getElementById("parent");


const userName = JSON.parse(localStorage.getItem("highScores")) ; 

const sortUserName = ()=>{
    userName.map(user=> {
        const userTag =  document.createElement("p");
        const userScore = document.createElement("span");
      parent.appendChild(userTag)
      userTag.innerText = user.name
      parent.appendChild(userScore)
      userScore.innerText = user.score

    } )
} 
sortUserName()







