import os
import subprocess
import sys

ENV_FILE = '.client.env'


def build():
    cmd = f'docker build ' \
          f'$(cat .client.env | sed "s@^@--build-arg @g" | paste -s -d " ") ' \
          f'-t {os.environ.get("MAIN_CLIENT_IMAGE")} ../../'
    os.system(cmd)
    return


def deploy(docker_image=''):
    if docker_image:
        pull_main_client_image_by_name(docker_image)
    else:
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


def pull_main_client_image_by_name(docker_image):
    os.system(f'docker pull "{docker_image}"')
    os.environ.update(dict(
        MAIN_CLIENT_IMAGE=docker_image
    ))
    return


def up_main_client(pods=4):
    os.system(f'docker-compose -f services/main_client.yml up -d')
    return


def stop_main_client():
    os.system(f'docker-compose  -f services/main_client.yml stop')
    return


def create_env():
    text = f'BASE_URL={os.environ.get("BASE_URL") or ""}\n' \
           f'DOMAIN={os.environ.get("DOMAIN") or ""}\n' \
           f'MAIN_CLIENT_IMAGE={os.environ.get("MAIN_CLIENT_IMAGE") or ""}\n' \
           f'NETWORK=proxy\n'
    with open(ENV_FILE, 'w+' if os.path.exists(ENV_FILE) else 'w') as file:
        file.write(text)
    print(f'Env file created: {ENV_FILE}')
    return


def load_env():
    if os.path.exists(ENV_FILE) is False:
        print(f'{ENV_FILE} DOES NOT exist!!! Please create this file.')
        return
    with open(ENV_FILE, 'r') as fh:
        vars_dict = dict()
        for line in fh.readlines():
            if not line.startswith('#'):
                line_dict = (tuple(line.rstrip("\n").split('=', 1)))
                if len(line_dict) == 2:
                    [env, value] = line_dict
                    vars_dict[env] = value
    os.environ.update(vars_dict)
    return


if __name__ == "__main__":
    load_env()
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    # args[2:] = function args : (*unpacked)
    globals()[args[1]](*args[2:])
