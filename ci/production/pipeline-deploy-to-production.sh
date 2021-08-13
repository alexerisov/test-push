#!/bin/bash
set -e
echo "$DOCKER_HUB_PASSWORD" | docker login --username $DOCKER_HUB_USERNAME --password-stdin
export BITBUCKET_USERNAME=$PIPE_BITBUCKET_USERNAME
export BITBUCKET_PASSWORD=$PIPE_BITBUCKET_PASSWORD
export BITBUCKET_BRANCH=$BITBUCKET_BRANCH
export MAIN_CLIENT_IMAGE=$MAIN_CLIENT_IMAGE
export MAIN_DIR="frontend"
export REPO_URL=""
if [ -d "$MAIN_DIR" ]; then rm -rf $MAIN_DIR; fi
git clone --single-branch --branch $BITBUCKET_BRANCH $REPO_URL $MAIN_DIR

cd $MAIN_DIR/ci/production/

python3 scripts.py create_env
python3 scripts.py pull_main_client_image
python3 scripts.py stop_main_client
python3 scripts.py up_main_client

cd ~

exec "$@"
