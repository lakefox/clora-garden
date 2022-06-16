#!/usr/bin/python3
import RPi.GPIO as GPIO
import pigpio
import time
 
def angle(ang):
    pwm.set_servo_pulsewidth( servo, 500+(11*ang) )

servo = 23
 
# more info at http://abyz.me.uk/rpi/pigpio/python.html#set_servo_pulsewidth
 
pwm = pigpio.pi() 
pwm.set_mode(servo, pigpio.OUTPUT)
 
pwm.set_PWM_frequency( servo, 50 )
 
print( "0 deg" )
angle(0)
time.sleep(3)

print( "80 deg" )
angle(80)
time.sleep(3)
 
print( "180 deg" )
angle(180)
time.sleep(3)# turning off servo

pwm.set_PWM_dutycycle(servo, 0)
pwm.set_PWM_frequency( servo, 0 )
