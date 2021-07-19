package com.stc.vieclam.securities.provider;

import com.stc.vieclam.securities.SinhVienDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Locale;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 17:56
 * Filename  : SinhVienAuthenticationProvider
 */
@Slf4j
@Service
public class SinhVienAuthenticationProvider implements AuthenticationProvider {

    private final SinhVienDetailsService sinhVienDetailsService;

    private final MessageSource messageSource;

    public SinhVienAuthenticationProvider(SinhVienDetailsService sinhVienDetailsService, MessageSource messageSource) {
        this.sinhVienDetailsService = sinhVienDetailsService;
        this.messageSource = messageSource;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Locale locale = LocaleContextHolder.getLocale();
        SinhVienAuthenticationToken token = (SinhVienAuthenticationToken) authentication;
        String email = token.getName();
        String password = token.getCredentials() == null ? null : token.getCredentials().toString();
        boolean verifyCredentials = Boolean.parseBoolean(token.isVerifyCredentials().toString());
        UserDetails userDetails = sinhVienDetailsService.loadUserByUsername(email);
        if (!userDetails.isEnabled())
            throw new BadCredentialsException(messageSource.getMessage("error.accountdisable",null,locale));
        if (verifyCredentials) {
            assert password != null;
            if (password.equals(userDetails.getPassword())) {
                return new SinhVienAuthenticationToken(email, password, verifyCredentials, userDetails.getAuthorities());
            } else {
                throw new BadCredentialsException(messageSource.getMessage("error.passwordwrong",null,locale));
            }
        } else {
            return new SinhVienAuthenticationToken(email, "N/A", verifyCredentials, userDetails.getAuthorities());
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(SinhVienAuthenticationToken.class);
    }
}
