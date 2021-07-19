package com.stc.vieclam.services.thoathuannguoidung;

import com.stc.vieclam.dtos.quydinh.QuyDinhDto;
import com.stc.vieclam.dtos.thoathuannguoidung.ThoaThuanNguoiDungDto;
import com.stc.vieclam.entities.QuyDinh;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.ThoaThuanNguoiDungRepository;
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
 * Time      : 14:45
 * Filename  : ThoaThuanNguoiDungImpl
 */
@Slf4j
@Service
public class ThoaThuanNguoiDungImpl implements ThoaThuanNguoiDungService {

    private final ThoaThuanNguoiDungRepository thoaThuanNguoiDungRepository;
    private final VietnameseStringUtils vietnameseStringUtils;
    private final MessageSource messageSource;

    public ThoaThuanNguoiDungImpl(ThoaThuanNguoiDungRepository thoaThuanNguoiDungRepository,
                                  VietnameseStringUtils vietnameseStringUtils, MessageSource messageSource){

        this.thoaThuanNguoiDungRepository = thoaThuanNguoiDungRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.messageSource = messageSource;
    }

    @Override
    public ThoaThuanNguoiDung getThoaThuanNguoiDungCoreById(String id) {
        return thoaThuanNguoiDungRepository.findByIdAndTrangThaiTrue(id).orElse(null);
    }

    @Override
    public Page<ThoaThuanNguoiDung> getAllThoaThuanNguoiDungPaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return thoaThuanNguoiDungRepository.getAllThoaThuanNguoiDungPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public ThoaThuanNguoiDung createThoaThuanNguoiDung(ThoaThuanNguoiDungDto thoaThuanNguoiDungDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(thoaThuanNguoiDungDto.getNoiDung())){
            throw new InvalidException(messageSource.getMessage("error.thoathuannguoidungnoidungnotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(thoaThuanNguoiDungDto.getNoiDungEn())){
            throw new InvalidException(messageSource.getMessage("error.thoathuannguoidungnoidungennotempty",null,locale));
        }

        ThoaThuanNguoiDung thoaThuanNguoiDung = new ThoaThuanNguoiDung();
        thoaThuanNguoiDung.setNoiDung(thoaThuanNguoiDungDto.getNoiDung());
        thoaThuanNguoiDung.setNoiDungEn(thoaThuanNguoiDungDto.getNoiDungEn());
        if(!getThoaThuanNguoiDungTrangThaiTrue().isEmpty()){
            ThoaThuanNguoiDung thoaThuanNguoiDungActive = getThoaThuanNguoiDungTrangThaiTrue().get(0);
            thoaThuanNguoiDungActive.setTrangThai(false);
            thoaThuanNguoiDungRepository.save(thoaThuanNguoiDungActive);
        }
        thoaThuanNguoiDung.setTrangThai(true);
        thoaThuanNguoiDungRepository.save(thoaThuanNguoiDung);
        return thoaThuanNguoiDung;
    }

    @Override
    public ThoaThuanNguoiDung updateThoaThuanNguoiDung(String id, ThoaThuanNguoiDungDto thoaThuanNguoiDungDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(thoaThuanNguoiDungDto.getNoiDung())){
            throw new InvalidException(messageSource.getMessage("error.thoathuannguoidungnoidungnotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(thoaThuanNguoiDungDto.getNoiDungEn())){
            throw new InvalidException(messageSource.getMessage("error.thoathuannguoidungnoidungennotempty",null,locale));
        }
        ThoaThuanNguoiDung thoaThuanNguoiDung = getThoaThuanNguoiDung(id);
        thoaThuanNguoiDung.setNoiDung(thoaThuanNguoiDungDto.getNoiDung());
        thoaThuanNguoiDung.setNoiDungEn(thoaThuanNguoiDungDto.getNoiDungEn());
        thoaThuanNguoiDungRepository.save(thoaThuanNguoiDung);
        return thoaThuanNguoiDung;
    }

    @Override
    public ThoaThuanNguoiDung changeStatus(String id) {
        ThoaThuanNguoiDung thoaThuanNguoiDung = getThoaThuanNguoiDung(id);
        if(thoaThuanNguoiDung.isTrangThai() == false) {
            if (!getThoaThuanNguoiDungTrangThaiTrue().isEmpty()) {
                ThoaThuanNguoiDung thoaThuanNguoiDungActive = getThoaThuanNguoiDungTrangThaiTrue().get(0);
                thoaThuanNguoiDungActive.setTrangThai(false);
                thoaThuanNguoiDungRepository.save(thoaThuanNguoiDungActive);
            }
        }
        thoaThuanNguoiDung.setTrangThai(!thoaThuanNguoiDung.isTrangThai());
        thoaThuanNguoiDungRepository.save(thoaThuanNguoiDung);
        return thoaThuanNguoiDung;
    }

    @Override
    public ThoaThuanNguoiDung getThoaThuanNguoiDung(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return thoaThuanNguoiDungRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.thoathuannguoidungnotfound", null, locale), id)));
    }

    @Override
    public List<ThoaThuanNguoiDung> getThoaThuanNguoiDungTrangThaiTrue(){
        List<ThoaThuanNguoiDung> thoaThuanNguoiDungs = thoaThuanNguoiDungRepository.getThoaThuanNguoiDungByTrangThaiTrue();
        return thoaThuanNguoiDungs;
    }
}
