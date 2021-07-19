package com.stc.vieclam.services.nganh;

import com.stc.vieclam.dtos.nganh.NganhDto;
import com.stc.vieclam.entities.NganhDaoTao;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.NganhDaoTaoRepository;
import com.stc.vieclam.services.khoa.KhoaService;
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
 * Filename  : NganhServiceImpl
 */
@Slf4j
@Service
public class NganhServiceImpl implements NganhService{
    private final NganhDaoTaoRepository nganhReposiroty;

    private final MessageSource messageSource;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final KhoaService khoaService;

    public NganhServiceImpl(NganhDaoTaoRepository nganhReposiroty, MessageSource messageSource, VietnameseStringUtils vietnameseStringUtils, KhoaService khoaService) {
        this.nganhReposiroty = nganhReposiroty;
        this.messageSource = messageSource;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.khoaService = khoaService;
    }

    @Override
    public Page<NganhDaoTao> getNganhPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return nganhReposiroty.getAllNganhPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public List<NganhDaoTao> getAllNganhs(String search) {
        return nganhReposiroty.getAllNganhActive(vietnameseStringUtils.makeSearchRegex(search));
    }

    @Override
    public List<NganhDaoTao> getAllNganhsByKhoaId(String khoaId) {
        return nganhReposiroty.getAllNganhByKhoaId(khoaId);
    }

    @Override
    public NganhDaoTao getNganh(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return nganhReposiroty.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format(messageSource.getMessage("error.nganhnotfound", null, locale), id)));
    }

    @Override
    public NganhDaoTao getNganhByIdCore(String id) {
        return nganhReposiroty.findByIdAndTrangThaiTrue(id)
                .orElse(null);
    }

    @Override
    public NganhDaoTao createNganh(NganhDto dto) {
        NganhDaoTao nganh = new NganhDaoTao();
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getMaNganh())) {
            throw new InvalidException(messageSource.getMessage("error.manganhnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.nganhkhoanotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenNganh())) {
            throw new InvalidException(messageSource.getMessage("error.nganhnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenNganhEn())) {
            throw new InvalidException(messageSource.getMessage("error.nganhennotempty", null, locale));
        }
        if (nganhReposiroty.existsByMaNganhIgnoreCase(dto.getMaNganh().trim())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.nganhexist", null, locale), dto.getMaNganh()));
        }

        nganh.setKhoa(khoaService.getKhoaByIdCore(dto.getKhoa()));
        nganh.setMaNganh(dto.getMaNganh());
        nganh.setTenNganh(dto.getTenNganh());
        nganh.setTenNganhEn(dto.getTenNganhEn());
        nganh.setThuTu(dto.getThuTu());
        nganhReposiroty.save(nganh);
        return nganh;
    }

    @Override
    public NganhDaoTao updateNganh(String id, NganhDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        NganhDaoTao nganh = getNganh(id);

        if (ObjectUtils.isEmpty(dto.getMaNganh())) {
            throw new InvalidException(messageSource.getMessage("error.manganhnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getKhoa())) {
            throw new InvalidException(messageSource.getMessage("error.nganhkhoanotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenNganh())) {
            throw new InvalidException(messageSource.getMessage("error.nganhnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getTenNganhEn())) {
            throw new InvalidException(messageSource.getMessage("error.nganhennotempty", null, locale));
        }

        if (!dto.getMaNganh().equalsIgnoreCase(nganh.getMaNganh().trim())
                && nganhReposiroty.existsByMaNganhIgnoreCase(dto.getMaNganh())) {
            throw new InvalidException(String.format(messageSource.getMessage("error.nganhexist", null, locale), dto.getMaNganh()));
        }

        nganh.setKhoa(khoaService.getKhoaByIdCore(dto.getKhoa()));
        nganh.setMaNganh(dto.getMaNganh());
        nganh.setTenNganh(dto.getTenNganh());
        nganh.setTenNganhEn(dto.getTenNganhEn());
        nganh.setThuTu(dto.getThuTu());
        nganhReposiroty.save(nganh);
        return nganh;
    }

    @Override
    public NganhDaoTao changeStatus(String id) {
        NganhDaoTao nganh = getNganh(id);
        nganh.setTrangThai(!nganh.isTrangThai());
        nganhReposiroty.save(nganh);
        return nganh;
    }
}
