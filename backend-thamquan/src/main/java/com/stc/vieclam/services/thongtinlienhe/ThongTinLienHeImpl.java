package com.stc.vieclam.services.thongtinlienhe;

import com.stc.vieclam.dtos.thongtinlienhe.ThongTinLienHeDto;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import com.stc.vieclam.entities.ThongTinLienHe;
import com.stc.vieclam.exceptions.InvalidException;
import com.stc.vieclam.exceptions.NotFoundException;
import com.stc.vieclam.repositories.ThongTinLienHeRepository;
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
@Slf4j
@Service
public class ThongTinLienHeImpl implements ThongTinLienHeService {
    private final ThongTinLienHeRepository thongTinLienHeRepository;
    private final VietnameseStringUtils vietnameseStringUtils;
    private final MessageSource messageSource;

    public ThongTinLienHeImpl(ThongTinLienHeRepository thongTinLienHeRepository, VietnameseStringUtils vietnameseStringUtils, MessageSource messageSource) {
        this.thongTinLienHeRepository = thongTinLienHeRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
        this.messageSource = messageSource;
    }


    @Override
    public ThongTinLienHe getThongTinLienHeCoreById(String id) {
        return thongTinLienHeRepository.findByIdAndTrangThaiTrue(id).orElse(null);
    }

    @Override
    public Page<ThongTinLienHe> getAllThongTinLienHePaging(String search, int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return thongTinLienHeRepository.getAllThongTinLienHePaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public ThongTinLienHe createThongTinLienHe(ThongTinLienHeDto thongTinLienHeDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getHoTen())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhehotennotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getDienThoai())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhedienthoainotempty",null,locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getEmail())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienheemailnotempty",null,locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getChucVu())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhechucvunotempty",null,locale));
        }

        ThongTinLienHe thongTinLienHe = new ThongTinLienHe();
        thongTinLienHe.setHoTen(thongTinLienHeDto.getHoTen());
        thongTinLienHe.setEmail(thongTinLienHeDto.getEmail());
        thongTinLienHe.setDienThoai(thongTinLienHeDto.getDienThoai());
        thongTinLienHe.setChucVu(thongTinLienHeDto.getChucVu());
        if(!getThongTinLienHeTrangThaiTrue().isEmpty()){
            ThongTinLienHe thongTinLienHeActive = getThongTinLienHeTrangThaiTrue().get(0);
            thongTinLienHeActive.setTrangThai(false);
            thongTinLienHeRepository.save(thongTinLienHeActive);
        }
        thongTinLienHe.setTrangThai(true);
        thongTinLienHeRepository.save(thongTinLienHe);
        return thongTinLienHe;
    }

    @Override
    public ThongTinLienHe updateThongTinLienHe(String id, ThongTinLienHeDto thongTinLienHeDto) {
        Locale locale = LocaleContextHolder.getLocale();
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getHoTen())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhehotennotempty",null, locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getDienThoai())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhedienthoainotempty",null,locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getEmail())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienheemailnotempty",null,locale));
        }
        if(ObjectUtils.isEmpty(thongTinLienHeDto.getChucVu())){
            throw new InvalidException(messageSource.getMessage("error.thongtinlienhechucvunotempty",null,locale));
        }
        ThongTinLienHe thongTinLienHe = getThongTinLienHe(id);
        thongTinLienHe.setHoTen(thongTinLienHeDto.getHoTen());
        thongTinLienHe.setEmail(thongTinLienHeDto.getEmail());
        thongTinLienHe.setDienThoai(thongTinLienHeDto.getDienThoai());
        thongTinLienHe.setChucVu(thongTinLienHeDto.getChucVu());
        thongTinLienHeRepository.save(thongTinLienHe);
        return thongTinLienHe;
    }

    @Override
    public ThongTinLienHe changeStatus(String id) {
        ThongTinLienHe thongTinLienHe = getThongTinLienHe(id);
        if(thongTinLienHe.isTrangThai() == false) {
            if (!getThongTinLienHeTrangThaiTrue().isEmpty()) {
                ThongTinLienHe thongTinLienHeActive = getThongTinLienHeTrangThaiTrue().get(0);
                thongTinLienHeActive.setTrangThai(false);
                thongTinLienHeRepository.save(thongTinLienHeActive);
            }
        }
        thongTinLienHe.setTrangThai(!thongTinLienHe.isTrangThai());
        thongTinLienHeRepository.save(thongTinLienHe);
        return thongTinLienHe;
    }

    @Override
    public ThongTinLienHe getThongTinLienHe(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return thongTinLienHeRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.thongtinlienhenotfound", null, locale), id)));
    }

    @Override
    public List<ThongTinLienHe> getThongTinLienHeTrangThaiTrue(){
        List<ThongTinLienHe> thongTinLienHes = thongTinLienHeRepository.getThongTinLienHeByByTrangThaiTrue();
        return thongTinLienHes;
    }
}
