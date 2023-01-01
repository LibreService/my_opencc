set -e

root=$PWD
n=`python -c 'import multiprocessing as mp; print(mp.cpu_count())'`

cmake OpenCC -B build/opencc_native \
  -DCMAKE_INSTALL_PREFIX:PATH=$root/build/sysroot/usr/local
make -C build/opencc_native/data -j $n install
