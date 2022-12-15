set -e

root=$PWD

cmake OpenCC -B build/opencc_native \
  -DCMAKE_INSTALL_PREFIX:PATH=$root/build/sysroot/usr/local
make -C build/opencc_native/data install
