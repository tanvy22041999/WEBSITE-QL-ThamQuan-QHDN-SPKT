package com.stc.vieclam.services.khoa;

import com.stc.vieclam.dtos.khoa.KhoaDto;
import com.stc.vieclam.entities.Khoa;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:41
 * Filename  : KhoaService
 */
public interface KhoaService {
    Page<Khoa> getKhoaPaging(String search, int page, int size, String sort, String column);

    List<Khoa> getAllKhoas(String search);

    Khoa getKhoa(String id);

    Khoa getKhoaByIdCore(String id);

    Khoa createKhoa(KhoaDto dto);

    Khoa updateKhoa(String id, KhoaDto dto);

    Khoa changeStatus(String id);
}
