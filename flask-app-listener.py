#! /usr/bin/env python
import sys, os, functools
from time import gmtime, strftime
import datetime
from bottle import route, run, request
import os
import json
import glob
import subprocess

time2=strftime("%Y-%m-%dT%H:%M:%SZ", gmtime())
time1=datetime.datetime.now() + datetime.timedelta(minutes=-5) - datetime.timedelta(hours=3)
time1=time1.strftime("%Y-%m-%dT%H:%M:%SZ")

token = 'XXXX'

@route('/release',method='POST')
def release():
    userToken = request.json['token']
    if userToken == token:
	os.system('ansible-playboot release.yml') #can be changed
	return "releasing now, please check Production after 5 minutes"


run(host='0.0.0.0', port=4444, debug=True)
