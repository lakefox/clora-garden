import gpsd
import time
import RPi.GPIO as GPIO
from time import sleep

# Import SPI library (for hardware SPI) and MCP3008 library.
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008

# Software SPI configuration:
CLK  = 18
MISO = 23
MOSI = 24
CS   = 25
mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

# Analog to Digital Converter activator pin
ADCS = 26

# Amoutn of IR leds you have (max 8)
sensorAmt = 5

# Setup ADC switch pin
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(ADCS, GPIO.OUT)


# Connect to the local gpsd
gpsd.connect()

while True:
    try:
        # Get gps position
        packet = gpsd.get_current()

        # print(packet)
        if int(packet.sats) >= 4:
            print("Locked")
            print(packet)
            # Good GPS signal start the execution loop

            # Read all the ADC channel values in a list.
            valuesRAW = [0]*8
            for i in range(8):
                # The read_adc function will get the value of the specified channel (0-7).
                valuesRAW[i] = mcp.read_adc(i)

            values = valuesRAW[8-sensorAmt:]
            print(values)

            # Check if anything is close to the machine

            close = False
            for i in range(len(values)):
                if values[i] <= 900:
                    close = True
                    break
                else: 
                    close = False
            if not close:
                # Good to follow plan
                print("Good")
            else:
                print("Help!")




    except KeyError:
        pass
    except KeyboardInterrupt:
        quit()
    except StopIteration:
        print("GPSD has terminated")