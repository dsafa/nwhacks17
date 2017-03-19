with open("scriptInput.txt", "w") as input:
	input.write("cockroach sql --url=postgresql://root@54.186.70.223:26257?sslmode=disable\n")
	input.write("set database = NWHacks17;\n")
	input.write("DELETE FROM Hotspot;\n")

	hotspots = [line.rstrip('\n') for line in open('hotspots.csv')]
	for hotspot in hotspots:
		insertStr = "INSERT INTO Hotspot (Neighbourhood, Lat, Long) VALUES ({}) ON CONFLICT (Lat,Long) DO NOTHING;\n".format(hotspot)
		input.write(insertStr)

with open("script.sh", "w") as script:
	script.write("#!/bin/sh\n")
	script.write("bash < scriptInput.txt\n")