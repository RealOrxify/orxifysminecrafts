from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4
import requests
import re
from api.utils import load_data, save_data

app = Flask(__name__)
CORS(app)

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

# GitHub import endpoint
@app.route('/api/import-github', methods=['POST'])
def import_from_github():
    try:
        repo_url = request.json.get('repoUrl', '').strip()
        item_type = request.json.get('type', 'instance')  # 'instance' or 'pack'
        
        if not repo_url:
            return jsonify({'error': 'Repository URL is required'}), 400
        
        # Extract owner and repo from GitHub URL
        # Supports formats: https://github.com/owner/repo or https://github.com/owner/repo/
        match = re.match(r'https?://github\.com/([^/]+)/([^/]+)/?', repo_url)
        if not match:
            return jsonify({'error': 'Invalid GitHub repository URL'}), 400
        
        owner, repo = match.groups()
        
        # Try to get the latest release
        api_url = f'https://api.github.com/repos/{owner}/{repo}/releases/latest'
        response = requests.get(api_url, timeout=10)
        
        if response.status_code == 404:
            # No releases, try to get repo info and use main branch
            repo_info_url = f'https://api.github.com/repos/{owner}/{repo}'
            repo_response = requests.get(repo_info_url, timeout=10)
            if repo_response.status_code != 200:
                return jsonify({'error': 'Repository not found'}), 404
            
            repo_data = repo_response.json()
            name = repo_data.get('name', repo)
            description = repo_data.get('description', '')
            default_branch = repo_data.get('default_branch', 'main')
            
            # Create a download URL for the repository as a zip
            download_url = f'https://github.com/{owner}/{repo}/archive/refs/heads/{default_branch}.zip'
            
            new_item = {
                'id': str(uuid4()),
                'name': name,
                'description': description,
                'url': download_url,
                'version': default_branch
            }
        elif response.status_code == 200:
            release_data = response.json()
            name = release_data.get('name', repo)
            description = release_data.get('body', '')[:200]  # Limit description length
            tag = release_data.get('tag_name', '')
            
            # Get the first asset download URL, or use the source code zip
            assets = release_data.get('assets', [])
            if assets and len(assets) > 0:
                download_url = assets[0].get('browser_download_url', '')
            else:
                download_url = f'https://github.com/{owner}/{repo}/archive/refs/tags/{tag}.zip'
            
            new_item = {
                'id': str(uuid4()),
                'name': name,
                'description': description,
                'url': download_url,
                'version': tag
            }
        else:
            return jsonify({'error': 'Failed to fetch repository information'}), response.status_code
        
        # Add to the appropriate list
        data = load_data()
        if item_type == 'instance':
            data['instances'].append(new_item)
        else:
            data['resourcePacks'].append(new_item)
        
        save_data(data)
        return jsonify(new_item), 201
        
    except requests.RequestException as e:
        return jsonify({'error': f'Failed to fetch from GitHub: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

