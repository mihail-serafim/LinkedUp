# LinkedUp
Since Neil Armstrong's first step on the moon, people have wondered when will we take out first step on Mars. We believe, we will go to Mars in the coming decades.
But what happens when we get there? How will we communicate back home? How will communicate over an average of 63 million kms?

LinkedUp allows us to explore this problem. It's a sandbox where people to play with different communication parameters for signals to and from Mars. 

LinkedUp features an intutive UI paired with live data and NASA handbooks to calculate singal transmission. Built on React and Node (Express), this project was made during the SpaceApps 2020 Hackathon.

## Installation 
 - Install [NodeJS](https://nodejs.org/en/download/)
 - Install [ReactJS](https://reactjs.org/docs/getting-started.html)

#### Front End Installation
 - In your command line/terminal:
   - Navigate to ```LinkedUp/3.14heads``` using ```cd```
   - ```npm install```


#### Back End Installation
 - Install [Python](https://www.python.org/downloads/)
 - In your command line/terminal, use the following commands:
 ```
   pip numpy
   pip pyowm
   pip skyfield
```
   - Navigate to ```LinkedUp/Backend``` using ```cd```
     - ```npm install```
####  Running the Tool
 - Navigate to ```LinkedUp/Backend```
   - ```node server.js```
 - Navigate to ```LinkedUp/3.14heads```
   - ```npm start```
 Once you've done all the above steps, the tool will be accessible at [localhost:3000](http://localhost:3000/) 

## Front-end
The view is broken into 4 major components
 #### Space Map
  - Features a picture of Earth and Mars. When a message is sent it shows the signals between the two planets and also displays relays (satellites serve as intermediaries for communication).
 #### Parameters Dashboard
  - This displays the parameters that users can play with to modify the signal behaviour. It also features Advanced Parameters for advanced options and an about section.
 #### Message Card
  - This contains a text area where users can type a message and send to Mars (similutate the singal based on the parameters previous defiend)
 #### Results Card
  - This is where users can see the outcome of the message and parameter options.
 
 | ![frontend1.PNG](images/frontend1.PNG) | 
 |:--:| 
 | *Left: The space map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Right: The parameters dashboard* |
 | ![frontend2.PNG](images/frontend2.PNG) |  
 | *Left: The message card&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Right: The results card* |
 
## Back-end
Our backend relies on Node, Express, and Python. We used node's build-in [child processes](https://nodejs.org/api/child_process.html) to communicate between our python scripts and server.   

## Data
 - LinkUp uses uses data from a variety of APIs and databases; including CSA data.
   - For Mars atmospheric data, we used [Meteorological Station (MET) of the Phoenix Mission](https://www.asc-csa.gc.ca/eng/open-data/access-the-data.asp) | [more data](ftp://ftp.asc-csa.gc.ca/users/OpenData_DonneesOuvertes/pub/MET/)
   - For live Earth atmospheric data, including pressure, humidity, temperature, clouds, and more, we used [pyOWM](https://pyowm.readthedocs.io/en/latest/) (Open Weather Maps)
   - For our link budget calculations, we used equations as given in NASA's "[Handbook for the estimation of microwave propagation effects](https://ntrs.nasa.gov/citations/19820004428)"
   - For planetary positional data, we used [Skyfield api](https://rhodesmill.org/skyfield/)  
## What's Next?
 - Realistic orbital mechanics
   - We'd love to have incorporated more orbital mechanics, including: Rotation of planets on their axis, orbits of planets, orbits of relays, etc.; but unfortunately it wasn't in the scope of our project given the timeframe we had to work on it
 - Streamlined forms
   - Input checking 
   - Restricted values
 - More parameters!
   - In the spirit of the sandbox environment LinkedUp provides, we'd love to allow users even more things to tweak
   - Custom weather
   - Custom atmospheres
   - Individual relay paramers
 



