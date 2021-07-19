package com.stc.vieclam.securities;

import com.stc.vieclam.entities.TaiKhoan;
import com.stc.vieclam.repositories.TaiKhoanRepository;
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
public class TaiKhoanDetailsService implements UserDetailsService {

    private final TaiKhoanRepository taiKhoanRepository;

    private final MessageSource messageSource;

    public TaiKhoanDetailsService(TaiKhoanRepository taiKhoanRepository, MessageSource messageSource) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.messageSource = messageSource;
    }

    @Override
    public JwtUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Locale locale = LocaleContextHolder.getLocale();
        TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(messageSource.getMessage(String.format("error.accountemailnotfound", email), null,locale)));
        return getUserDetails(taiKhoan);
    }

    private JwtUserDetails getUserDetails(TaiKhoan taiKhoan) {
        return new JwtUserDetails(
                taiKhoan.getHoTen(),
                taiKhoan.getEmail(),
                taiKhoan.getPassword(),
                taiKhoan.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()),
                taiKhoan.isTrangThai()
        );
    }
}
