#include "../build/sysroot/usr/local/include/opencc/opencc.h"

std::string result;

extern "C" {
    const char *convert(const char *config, const char *text) {
        auto converter = opencc::SimpleConverter(config);
        result = converter.Convert(text);
        return result.c_str();
    }
}
