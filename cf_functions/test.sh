#!/bin/bash

for x in *.js; do 
  functionName=$(basename $x .js)
  aws cloudfront describe-function --name $functionName-$ENV  > /dev/null 2>&1
  if [[ $? == 0 ]]; then
    echo "Updating function $functionName-$ENV"
    etag=$(aws cloudfront describe-function --name $functionName-$ENV --query 'ETag' --output text)
    echo "ETag: $etag"
    aws cloudfront update-function \
      --name $functionName-$ENV \
      --if-match $etag \
      --function-config Comment="$functionName",Runtime="cloudfront-js-1.0" \
      --function-code fileb://$x
  else
    echo "Creating function $functionName-$ENV"
    aws cloudfront create-function \
      --name $functionName-$ENV \
      --function-config Comment="$functionName",Runtime="cloudfront-js-1.0" \
      --function-code fileb://$x
  fi
done
