import pyowm 
owm = pyowm.OWM('790bfd8c5abb4060a48dce58a4b274c9')

def getweather(citystring):

    citylst = citystring.split(', ')
    #add more cities
    if citylst[1].lower() == 'canada':
        citylst[1] = 'CA'
    
    reg = owm.city_id_registry()
    mgr = owm.weather_manager()
    
    
    locations = reg.locations_for(citylst[0], country=citylst[1])

    lat = float(locations[0].lat)
    lon = float(locations[0].lon)

    one_call = mgr.one_call(lat=lat, lon=lon)
    weather = mgr.weather_at_place(', '.join(citylst)).weather
    weather.pressure['press']

    if weather.rain:
        rain = True
    else:
        rain = False

    #rel_humidity(%),temp(deg C),pressure(Pa),clouds(%),rain(True/False)
    return [one_call.current.humidity, weather.temperature('celsius')['temp'], 100*weather.pressure['press'], weather.clouds, rain]



    
