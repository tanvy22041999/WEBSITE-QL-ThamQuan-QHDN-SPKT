package com.stc.vieclam.services.taikhoan;

import com.stc.vieclam.dtos.taikhoan.TaiKhoanDto;
import com.stc.vieclam.entities.TaiKhoan;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.TaiKhoanRepository;
import com.stc.vieclam.utils.EnumRole;
import com.stc.vieclam.utils.PageUtils;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 15:14
 * Filename  : TaiKhoanServiceImpl
 */
@Slf4j
@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {
    private final TaiKhoanRepository taiKhoanRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    private final MessageSource messageSource;

    public TaiKhoanServiceImpl(TaiKhoanRepository taiKhoanRepository,
                               VietnameseStringUtils vietnameseStringUtils, MessageSource messageSource) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.messageSource = messageSource;
    }

    @Override
    public List<String> getRoleTaiKhoans() {
        return Arrays.stream(EnumRole.values()).map(Enum::name)
                .filter(role -> role.equalsIgnoreCase(EnumRole.ROLE_ADMIN.name()))
                .collect(Collectors.toList());
    }

    @Override
    public Page<TaiKhoan> getAllTaiKhoanPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return taiKhoanRepository.getAllTaiKhoanPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public TaiKhoan getTaiKhoan(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return taiKhoanRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage(String.format("error.accountnotfound", id), null, locale)));
    }

    @Override
    public TaiKhoan createTaiKhoan(TaiKhoanDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        if (ObjectUtils.isEmpty(dto.getEmail())) {
            throw new InvalidException(messageSource.getMessage("error.emailempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getPassword())) {
            throw new InvalidException(messageSource.getMessage("error.passwordempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getRoles())) {
            throw new InvalidException(messageSource.getMessage("error.roleempty",null,locale));
        }
        if (taiKhoanRepository.existsByEmail(dto.getEmail().trim().toLowerCase())) {
            throw new InvalidException(messageSource.getMessage(String.format("error.accountexist", dto.getEmail().trim().toLowerCase()),
                    null, locale));
        }
        if (dto.getRoles().stream().noneMatch(role -> role.equalsIgnoreCase(EnumRole.ROLE_ADMIN.name()))) {
            throw new InvalidException(messageSource.getMessage("error.roleinvalid",null,locale));
        }
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setHoTen(dto.getHoTen().trim());
        taiKhoan.setEmail(dto.getEmail().trim().toLowerCase());
        taiKhoan.setPassword(dto.getPassword().trim());
        taiKhoan.setRoles(dto.getRoles());
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @Override
    public TaiKhoan updateTaiKhoan(String id, TaiKhoanDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        TaiKhoan taiKhoan = getTaiKhoan(id);
        if (ObjectUtils.isEmpty(dto.getPassword())) {
            throw new InvalidException(messageSource.getMessage("error.passwordempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getRoles())) {
            throw new InvalidException(messageSource.getMessage("error.roleempty",null,locale));
        }
        if (dto.getRoles().stream().noneMatch(role -> role.equalsIgnoreCase(EnumRole.ROLE_ADMIN.name()))) {
            throw new InvalidException(messageSource.getMessage("error.roleinvalid",null,locale));
        }
        taiKhoan.setHoTen(dto.getHoTen().trim());
        taiKhoan.setPassword(dto.getPassword().trim());
        taiKhoan.setRoles(dto.getRoles());
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @Override
    public TaiKhoan changeStatus(String id) {
        TaiKhoan taiKhoan = getTaiKhoan(id);
        taiKhoan.setTrangThai(!taiKhoan.isTrangThai());
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @Override
    public TaiKhoan getTaiKhoanByIdCore(String id) {
        return taiKhoanRepository.findById(id).orElse(null);
    }
}
