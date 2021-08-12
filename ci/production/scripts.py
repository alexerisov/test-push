import os
import subprocess
import sys

def build():
    cmd = f'docker build -t {os.environ.get("MAIN_CLIENT_IMAGE")} ../../'
    os.system(cmd)
    return

def deploy():
    build()
    stop_and_up_services()
    return

def up_all():
    up_services()
    return


def stop_services():
    stop_main_client()
    return


def up_services():
    up_main_client()
    return


def stop_and_up_services():
    stop_services()
    up_services()
    return


def check_network():
    bat_cmd = f'docker network ls --filter name=proxy --format="{{ .Name }}" | grep -m 1 proxy)"'
    is_network_exist = subprocess.getoutput(bat_cmd)
    if is_network_exist != 1:
        os.system(f'docker network create --internal=false --attachable proxy')
    return


def pull_main_client_image():
    os.system(f'docker pull "{os.environ.get("MAIN_CLIENT_IMAGE")}"')
    return


def up_main_client(pods=4):
    os.system(f'docker-compose -f services/main_client.yml up -d --scale main_client={pods}')
    return


def stop_main_client():
    os.system(f'docker-compose  -f services/main_client.yml up -d --scale main_client=0')
    return


if __name__ == "__main__":
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    # args[2:] = function args : (*unpacked)
    globals()[args[1]](*args[2:])
