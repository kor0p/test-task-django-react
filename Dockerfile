FROM python:3

ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./test_task_django_react ./users ./manage.py ./db.sqlite3 ./entrypoint.sh /code/
