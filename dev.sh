set -e

rm -rf ./build && mkdir build

cp README.md package.json LICENSE ./build
cp -rf ./src/template/ ./build/template/

cd ./build && yarn link && cd ../

./node_modules/.bin/tsc --watch

cd ./example/example-vue3 && yarn link taro3-vue3-iconfont
# cd ../example-vue3-ts && yarn link taro3-vue3-iconfont
