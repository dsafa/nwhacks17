import urllib2
import json

neighborhoods = [line.rstrip('\n') for line in open('neighborhoods.txt')]

with open("hotspots.csv", "w") as file:
	lines = [line.rstrip('\n') for line in open('data.csv')]

	for line in lines:
		request = urllib2.urlopen("http://maps.google.com/maps/api/geocode/json?latlng=" + line + "&sensor=false").read()
		data = json.loads(request)
		for result in data["results"]:
			for addr in result["address_components"]:
				if "neighborhood" in addr["types"] and addr["long_name"] in neighborhoods:
					file.write("'" + addr["long_name"] + "'," + line + "\n")
