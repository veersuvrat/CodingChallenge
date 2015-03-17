
# To use the function, navigate to the directory containing q2.py
# Run the file and follow instructions at the command line.


def get_missing_letters(sentence):
	missingLetters = "abcdefghijklmnopqrstuvwxyz"
	for char in sentence:
		if char.lower() in missingLetters:
			missingLetters = missingLetters.replace(char.lower(), '')
	return missingLetters


print("Please enter your input sentence and press the enter key when complete: ")
inputStr = input()
print("The missing letters in your input sentence are: " + get_missing_letters(inputStr))