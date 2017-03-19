import urllib2
import json
from pprint import pprint
import csv

with open("data.csv", "w") as file:
	lines = [line.rstrip('\n') for line in open('locs.txt')]
	for line in lines:

		request = urllib2.urlopen("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + line + "+in+Vancouver+Canada&key=AIzaSyD4Vpx1B6OyPY0D1BovkjkpCOBzYhUUvuc").read()

		data = json.loads(request)
		for r in data["results"]:
			loc = r["geometry"]["location"]
			file.write(str(loc["lat"]) + "," + str(loc["lng"]) + "\n")