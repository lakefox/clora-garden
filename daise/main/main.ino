#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Servo.h>

Servo servo1;
Servo servo2;

bool connected = false;
bool rxdData = false;

void setup(void)
{ 
  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP
  // it is a good practice to make sure your code sets wifi mode how you want it.

  // put your setup code here, to run once:
  Serial.begin(115200);
  
  //WiFiManager, Local intialization. Once its business is done, there is no need to keep it around
  WiFiManager wm;

  // reset settings - wipe stored credentials for testing
  // these are stored by the esp library
  //  wm.resetSettings();

  // Automatically connect using saved credentials,
  // if connection fails, it starts an access point with the specified name ( "AutoConnectAP"),
  // if empty will auto generate SSID, if password is blank it will be anonymous AP (wm.autoConnect())
  // then goes into a blocking loop awaiting configuration and will return success result

  bool res;
  // res = wm.autoConnect(); // auto generated AP name from chipid
  res = wm.autoConnect("Clora #"); // anonymous ap
  // res = wm.autoConnect("AutoConnectAP","password"); // password protected ap

  if(!res) {
      Serial.println("Failed to connect");
      // ESP.restart();
  } 
  else {
      //if you get here you have connected to the WiFi    
      Serial.println("connected...");
      Serial.println(ESP.getChipId());
      connected = true;
      servo1.attach(3);
      servo2.attach(5);
  }
}

void loop() 
{
  if (connected && !rxdData) {
    Serial.println("Making Request");
    WiFiClient client;
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin(client,"http://192.168.0.13:8080/bytestream");  //Specify request destination
    int httpCode = http.GET();                                  //Send the request
 
    if (httpCode > 0) { //Check the returning code
 
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);             //Print the response payload
      rxdData = true;
      
    } else {
      Serial.println(httpCode);
    }
 
    http.end();   //Close connection
 
  }
  
  // delay(30000);    //Send a request every 30 seconds
}
