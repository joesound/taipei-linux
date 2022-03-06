FROM ubuntu==20.04

RUN  sudo apt-get update && sudo apt-get install

RUN  sudo apt install python==3.7.0 &&  sudo apt-get -y install python3-pip

COPY . /app

EXPOSE 3000

WORKDIR /app

RUN pip install -r requirements.txt

CMD flask run --host=0.0.0.0 --port=3000