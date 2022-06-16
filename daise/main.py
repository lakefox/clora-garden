import os     #importing os library so as to communicate with the system
import time   #importing time library to make Rpi wait because its too impatient
import RPi.GPIO as GPIO

PIN = 17

# Setup GPIO 37
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(PIN,GPIO.OUT)

# Servo pins
GPIO.setup(PIN,GPIO.OUT) # LEFT

# Set a 50 hz PWM
pwm23 = GPIO.PWM(PIN, 50)
pwm23.start(0)

def servo(angle):
    print("moving")
    # 0-180 (the 18 + 2 comes from https://www.instructables.com/Servo-Motor-Control-With-Raspberry-Pi/)
    duty = angle / 18 + 2

    GPIO.output(PIN, True)
    pwm23.ChangeDutyCycle(duty)
    time.sleep(1)
    GPIO.output(PIN, False)
    pwm23.ChangeDutyCycle(0)

while True:
    deg = input("Input: ")
    servo(int(deg))

GPIO.cleanup()
