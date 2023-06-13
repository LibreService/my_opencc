#include "opencc/opencc.h"
#include "opencc/DictConverter.hpp"
#include <cstdio>

std::string result;

extern "C" {
    const char *convert(const char *config, const char *text) {
        auto converter = opencc::SimpleConverter(config);
        result = converter.Convert(text);
        return result.c_str();
    }

    void gen_ocd2 () {
        opencc::ConvertDictionary("/input.txt", "/output.ocd2", "text", "ocd2");
    }
}
