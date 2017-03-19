with open("script.sh", "w") as script:
	script.write("#!/bin/sh\n")
	script.write("cockroach sql --url=postgresql://root@54.186.70.223:26257?sslmode=disable\n")
	script.write("DELETE TABLE Hotspot;\n")

	hotspots = [line.rstrip('\n') for line in open('hotspots.csv')]
	for hotspot in hotspots:
		insertStr = "INSERT INTO Hotspot (Neighbourhood, Lat, Long) VALUES ({});\n".format(hotspot)
		script.write(insertStr)