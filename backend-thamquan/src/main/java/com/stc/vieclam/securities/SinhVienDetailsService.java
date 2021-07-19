package com.stc.vieclam.securities;

import com.stc.vieclam.entities.SinhVien;
import com.stc.vieclam.repositories.SinhVienRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 17:49
 * Filename  : TaiKhoanDetailsService
 */
@Slf4j
@Service
public class SinhVienDetailsService implements UserDetailsService {

    private final SinhVienRepository sinhVienRepository;

    private final MessageSource messageSource;

    public SinhVienDetailsService(SinhVienRepository sinhVienRepository, MessageSource messageSource) {
        this.sinhVienRepository = sinhVienRepository;
        this.messageSource = messageSource;
    }

    @Override
    public JwtUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Locale locale = LocaleContextHolder.getLocale();
        SinhVien sinhVien = sinhVienRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(messageSource.getMessage(String.format("error.sinhvienemailnotfound", email), null, locale)));
        return getUserDetails(sinhVien);
    }

    private JwtUserDetails getUserDetails(SinhVien sinhVien) {
        return new JwtUserDetails(
                sinhVien.getHoTen(),
                sinhVien.getEmail(),
                sinhVien.getPassword(),
                sinhVien.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()),
                sinhVien.isTrangThai()
        );
    }
}
