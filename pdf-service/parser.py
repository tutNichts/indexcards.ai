import pdfplumber

with pdfplumber.open("test.pdf") as pdf:
    # extract page
    first_page = pdf.pages[20]
    text = first_page.extract_text()
    lines = text.split('\n')

    # filter page
    #min_height = 100
    #filtered_lines = [line for line in lines if float(line.split(',')[1]) >= min_height]
    #output = '\n'.join(filtered_lines)

    print(lines.height)

