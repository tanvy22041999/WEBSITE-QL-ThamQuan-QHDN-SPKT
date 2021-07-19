package com.stc.vieclam.services.quydinh;

import com.stc.vieclam.dtos.quydinh.QuyDinhDto;
import com.stc.vieclam.entities.QuyDinh;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.QuyDinhRepository;
import com.stc.vieclam.utils.PageUtils;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Locale;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:44
 * Filename  : QuyDinhServiceImpl
 */
@Slf4j
@Service
public class QuyDinhServiceImpl implements QuyDinhService{

    private final QuyDinhRepository quyDinhRepository;

    private final MessageSource messageSource;

    private final VietnameseStringUtils vietnameseStringUtils;

    public QuyDinhServiceImpl(QuyDinhRepository quyDinhRepository, MessageSource messageSource, VietnameseStringUtils vietnameseStringUtils) {
        this.quyDinhRepository = quyDinhRepository;
        this.messageSource = messageSource;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }


    @Override
    public QuyDinh getQuyDinhCoreById(String id) {
        return quyDinhRepository.findByIdAndTrangThaiTrue(id).orElse(null);
    }

    @Override
    public Page<QuyDinh> getAllQuyDinhPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return quyDinhRepository.getAllQuyDinhsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public QuyDinh createQuyDinh(QuyDinhDto quyDinhDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(quyDinhDto.getNoiDung())){
            throw new InvalidException(messageSource.getMessage("error.quydinhnoidungnotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(quyDinhDto.getNoiDungEn())){
            throw new InvalidException(messageSource.getMessage("error.quydinhnoidungennotempty",null,locale));
        }

        QuyDinh quyDinh = new QuyDinh();
        quyDinh.setNoiDung(quyDinhDto.getNoiDung());
        quyDinh.setNoiDungEn(quyDinhDto.getNoiDungEn());
        if(!getQuyDinhTrangThaiTrue().isEmpty()){
            QuyDinh quyDinhActive = getQuyDinhTrangThaiTrue().get(0);
            quyDinhActive.setTrangThai(false);
            quyDinhRepository.save(quyDinhActive);
        }
        quyDinh.setTrangThai(true);
        quyDinhRepository.save(quyDinh);
        return quyDinh;
    }

    @Override
    public QuyDinh updateQuyDinh(String id, QuyDinhDto quyDinhDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(quyDinhDto.getNoiDung())){
            throw new InvalidException(messageSource.getMessage("error.quydinhnoidungnotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(quyDinhDto.getNoiDungEn())){
            throw new InvalidException(messageSource.getMessage("error.quydinhnoidungennotempty",null,locale));
        }
        QuyDinh quyDinh = getQuyDinh(id);
        quyDinh.setNoiDung(quyDinhDto.getNoiDung());
        quyDinh.setNoiDungEn(quyDinhDto.getNoiDungEn());
        quyDinhRepository.save(quyDinh);
        return quyDinh;
    }

    @Override
    public QuyDinh changeStatus(String id) {
        QuyDinh quyDinh = getQuyDinh(id);
        if(quyDinh.isTrangThai() == false) {
            if (!getQuyDinhTrangThaiTrue().isEmpty()) {
                QuyDinh quyDinhActive = getQuyDinhTrangThaiTrue().get(0);
                quyDinhActive.setTrangThai(false);
                quyDinhRepository.save(quyDinhActive);
            }
        }
        quyDinh.setTrangThai(!quyDinh.isTrangThai());
        quyDinhRepository.save(quyDinh);
        return quyDinh;
    }

    @Override
    public QuyDinh getQuyDinh(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return quyDinhRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.quydinhnotfound", null, locale), id)));
    }

    @Override
    public List<QuyDinh> getQuyDinhTrangThaiTrue(){
        List<QuyDinh> quyDinhs = quyDinhRepository.getQuyDinhByTrangThaiTrue();
        return quyDinhs;
    }
}
