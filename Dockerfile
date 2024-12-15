# use a python base image
FROM python:3.12

# create a working directory
WORKDIR /MyRecipee-APP

# copy the requirements and install the libraries
 COPY requirements.txt requirements.txt 
 RUN pip install -r requirements.txt

# Copy the entire app code
COPY . .

#expose port 5000 to access our app from browser
EXPOSE 5000

# the command to run the python app
CMD ["python", "app.py"]