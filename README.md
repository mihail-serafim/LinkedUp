# LinkedUp
Since Neil Armstrong's first step on the moon, people have wondered when will we take out first step on Mars. We believe, we will go to Mars in the coming decades.
But what happens when we get there? How will we communicate back home? How will communicate over an average of 63 million kms?

LinkedUp allows us to explore this problem. It's a sandbox where people to play with different communication parameters for signals to and from Mars. 

LinkedUp features an intutive UI paired with live data and NASA handbooks to calulate singal transmission. Built on React and Node (Express), this project was made during the SpaceApps 2020 Hackathon.

## Front-end
The view is broken into 4 major components
 ### The Space Map
  - It features a picture of Earth and Mars. When a message is sent it shows the signals between the two planets and also displays relays (satellites serve as intermediaries for communication).
 ### The Paramesters Dashboard
  - This displays the parameters that users can play with to modify the signal behaviour. It also features Advanced Parameters for advanced options and an about section.
 ### The Message Card
  - This contains a text area where users can type a message and send to Mars (similutate the singal based on the parameters previous defiend)
 ### The Results Card
  - This is where users can see the outcome of the message and parameter options.
 
 | ![frontend1.png](images/frontend1.png) | 
 |:--:| 
 | *Left: The space map   Right: The parameters dashboard* |
 
## Back-end
