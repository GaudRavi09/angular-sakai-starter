#!/bin/bash
set -e
# sync.sh — update master, rebase dev_ravi

git checkout master
git fetch upstream
git merge upstream/master
git push origin master

git checkout dev_ravi
git rebase master
git push -f origin dev_ravi

echo "✅ master and dev_ravi are now in sync with upstream."
