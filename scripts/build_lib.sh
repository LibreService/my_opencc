set -e

root=$PWD
n=`python -c 'import multiprocessing as mp; print(mp.cpu_count())'`

pushd OpenCC
if [[ -z `git status --porcelain` ]]; then
  git apply $root/patch
fi
popd

emcmake cmake OpenCC -B build/opencc_wasm \
  -DBUILD_SHARED_LIBS:BOOL=OFF \
  -DCMAKE_BUILD_TYPE:STRING="Release" \
  -DCMAKE_INSTALL_PREFIX:PATH=/usr/local
make DESTDIR=$root/build/sysroot -C build/opencc_wasm -j $n install
cp build/opencc_wasm/deps/marisa-0.2.6/libmarisa.a $root/build/sysroot/usr/local/lib
