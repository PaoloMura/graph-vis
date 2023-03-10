from constants import *
from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify, abort
from flask_cors import CORS  # comment this on deployment
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager)
import json
import os
from resources import delete_topic, update_topic, get_topic
from server import load_question, generate_question

# Initial Setup

app = Flask(__name__)
CORS(app)  # comment this on deployment

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


# Authentication

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


@app.route('/api/token', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=username)
    response = {"access_token": access_token}
    return response


@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# Server

@app.route('/api/teacher/content')
@jwt_required()
def get_content():
    """Return a list of question files and topics"""
    try:
        questions = list(filter(lambda x: x.endswith('.py'), os.listdir(QUESTIONS_PATH)))
        topics = []
        with open(TOPICS_FILE, 'r') as f:
            data = json.load(f)
            topics = [{'topic_code': item, 'name': data[item]['name']} for item in data]
        content = {
            'questions': questions,
            'topics': topics
        }
        return content
    except FileNotFoundError:
        return 'File not found', 404


@app.route('/api/teacher/questions/<file>', methods=['DELETE'])
@jwt_required()
def access_file(file):
    """Handle requests on the question file resources"""
    if os.path.exists(QUESTIONS_PATH + file):
        os.remove(QUESTIONS_PATH + file)
        return 'Success', 201
    else:
        return 'File not found', 404


@app.route('/api/upload/file', methods=['POST'])
@jwt_required()
def upload_file():
    """Handle question file upload"""
    file = request.files['file']
    if file.content_type != 'text/x-python-script':
        return 'File type must be a Python script', 400
    filename = file.filename
    destination = QUESTIONS_PATH + filename
    if os.path.exists(destination):
        return 'File already exists', 400
    file.save(destination)
    return 'Success', 201


@app.route('/api/teacher/topics/<topic_code>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def access_topic(topic_code):
    """Handle requests on the topics resource for teachers"""
    if request.method == 'DELETE':
        return delete_topic(topic_code)
    elif request.method == 'PUT':
        data = dict()
        data['name'] = request.json.get('name')
        data['description'] = request.json.get('description')
        data['settings'] = request.json.get('settings')
        data['questions'] = request.json.get('questions')
        return update_topic(topic_code, data)
    elif request.method == 'GET':
        topic = get_topic(topic_code)
        if not topic:
            abort(404)
        else:
            return topic


@app.route('/api/student/topics/<topic_code>', methods=['GET'])
def access_topic_data(topic_code):
    """Handle requests on the topics resource for students"""
    topic, status = get_topic(topic_code)
    if status // 100 != 2:
        return 'Error trying to access topic', status
    result = dict(topic)
    if not topic:
        abort(404)
    for i, question in enumerate(topic['questions']):
        q_file = question['file']
        q_class = question['class']
        try:
            result['questions'][i] = generate_question(q_file, q_class)
        except Exception as e:
            return f'Error trying to access question class "{q_file}:{q_class}": {e}', 400
    return result


if __name__ == '__main__':
    app.run()
