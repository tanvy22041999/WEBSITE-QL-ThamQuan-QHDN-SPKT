package com.stc.vieclam.services.sinhvien;

import com.stc.vieclam.dtos.sinhvien.FilterSinhVienDto;
import com.stc.vieclam.dtos.sinhvien.SinhVienDto;
import com.stc.vieclam.entities.SinhVien;
import org.springframework.data.domain.Page;

import java.security.Principal;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/12/21
 * Time      : 13:37
 * Filename  : SinhVienService
 */
public interface SinhVienService {
    Page<SinhVien> filter(FilterSinhVienDto dto, int page, int size, String sort, String column);

    SinhVien getSinhVien(String id);

    SinhVien getCurrentSinhVien(Principal principal);

    SinhVien getSinhVienByIdCore(String id);

    SinhVien createSinhVien(SinhVienDto dto);

    SinhVien createSinhVienCore(String hoTen, String email, String password);

    SinhVien updateSinhVien(String id, SinhVienDto dto);

    SinhVien changeStatus(String id);
}
