from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from uuid import uuid4

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

def load_data():
    """Load data from JSON file"""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        'instances': [],
        'resourcePacks': [],
        'customText': ''
    }

def save_data(data):
    """Save data to JSON file"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Instances endpoints
@app.route('/api/instances', methods=['GET'])
def get_instances():
    data = load_data()
    return jsonify(data['instances'])

@app.route('/api/instances', methods=['POST'])
def add_instance():
    data = load_data()
    instance_data = request.json
    
    if not instance_data.get('name') or not instance_data.get('url'):
        return jsonify({'error': 'Name and URL are required'}), 400
    
    new_instance = {
        'id': str(uuid4()),
        'name': instance_data['name'],
        'description': instance_data.get('description', ''),
        'url': instance_data['url'],
        'version': instance_data.get('version', '')
    }
    
    data['instances'].append(new_instance)
    save_data(data)
    return jsonify(new_instance), 201

@app.route('/api/instances/<instance_id>', methods=['DELETE'])
def delete_instance(instance_id):
    data = load_data()
    data['instances'] = [i for i in data['instances'] if i['id'] != instance_id]
    save_data(data)
    return jsonify({'message': 'Instance deleted'}), 200

# Resource packs endpoints
@app.route('/api/resource-packs', methods=['GET'])
def get_resource_packs():
    data = load_data()
    return jsonify(data['resourcePacks'])

@app.route('/api/resource-packs', methods=['POST'])
def add_resource_pack():
    data = load_data()
    pack_data = request.json
    
    if not pack_data.get('name') or not pack_data.get('url'):
        return jsonify({'error': 'Name and URL are required'}), 400
    
    new_pack = {
        'id': str(uuid4()),
        'name': pack_data['name'],
        'description': pack_data.get('description', ''),
        'url': pack_data['url'],
        'version': pack_data.get('version', '')
    }
    
    data['resourcePacks'].append(new_pack)
    save_data(data)
    return jsonify(new_pack), 201

@app.route('/api/resource-packs/<pack_id>', methods=['DELETE'])
def delete_resource_pack(pack_id):
    data = load_data()
    data['resourcePacks'] = [p for p in data['resourcePacks'] if p['id'] != pack_id]
    save_data(data)
    return jsonify({'message': 'Resource pack deleted'}), 200

# Custom text endpoints
@app.route('/api/custom-text', methods=['GET'])
def get_custom_text():
    data = load_data()
    return jsonify({'text': data.get('customText', '')})

@app.route('/api/custom-text', methods=['POST'])
def save_custom_text():
    data = load_data()
    text_data = request.json
    data['customText'] = text_data.get('text', '')
    save_data(data)
    return jsonify({'message': 'Text saved'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

