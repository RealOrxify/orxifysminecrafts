# Minecraft Downloads Page

A beautiful glassmorphism-styled download page for Minecraft instances and resource packs, built with React and Python Flask.

## Features

- 🎨 Modern glassmorphism design with Tailwind CSS
- ⚛️ React frontend with component-based architecture
- 🐍 Python Flask backend with REST API
- 📦 Display Minecraft instances and resource packs
- 🔧 Admin panel for managing content
- ✏️ Custom text editor for page content
- 💾 JSON file-based data storage
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Backend**: Python 3, Flask, Flask-CORS
- **Data Storage**: JSON file

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn

### Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers:

1. **Start the Python backend** (in one terminal):
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

2. **Start the React frontend** (in another terminal):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory. You can serve them with any static file server or configure Flask to serve them.

## Usage

1. Open the application in your browser
2. Click "Admin Panel" to add instances and resource packs
3. Fill in the forms with:
   - Name
   - Description (optional)
   - GitHub Download URL
   - Version (optional)
4. Use the "Edit Page Text" section to add custom content
5. All data is saved to `data.json` file

## API Endpoints

### Instances
- `GET /api/instances` - Get all instances
- `POST /api/instances` - Add a new instance
- `DELETE /api/instances/<id>` - Delete an instance

### Resource Packs
- `GET /api/resource-packs` - Get all resource packs
- `POST /api/resource-packs` - Add a new resource pack
- `DELETE /api/resource-packs/<id>` - Delete a resource pack

### Custom Text
- `GET /api/custom-text` - Get custom page text
- `POST /api/custom-text` - Save custom page text

## Data Structure

Data is stored in `data.json` with the following structure:

```json
{
  "instances": [
    {
      "id": "uuid",
      "name": "Instance Name",
      "description": "Description",
      "url": "https://github.com/...",
      "version": "1.20.1"
    }
  ],
  "resourcePacks": [
    {
      "id": "uuid",
      "name": "Pack Name",
      "description": "Description",
      "url": "https://github.com/...",
      "version": "1.0"
    }
  ],
  "customText": "Custom page text"
}
```

## GitHub URLs

You can use GitHub release URLs in the format:
- `https://github.com/username/repo/releases/download/tag/filename.zip`
- Or direct links to files in your repository

## Customization

You can customize the colors and styling by editing:
- `src/index.css` - Global styles and background gradient
- `src/App.css` - Glassmorphism effects
- `tailwind.config.js` - Tailwind CSS configuration

## Project Structure

```
.
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── data.json             # Data storage (created automatically)
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main App component
│   ├── App.css           # App styles
│   ├── index.css         # Global styles
│   └── components/       # React components
│       ├── Header.jsx
│       ├── AdminPanel.jsx
│       ├── InstancesSection.jsx
│       ├── ResourcePacksSection.jsx
│       └── CustomTextSection.jsx
└── README.md
```

## License

MIT
