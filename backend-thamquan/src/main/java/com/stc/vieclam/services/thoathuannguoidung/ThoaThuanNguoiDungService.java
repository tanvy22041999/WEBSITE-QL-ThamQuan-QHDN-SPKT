package com.stc.vieclam.services.thoathuannguoidung;

import com.stc.vieclam.dtos.thoathuannguoidung.ThoaThuanNguoiDungDto;
import com.stc.vieclam.entities.ThoaThuanNguoiDung;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:45
 * Filename  : ThoaThuanNguoiDung
 */
public interface ThoaThuanNguoiDungService {
    ThoaThuanNguoiDung getThoaThuanNguoiDungCoreById(String id);
    Page<ThoaThuanNguoiDung> getAllThoaThuanNguoiDungPaging(String search, int page, int size, String sort, String column);
    ThoaThuanNguoiDung createThoaThuanNguoiDung(ThoaThuanNguoiDungDto thoaThuanNguoiDungDto);
    ThoaThuanNguoiDung updateThoaThuanNguoiDung(String id, ThoaThuanNguoiDungDto thoaThuanNguoiDungDto);
    ThoaThuanNguoiDung changeStatus(String id);
    ThoaThuanNguoiDung getThoaThuanNguoiDung(String id);
    List<ThoaThuanNguoiDung> getThoaThuanNguoiDungTrangThaiTrue();
}
