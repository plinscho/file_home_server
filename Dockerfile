#Backend dockerfile
FROM python:3.13-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8888

COPY ./app ./app
COPY .env .env

# COPY ./frontend ./frontend
# before (top)		is this ok?
COPY ./frontend /app/frontend

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8888", "--reload"]
