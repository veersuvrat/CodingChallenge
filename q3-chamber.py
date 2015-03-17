class Animation(object):

	def animate(speed, init):
		ListForTimeSteps = [] # the list to be returned


		ListRepresentationForInit = []
		for char in init:
			if char == '.':
				ListRepresentationForInit.append([])
			else:
				ListRepresentationForInit.append([char]) 

		# ListRepresentationForInit is a representation of the tunnel where each index corresponds with each position in the tunnel.
		# The values in the list are a representation of the particles present at that position.
		# [] implies no particle is present. ['L' , 'R'] implies one particle moving left is present and one particle moving right is present.

		ListForTimeSteps.append(Animation.ChamberList_to_OccupiedStr(ListRepresentationForInit))

		while not(Animation.is_Chamber_empty(ListRepresentationForInit)):
			ListRepresentationForInit = Animation.to_next_timestep(ListRepresentationForInit, speed)
			ListForTimeSteps.append(Animation.ChamberList_to_OccupiedStr(ListRepresentationForInit))


		return ListForTimeSteps
			


	# This method simulates a timestep and returns a new ListRepresentation for the chamber.

	def to_next_timestep(ChamberList, speed):
		nextTimestepList = [[] for _ in range(len(ChamberList))]
		for i in range(len(ChamberList)):
			if ChamberList[i] == []:
				pass
			for eachParticle in ChamberList[i]:
				if ((eachParticle == "L") and (i - speed >= 0)):
					nextTimestepList[i - speed].append(eachParticle)
				if ((eachParticle == "R") and (i + speed < len(ChamberList))):
					nextTimestepList[i + speed].append(eachParticle)
		return nextTimestepList

	


	# Converts the ListRepresentation to String representation. Each character in the string corresponds to whether the corresponding position 
	# in the tunnel has no particles, or atleast one.

	def ChamberList_to_OccupiedStr(ChamberList):
		OccupiedString = ""
		for EachPosition in ChamberList:
			if EachPosition == []:
				OccupiedString += "."
			else:
				OccupiedString += "X"
		return OccupiedString


	def is_Chamber_empty(ListRepresentation):
		for each_chamber_position in ListRepresentation:
			if each_chamber_position != []:
				return False
		return True