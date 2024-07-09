#!/usr/bin/python3

import requests
import datetime

jsonLogin = { "login" : "admin", "password" : "admin" }

devices = [ 
        "10.0.0.220",
        "10.0.0.221",
        "10.0.0.222",
        "10.0.0.223",
        "10.0.0.224",
        "10.0.0.225",
        "10.0.0.226",
        "10.0.0.228",
        "10.0.0.229",
        "10.0.0.230", 
        "10.0.0.231", 
        "10.0.0.232", 
        "10.0.0.233", 
        "10.0.0.234", 
        ]

for dev in devices:

    # ###################
    # Pega sessao
    # ###################
    
    url = "http://" + dev + "/login.fcgi"
    resposta = requests.post(url, json = jsonLogin)
    jsonResposta = resposta.json()

    # ###################
    # Redefine a hora c
    # ###################
    url = "http://" + dev + "/set_system_time.fcgi?session=" + jsonResposta['session']

    agora = datetime.datetime.now()
    jsonHorario = {
                "day"    : agora.day ,
                "month"  : agora.month,
                "year"   : agora.year,
                "hour"   : agora.hour,
                "minute" : agora.minute,
                "second" : agora.second
                }

    resposta = requests.post(url, json = jsonHorario )

    print (f"[{agora.hour:02d}:{agora.minute:02d}:{agora.second:02d}] " + url  + " - " ,  resposta)

