import csv
import json

# Specify the path to your CSV file
csv_file = 'word_library.csv'

# Read translations from CSV and populate word_library dictionary
word_library = {}
with open(csv_file, 'r', newline='', encoding= 'utf-8') as file:
    csv_reader = csv.reader(file)
    headers = next(csv_reader)
    languages = headers[1:]

    for language in languages:
        word_library[language] = {}

    for row in csv_reader:
        key = row[0]
        for i in range(1, len(headers)):
            language = headers[i]
            translation = row[i]
            word_library[language][key] = translation

# Generate the JavaScript dictionary code
js_code = 'const word_library = {\n'
for language, translations in word_library.items():
    js_code += f'  {language}: ' + json.dumps(translations, ensure_ascii=False, indent=2) + ',\n'
js_code += '};'

# Specify the path for the output JavaScript file
output_file = 'word_library.js'

# Write JavaScript code to the output file
with open(output_file, 'w', encoding='utf-8') as file:
    file.write(js_code)

print(f"JavaScript dictionary has been successfully written to {output_file}.")
