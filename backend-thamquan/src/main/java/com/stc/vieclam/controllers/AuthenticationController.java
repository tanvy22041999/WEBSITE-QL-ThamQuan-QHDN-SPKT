package com.stc.vieclam.controllers;

import com.stc.vieclam.dtos.AccountDto;
import com.stc.vieclam.dtos.TokenDetails;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.UserNotFoundAuthenticationException;
import com.stc.vieclam.securities.*;
import com.stc.vieclam.securities.provider.NhaTuyenDungAuthenticationToken;
import com.stc.vieclam.securities.provider.SinhVienAuthenticationToken;
import com.stc.vieclam.securities.provider.TaiKhoanAuthenticationToken;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Locale;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 19:06
 * Filename  : AuthenticationController
 */
@RestController
@RequestMapping("/rest/login")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TaiKhoanDetailsService taiKhoanDetailsService;

    @Autowired
    private SinhVienDetailsService sinhVienDetailsService;

    @Autowired
    private NhaTuyenDungDetailsService nhaTuyenDungDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private MessageSource messageSource;

    @Value("${google.verifyUrl}")
    private String googleVerifyUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    //<editor-fold desc="Admin Login">

    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @param dto: DTO login form (username, password)
     * @return: Token login
     */
    @ApiOperation(value = "Admin, cộng tác viên login form (username, password), avatar null")
    @PostMapping("/admin")
    public ResponseEntity<TokenDetails> loginAdmin(@Valid @RequestBody AccountDto dto) {
        TaiKhoanAuthenticationToken authenticationToken = new TaiKhoanAuthenticationToken(
                dto.getUsername(),
                dto.getPassword(),
                true
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = taiKhoanDetailsService
                .loadUserByUsername(dto.getUsername());
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @lastModified:
     * @changeBy:
     * @lastChange:
     * @param googleToken: Token Id google
     * @return: Token login
     */
    @ApiOperation(value = "Admin, cộng tác viên login google (Token Id), lấy avatar google")
    @PostMapping("/admin/google")
    public ResponseEntity<TokenDetails> loginGoogleAdmin(@RequestHeader(name = "idToken") String googleToken) {
        Locale locale = LocaleContextHolder.getLocale();
        String urlRequest = googleVerifyUrl + googleToken;
        String email;
        String avatar;
        try {
            ResponseEntity<HashMap> responseEntity = restTemplate.exchange(urlRequest, HttpMethod.GET, null, HashMap.class);
            HashMap<String, String> map = responseEntity.getBody();
            email = map.get("email");
            avatar = map.get("picture");
        } catch (Exception ex) {
            throw new InvalidException(messageSource.getMessage("error.tokeninvalid", null, locale));
        }
        TaiKhoanAuthenticationToken authenticationToken = new TaiKhoanAuthenticationToken(
                email,
                null,
                false
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = taiKhoanDetailsService
                .loadUserByUsername(email);
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, avatar);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //</editor-fold>


    //<editor-fold desc="Sinh viên login">
    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @param dto: DTO login form (username, password)
     * @return: Token login
     */
    @ApiOperation(value = "Sinh viên login form (username, password), avatar null")
    @PostMapping("/sinh-vien")
    public ResponseEntity<TokenDetails> loginSinhVien(@Valid @RequestBody AccountDto dto) {
        SinhVienAuthenticationToken authenticationToken = new SinhVienAuthenticationToken(
                dto.getUsername(),
                dto.getPassword(),
                true
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = sinhVienDetailsService
                .loadUserByUsername(dto.getUsername());
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @lastModified:
     * @changeBy:
     * @lastChange:
     * @param googleToken: Token Id google
     * @return: Token login
     */
    @ApiOperation(value = "Sinh viên login google (Token Id), lấy avatar google")
    @PostMapping("/sinh-vien/google")
    public ResponseEntity<TokenDetails> loginGoogleSinhVien(@RequestHeader(name = "idToken") String googleToken) {
        Locale locale = LocaleContextHolder.getLocale();
        String urlRequest = googleVerifyUrl + googleToken;
        String email;
        String avatar;
        try {
            ResponseEntity<HashMap> responseEntity = restTemplate.exchange(urlRequest, HttpMethod.GET, null, HashMap.class);
            HashMap<String, String> map = responseEntity.getBody();
            email = map.get("email");
            avatar = map.get("picture");
        } catch (Exception ex) {
            throw new InvalidException(messageSource.getMessage("error.tokeninvalid", null, locale));
        }
        SinhVienAuthenticationToken authenticationToken = new SinhVienAuthenticationToken(
                email,
                null,
                false
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = sinhVienDetailsService
                .loadUserByUsername(email);
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, avatar);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //</editor-fold>


    //<editor-fold desc="Nhà tuyển dụng login">
    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @param dto: DTO login form (username, password)
     * @return: Token login
     */
    @ApiOperation(value = "Nhà tuyển dụng login form (username, password), avatar null")
    @PostMapping("/nha-tuyen-dung")
    public ResponseEntity<TokenDetails> loginNhaTuyenDung(@Valid @RequestBody AccountDto dto) {
        NhaTuyenDungAuthenticationToken authenticationToken = new NhaTuyenDungAuthenticationToken(
                dto.getUsername(),
                dto.getPassword(),
                true
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = nhaTuyenDungDetailsService
                .loadUserByUsername(dto.getUsername());
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /***
     * @author: thangpx
     * @createDate: 31-03-2021
     * @lastModified:
     * @changeBy:
     * @lastChange:
     * @param googleToken: Token Id google
     * @return: Token login
     */
    @ApiOperation(value = "Admin, cộng tác viên login google (Token Id), lấy avatar google")
    @PostMapping("/nha-tuyen-dung/google")
    public ResponseEntity<TokenDetails> loginGoogleNhaTuyenDung(@RequestHeader(name = "idToken") String googleToken) {
        Locale locale = LocaleContextHolder.getLocale();
        String urlRequest = googleVerifyUrl + googleToken;
        String email;
        String avatar;
        try {
            ResponseEntity<HashMap> responseEntity = restTemplate.exchange(urlRequest, HttpMethod.GET, null, HashMap.class);
            HashMap<String, String> map = responseEntity.getBody();
            email = map.get("email");
            avatar = map.get("picture");
        } catch (Exception ex) {
            throw new InvalidException(messageSource.getMessage("error.tokeninvalid", null, locale));
        }
        NhaTuyenDungAuthenticationToken authenticationToken = new NhaTuyenDungAuthenticationToken(
                email,
                null,
                false
        );
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (UserNotFoundAuthenticationException | BadCredentialsException ex) {
            throw new InvalidException(ex.getMessage());
        }
        final JwtUserDetails userDetails = nhaTuyenDungDetailsService
                .loadUserByUsername(email);
        final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, avatar);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //</editor-fold>


    @GetMapping("/hello")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> sayHello(Principal principal) {
        return new ResponseEntity<>(String.format("Hello %s", principal.getName()), HttpStatus.OK);
    }

}
