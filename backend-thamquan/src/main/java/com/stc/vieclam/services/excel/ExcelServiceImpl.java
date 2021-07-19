package com.stc.vieclam.services.excel;

import com.aspose.cells.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.rmi.ServerException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 15:48
 * Filename  : ExcelServiceImpl
 */
@Slf4j
@Service
public class ExcelServiceImpl implements ExcelService {

    private final MessageSource messageSource;

    private final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    @Value("${file.download_dir}")
    private String download;

    public ExcelServiceImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }


    //<editor-fold desc="private method">
    private void applyBolderRange(Range range, Worksheet worksheet) {
        Style style = worksheet.getCells().getStyle();
        style.setBorder(BorderType.LEFT_BORDER, CellBorderType.THIN, Color.getBlack());
        style.setBorder(BorderType.TOP_BORDER, CellBorderType.THIN, Color.getBlack());
        style.setBorder(BorderType.RIGHT_BORDER, CellBorderType.THIN, Color.getBlack());
        style.setBorder(BorderType.BOTTOM_BORDER, CellBorderType.THIN, Color.getBlack());
        StyleFlag styleFlag = new StyleFlag();
        styleFlag.setBorders(true);
        range.applyStyle(style, styleFlag);
    }

    private void applyLicense() throws ServerException {
        Locale locale = LocaleContextHolder.getLocale();
        try {
            InputStream inputStream = new ClassPathResource("/license/license_cells.xml").getInputStream();
            License license = new License();
            license.setLicense(inputStream);
        } catch (Exception e) {
            throw new ServerException(messageSource.getMessage("error.license", null, locale));
        }
    }
    //</editor-fold>

}
