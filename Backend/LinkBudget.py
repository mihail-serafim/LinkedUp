import math
from constants import *

class LinkBudget():
    def __init__(self):
        self.params = {
            "time" : {
                "year": 2000,
                "month": 12,
                "day": 13
            },
            "noise" : {
                "rx_nf": 10 #dB
            },
            "data" : {
                "framing_data_per_packet" : 8, #bytes
                "packet_size" : 1024, #bytes
                "ber" : 0.00001, #errors/bit
                "nominal_bitrate" : 10000000, #bits/second
            },
            "earth_air" : {
                "rel_humidity": 70, #percent
                "temp": 25, # degrees Celsius
                "pressure": 760, #hPa
                "rain" : True, #yes/no
                "clouds" : True #yes/no
            },
            "mars_air" : {
                "rel_humidity": 70, #percent
                "temp": 25, # degrees Celsius
                "pressure": 760, #hPa
                "rain" : False, #yes/no
                "clouds" : False #yes/no
            },
            "carrier" : {
                "bandwidth" : 0.02, #GHz 
                "frequency" : 10 #GHz(must be between 6 and 12)
            },
            "tx" : {
                "tx_out_db" : 15, #dB
                "tx_gain" : 10 #dB
            },
            "rx" : {
                "eff_diameter" : 1, # OUTPUT - metres
                "pointing_error" : 0.5, #degrees
                "rx_gain" : 40 #dB
            },
            "relay_tx" : {
                "tx_out_db" : 12, #dB
                "tx_gain" : 12 #dB
            }
        }

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
        noise_temp = t_ref*(10 ** (rx_nf/10) -1)
        return(k * noise_temp * self.params["carrier"]["bandwidth"])

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

    def rx_pointing_loss(self, frequency, rx_gain):
        wavelength = frequency / c
        eff_diameter = math.sqrt(10*(rx_gain/10)/0.75)*wavelength/math.pi

        half_power_beamwidth = 70*wavelength/eff_diameter

        self.params["rx"]["eff_diameter"] = eff_diameter
        
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

    def earth_gas_losses(self, temp, rel_humidity, frequency, pressure):
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
        if clouds:
            return 0.4
        else:
            return 0

    def fspl(self, distance, frequency):
        return(20*math.log(distance) + 20*math.log(frequency) + 92.45)

    def path_losses(self):
        frequency = self.params["carrier"]["frequency"]
        clouds = self.params["earth_air"]["clouds"]
        rain = self.params["earth_air"]["rain"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        temp = self.params["earth_air"]["temp"]
        pressure = self.params["earth_air"]["pressure"]

        distance = self.dist_mars(2000, 12, 1)
        fspl = self.fspl(distance, frequency)
        cloud_fade = self.cloud_fade(clouds)
        rain_fade = self.rain_fade(rain)
        earth_gas_losses = self.earth_gas_losses(temp, rel_humidity, frequency, pressure)

        return(distance + fspl + cloud_fade + rain_fade + earth_gas_losses)

    def evaluate_link_margin(self):
        tx_out_db = self.params["tx"]["tx_out_db"]
        tx_gain = self.params["tx"]["tx_gain"]
        rx_gain = self.params["rx"]["rx_gain"]

        bitrate = self.params["data"]["nominal_bitrate"]
        ber = self.params["data"]["ber"]
        packet_size = self.params["data"]["packet_size"]
        framing_size = self.params["data"]["framing_data_per_packet"]

        frequency = self.params["carrier"]["frequency"]
        bandwidth = self.params["carrier"]["bandwidth"]

        temp = self.params["earth_air"]["temp"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        pressure = self.params["earth_air"]["pressure"]

        rx_nf = self.params["noise"]["rx_nf"]

        carry_through = tx_out_db + tx_gain #terminal EIRP
        print("EIRP: "carry_through)
        carry_through -= self.path_losses()  #received isotropic power
        print("Isotropic Power: "carry_through)
        carry_through += rx_gain
        print("asdf: "carry_through)
        carry_through -= self.rx_pointing_loss(frequency, rx_gain) #received signal power
        print("Signal Power: "carry_through)

        carry_through -= self.evaluate_noise_power(rx_nf) #received CNR
        print("Received CNR: "carry_through)
        carry_through -= 10*math.log(frequency/bandwidth) #received Eb/N0
        print("Eb/N0: "carry_through)

        return(carry_through - self.evaluate_required_ebn0(self.params["data"]["ber"])) #link margin

lb = LinkBudget()
print(lb.evaluate_link_margin())