package com.stc.vieclam.services.taikhoan;

import com.stc.vieclam.dtos.taikhoan.TaiKhoanDto;
import com.stc.vieclam.entities.TaiKhoan;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 15:14
 * Filename  : TaiKhoanService
 */
public interface TaiKhoanService {

    List<String> getRoleTaiKhoans();

    Page<TaiKhoan> getAllTaiKhoanPaging(String search, int page, int size, String sort, String column);

    TaiKhoan getTaiKhoan(String id);

    TaiKhoan createTaiKhoan(TaiKhoanDto dto);

    TaiKhoan updateTaiKhoan(String id, TaiKhoanDto dto);

    TaiKhoan changeStatus(String id);
    
    TaiKhoan getTaiKhoanByIdCore(String id);
}
