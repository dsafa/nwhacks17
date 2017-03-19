import urllib2
import json
import codecs

neighborhoods = [line.rstrip('\n') for line in open('neighborhoods.txt')]

with codecs.open("hotspots.csv", encoding='utf-8', mode='w+') as file:
	lines = [line.replace("\r\n", "\n").rstrip('\n') for line in codecs.open('data.csv', encoding='utf-8', mode='r')]

	for line in lines:
		parts = line.split(",")
		url = "http://maps.google.com/maps/api/geocode/json?latlng=" + parts[2] + "," + parts[3] + "&sensor=false"
		print(url + "\n")
		request = urllib2.urlopen(url).read()
		data = json.loads(request)
		for result in data["results"]:
			for addr in result["address_components"]:
				if "neighborhood" in addr["types"] and addr["long_name"] in neighborhoods:
					file.write("'" + addr["long_name"] + "'," + line + "\n")
