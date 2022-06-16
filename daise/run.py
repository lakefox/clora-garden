# SPDX-FileCopyrightText: 2019 Mikey Sklar for Adafruit Industries
#
# SPDX-License-Identifier: MIT

import time
import board
import digitalio

pin = digitalio.DigitalInOut(board.D17)

pin.direction = digitalio.Direction.OUTPUT

def setStep(w4):
    pin.value = w4

while True:
    amt = input("How many steps: ")
    amt = int(amt)
    for i in range(0,amt):
        pin.value = 0
        time.sleep(20/1000)
        pin.value = 1
        time.sleep(20/1000)
