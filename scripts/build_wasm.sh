set -e
em++ \
  -std=c++14 \
  -O2 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_convert \
  -s EXPORTED_RUNTIME_METHODS='["ccall"]' \
  --preload-file build/sysroot/usr/local/share/opencc@/usr/local/share/opencc \
  -o public/opencc.js \
  wasm/api.cpp \
  -L build/sysroot/usr/local/lib \
  -l opencc -l marisa
