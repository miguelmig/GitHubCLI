#!/usr/bin/env bash
PGPASSWORD=fe8434a298a8a7ee470fca83eb0ca55a9365e9eaa6d975eb5095b89e78c9c484 psql -h 127.0.0.1 -p 5432 -U jmcqeqddghhqqa -c "CREATE DATABASE githubusers;"
PGPASSWORD=fe8434a298a8a7ee470fca83eb0ca55a9365e9eaa6d975eb5095b89e78c9c484 psql -h 127.0.0.1 -p 5432 -U jmcqeqddghhqqa githubusers < create.sql
