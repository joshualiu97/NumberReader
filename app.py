from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
import tensorflow as tf
import numpy as np
import cv2
import base64
    
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class LoadImage(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  image = db.Column(db.PickleType)

  def __repr__(self):
    return '<Image %r>' & self.id

@app.route('/', methods=['POST', 'GET'])
def index():
  return render_template('index.html')

@app.route('/processing', methods=['POST', 'GET'])
def processing():
  return render_template('processing.html')

@app.route('/send_pic', methods=['POST'])
def getImg():
  if request.method == 'POST':
    data = request.get_data()
    data = data.decode('UTF-8')
    encoded_data = data.split(',')[1]
    data = base64.b64decode(encoded_data)
    nparr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (28,28))
    img = ~img
    img = cv2.GaussianBlur(img, (3,3), 0)
    model = tf.keras.models.load_model('num_reader.h5')    
    prediction = model.predict([[img]])
    prediction = np.argmax(prediction[0])
    return str(prediction)

if __name__ == "__main__":
  app.run(debug=True)