package com.stc.vieclam.services.thongtinlienhe;

import com.stc.vieclam.dtos.thongtinlienhe.ThongTinLienHeDto;
import com.stc.vieclam.entities.ThongTinLienHe;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ThongTinLienHeService {
    ThongTinLienHe getThongTinLienHeCoreById(String id);
    Page<ThongTinLienHe> getAllThongTinLienHePaging(String search, int page, int size, String sort, String column);
    ThongTinLienHe createThongTinLienHe(ThongTinLienHeDto thongTinLienHeDto);
    ThongTinLienHe updateThongTinLienHe(String id, ThongTinLienHeDto thongTinLienHeDto);
    ThongTinLienHe changeStatus(String id);
    ThongTinLienHe getThongTinLienHe(String id);
    List<ThongTinLienHe> getThongTinLienHeTrangThaiTrue();
}
