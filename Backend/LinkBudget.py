import math
import json
import getweather
import numpy
import sys
from constants import *

class LinkBudget():
    def __init__(self, params_from_site):
        j = json.loads(params_from_site)

        self.location = j.get("location", "Toronto, Canada")
        weather = getweather.getweather(self.location)

        self.date = j.get("date","2020-10-01").strip("-")

        self.params = {
            "time" : { # TODO - implement from json
                "year": self.date[0],
                "month": self.date[1],
                "day": self.date[2]
            },
            "noise" : {
                "e_m_rx_nf": j.get("noiseFigureE",6), #dB
                "m_e_rx_nf": j.get("noiseFigureM",6)
            },
            "data" : {
                "framing_data_per_packet" : 8, #bytes
                "packet_size" : 1024, #bytes
                "ber" : 0.00001, #errors/bit
                "nominal_bitrate" : 10000000, #bits/second
                "file_size" : 1000000 #bits
            },
            "earth_air" : {
                "rel_humidity": weather[0], #percent
                "temp": weather[1], # degrees Celsius
                "pressure": weather[2], #hPa
                "rain" : weather[4], #yes/no
                "clouds" : weather [3] #yes/no
            },
            "mars_air" : {
                "rel_humidity": 70, #percent
                "temp": -60, # degrees Celsius
                "pressure": self.mars_atm(), #hPa
                "rain" : False, #yes/no
                "clouds" : 0 #yes/no
            },
            "carrier" : {
                "bandwidth" : j.get("frequency",0.02), #GHz 
                "frequency" : j.get("frequency",10), #GHz(must be between 6 and 12)
                "relays" : 2
            },
            "e_m_tx" : {
                "tx_out_w" : j.get("transmitterPowerE",100), 
                "efficiency" : j.get("transmitterEffE",12),
                "tx_gain" : j.get("transmitterGainM",10) #dB
            },
            "e_m_rx" : {
                "eff_diameter" : 1, # OUTPUT - metres
                "pointing_error" : j.get("pointingErrorE",0.5), #degrees
                "rx_gain" : j.get("receiverGainE",50) #dB
            },
            "m_e_tx" : {
                "tx_out_w" : j.get("transmitterPowerW",100), 
                "efficiency" : j.get("transmitterEffM",12),
                "tx_gain" : j.get("transmitterGainE", 10) #dB
            },
            "m_e_rx" : {
                "eff_diameter" : 1, # OUTPUT - metres
                "pointing_error" : j.get("pointingErrorM",0.5), #degrees
                "rx_gain" : j.get("receiverGainM",50) #dB
            }
        }
    
    def mars_atm(self):
        try:
            with open('MET_Phoenix_data.csv','r') as f:
                pressures = []
                for line in f:
                    pressures.append(float(line.split(',')[1]))
        except:
            return 6.1

        return sum(pressures)/len(pressures) #average pressure, in Pa 

    def dist_mars(year, month, day, hour=0, minute=0):
        try:
            from skyfield.api import load
        except ModuleNotFoundError:
            return(600)
        data   = load('de421.bsp')
        ts     = load.timescale()
        t      = ts.utc(year, month, day, hour, minute) #(year,month,day,hour,minute,second)

        mars, earth  = data['Mars barycenter'], data['Earth']
        mpos, epos      = mars.at(t).position.km, earth.at(t).position.km
        return math.sqrt(((mpos - epos)**2).sum())

    def update_param(self, label, value):
        self.params["noise"][label] = value

    def evaluate_noise_power(self, rx_nf):
        noise_temp = t_ref*(10 ** (rx_nf/10) - 1)
        #print("noise_temp: ", noise_temp)
        return(math.log(k * noise_temp * self.params["carrier"]["bandwidth"] * 10000000000)*10)

    def evaluate_required_ebn0(self, ber):
        if ber > 0.1:
            return 0
        elif ber > 0.05:
            return 1
        elif ber > 0.03:
            return 2
        elif ber > 0.02:
            return 3
        elif ber > 0.01:
            return 4
        elif ber > 0.005:
            return 5
        elif ber > 0.001:
            return 6
        elif ber > 0.0007:
            return 7
        elif ber > 0.0002:
            return 8
        elif ber > 0.00003:
            return 9
        elif ber > 0.000005:
            return 10
        else:
            return 11 # TODO - catch error rates past 10 eb/no

    def check_bitrate_eff(self, bitrate, ber, packet_size, framing_size):
        try:
            eps = ber * bitrate
            cbps = eps * packet_size
            bitrate_eff = (bitrate - cbps) *  (packet_size - framing_size) / packet_size
            return(bitrate_eff)
        except KeyError as error:
            raise error

    def rx_pointing_loss(self, frequency, rx_gain, direction):
        wavelength = frequency / c
        eff_diameter = math.sqrt(10*(rx_gain/10)/0.75)*wavelength/math.pi

        half_power_beamwidth = 70*wavelength/eff_diameter

        self.params["%s_rx"%direction]["eff_diameter"] = eff_diameter
        
        return(12 * (eff_diameter/half_power_beamwidth)**2)

    def lin_approx_6_12(self, freq, const_bounds):
        slope = (const_bounds[0] - const_bounds[1]) * 6
        return freq*slope + const_bounds[1]

    def abs_humidity(self, temp, rel_humidity, pressure):
        e_w = 6.112 * math.exp(17.62*temp/(243.12 * temp))
        f_p = 1.0016 + 0.00000315*pressure - 0.074/pressure
        e_w_prime = e_w * f_p
        e = e_w_prime * rel_humidity /100
        return(e/(temp + 273) / r) #grams per m^3

        return (a + b*self.abs_humidity(temp, rel_humidity, pressure) + c*temp)

    def gas_losses(self, temp, rel_humidity, frequency, pressure):
        const_bounds = {
            "a": [0.04044, 0.043596],
            "b": [0.0031768, 0.00065086],
            "c": [0.00031470, 0.00019645]
        }
        a = self.lin_approx_6_12(frequency, const_bounds["a"])
        b = self.lin_approx_6_12(frequency, const_bounds["b"])
        c = self.lin_approx_6_12(frequency, const_bounds["c"])

        return (a + b*self.abs_humidity(temp, rel_humidity, pressure) + c*temp)

    def rain_fade(self, rain):
        if rain:
            return 0.3
        else:
            return 0

    def cloud_fade(self, clouds):
        return 0.4 * clouds/100

    def fspl(self, distance, frequency, relays):
        return(20*math.log(distance/(relays+1)) + 20*math.log(frequency) + 92.45)

    def path_losses(self):
        year = self.params["time"]["year"]
        month = self.params["time"]["month"]
        day = self.params["time"]["day"]
        distance = self.dist_mars(year, month, day)
        frequency = self.params["carrier"]["frequency"]
        clouds = self.params["earth_air"]["clouds"]
        rain = self.params["earth_air"]["rain"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        temp = self.params["earth_air"]["temp"]
        pressure = self.params["earth_air"]["pressure"]
        relays = self.params["carrier"]["relays"]

        distance = self.dist_mars(2000, 12, 1)
        fspl = self.fspl(distance, frequency, relays)
        #print("fspl: ",fspl)
        cloud_fade = self.cloud_fade(clouds)
        #print("cloud_fade: ",cloud_fade)
        rain_fade = self.rain_fade(rain)
        #print("rain_fade: ",rain_fade)
        earth_gas_losses = self.gas_losses(temp, rel_humidity, frequency, pressure)
        #print("earth_gas_losses: ",earth_gas_losses)

        mars_rel_humidity = self.params["mars_air"]["rel_humidity"]
        mars_temp = self.params["mars_air"]["temp"]
        mars_pressure = self.params["mars_air"]["pressure"]

        mars_gas_losses = self.gas_losses(mars_temp, mars_rel_humidity, frequency, mars_pressure)

        #print("path_losses: ", (fspl + cloud_fade + rain_fade + earth_gas_losses))

        return(fspl + cloud_fade + rain_fade + earth_gas_losses + mars_gas_losses)

    def evaluate(self, direction):

        year = self.params["time"]["year"]
        month = self.params["time"]["month"]
        day = self.params["time"]["day"]
        distance = self.dist_mars(year, month, day)
        tx_out_w = self.params["%s_tx"%direction]["tx_out_w"]
        efficiency = self.params["%s_tx"%direction]["efficiency"]

        tx_out_db = 10*math.log(tx_out_w * efficiency)

        tx_gain = self.params["%s_tx"%direction]["tx_gain"]
        rx_gain = self.params["%s_rx"%direction]["rx_gain"]

        bitrate = self.params["data"]["nominal_bitrate"]
        ber = self.params["data"]["ber"]
        packet_size = self.params["data"]["packet_size"]
        framing_size = self.params["data"]["framing_data_per_packet"]

        frequency = self.params["carrier"]["frequency"]
        bandwidth = self.params["carrier"]["bandwidth"]

        temp = self.params["earth_air"]["temp"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        pressure = self.params["earth_air"]["pressure"]

        file_size = self.params["data"]["file_size"]

        rx_nf = self.params["noise"]["%s_rx_nf"%(direction)]
        relays = self.params["carrier"]["relays"]

        carry_through = tx_out_db + tx_gain #terminal EIRP
        #print("EIRP: ", carry_through)
        carry_through -= self.path_losses()  #received isotropic power
        #print("Isotropic Power: ", carry_through)
        carry_through += rx_gain
        #print("asdf: ", carry_through)
        carry_through -= self.rx_pointing_loss(frequency, rx_gain, direction) #received signal power
        #print("Signal Power: ", carry_through)

        carry_through -= self.evaluate_noise_power(rx_nf) #received CNR
        #print("noise power: ", self.evaluate_noise_power(rx_nf))
        #print("Received CNR: ", carry_through)
        carry_through -= 10*math.log(frequency/bandwidth) #received Eb/N0
        #print("Eb/N0: ", carry_through)

        margin = carry_through - self.evaluate_required_ebn0(self.params["data"]["ber"]) #link margin

        bitrate_eff = self.check_bitrate_eff(bitrate, ber, packet_size, framing_size)

        time_elapsed = distance * 2 / c + file_size / bitrate_eff

        return(margin, bitrate_eff, time_elapsed, distance)

try:
    lb = LinkBudget(sys.argv[1])
except IndexError:
    lb = LinkBudget("{}")
print("%s %s %s %s" %(lb.evaluate("e_m")))
print("%s %s %s %s" %(lb.evaluate("m_e")))
#print(lb.evaluate_link_margin())