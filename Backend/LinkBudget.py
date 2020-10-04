import numpy as np
import math
from skyfield.api import load

class LinkBudget():
    def __init__(self):
        self.params = {
            "noise" : {}
            "data" : {
                "framing_data_per_packet" = 8,
                "packet_size" = 1024,
                "ber" = 0.00001,
                "nominal_bitrate" = 10000000,
            }
            "earth_air" : {
                "rel_humidity":
                "temp": 
                "pressure": #
                "rain" : True,
                "clouds" : True
            }
            "carrier" : {
                "bandwidth" : 100,
                "frequency" : 1234
            }
            "tx" : {
                "tx_out_db" : 1234,
                "tx_gain" : 1243
            }
            "rx" : {
                "eff_diameter" : 1,
                "pointing_error" : 1234
                "rx_gain" : 1234
            }
            "relay_tx" : {
                "tx_out_db" : 1234
                "tx_gain" : 1234
            }
        }

    def dist_mars(year, month, day, hour, minute):
        data   = load('de421.bsp')
        ts     = load.timescale()
        t      = ts.utc(year, month, day, hour, minute) #(year,month,day,hour,minute,second)

        mars, earth  = data['Mars barycenter'], data['Earth']
        mpos, epos      = mars.at(t).position.km, earth.at(t).position.km
  
    return np.sqrt(((mpos - epos)**2).sum())

    def update_param(self, label, value):
        self.params["noise"][label] = value

    def evaluate_noise_power(self):
        rx_nf = self.params["noise"]["rx_nf"]
        noise_temp = t_ref*(10 ** (rx_nf/10) -1)
        return(k * noise_temp * self.params["carrier"]["bandwidth"])

    def evaluate_required_ebn0(self):
        ber = self.params["data"]["ber"]

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

    def check_bitrate_eff(self):
        try:
            bitrate = self.params["data"]["nominal_bitrate"]
            ber = self.params["data"]["ber"]
            packet_size = self.params["data"]["packet_size"]
            framing_size = self.params["data"]["framing_data_per_packet"]
            eps = ber * bitrate
            cbps = eps * packet_size
            bitrate_eff = (bitrate - cbps) *  (packet_size - framing_size) / packet_size)
            return(bitrate_eff)
        except KeyError as error:
            raise error

    def rx_pointing_loss(self):
        frequency = self.params["carrier"]["frequency"]
        wavelength = frequency / c
        rx_gain = self.params["rx"]["rx_gain"]

        eff_diameter = math.sqrt(10*(rx_gain/10)/0.75)*wavelength/math.pi

        half_power_beamwidth = 70*wavelength/eff_diameter

        self.params["rx"]["eff_diameter"] = eff_diameter
        
        return(12 * (self.params["rx"]/half_power_beamwidth)^2)

    def lin_approx_6_12(freq, const_bounds):
        slope = (const_bounds[0] - const_bounds[1]) * 6
        return freq*slope + const_bounds[1]

    def abs_humidity(self):
        temp = self.params["earth_air"]["temp"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        pressure = self.params["earth_air"]["rel_humidity"]
        e_w = 6.112 * math.exp(17.62*temp/(243.12 * temp))
        f_p = 1.0016 + 0.00000315*pressure - 0.074/pressure
        e_w_prime = e_w * f_p
        e = e_w_prime * rel_humidity /100
        return(e/(temp + 273) / r) #grams per m^3

    def earth_gas_losses(self):
        temp = self.params["earth_air"]["temp"]
        rel_humidity = self.params["earth_air"]["rel_humidity"]
        frequency = self.params["carrier"]["frequency"]
        const_bounds = {
            "a": [0.04044, 0.043596],
            "b": [0.0031768, 0.00065086],
            "c": [0.00031470, 0.00019645]
        }
        a = lin_approx_6_12(frequency, const_bounds["a"])
        b = lin_approx_6_12(frequency, const_bounds["b"])
        c = lin_approx_6_12(frequency, const_bounds["c"])

        return (a + b*self.abs_humidity() + c*temp)

    def rain_fade(self):
        if self.params["earth_air"]["rain"]:
            return 0.3
        else:
            return 0

    def clouds(self):
        if self.params["earth_air"]["clouds"]:
            return 0.4
        else:
            return 0

    def fspl(self):


    def evaluate_link_margin(self):
        tx_out_db = self.params["tx"]["tx_out_db"]
        tx_gain = self.params["tx"]["tx_gain"]
        rx_gain = self.params["rx"]["rx_gain"]

        frequency = self.params["carrier"]["frequency"]
        bandwidth = self.params["carrier"]["bandwidth"]

        carry_through = tx_out_db + tx_gain #terminal EIRP
        carry_through -= self.path_losses()  #received isotropic power
        carry_through += rx_gain
        carry_through -= rx_pointing_loss() #received signal power

        carry_through -= self.evaluate_noise_power() #received CNR
        carry_through -= 10*math.log(frequency/bandwidth) #received Eb/N0

        return(carry_through - evaluate_required_ebno()) #link margin