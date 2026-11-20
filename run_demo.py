#!/usr/bin/env python3
"""
Enhanced local server for MoodBasedMusicProject & AuraBeats.
Serves app/ assets properly with exact MIME types.
"""

import http.server
import urllib.parse
import os
import mimetypes

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.join(BASE_DIR, "app")

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/javascript", ".ts")
mimetypes.add_type("text/javascript", ".tsx")
mimetypes.add_type("text/html", ".html")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/json", ".json")

class AuraBeatsHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        url_path = self.path.split('?')[0].split('#')[0]

        # 1. Main index.html
        if url_path in ("/", "/index.html", "/app"):
            file_path = os.path.join(APP_DIR, "index.html")
            if os.path.exists(file_path):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                with open(file_path, "rb") as f:
                    self.wfile.write(f.read())
                return

        # 2. Legacy JSP view
        if url_path in ("/jsp", "/legacy", "/index.jsp"):
            file_path = os.path.join(BASE_DIR, "mood", "index.jsp")
            if os.path.exists(file_path):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                with open(file_path, "rb") as f:
                    self.wfile.write(f.read())
                return

        # 3. Direct files inside app/ (e.g. /three.min.js, /src/...)
        rel_path = url_path.lstrip("/")
        candidate = os.path.join(APP_DIR, rel_path)
        if os.path.exists(candidate) and os.path.isfile(candidate):
            mime, _ = mimetypes.guess_type(candidate)
            self.send_response(200)
            self.send_header("Content-Type", f"{mime or 'application/octet-stream'}; charset=utf-8")
            self.end_headers()
            with open(candidate, "rb") as f:
                self.wfile.write(f.read())
            return

        # 4. Fallback for SPA routing to app/index.html
        index_file = os.path.join(APP_DIR, "index.html")
        if os.path.exists(index_file):
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            with open(index_file, "rb") as f:
                self.wfile.write(f.read())
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"404 Not Found")

    def do_POST(self):
        if self.path in ("/MoodServlet", "/mood"):
            self.send_response(303)
            self.send_header("Location", "/?mood=chill")
            self.end_headers()
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"404 Not Found")

if __name__ == "__main__":
    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, AuraBeatsHandler)
    print(f"AuraBeats Platform active at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
        httpd.server_close()
