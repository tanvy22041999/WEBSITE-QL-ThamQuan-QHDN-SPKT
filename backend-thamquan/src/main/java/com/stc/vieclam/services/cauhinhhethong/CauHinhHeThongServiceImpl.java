package com.stc.vieclam.services.cauhinhhethong;

import com.stc.vieclam.dtos.cauhinhhethong.CauHinhHeThongDto;
import com.stc.vieclam.entities.CauHinhHeThong;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.CauHinhHeThongRepository;
import com.stc.vieclam.utils.PageUtils;
import lombok.extern.slf4j.Slf4j;
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
 * Date      : 4/11/21
 * Time      : 14:24
 * Filename  : CauHinhHeThongServiceImpl
 */
@Slf4j
@Service
public class CauHinhHeThongServiceImpl implements CauHinhHeThongService {
    private final CauHinhHeThongRepository cauHinhHeThongRepository;

    private final MessageSource messageSource;

    public CauHinhHeThongServiceImpl(CauHinhHeThongRepository cauHinhHeThongRepository, MessageSource messageSource) {
        this.cauHinhHeThongRepository = cauHinhHeThongRepository;
        this.messageSource = messageSource;
    }

    @Override
    public CauHinhHeThong getCauHinhHeThongCore() {
        Locale locale = LocaleContextHolder.getLocale();
        List<CauHinhHeThong> cauHinhHeThongs = cauHinhHeThongRepository.findAll();
        if (cauHinhHeThongs.size() == 0) {
            throw new NotFoundException(messageSource.getMessage("error.cauhinhhethongempty", null, locale));
        }
        return cauHinhHeThongs.get(0);
    }

    @Override
    public Page<CauHinhHeThong> getAllCauHinhHeThongPaging(int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return cauHinhHeThongRepository.findAll(pageable);
    }

    @Override
    public CauHinhHeThong getCauHinhHeThong(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return cauHinhHeThongRepository.findById(id).orElseThrow(
                () -> new NotFoundException(messageSource.getMessage(String.format("error.cauhinhhethongnotfound", id), null, locale)));
    }


    @Override
    public CauHinhHeThong createCauHinhHeThong(CauHinhHeThongDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailsenderempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getPasswordEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongpasswordempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getEmailNhanThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailreceiveempty", null, locale));
        }
        if (cauHinhHeThongRepository.count() != 0) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongexist", null, locale));
        }
        CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
        cauHinhHeThong.setEmailGuiThu(dto.getEmailGuiThu());
        cauHinhHeThong.setPasswordEmailGuiThu(dto.getPasswordEmailGuiThu());
        cauHinhHeThong.setEmailNhanThu(dto.getEmailNhanThu());
        cauHinhHeThongRepository.save(cauHinhHeThong);
        return cauHinhHeThong;
    }

    @Override
    public CauHinhHeThong updateCauHinhHeThong(String id, CauHinhHeThongDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        CauHinhHeThong cauHinhHeThong = getCauHinhHeThong(id);
        if (ObjectUtils.isEmpty(dto.getEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailsenderempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getPasswordEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongpasswordempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getEmailNhanThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailreceiveempty", null, locale));
        }
        cauHinhHeThong.setEmailGuiThu(dto.getEmailGuiThu());
        cauHinhHeThong.setPasswordEmailGuiThu(dto.getPasswordEmailGuiThu());
        cauHinhHeThong.setEmailNhanThu(dto.getEmailNhanThu());
        cauHinhHeThongRepository.save(cauHinhHeThong);
        return cauHinhHeThong;
    }
}
