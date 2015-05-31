package hu.tilos.radio.backend.episode.util;

import hu.tilos.radio.backend.util.LocaleUtil;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class DateFormatUtil {

    public static SimpleDateFormat create(String pattern) {
        SimpleDateFormat format = new SimpleDateFormat(pattern, LocaleUtil.TILOSLOCALE);
        format.setTimeZone(TimeZone.getTimeZone("CET"));
        return format;
    }
}