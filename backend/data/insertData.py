import codecs

with codecs.open("scriptInput.txt", encoding='utf-8', mode='w+') as input:
	input.write("cockroach sql --url=postgresql://root@54.186.70.223:26257?sslmode=disable\n")
	input.write("set database = NWHacks17;\n")
	input.write("DELETE FROM Hotspot;\n")

	hotspots = [line.rstrip('\n') for line in codecs.open('hotspots.csv', encoding='utf-8', mode='r')]
	for hotspot in hotspots:
		insertStr = "INSERT INTO Hotspot (Neighbourhood, Address, Name, Lat, Long) VALUES ({}) ON CONFLICT (Lat,Long) DO NOTHING;\n".format(hotspot)
		input.write(insertStr)

with open("script.sh", "w") as script:
	script.write("#!/bin/sh\n")
	script.write("bash < scriptInput.txt\n")