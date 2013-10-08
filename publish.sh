#!/bin/sh


BRANCH=`git rev-parse --abbrev-ref HEAD`
SERVER=baden@new.navi.cc:~/SDK/newgps.navi.cc/www-$BRANCH/

echo "Publich: $BRANCH"

grunt build
echo "rsync -avz --delete -e ssh ./dist/ $SERVER"
rsync -avz --delete -e ssh ./dist/ $SERVER


#cd ../www.navi.cc.ghpages
