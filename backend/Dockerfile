FROM python:3.10

WORKDIR /backend

RUN pip3 install flask
RUN pip3 install pymysql
RUN pip3 install flask-cors

COPY . .

CMD [ "python", "app.py" , "--host", "0.0.0.0", "--port", "5000"]
EXPOSE 5000
