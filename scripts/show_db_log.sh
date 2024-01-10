#!/bin/bash
# ANSI color codes
RESET="\033[0m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR
cd ../
DIR_NAME=`basename $PWD`
docker logs supabase_db_$DIR_NAME --tail 100 -f 2>&1 | \
while read line; do
  if [[ $line == *"INFO"* ]]; then
    echo -e "${BLUE}$line${RESET}"
  elif [[ $line == *"WARN"* ]]; then
    echo -e "${YELLOW}$line${RESET}"
  elif [[ $line == *"DEBUG"* ]]; then
    echo -e "${CYAN}$line${RESET}"
  elif [[ $line == *"ERROR"* ]]; then  
    echo -e "${RED}$line${RESET}"
  else
    echo "$line"
  fi
done