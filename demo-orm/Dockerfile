FROM python:3.9-slim AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.9-slim
WORKDIR /app
COPY --from=build /root/.local /root/.local
COPY . .
CMD ["python", "populate.py"]