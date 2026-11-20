#!/bin/bash
# Deploy mood JSP/Servlet application into Apache Tomcat 10.1

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$ROOT_DIR/env.sh"

if [ -z "$CATALINA_HOME" ] || [ ! -d "$CATALINA_HOME" ]; then
    echo "Error: CATALINA_HOME not found. Run ./env.sh first."
    exit 1
fi

echo "Deploying mood webapp into $CATALINA_HOME/webapps/mood..."
mkdir -p "$CATALINA_HOME/webapps/mood"
cp -r "$ROOT_DIR/mood/"* "$CATALINA_HOME/webapps/mood/"

# Configure Tomcat HTTP port to 8081 so it does not conflict with port 8080
sed -i '' 's/port="8080"/port="8081"/g' "$CATALINA_HOME/conf/server.xml" 2>/dev/null || true

echo "Deployment complete!"
echo "To start Tomcat on http://localhost:8081/mood :"
echo "  $CATALINA_HOME/bin/catalina.sh start"
echo "To stop Tomcat:"
echo "  $CATALINA_HOME/bin/catalina.sh stop"
