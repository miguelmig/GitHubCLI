#!/usr/bin/env bash
docker run -itd -e POSTGRES_USER=jmcqeqddghhqqa -e POSTGRES_PASSWORD=fe8434a298a8a7ee470fca83eb0ca55a9365e9eaa6d975eb5095b89e78c9c484 -p 5432:5432 --name postgresql postgres
