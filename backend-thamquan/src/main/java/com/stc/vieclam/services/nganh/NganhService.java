package com.stc.vieclam.services.nganh;

import com.stc.vieclam.dtos.nganh.NganhDto;
import com.stc.vieclam.entities.NganhDaoTao;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 5/11/21
 * Time      : 14:42
 * Filename  : NganhService
 */
public interface NganhService {
    Page<NganhDaoTao> getNganhPaging(String search, int page, int size, String sort, String column);

    List<NganhDaoTao> getAllNganhs(String search);

    List<NganhDaoTao> getAllNganhsByKhoaId(String khoaId);

    NganhDaoTao getNganh(String id);

    NganhDaoTao getNganhByIdCore(String id);

    NganhDaoTao createNganh(NganhDto dto);

    NganhDaoTao updateNganh(String id, NganhDto dto);

    NganhDaoTao changeStatus(String id);
}
