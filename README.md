# EATCHEFS FRONTEND

[Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

# Local installation

### 1. INSTALLATION

(after git clone)

Installing dependencies:

```
yarn
```

### 2. RUN FRONTEND

Running the application in development mode:

```
yarn dev
```

The application will be available via the link: http://localhost:8030

# Stage installation

[Install python >= 3.9](https://www.python.org/downloads/release/python-395/)

```
cd /services/eatchef_client/ci/stage
python3 scripts.py deploy  # containers will be built and started
```

# Production installation

[Install python >= 3.9](https://www.python.org/downloads/release/python-395/)

```
cd /services/eatchef_client/ci/production
python3 scripts.py deploy  # containers will be built and started
```
