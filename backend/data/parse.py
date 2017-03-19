import urllib2
import json
import codecs
import csv

with codecs.open("data.csv", encoding='utf-8', mode='w+') as file:
	locs = [line.rstrip('\n') for line in open('locs.txt')]
	neighborhoods = [line.rstrip('\n') for line in open('neighborhoods.txt')]

	for loc in locs:
		for neighborhood in neighborhoods:
			url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query={}+in+{}+Vancouver+Canada&key=AIzaSyAILgsG9834lhX9umHPN-DXWuu2cZ1Z5Zk".format(loc, neighborhood.replace(" ", "+").replace("-", "+"))
			print(url + "\n")
			request = urllib2.urlopen(url).read()

			data = json.loads(request)
			for r in data["results"]:
				name = r["name"].replace(",", "").replace("'", "")
				loc2 = r["geometry"]["location"]
				addr = r["formatted_address"].replace(",", "").replace("'", "")
				file.write("'" + addr + "','" + name + "'," + str(loc2["lat"]) + "," + str(loc2["lng"]) + "\n")