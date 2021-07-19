package com.stc.vieclam.services.linhvuc;

import com.stc.vieclam.dtos.linhvuc.LinhVucDto;
import com.stc.vieclam.entities.LinhVuc;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.LinhVucRepository;
import com.stc.vieclam.utils.PageUtils;
import com.stc.vietnamstringutils.VietnameseStringUtils;
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
 * Date      : 5/11/21
 * Time      : 14:42
 * Filename  : LinhVucServiceImpl
 */
@Slf4j
@Service
public class LinhVucServiceImpl implements LinhVucService{
    private final LinhVucRepository linhVucRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final MessageSource messageSource;

    public LinhVucServiceImpl(LinhVucRepository linhVucRepository,
                              VietnameseStringUtils vietnameseStringUtils, MessageSource messageSource) {
        this.linhVucRepository = linhVucRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.messageSource = messageSource;
    }

    @Override
    public Page<LinhVuc> getAllLinhVucPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return linhVucRepository.getAllLinhVucPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public List<LinhVuc> getLinhVucs(String search) {
        return linhVucRepository.getLinhVucs(vietnameseStringUtils.makeSearchRegex(search));
    }

    @Override
    public LinhVuc getLinhVuc(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return linhVucRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format(messageSource.getMessage("error.linhvucnotfound", null, locale), id)));
    }

    @Override
    public LinhVuc getLinhVucByIdCore(String id) {
        return linhVucRepository.findByIdAndTrangThaiTrue(id)
                .orElse(null);
    }

    @Override
    public LinhVuc createLinhVuc(LinhVucDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getMaLinhVuc())) {
            throw new InvalidException(messageSource.getMessage("error.linhvucnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenLinhVuc())) {
            throw new InvalidException(messageSource.getMessage("error.tenlinhvucnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenLinhVucEn())) {
            throw new InvalidException(messageSource.getMessage("error.tenlinhvucennotempty", null, locale));
        }
        if (linhVucRepository.existsByMaLinhVucIgnoreCase(dto.getMaLinhVuc())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.linhvucexist", null, locale), dto.getTenLinhVuc()));
        }
        LinhVuc linhVuc = new LinhVuc();
        linhVuc.setMaLinhVuc(dto.getMaLinhVuc());
        linhVuc.setTenLinhVuc(dto.getTenLinhVuc());
        linhVuc.setTenLinhVucEn(dto.getTenLinhVucEn());
        linhVuc.setTrangThai(true);
        linhVucRepository.save(linhVuc);
        return linhVuc;
    }

    @Override
    public LinhVuc updateLinhVuc(String id, LinhVucDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        LinhVuc linhVuc = getLinhVuc(id);
        if (ObjectUtils.isEmpty(dto.getMaLinhVuc())) {
            throw new InvalidException(messageSource.getMessage("error.linhvucnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenLinhVuc())) {
            throw new InvalidException(messageSource.getMessage("error.tenlinhvucnotempty", null, locale));
        }
        if (!linhVuc.getMaLinhVuc().equalsIgnoreCase(dto.getMaLinhVuc()) &&
                linhVucRepository.existsByMaLinhVucIgnoreCase(dto.getMaLinhVuc())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.linhvucexist", null, locale), dto.getTenLinhVuc()));
        }
        linhVuc.setMaLinhVuc(dto.getMaLinhVuc());
        linhVuc.setTenLinhVuc(dto.getTenLinhVuc());
        linhVuc.setTenLinhVucEn(dto.getTenLinhVucEn());
        linhVucRepository.save(linhVuc);
        return linhVuc;
    }

    @Override
    public LinhVuc changeStatus(String id) {
        LinhVuc linhVuc = getLinhVuc(id);
        linhVuc.setTrangThai(!linhVuc.isTrangThai());
        linhVucRepository.save(linhVuc);
        return linhVuc;
    }
}
