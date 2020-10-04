#Python script to parse CSA data about atmospheric pressure from mars
#Retrieved from https://www.asc-csa.gc.ca/eng/open-data/access-the-data.asp

def mars_atm():
    f = open('MET_Phoenix_data.csv','r')

    pressures = []
    for line in f:
        pressures.append(float(line.split(',')[1]))
        
    return sum(pressures)/len(pressures) #average pressure, in Pa 


