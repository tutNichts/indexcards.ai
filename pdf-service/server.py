from dotenv import load_dotenv
load_dotenv()

import llm.models
import flask

llm.models.set_openai_key()

# Flask
app = flask.Flask(__name__)

# data
pdfs = {} # {id: pdf}

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/upload_pdf")
def upload_pdf():
    pass

@app.route("/generate_questions")
def generate_questions():
    pass