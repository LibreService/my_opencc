set -e
em++ \
  -std=c++14 \
  -O2 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_convert,_gen_ocd2 \
  -s EXPORTED_RUNTIME_METHODS='["ccall","FS"]' \
  -I build/sysroot/usr/local/include \
  -o public/opencc.js \
  wasm/api.cpp \
  -L build/sysroot/usr/local/lib \
  -l opencc -l marisa
