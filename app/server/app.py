from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify
from flask_cors import CORS  # comment this on deployment
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager)
import json

app = Flask(__name__)
CORS(app)  # comment this on deployment

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


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


@app.route('/api')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/api/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Paolo",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body


if __name__ == '__main__':
    app.run()
