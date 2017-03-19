import urllib2
import json
from pprint import pprint
import csv

with open("data.csv", "w") as file:
	locs = [line.rstrip('\n') for line in open('locs.txt')]
	neighborhoods = [line.rstrip('\n') for line in open('neighborhoods.txt')]

	for loc in locs:
		for neighborhood in neighborhoods:
			url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query={}+in+{}+Vancouver+Canada&key=AIzaSyDcPPVq89WPT6yXkn4rmuHWG-0-Lw4uHQo".format(loc, neighborhood.replace(" ", "+").replace("-", "+"))
			print(url + "\n")
			request = urllib2.urlopen(url).read()

			data = json.loads(request)
			for r in data["results"]:
				loc2 = r["geometry"]["location"]
				file.write(str(loc2["lat"]) + "," + str(loc2["lng"]) + "\n")