document.addEventListener('DOMContentLoaded', () => {
    let storyOngoing = true;
    let storyBeat = 0;

    const messagesDiv = document.getElementById('messages');
    const choicesDiv = document.getElementById('choices');

    function displayMessage(message) {
        messagesDiv.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = message;
        messagesDiv.appendChild(p);
    }

    function clearMessages() {
        messagesDiv.innerHTML = '';
    }

    function clearChoices() {
        choicesDiv.innerHTML = '';
    }

    function displayChoices(choices){
        clearChoices();
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = ()  => {
                try {
                    choice.action();
                } catch (error) {
                    displayMessage('Error: too bad so sad');
                }
            };
            choicesDiv.appendChild(button);
        })
    }

    function handleChoice(choices) {
        if (choices.length === 0){
            throw new Error('No choices available.');
        }
        clearChoices();
        displayChoices(choices);
    }

    function story(beat) {
        clearMessages();
            switch(beat){
                case 0:
                    displayMessage("You are stranded on an abandoned island. What do you do?");
                    handleChoice([
                        {text: "Look for shelter.", action: () => story(1)},
                        {text: 'Look for food.', action: () => story(2)}
                    ])
                    break;
                case 1:
                    displayMessage("You find a tree you can hid under.");
                    handleChoice([
                        {text:'Hide under tree', action: () => story(3)},
                        {text:'Keep looking', action: () => story(4)}
                    ])
                    break;
                case 2:
                    displayMessage("You find some small berries.");
                    handleChoice([
                        {text:'Eat them', action: () => story(5)},
                        {text:'Keep looking', action: () => story(4)}
                    ])
                    break;
                case 3:
                    clearChoices();
                    displayMessage("You hid under the tree. A huge storm comes and the tree falls and squishes you. You lose :(");
                    storyOngoing = false;
                    break;
                case 4:
                    displayMessage("You stubble across a giant castle.");
                    handleChoice([
                        {text:'Cross the moat and enter through the front door.', action: () => story(6)},
                        {text:'Climb through a window.', action: () => story(7)},
                        {text:'Take a nap.', action: () => story(8)}
                    ])
                    break;
                case 5:
                    clearChoices();
                    displayMessage("The berries were poisonous :(");
                    storyOngoing = false;
                    break;
                case 6:
                    clearChoices();
                    displayMessage("The crocodiles in the moat eat you :(.");
                    storyOngoing = false;
                    break;
                case 7:
                    displayMessage("On the other side of the window you find a kitchen full of food.");
                    handleChoice([
                        {text:'Eat now', action: () => story(9)},
                        {text:'Keep exploring', action: () => story(10)}
                    ])
                    break;
                case 8:
                    clearChoices();
                    displayMessage("A huge storm comes and washes you away to sea :( You lose.");
                    storyOngoing = false;
                    break;
                case 9:
                    displayMessage("Yum!")
                    handleChoice([
                        {text:'Eat more.', action: () => story(11)},
                        {text:'Explore the castle', action: () => story(10)}
                    ])
                    break;
                case 10:
                    displayMessage("You come across a tower.");
                    handleChoice([
                        {text:'Climb to the top.', action: () => story(13)},
                        {text:'Keep looking.', action: () => story(8)},
                        {text:'Take a nap.', action: () => story(8)}
                    ])
                    break;
                case 11: 
                    clearChoices();
                    displayMessage("You eat until you become chubby. You can no longer fit through the door. You lose :(");
                    storyOngoing = false;
                    break;
                case 12: 
                    clearChoices();
                    displayMessage("While looking out the window, you fall :( You lose.")
                    break;
                case 13:
                    displayMessage("You see a room at the top with a window and a cell phone.");
                    handleChoice([
                        {text:'You look out the window.', action: () => story(12)},
                        {text:'You use the cell phone', action: () => story(15)}
                    ])
                    break;
                case 14: 
                    clearChoices();
                    displayMessage("You forget about all your troubles and play fortnite for the rest of your life. You win!");
                    storyOngoing = false;
                    break;
                case 15: 
                    displayMessage("The phone has power.")
                    handleChoice([
                        {text:'Call your mommy', action: () => story(16)},
                        {text:'Call a helicopter', action: () => story(17)},
                        {text:'Play fortnite', action: () => story(14)}
                    ])
                    break;
                case 16: 
                    clearChoices();
                    displayMessage("Your mother doesn't believe you. You lose.");
                    storyOngoing = false;
                    break;
                case 17:
                    clearChoices();
                    displayMessage("The helicopter comes and saves you. You win!");
                    storyOngoing = false;
                    break;
                default:
                    throw new Error('Invalid story beat');
        }
    }


    displayMessage("Welcome to Choose Your Own Adventure! See how long you can last!");
    story(storyBeat);

});