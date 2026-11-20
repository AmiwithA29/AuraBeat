#!/bin/bash
# Environment activator for MoodBasedMusicProject & AuraBeats

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLS_DIR="$ROOT_DIR/.tools"

# 1. Node.js Path
NODE_DIR=$(find "$TOOLS_DIR" -maxdepth 1 -name "node-v*" -type d | head -n 1)
if [ -d "$NODE_DIR" ]; then
    export PATH="$NODE_DIR/bin:$PATH"
fi

# 2. OpenJDK 21 Path
JDK_DIR=$(find "$TOOLS_DIR" -maxdepth 1 -name "jdk-*" -type d | head -n 1)
if [ -d "$JDK_DIR" ]; then
    if [ -d "$JDK_DIR/Contents/Home" ]; then
        export JAVA_HOME="$JDK_DIR/Contents/Home"
    else
        export JAVA_HOME="$JDK_DIR"
    fi
    export PATH="$JAVA_HOME/bin:$PATH"
fi

# 3. Apache Tomcat 10.1 Path
TOMCAT_DIR=$(find "$TOOLS_DIR" -maxdepth 1 -name "apache-tomcat-*" -type d | head -n 1)
if [ -d "$TOMCAT_DIR" ]; then
    export CATALINA_HOME="$TOMCAT_DIR"
    export PATH="$CATALINA_HOME/bin:$PATH"
fi

echo "Environment active:"
echo "Node: $(node -v 2>/dev/null || echo 'not found')"
echo "NPM:  $(npm -v 2>/dev/null || echo 'not found')"
echo "Java: $(java -version 2>&1 | head -n 1)"
echo "JAVA_HOME: $JAVA_HOME"
echo "CATALINA_HOME: $CATALINA_HOME"
