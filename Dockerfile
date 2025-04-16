FROM python:3.13-slim

WORKDIR /app

RUN apt update && apt upgrade -y
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y dnsutils curl net-tools iputils-ping

EXPOSE 8888

COPY ./app ./app
COPY .env .env
COPY ./frontend ./frontend

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8888", "--reload"]
