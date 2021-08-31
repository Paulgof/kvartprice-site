import datetime
import random

import pandas as pd
import joblib
from flask import request, redirect
from flask_restful import Resource
from tensorflow import keras

from constants import FILES

model = keras.models.load_model(FILES['model'])
transformer = joblib.load(FILES['transformer'])
categories = joblib.load(FILES['categories'])
statistics = joblib.load(FILES['statistics'])


class Statistics(Resource):
    def get(self):
        print(statistics)
        return statistics


class Form(Resource):
    def post(self):
        form = request.form
        df = pd.DataFrame({
            'Price': [1],
            'Rooms': [int(form.get('rooms'))],
            'Square': [float(form.get('square'))],
            'Floor': [int(form.get('flat_floor'))],
            'Total Floors': [int(form.get('total_floors'))],
            'District': [form.get('district')],
            'Microdistrict': [form.get('microdistrict')],
            'Flat Type': [form.get('flat_type')],
            'Toilet': [form.get('toilet')],
            'Balcony': [form.get('balcony')],
            'Repair': [form.get('repair')],
            'House Type': [form.get('house_type')],
            'Lifts': [form.get('lifts')]
        })
        df = transformer.transform(df)
        pred = model.predict(df.A[:, 1:])
        pred_price = int(pred.flatten()[0]) // 100000 * 100000

        return redirect('http://kvartprice.info/prediction?predicted_price={}'.format(pred_price))


class FormOptions(Resource):
    def get(self):
        for category_list in categories.values():
            category_list.sort()

        return categories

