package com.stc.vieclam.securities;

import com.stc.vieclam.entities.NhaTuyenDung;
import com.stc.vieclam.entities.SinhVien;
import com.stc.vieclam.repositories.NhaTuyenDungRepository;
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
public class NhaTuyenDungDetailsService implements UserDetailsService {

    private final NhaTuyenDungRepository nhaTuyenDungRepository;

    private final MessageSource messageSource;

    public NhaTuyenDungDetailsService(NhaTuyenDungRepository nhaTuyenDungRepository, MessageSource messageSource) {
        this.nhaTuyenDungRepository = nhaTuyenDungRepository;
        this.messageSource = messageSource;
    }

    @Override
    public JwtUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Locale locale = LocaleContextHolder.getLocale();
        NhaTuyenDung nhaTuyenDung = nhaTuyenDungRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(messageSource.getMessage(String.format("error.nhatuyendungemailnotfound", email), null, locale)));
        return getUserDetails(nhaTuyenDung);
    }

    private JwtUserDetails getUserDetails(NhaTuyenDung nhaTuyenDung) {
        return new JwtUserDetails(
                nhaTuyenDung.getTenCongTy(),
                nhaTuyenDung.getEmail(),
                nhaTuyenDung.getPassword(),
                nhaTuyenDung.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()),
                nhaTuyenDung.isTrangThai()
        );
    }
}
