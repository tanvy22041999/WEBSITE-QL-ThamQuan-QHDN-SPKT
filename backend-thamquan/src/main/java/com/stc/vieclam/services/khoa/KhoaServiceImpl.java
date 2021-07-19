package com.stc.vieclam.services.khoa;

import com.stc.vieclam.dtos.khoa.KhoaDto;
import com.stc.vieclam.entities.Khoa;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.KhoaRepository;
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
 * Time      : 14:41
 * Filename  : KhoaServiceImpl
 */
@Slf4j
@Service
public class KhoaServiceImpl implements KhoaService {
    private final KhoaRepository khoaRepository;

    private final MessageSource messageSource;

    private final VietnameseStringUtils vietnameseStringUtils;

    public KhoaServiceImpl(KhoaRepository khoaRepository, MessageSource messageSource, VietnameseStringUtils vietnameseStringUtils) {
        this.khoaRepository = khoaRepository;
        this.messageSource = messageSource;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public Page<Khoa> getKhoaPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return khoaRepository.getAllKhoaPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public List<Khoa> getAllKhoas(String search) {
        return khoaRepository.getAllKhoas(vietnameseStringUtils.makeSearchRegex(search));
    }

    @Override
    public Khoa getKhoa(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return khoaRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.khoanotfound", null, locale), id)));
    }

    @Override
    public Khoa getKhoaByIdCore(String id) {
        return khoaRepository.getByIdAndTrangThaiTrue(id).orElse(null);
    }

    @Override
    public Khoa createKhoa(KhoaDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getMaKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.khoacodenotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.khoanotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenKhoaEn())) {
            throw new InvalidException(messageSource.getMessage("error.khoaennotempty", null, locale));
        }
        if (khoaRepository.existsByMaKhoaIgnoreCase(dto.getMaKhoa())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.khoacodexisted", null, locale), dto.getMaKhoa()));
        }
        Khoa khoa = new Khoa();
        khoa.setMaKhoa(dto.getMaKhoa());
        khoa.setTenKhoa(dto.getTenKhoa());
        khoa.setTenKhoaEn(dto.getTenKhoaEn());
        khoa.setThuTu(dto.getThuTu());
        khoa.setTrangThai(true);
        khoaRepository.save(khoa);
        return khoa;
    }

    @Override
    public Khoa updateKhoa(String id, KhoaDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        Khoa khoa = getKhoa(id);
        if (ObjectUtils.isEmpty(dto.getMaKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.khoacodenotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.khoanotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenKhoaEn())) {
            throw new InvalidException(messageSource.getMessage("error.khoaennotempty", null, locale));
        }
        if (!dto.getMaKhoa().equalsIgnoreCase(khoa.getMaKhoa()) && khoaRepository.existsByMaKhoaIgnoreCase(dto.getMaKhoa())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.khoacodexisted", null, locale), dto.getMaKhoa()));
        }
        khoa.setMaKhoa(dto.getMaKhoa());
        khoa.setTenKhoa(dto.getTenKhoa());
        khoa.setTenKhoaEn(dto.getTenKhoaEn());
        khoa.setThuTu(dto.getThuTu());
        khoaRepository.save(khoa);
        return khoa;
    }

    @Override
    public Khoa changeStatus(String id) {
        Khoa khoa = getKhoa(id);
        khoa.setTrangThai(!khoa.isTrangThai());
        khoaRepository.save(khoa);
        return khoa;
    }
}
